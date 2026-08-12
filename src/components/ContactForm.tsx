"use client";

import { FormEvent, useState, type CSSProperties } from "react";

const copy = {
  en: {
    title: "Send an enquiry",
    name: "Full name",
    email: "Email",
    subject: "Subject",
    message: "Message",
    send: "Send enquiry",
    sending: "Sending…",
    ok: "Thank you. Your enquiry has been received.",
    error: "Something went wrong.",
  },
  tr: {
    title: "Talep gönderin",
    name: "Ad soyad",
    email: "E-posta",
    subject: "Konu",
    message: "Mesaj",
    send: "Gönder",
    sending: "Gönderiliyor…",
    ok: "Teşekkürler. Talebiniz alındı.",
    error: "Bir hata oluştu.",
  },
} as const;

export function ContactForm({ note, locale = "en" }: { note: string; locale?: string }) {
  const t = locale === "tr" ? copy.tr : copy.en;
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        subject: form.get("subject"),
        message: form.get("message"),
      }),
    });
    if (!res.ok) {
      setError(t.error);
      setStatus("error");
      return;
    }
    setStatus("ok");
    e.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="contact-form">
      <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, margin: "0 0 24px", color: "var(--navy)" }}>{t.title}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div className="contact-grid">
          <label>
            <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--soft)", marginBottom: 8 }}>{t.name}</div>
            <input name="name" required style={inputStyle} />
          </label>
          <label>
            <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--soft)", marginBottom: 8 }}>{t.email}</div>
            <input name="email" type="email" required style={inputStyle} />
          </label>
        </div>
        <label>
          <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--soft)", marginBottom: 8 }}>{t.subject}</div>
          <input name="subject" required style={inputStyle} />
        </label>
        <label>
          <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--soft)", marginBottom: 8 }}>{t.message}</div>
          <textarea name="message" required rows={5} style={{ ...inputStyle, height: "auto", paddingTop: 12, resize: "vertical" }} />
        </label>
        <button type="submit" className="btn-navy" disabled={status === "loading"} style={{ alignSelf: "flex-start" }}>
          {status === "loading" ? t.sending : t.send}
        </button>
        {status === "ok" && <div style={{ fontSize: 13, color: "var(--gold)" }}>{t.ok}</div>}
        {status === "error" && <div style={{ fontSize: 13, color: "#a33" }}>{error}</div>}
        <div style={{ fontSize: 13, lineHeight: 1.7, color: "var(--soft)" }}>{note}</div>
      </div>
    </form>
  );
}

const inputStyle: CSSProperties = {
  width: "100%",
  border: "1px solid #d8d3c8",
  height: 44,
  background: "var(--panel)",
  padding: "0 12px",
  fontSize: 15,
  color: "var(--ink)",
  outline: "none",
};
