import { useState } from "react";

interface AdminLoginProps {
  onLogin: (token: string) => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) throw new Error("Invalid password");
      const data = await res.json();
      onLogin(data.token);
    } catch {
      setError("Invalid password. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#1C120C",
    }}>
      <form onSubmit={handleSubmit} style={{
        background: "#FFFDF9",
        padding: "48px",
        borderRadius: "24px",
        maxWidth: "400px",
        width: "90%",
      }}>
        <h1 style={{ fontFamily: "serif", fontSize: "2rem", margin: "0 0 8px", color: "#241209" }}>
          Admin Login
        </h1>
        <p style={{ color: "#76675b", margin: "0 0 24px", fontSize: "0.9rem" }}>
          Evangel Collectibles Dashboard
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
          autoFocus
          style={{
            width: "100%",
            padding: "14px 16px",
            border: "2px solid #e0d5c8",
            borderRadius: "12px",
            fontSize: "1rem",
            background: "white",
            outline: "none",
            boxSizing: "border-box",
          }}
        />

        {error && <p style={{ color: "#dc2626", fontSize: "0.85rem", marginTop: "8px" }}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "16px",
            width: "100%",
            padding: "14px",
            background: loading ? "#ccc" : "#FF9500",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}