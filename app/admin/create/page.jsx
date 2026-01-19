"use client";
import { useState } from "react";

export default function CreateUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [day, setDay] = useState(1);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  async function submit() {
    setMessage("");

    if (!username || !password) {
      setIsError(true);
      setMessage("Username dan password wajib diisi");
      return;
    }

    const res = await fetch("/api/create-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        expired_day: Number(day)
      })
    });

    const data = await res.json();

    if (data.success) {
      setIsError(false);

      const dayText =
        Number(day) === 0
          ? "Anti Expired"
          : `Expired: ${day} hari`;

      setMessage(`User ${username} berhasil dibuat (${dayText})`);

      // optional: reset form
      setUsername("");
      setPassword("");
      setDay(1);
    } else {
      setIsError(true);
      setMessage(data.message || "Gagal membuat user");
    }
  }

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h2>➕ Create User</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <br /><br />

      <input
        type="number"
        placeholder="Expired day (0 = anti expired)"
        value={day}
        onChange={e => setDay(e.target.value)}
      />
      <br />
      <small>0 = anti expired</small>
      <br /><br />

      <button onClick={submit}>Create</button>

      {message && (
        <div
          style={{
            marginTop: 15,
            color: isError ? "red" : "green",
            fontWeight: "bold"
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}
