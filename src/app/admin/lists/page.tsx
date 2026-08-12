"use client";

import { useEffect, useState } from "react";
import { AdminShellClient } from "@/components/admin/AdminShellClient";

type Bundle = {
  nav: { id: string; label: string; href: string; sortOrder: number; visible: boolean }[];
  stats: { id: string; value: string; label: string; sortOrder: number }[];
  steps: { id: string; code: string; text: string; sortOrder: number; section: string }[];
};

export default function AdminListsPage() {
  const [data, setData] = useState<Bundle | null>(null);
  const [msg, setMsg] = useState("");

  async function load() {
    const res = await fetch("/api/admin/content");
    if (res.status === 401) {
      window.location.href = "/admin/login";
      return;
    }
    const json = await res.json();
    setData({ nav: json.nav, stats: json.stats, steps: json.steps });
  }

  useEffect(() => {
    load();
  }, []);

  async function saveItem(type: string, item: Record<string, unknown>) {
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, ...item }),
    });
    setMsg(res.ok ? "Kaydedildi." : "Hata.");
    await load();
  }

  async function add(type: string) {
    await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    });
    await load();
  }

  async function remove(type: string, id: string) {
    if (!confirm("Silinsin mi?")) return;
    await fetch(`/api/admin/content?type=${type}&id=${id}`, { method: "DELETE" });
    await load();
  }

  if (!data) {
    return (
      <AdminShellClient active="/admin/lists">
        <p>Yükleniyor…</p>
      </AdminShellClient>
    );
  }

  return (
    <AdminShellClient active="/admin/lists">
      <h1 style={{ fontFamily: "var(--serif)", fontSize: 32, margin: 0, color: "var(--navy)" }}>Menü / İstatistik / Adımlar</h1>
      {msg && <div style={{ color: "var(--gold)", marginTop: 10 }}>{msg}</div>}

      <Section title="Navigasyon" onAdd={() => add("nav")}>
        {data.nav.map((item) => (
          <Row key={item.id}>
            <input value={item.label} onChange={(e) => setData({ ...data, nav: data.nav.map((n) => (n.id === item.id ? { ...n, label: e.target.value } : n)) })} style={inputStyle} />
            <input value={item.href} onChange={(e) => setData({ ...data, nav: data.nav.map((n) => (n.id === item.id ? { ...n, href: e.target.value } : n)) })} style={inputStyle} />
            <input type="number" value={item.sortOrder} onChange={(e) => setData({ ...data, nav: data.nav.map((n) => (n.id === item.id ? { ...n, sortOrder: Number(e.target.value) } : n)) })} style={{ ...inputStyle, width: 80 }} />
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
              <input type="checkbox" checked={item.visible} onChange={(e) => setData({ ...data, nav: data.nav.map((n) => (n.id === item.id ? { ...n, visible: e.target.checked } : n)) })} />
              Görünür
            </label>
            <button type="button" className="btn-navy" onClick={() => saveItem("nav", item)} style={{ padding: "10px 14px" }}>
              Kaydet
            </button>
            <button type="button" onClick={() => remove("nav", item.id)} style={dangerBtn}>
              Sil
            </button>
          </Row>
        ))}
      </Section>

      <Section title="İstatistikler" onAdd={() => add("stat")}>
        {data.stats.map((item) => (
          <Row key={item.id}>
            <input value={item.value} onChange={(e) => setData({ ...data, stats: data.stats.map((n) => (n.id === item.id ? { ...n, value: e.target.value } : n)) })} style={inputStyle} />
            <input value={item.label} onChange={(e) => setData({ ...data, stats: data.stats.map((n) => (n.id === item.id ? { ...n, label: e.target.value } : n)) })} style={inputStyle} />
            <input type="number" value={item.sortOrder} onChange={(e) => setData({ ...data, stats: data.stats.map((n) => (n.id === item.id ? { ...n, sortOrder: Number(e.target.value) } : n)) })} style={{ ...inputStyle, width: 80 }} />
            <button type="button" className="btn-navy" onClick={() => saveItem("stat", item)} style={{ padding: "10px 14px" }}>
              Kaydet
            </button>
            <button type="button" onClick={() => remove("stat", item.id)} style={dangerBtn}>
              Sil
            </button>
          </Row>
        ))}
      </Section>

      <Section title="Süreç adımları" onAdd={() => add("step")}>
        {data.steps.map((item) => (
          <Row key={item.id}>
            <select
              value={item.section}
              onChange={(e) => setData({ ...data, steps: data.steps.map((n) => (n.id === item.id ? { ...n, section: e.target.value } : n)) })}
              style={inputStyle}
            >
              <option value="home">home</option>
              <option value="visa">visa</option>
            </select>
            <input value={item.code} onChange={(e) => setData({ ...data, steps: data.steps.map((n) => (n.id === item.id ? { ...n, code: e.target.value } : n)) })} style={inputStyle} />
            <input value={item.text} onChange={(e) => setData({ ...data, steps: data.steps.map((n) => (n.id === item.id ? { ...n, text: e.target.value } : n)) })} style={{ ...inputStyle, minWidth: 220 }} />
            <input type="number" value={item.sortOrder} onChange={(e) => setData({ ...data, steps: data.steps.map((n) => (n.id === item.id ? { ...n, sortOrder: Number(e.target.value) } : n)) })} style={{ ...inputStyle, width: 80 }} />
            <button type="button" className="btn-navy" onClick={() => saveItem("step", item)} style={{ padding: "10px 14px" }}>
              Kaydet
            </button>
            <button type="button" onClick={() => remove("step", item.id)} style={dangerBtn}>
              Sil
            </button>
          </Row>
        ))}
      </Section>
    </AdminShellClient>
  );
}

function Section({ title, onAdd, children }: { title: string; onAdd: () => void; children: React.ReactNode }) {
  return (
    <section style={{ background: "#fff", border: "1px solid var(--line)", padding: 20, marginTop: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: 20, margin: 0, color: "var(--navy)" }}>{title}</h2>
        <button type="button" className="btn-navy" onClick={onAdd} style={{ padding: "10px 14px" }}>
          Ekle
        </button>
      </div>
      <div style={{ display: "grid", gap: 10 }}>{children}</div>
    </section>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>{children}</div>;
}

const inputStyle: React.CSSProperties = { height: 40, border: "1px solid #d8d3c8", padding: "0 10px", fontSize: 14, background: "var(--panel)", minWidth: 120 };
const dangerBtn: React.CSSProperties = { border: "1px solid #a33", background: "#fff", color: "#a33", padding: "10px 12px", cursor: "pointer" };
