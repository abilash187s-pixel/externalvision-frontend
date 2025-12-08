import React, { useState } from "react";

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const API_BASE =
    import.meta.env.VITE_API_URL || "https://api.externalvisionacademy.com";

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Invalid credentials");

      const data = await res.json();
      onLogin(data);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-box">EV</div>

        <h2 className="login-title">Admin Login</h2>
        <p className="login-subtitle">Access your academy dashboard</p>

        <form onSubmit={submit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="password-wrap">
              <input
                type={showPw ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="pw-toggle" onClick={() => setShowPw(!showPw)}>
                {showPw ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          {err && <div className="error-box">{err}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
