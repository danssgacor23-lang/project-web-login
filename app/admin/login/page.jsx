"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (data.success) {
      window.location.href = "/admin/dashboard";
    } else {
      alert(data.message);
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Admin Login</h2>
      <input placeholder="Username" onChange={e=>setUsername(e.target.value)} /><br/>
      <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} /><br/>
      <button onClick={login}>Login</button>
    </div>
  );
}