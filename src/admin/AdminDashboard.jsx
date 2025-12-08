import React, { useEffect, useState } from 'react';
import AdminLogin from './AdminLogin';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

function getToken() {
  return localStorage.getItem('admin_token');
}

function authFetch(url, opts = {}) {
  opts.headers = opts.headers || {};
  const tk = getToken();
  if (tk) opts.headers.Authorization = 'Bearer ' + tk;
  return fetch(url, opts);
}

function DetailsModal({ item, onClose }) {
  if (!item) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <h3>Details</h3>
        <pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(item, null, 2)}</pre>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [token, setToken] = useState(getToken());
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [sortBy, setSortBy] = useState('receivedAt');
  const [sortDir, setSortDir] = useState('desc');
  const [dark, setDark] = useState(false);
  const [stats, setStats] = useState([]);

  useEffect(()=> {
    if (token) load();
    // eslint-disable-next-line
  }, [token, page, pageSize, q, sortBy, sortDir]);

  async function load() {
    setLoading(true);
    const params = new URLSearchParams({ q, page, pageSize, sortBy, sortDir });
    try {
      const res = await authFetch('/admin/submissions?' + params.toString());
      if (!res.ok) {
        if (res.status === 401) { logout(); return; }
        throw new Error('Failed');
      }
      const data = await res.json();
      setItems(data.items || []);
      setTotal(data.total || 0);
    } catch (e) {
      console.error(e);
    } finally { setLoading(false); }
  }

  function logout() {
    localStorage.removeItem('admin_token');
    setToken(null);
  }

  async function doDelete(receivedAt) {
    if (!confirm('Delete this submission?')) return;
    try {
      const res = await authFetch('/admin/submissions/' + encodeURIComponent(receivedAt), { method: 'DELETE' });
      if (res.ok) load();
      else alert('Delete failed');
    } catch (e) { console.error(e); }
  }

  async function exportCSV() {
    const res = await authFetch('/admin/export/csv');
    if (!res.ok) { alert('Export failed'); return; }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'submissions.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  async function exportXLSX() {
    const res = await authFetch('/admin/export/xlsx');
    if (!res.ok) { alert('Export failed'); return; }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'submissions.xlsx';
    a.click();
    URL.revokeObjectURL(url);
  }

  async function loadStats() {
    try {
      const res = await authFetch('/admin/stats/registrations?days=30');
      if (!res.ok) return;
      const data = await res.json();
      setStats(data.data || []);
    } catch(e) { console.error(e); }
  }

  useEffect(()=> { if (token) loadStats(); }, [token]);

  if (!token) {
    return <AdminLogin onLogin={(tk)=>{ localStorage.setItem('admin_token', tk); setToken(tk); }} />;
  }

  const chartData = {
    labels: stats.map(s => s.date),
    datasets: [{ label: 'Registrations', data: stats.map(s => s.count) }]
  };

  return (
    <div className={dark ? 'admin-dark' : 'admin-light'}>
      <div className="admin-toolbar">
        <div className="left">
          <h2>Admin — Submissions</h2>
          <button onClick={()=>setDark(d=>!d)}>{dark ? 'Light' : 'Dark'}</button>
        </div>

        <div className="right">
          <input placeholder="Search name/email/phone" value={q} onChange={e=>setQ(e.target.value)} />
          <button onClick={()=>{ setPage(1); load(); }}>Search</button>
          <button onClick={exportCSV}>Export CSV</button>
          <button onClick={exportXLSX}>Export XLSX</button>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="admin-layout">
        <div className="admin-left">
          <div className="admin-table">
            <table>
              <thead>
                <tr>
                  <th onClick={()=>{ setSortBy('receivedAt'); setSortDir(d=>d==='asc'?'desc':'asc'); }}>Date</th>
                  <th onClick={()=>{ setSortBy('name'); setSortDir(d=>d==='asc'?'desc':'asc'); }}>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(it => (
                  <tr key={it.receivedAt}>
                    <td>{it.receivedAt}</td>
                    <td>{it.name}</td>
                    <td>{it.email}</td>
                    <td>{it.phone}</td>
                    <td>{it.location}</td>
                    <td>
                      <button onClick={()=>setSelected(it)}>View</button>
                      <button onClick={()=>doDelete(it.receivedAt)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {loading && <div>Loading…</div>}
          </div>

          <div className="pagination">
            <button disabled={page<=1} onClick={()=>{setPage(p=>Math.max(1,p-1))}}>Prev</button>
            <span>Page {page} / {Math.ceil(total / pageSize || 1)}</span>
            <button disabled={page >= Math.ceil(total/pageSize || 1)} onClick={()=>setPage(p=>p+1)}>Next</button>
          </div>
        </div>

        <div className="admin-right">
          <div className="card">
            <h3>Registrations (last 30 days)</h3>
            <Bar data={chartData} />
          </div>

          <div className="card">
            <h3>Quick actions</h3>
            <button onClick={()=>{ setPage(1); setQ(''); load(); }}>Refresh</button>
            <button onClick={exportCSV}>Export CSV</button>
          </div>
        </div>
      </div>

      <DetailsModal item={selected} onClose={()=>setSelected(null)} />
    </div>
  );
}
