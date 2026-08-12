"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { AdminShellClient } from "@/components/admin/AdminShellClient";
import { SETTING_KEY_LABELS_TR, SETTING_TRANSLATION_KEYS } from "@/lib/i18n";

type Row = { key: string; label: string; en: string; tr: string };

export default function AdminTranslationsPage() {
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<"general" | "nav" | "services" | "steps" | "legal">("general");
  const [map, setMap] = useState<Record<string, string>>({});
  const [settings, setSettings] = useState<Record<string, string> | null>(null);
  const [nav, setNav] = useState<{ id: string; label: string }[]>([]);
  const [services, setServices] = useState<{ id: string; number: string; title: string; summary: string; body: string; points: string }[]>([]);
  const [steps, setSteps] = useState<{ id: string; section: string; code: string; text: string }[]>([]);
  const [legal, setLegal] = useState<{ slug: string; title: string; content: string }[]>([]);

  async function load() {
    const res = await fetch("/api/admin/translations?locale=tr");
    if (res.status === 401) {
      window.location.href = "/admin/login";
      return;
    }
    const data = await res.json();
    const nextMap: Record<string, string> = {};
    for (const t of data.translations || []) nextMap[t.key] = t.value;
    setMap(nextMap);
    setSettings(data.settings || {});
    setNav(data.nav || []);
    setServices(data.services || []);

    const contentRes = await fetch("/api/admin/content");
    if (contentRes.ok) {
      const content = await contentRes.json();
      setSteps(content.steps || []);
      setLegal(content.legal || []);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const generalRows: Row[] = useMemo(() => {
    if (!settings) return [];
    return SETTING_TRANSLATION_KEYS.map((key) => ({
      key: `settings.${key}`,
      label: SETTING_KEY_LABELS_TR[key] || key,
      en: String(settings[key] ?? ""),
      tr: map[`settings.${key}`] || "",
    }));
  }, [settings, map]);

  const navRows: Row[] = nav.map((n) => ({
    key: `nav.${n.id}.label`,
    label: `Menü: ${n.label}`,
    en: n.label,
    tr: map[`nav.${n.id}.label`] || "",
  }));

  const serviceRows: Row[] = services.flatMap((s) => [
    { key: `service.${s.id}.title`, label: `${s.number} Başlık`, en: s.title, tr: map[`service.${s.id}.title`] || "" },
    { key: `service.${s.id}.summary`, label: `${s.number} Özet`, en: s.summary, tr: map[`service.${s.id}.summary`] || "" },
    { key: `service.${s.id}.body`, label: `${s.number} Detay`, en: s.body, tr: map[`service.${s.id}.body`] || "" },
    { key: `service.${s.id}.points`, label: `${s.number} Maddeler (JSON)`, en: s.points, tr: map[`service.${s.id}.points`] || "" },
  ]);

  const stepRows: Row[] = steps.map((s) => ({
    key: `step.${s.id}.text`,
    label: `${s.section} / ${s.code}`,
    en: s.text,
    tr: map[`step.${s.id}.text`] || "",
  }));

  const legalRows: Row[] = legal.flatMap((l) => [
    { key: `legal.${l.slug}.title`, label: `${l.slug} başlık`, en: l.title, tr: map[`legal.${l.slug}.title`] || "" },
    { key: `legal.${l.slug}.content`, label: `${l.slug} içerik JSON`, en: l.content, tr: map[`legal.${l.slug}.content`] || "" },
  ]);

  const rows =
    tab === "general" ? generalRows : tab === "nav" ? navRows : tab === "services" ? serviceRows : tab === "steps" ? stepRows : legalRows;

  async function save() {
    setSaving(true);
    setMsg("");
    const items = rows.map((r) => ({ key: r.key, value: map[r.key] || "" }));
    const res = await fetch("/api/admin/translations", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale: "tr", items }),
    });
    setSaving(false);
    setMsg(res.ok ? "Türkçe çeviriler kaydedildi." : "Kayıt başarısız.");
  }

  if (!settings) {
    return (
      <AdminShellClient active="/admin/translations">
        <p>Yükleniyor…</p>
      </AdminShellClient>
    );
  }

  return (
    <AdminShellClient active="/admin/translations">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
        <div>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: 32, margin: 0, color: "var(--navy)" }}>Türkçe çeviriler</h1>
          <p style={{ margin: "8px 0 0", color: "var(--muted)" }}>
            İngilizce içerik solda referans; sağa Türkçe metni yazın. Boş bırakırsanız İngilizce gösterilir.
          </p>
        </div>
        <button type="button" className="btn-navy" onClick={save} disabled={saving}>
          {saving ? "Kaydediliyor…" : "Bu sekmeyi kaydet"}
        </button>
      </div>
      {msg && <div style={{ color: "var(--gold)", marginBottom: 12 }}>{msg}</div>}

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        {(
          [
            ["general", "Genel metinler"],
            ["nav", "Menü"],
            ["services", "Hizmetler"],
            ["steps", "Süreç adımları"],
            ["legal", "Yasal sayfalar"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            style={{
              border: "1px solid var(--line)",
              background: tab === id ? "var(--navy)" : "#fff",
              color: tab === id ? "#fff" : "var(--navy)",
              padding: "10px 14px",
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gap: 14 }}>
        {rows.map((row) => (
          <div key={row.key} style={{ background: "#fff", border: "1px solid var(--line)", padding: 16 }}>
            <div style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--soft)", marginBottom: 8 }}>
              {row.label}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: "var(--gold)", marginBottom: 6 }}>EN</div>
                <textarea readOnly value={row.en} rows={row.en.length > 180 ? 6 : 3} style={areaStyle} />
              </div>
              <div>
                <div style={{ fontSize: 11, color: "var(--gold)", marginBottom: 6 }}>TR</div>
                <textarea
                  value={map[row.key] || ""}
                  rows={row.en.length > 180 ? 6 : 3}
                  onChange={(e) => setMap({ ...map, [row.key]: e.target.value })}
                  style={areaStyle}
                  placeholder="Türkçe çeviri…"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button type="button" className="btn-navy" onClick={save} disabled={saving} style={{ marginTop: 18 }}>
        {saving ? "Kaydediliyor…" : "Bu sekmeyi kaydet"}
      </button>
      <style>{`@media (max-width: 900px) { div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </AdminShellClient>
  );
}

const areaStyle: CSSProperties = {
  width: "100%",
  border: "1px solid #d8d3c8",
  padding: 10,
  fontSize: 13,
  background: "var(--panel)",
  fontFamily: "inherit",
  resize: "vertical",
};
