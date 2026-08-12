"use client";

import { FormEvent, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Giriş başarısız. Email veya şifre hatalı.");
      return;
    }
    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--sand)", display: "grid", placeItems: "center", padding: 24 }}>
      <form onSubmit={onSubmit} style={{ width: "100%", maxWidth: 420, background: "#fff", border: "1px solid var(--line)", padding: 36 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>Admin</div>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: 28, margin: "0 0 8px", color: "var(--navy)" }}>Panel girişi</h1>
        <p style={{ margin: "0 0 28px", color: "var(--muted)", fontSize: 14, lineHeight: 1.6 }}>
          Site içeriğini buradan yönetirsiniz.
        </p>
        <label style={{ display: "block", marginBottom: 16 }}>
          <div style={labelStyle}>Email</div>
          <input name="email" type="email" required defaultValue="admin@mfaglobalconsultancy.com" style={inputStyle} />
        </label>
        <label style={{ display: "block", marginBottom: 22 }}>
          <div style={labelStyle}>Şifre</div>
          <input name="password" type="password" required style={inputStyle} />
        </label>
        {error && <div style={{ color: "#a33", fontSize: 13, marginBottom: 14 }}>{error}</div>}
        <button type="submit" className="btn-navy" disabled={loading} style={{ width: "100%" }}>
          {loading ? "Giriş yapılıyor…" : "Giriş yap"}
        </button>
      </form>
    </div>
  );
}

const labelStyle: CSSProperties = {
  fontSize: 11,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--soft)",
  marginBottom: 8,
};

const inputStyle: CSSProperties = {
  width: "100%",
  height: 44,
  border: "1px solid #d8d3c8",
  padding: "0 12px",
  fontSize: 15,
  background: "var(--panel)",
};
