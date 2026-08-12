"use client";

import { useEffect, useState } from "react";
import { AdminShellClient } from "@/components/admin/AdminShellClient";

type Service = {
  id: string;
  number: string;
  title: string;
  summary: string;
  body: string;
  points: string;
  sortOrder: number;
  published: boolean;
};

export default function AdminServicesPage() {
  const [items, setItems] = useState<Service[]>([]);
  const [active, setActive] = useState<Service | null>(null);
  const [msg, setMsg] = useState("");

  async function load() {
    const res = await fetch("/api/admin/services");
    if (res.status === 401) {
      window.location.href = "/admin/login";
      return;
    }
    setItems(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function save() {
    if (!active) return;
    const method = items.find((i) => i.id === active.id) ? "PUT" : "POST";
    const res = await fetch("/api/admin/services", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(active),
    });
    setMsg(res.ok ? "Kaydedildi." : "Hata.");
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Silinsin mi?")) return;
    await fetch(`/api/admin/services?id=${id}`, { method: "DELETE" });
    setActive(null);
    await load();
  }

  function createNew() {
    setActive({
      id: "",
      number: String(items.length + 1).padStart(2, "0"),
      title: "Yeni hizmet",
      summary: "",
      body: "",
      points: "[]",
      sortOrder: items.length + 1,
      published: true,
    });
  }

  return (
    <AdminShellClient active="/admin/services">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 20 }}>
        <div>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: 32, margin: 0, color: "var(--navy)" }}>Hizmetler</h1>
          <p style={{ margin: "8px 0 0", color: "var(--muted)" }}>Ana sayfa ve Services sayfasındaki kartlar.</p>
        </div>
        <button type="button" className="btn-navy" onClick={createNew}>
          Yeni hizmet
        </button>
      </div>
      {msg && <div style={{ color: "var(--gold)", marginBottom: 12 }}>{msg}</div>}
      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 16 }}>
        <div style={{ background: "#fff", border: "1px solid var(--line)" }}>
          {items.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(s)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "14px 16px",
                border: "none",
                borderBottom: "1px solid var(--line)",
                background: active?.id === s.id ? "var(--sand)" : "#fff",
                cursor: "pointer",
              }}
            >
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--gold)" }}>{s.number}</div>
              <div style={{ fontSize: 14, color: "var(--navy)", marginTop: 4 }}>{s.title}</div>
            </button>
          ))}
        </div>
        {active ? (
          <div style={{ background: "#fff", border: "1px solid var(--line)", padding: 22, display: "grid", gap: 12 }}>
            {[
              ["number", "Numara"],
              ["title", "Başlık"],
              ["sortOrder", "Sıra"],
            ].map(([key, label]) => (
              <label key={key}>
                <div style={labelStyle}>{label}</div>
                <input
                  value={String((active as Record<string, unknown>)[key] ?? "")}
                  onChange={(e) =>
                    setActive({
                      ...active,
                      [key]: key === "sortOrder" ? Number(e.target.value) : e.target.value,
                    })
                  }
                  style={inputStyle}
                />
              </label>
            ))}
            <label>
              <div style={labelStyle}>Özet</div>
              <textarea rows={3} value={active.summary} onChange={(e) => setActive({ ...active, summary: e.target.value })} style={areaStyle} />
            </label>
            <label>
              <div style={labelStyle}>Detay</div>
              <textarea rows={5} value={active.body} onChange={(e) => setActive({ ...active, body: e.target.value })} style={areaStyle} />
            </label>
            <label>
              <div style={labelStyle}>Maddeler (JSON dizi)</div>
              <textarea rows={6} value={active.points} onChange={(e) => setActive({ ...active, points: e.target.value })} style={areaStyle} />
            </label>
            <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input type="checkbox" checked={active.published} onChange={(e) => setActive({ ...active, published: e.target.checked })} />
              Yayınla
            </label>
            <div style={{ display: "flex", gap: 10 }}>
              <button type="button" className="btn-navy" onClick={save}>
                Kaydet
              </button>
              {active.id && (
                <button type="button" onClick={() => remove(active.id)} style={{ border: "1px solid #a33", background: "#fff", color: "#a33", padding: "12px 18px", cursor: "pointer" }}>
                  Sil
                </button>
              )}
            </div>
          </div>
        ) : (
          <div style={{ background: "#fff", border: "1px solid var(--line)", padding: 40, color: "var(--muted)" }}>Düzenlemek için bir hizmet seçin.</div>
        )}
      </div>
      <style>{`@media (max-width: 900px) { div[style*="grid-template-columns: 280px"] { grid-template-columns: 1fr !important; } }`}</style>
    </AdminShellClient>
  );
}

const labelStyle: React.CSSProperties = { fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--soft)", marginBottom: 6 };
const inputStyle: React.CSSProperties = { width: "100%", height: 42, border: "1px solid #d8d3c8", padding: "0 12px", fontSize: 14, background: "var(--panel)" };
const areaStyle: React.CSSProperties = { width: "100%", border: "1px solid #d8d3c8", padding: 12, fontSize: 14, background: "var(--panel)", fontFamily: "inherit", resize: "vertical" };
