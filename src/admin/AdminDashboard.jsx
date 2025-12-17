import React, { useEffect, useState } from "react";
import AdminLogin from "./AdminLogin";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

// const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const VITE_API_URL="https://externalvisionacademy-backend.onrender.com"

function authFetch(url) {
  const token = localStorage.getItem("admin_token");
  return fetch(VITE_API_URL + url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export default function AdminDashboard() {
  const [token, setToken] = useState(localStorage.getItem("admin_token"));
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) loadData();
  }, [token]);

  async function loadData() {
    try {
      const res = await authFetch("/admin/submissions");
      if (res.status === 401) {
        logout();
        return;
      }
      const data = await res.json();
      setRecords(data.items || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("admin_token");
    setToken(null);
  }

  function downloadCSV() {
    const headers = ["Name", "Email", "Phone", "Location", "Date"];
    const rows = records.map(r => [
      r.name,
      r.email,
      r.phone,
      r.location,
      new Date(r.receivedAt).toLocaleDateString(),
    ]);

    const csv =
      headers.join(",") +
      "\n" +
      rows.map(r => r.map(v => `"${v || ""}"`).join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "registrations.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  // Graph data (frontend aggregation)
  const dateMap = {};
  records.forEach(r => {
    const d = new Date(r.receivedAt).toLocaleDateString();
    dateMap[d] = (dateMap[d] || 0) + 1;
  });

  const chartData = {
    labels: Object.keys(dateMap),
    datasets: [
      {
        label: "Registrations",
        data: Object.values(dateMap),
      },
    ],
  };

  if (!token) {
    return (
      <AdminLogin
        onLogin={(tk) => {
          localStorage.setItem("admin_token", tk);
          setToken(tk);
        }}
      />
    );
  }

  return (
    <div className="admin-root">
      {/* HEADER */}
      <header className="admin-header">
        <h2>Admin Dashboard</h2>
        <div>
          <button onClick={downloadCSV}>Download CSV</button>
          <button onClick={logout} className="logout">Logout</button>
        </div>
      </header>

      {/* GRAPH */}
      <section className="admin-card">
        <h3>Registrations Overview</h3>
        <Bar data={chartData} />
      </section>

      {/* TABLE */}
      <section className="admin-card">
        <h3>Registrations List</h3>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={i}>
                  <td>{r.name}</td>
                  <td>{r.email}</td>
                  <td>{r.phone}</td>
                  <td>{r.location}</td>
                  <td>{new Date(r.receivedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
