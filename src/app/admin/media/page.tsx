"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { AdminShellClient } from "@/components/admin/AdminShellClient";

type Media = { id: string; key: string; url: string; label: string | null; alt: string | null };

export default function AdminMediaPage() {
  const [items, setItems] = useState<Media[]>([]);
  const [msg, setMsg] = useState("");
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/admin/content");
    if (res.status === 401) {
      window.location.href = "/admin/login";
      return;
    }
    const json = await res.json();
    setItems(json.media);
  }

  useEffect(() => {
    load();
  }, []);

  async function save(item: Media) {
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "media", ...item }),
    });
    setMsg(res.ok ? "Kaydedildi." : "Hata.");
    await load();
  }

  async function upload(key: string, file: File, label: string | null) {
    setUploadingKey(key);
    setMsg("");
    const form = new FormData();
    form.set("file", file);
    form.set("key", key);
    if (label) form.set("label", label);
    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    const data = await res.json().catch(() => ({}));
    setUploadingKey(null);
    if (!res.ok) {
      setMsg(data.error || "Upload başarısız.");
      return;
    }
    setMsg(`Yüklendi: ${key}`);
    await load();
  }

  return (
    <AdminShellClient active="/admin/media">
      <h1 style={{ fontFamily: "var(--serif)", fontSize: 32, margin: 0, color: "var(--navy)" }}>Medya</h1>
      <p style={{ color: "var(--muted)", marginTop: 8 }}>
        Görselleri Supabase Storage&apos;a yükleyin veya URL yapıştırıp kaydedin.
      </p>
      {msg && <div style={{ color: "var(--gold)", marginTop: 10 }}>{msg}</div>}
      <div style={{ display: "grid", gap: 14, marginTop: 20 }}>
        {items.map((item) => (
          <div key={item.id} style={{ background: "#fff", border: "1px solid var(--line)", padding: 18, display: "grid", gap: 10 }}>
            <div style={{ fontFamily: "var(--mono)", color: "var(--gold)", fontSize: 12 }}>{item.key}</div>
            {item.url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.url} alt={item.label || item.key} style={{ maxWidth: 280, maxHeight: 160, objectFit: "cover", border: "1px solid var(--line)" }} />
            ) : null}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) upload(item.key, file, item.label);
                e.target.value = "";
              }}
            />
            <input
              placeholder="Image URL"
              value={item.url}
              onChange={(e) => setItems(items.map((m) => (m.id === item.id ? { ...m, url: e.target.value } : m)))}
              style={inputStyle}
            />
            <input
              placeholder="Label / placeholder text"
              value={item.label || ""}
              onChange={(e) => setItems(items.map((m) => (m.id === item.id ? { ...m, label: e.target.value } : m)))}
              style={inputStyle}
            />
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <button type="button" className="btn-navy" onClick={() => save(item)} style={{ justifySelf: "start" }}>
                Kaydet
              </button>
              {uploadingKey === item.key && <span style={{ fontSize: 13, color: "var(--muted)" }}>Yükleniyor…</span>}
            </div>
          </div>
        ))}
      </div>
    </AdminShellClient>
  );
}

const inputStyle: CSSProperties = {
  width: "100%",
  height: 42,
  border: "1px solid #d8d3c8",
  padding: "0 12px",
  fontSize: 14,
  background: "var(--panel)",
};
