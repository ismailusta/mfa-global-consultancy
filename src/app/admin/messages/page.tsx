"use client";

import { useEffect, useState } from "react";
import { AdminShellClient } from "@/components/admin/AdminShellClient";

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function AdminMessagesPage() {
  const [items, setItems] = useState<Message[]>([]);
  const [active, setActive] = useState<Message | null>(null);

  async function load() {
    const res = await fetch("/api/admin/content");
    if (res.status === 401) {
      window.location.href = "/admin/login";
      return;
    }
    const json = await res.json();
    setItems(json.messages);
  }

  useEffect(() => {
    load();
  }, []);

  async function open(item: Message) {
    setActive(item);
    if (!item.read) {
      await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "message-read", id: item.id }),
      });
      await load();
    }
  }

  async function remove(id: string) {
    if (!confirm("Silinsin mi?")) return;
    await fetch(`/api/admin/content?type=message&id=${id}`, { method: "DELETE" });
    setActive(null);
    await load();
  }

  return (
    <AdminShellClient active="/admin/messages">
      <h1 style={{ fontFamily: "var(--serif)", fontSize: 32, margin: 0, color: "var(--navy)" }}>Mesajlar</h1>
      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 16, marginTop: 20 }}>
        <div style={{ background: "#fff", border: "1px solid var(--line)", maxHeight: "70vh", overflow: "auto" }}>
          {items.length === 0 && <div style={{ padding: 20, color: "var(--muted)" }}>Henüz mesaj yok.</div>}
          {items.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => open(m)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: 14,
                border: "none",
                borderBottom: "1px solid var(--line)",
                background: active?.id === m.id ? "var(--sand)" : "#fff",
                cursor: "pointer",
              }}
            >
              <div style={{ fontSize: 14, color: "var(--navy)", fontWeight: m.read ? 400 : 700 }}>{m.subject}</div>
              <div style={{ fontSize: 12, color: "var(--soft)", marginTop: 4 }}>
                {m.name} · {new Date(m.createdAt).toLocaleString()}
              </div>
            </button>
          ))}
        </div>
        {active ? (
          <div style={{ background: "#fff", border: "1px solid var(--line)", padding: 24 }}>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 24, margin: "0 0 12px", color: "var(--navy)" }}>{active.subject}</h2>
            <div style={{ fontSize: 14, color: "var(--muted)", marginBottom: 18 }}>
              {active.name} &lt;{active.email}&gt;
              <br />
              {new Date(active.createdAt).toLocaleString()}
            </div>
            <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.8, color: "var(--ink)", margin: "0 0 20px" }}>{active.message}</p>
            <button type="button" onClick={() => remove(active.id)} style={{ border: "1px solid #a33", background: "#fff", color: "#a33", padding: "10px 14px", cursor: "pointer" }}>
              Sil
            </button>
          </div>
        ) : (
          <div style={{ background: "#fff", border: "1px solid var(--line)", padding: 40, color: "var(--muted)" }}>Mesaj seçin.</div>
        )}
      </div>
    </AdminShellClient>
  );
}
