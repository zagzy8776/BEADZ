import { useState, useEffect } from "react";
import App from "./App.tsx";
import { AdminLogin } from "./AdminLogin.tsx";
import { AdminDashboard } from "./AdminDashboard.tsx";

export function AppRouter() {
  const [route, setRoute] = useState<"site" | "admin" | "dashboard">("site");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check URL path
    const path = window.location.pathname;
    if (path === "/admin") {
      const stored = sessionStorage.getItem("admin_token");
      if (stored) {
        setToken(stored);
        setRoute("dashboard");
      } else {
        setRoute("admin");
      }
    }
  }, []);

  function handleLogin(t: string) {
    sessionStorage.setItem("admin_token", t);
    setToken(t);
    setRoute("dashboard");
    window.history.pushState({}, "", "/admin");
  }

  function handleLogout() {
    sessionStorage.removeItem("admin_token");
    setToken(null);
    setRoute("site");
    window.history.pushState({}, "", "/");
  }

  if (route === "admin") return <AdminLogin onLogin={handleLogin} />;
  if (route === "dashboard" && token) return <AdminDashboard token={token} onLogout={handleLogout} />;
  return <App />;
}