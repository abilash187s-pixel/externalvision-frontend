import React, { useState } from 'react';

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  async function submit(e) {
    e.preventDefault();
    setErr('');
    try {
      const res = await fetch('/admin/login', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('admin_token', data.token);
        onLogin && onLogin(data.token);
      } else {
        setErr(data.error || 'Login failed');
      }
    } catch (e) {
      setErr('Network error');
    }
  }

  return (
    <div className="admin-login">
      <form onSubmit={submit} className="admin-login-form">
        <h2>Admin Sign in</h2>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/>
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
        <button type="submit">Sign in</button>
        {err && <div className="alert error">{err}</div>}
      </form>
    </div>
  );
}
