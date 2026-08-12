"use client";

import { useEffect, useState } from "react";
import { AdminShellClient } from "@/components/admin/AdminShellClient";

type Legal = { id: string; slug: string; title: string; content: string };

export default function AdminLegalPage() {
  const [pages, setPages] = useState<Legal[]>([]);
  const [active, setActive] = useState<Legal | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/content")
      .then(async (r) => {
        if (r.status === 401) {
          window.location.href = "/admin/login";
          return null;
        }
        return r.json();
      })
      .then((d) => d && setPages(d.legal));
  }, []);

  async function save() {
    if (!active) return;
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "legal", ...active }),
    });
    setMsg(res.ok ? "Kaydedildi." : "Hata.");
  }

  return (
    <AdminShellClient active="/admin/legal">
      <h1 style={{ fontFamily: "var(--serif)", fontSize: 32, margin: 0, color: "var(--navy)" }}>Yasal sayfalar</h1>
      <p style={{ color: "var(--muted)", marginTop: 8 }}>content alanı JSON: [{`{ "h": "Başlık", "p": ["paragraf"] }`}]</p>
      {msg && <div style={{ color: "var(--gold)", marginTop: 10 }}>{msg}</div>}
      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 16, marginTop: 20 }}>
        <div style={{ background: "#fff", border: "1px solid var(--line)" }}>
          {pages.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(p)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: 14,
                border: "none",
                borderBottom: "1px solid var(--line)",
                background: active?.id === p.id ? "var(--sand)" : "#fff",
                cursor: "pointer",
              }}
            >
              {p.title}
            </button>
          ))}
        </div>
        {active ? (
          <div style={{ background: "#fff", border: "1px solid var(--line)", padding: 20, display: "grid", gap: 12 }}>
            <label>
              <div style={labelStyle}>Başlık</div>
              <input value={active.title} onChange={(e) => setActive({ ...active, title: e.target.value })} style={inputStyle} />
            </label>
            <label>
              <div style={labelStyle}>İçerik JSON</div>
              <textarea rows={22} value={active.content} onChange={(e) => setActive({ ...active, content: e.target.value })} style={areaStyle} />
            </label>
            <button type="button" className="btn-navy" onClick={save}>
              Kaydet
            </button>
          </div>
        ) : (
          <div style={{ background: "#fff", border: "1px solid var(--line)", padding: 40, color: "var(--muted)" }}>Sayfa seçin.</div>
        )}
      </div>
    </AdminShellClient>
  );
}

const labelStyle: React.CSSProperties = { fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--soft)", marginBottom: 6 };
const inputStyle: React.CSSProperties = { width: "100%", height: 42, border: "1px solid #d8d3c8", padding: "0 12px", fontSize: 14, background: "var(--panel)" };
const areaStyle: React.CSSProperties = { width: "100%", border: "1px solid #d8d3c8", padding: 12, fontSize: 13, background: "var(--panel)", fontFamily: "ui-monospace, Menlo, Consolas, monospace", resize: "vertical" };
