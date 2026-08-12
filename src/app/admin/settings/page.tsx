"use client";

import { useEffect, useState } from "react";
import { AdminShellClient } from "@/components/admin/AdminShellClient";

type Settings = Record<string, string | boolean | number | null>;

const groups: { title: string; fields: { key: string; label: string; type?: "text" | "textarea" | "bool" | "json" }[] }[] = [
  {
    title: "SEO ve alan adı",
    fields: [
      { key: "siteUrl", label: "Site adresi (https://mfaglobalconsultancy.com)" },
      { key: "seoTitle", label: "SEO başlığı (ana sayfa)", type: "textarea" },
      { key: "seoDescription", label: "SEO açıklaması", type: "textarea" },
      { key: "seoKeywords", label: "Anahtar kelimeler (virgülle)" },
      { key: "ogImageUrl", label: "Open Graph görsel URL (1200x630)" },
      { key: "twitterHandle", label: "Twitter/X kullanıcı adı (@mfa...)" },
      { key: "googleVerification", label: "Google Search Console doğrulama kodu" },
      { key: "bingVerification", label: "Bing Webmaster doğrulama kodu" },
      { key: "defaultLocale", label: "Varsayılan dil (en veya tr)" },
      { key: "enableTr", label: "Türkçe dil desteğini aç", type: "bool" },
    ],
  },
  {
    title: "Marka ve üst bar",
    fields: [
      { key: "companyName", label: "Şirket adı" },
      { key: "companyShortName", label: "Kısa ad (logo)" },
      { key: "tagline", label: "Slogan" },
      { key: "showTopBar", label: "Üst barı göster", type: "bool" },
      { key: "topBarLeft", label: "Üst bar sol metin" },
      { key: "topBarRight", label: "Üst bar sağ metin" },
    ],
  },
  {
    title: "İletişim ve şirket bilgileri",
    fields: [
      { key: "email", label: "E-posta" },
      { key: "phone", label: "Telefon" },
      { key: "legalName", label: "Yasal ünvan" },
      { key: "entityType", label: "Şirket tipi" },
      { key: "jurisdiction", label: "Yargı yetkisi" },
      { key: "registeredAddress", label: "Kayıtlı adres", type: "textarea" },
      { key: "businessAddress", label: "İş adresi", type: "textarea" },
      { key: "ein", label: "EIN" },
      { key: "businessHours", label: "Çalışma saatleri" },
      { key: "footerNote", label: "Footer notu", type: "textarea" },
      { key: "copyrightText", label: "Telif metni" },
      { key: "disclaimerLine", label: "Uyarı satırı" },
    ],
  },
  {
    title: "Ana sayfa hero",
    fields: [
      { key: "showStats", label: "İstatistik şeridini göster", type: "bool" },
      { key: "heroEyebrow", label: "Hero üst yazı" },
      { key: "heroTitle", label: "Hero başlık", type: "textarea" },
      { key: "heroText", label: "Hero metin", type: "textarea" },
      { key: "heroCtaPrimary", label: "Birincil buton" },
      { key: "heroCtaSecondary", label: "İkincil buton" },
      { key: "heroImageLabel", label: "Hero görsel etiketi" },
      { key: "homeServicesEyebrow", label: "Hizmetler üst yazı" },
      { key: "homeServicesTitle", label: "Hizmetler başlık" },
      { key: "homeServicesIntro", label: "Hizmetler giriş metni", type: "textarea" },
      { key: "howWeWorkTitle", label: "Nasıl çalışıyoruz başlık" },
      { key: "howWeWorkP1", label: "Nasıl çalışıyoruz paragraf 1", type: "textarea" },
      { key: "howWeWorkP2", label: "Nasıl çalışıyoruz paragraf 2", type: "textarea" },
      { key: "ctaTitle", label: "CTA başlık" },
      { key: "ctaText", label: "CTA metin" },
      { key: "ctaButton", label: "CTA buton" },
    ],
  },
  {
    title: "Sayfa metinleri (EN ana içerik)",
    fields: [
      { key: "aboutEyebrow", label: "Hakkımızda üst yazı" },
      { key: "aboutTitle", label: "Hakkımızda başlık", type: "textarea" },
      { key: "aboutParagraphs", label: "Hakkımızda paragraflar (JSON dizi)", type: "json" },
      { key: "aboutAsideNote", label: "Hakkımızda yan not", type: "textarea" },
      { key: "aboutImageLabel", label: "Hakkımızda görsel etiketi" },
      { key: "servicesEyebrow", label: "Hizmetler üst yazı" },
      { key: "servicesTitle", label: "Hizmetler başlık" },
      { key: "servicesIntro", label: "Hizmetler giriş", type: "textarea" },
      { key: "commerceEyebrow", label: "E-ticaret üst yazı" },
      { key: "commerceTitle", label: "E-ticaret başlık" },
      { key: "commerceIntro", label: "E-ticaret giriş", type: "textarea" },
      { key: "commerceCategories", label: "Kategoriler (JSON)", type: "json" },
      { key: "commerceChannels", label: "Kanallar (JSON)", type: "json" },
      { key: "commerceProcessTitle", label: "Süreç başlık" },
      { key: "commerceProcessBody", label: "Süreç metin", type: "textarea" },
      { key: "commercePaymentsTitle", label: "Ödeme başlık" },
      { key: "commercePaymentsBody", label: "Ödeme metin", type: "textarea" },
      { key: "visaEyebrow", label: "Vize üst yazı" },
      { key: "visaTitle", label: "Vize başlık" },
      { key: "visaIntro", label: "Vize giriş", type: "textarea" },
      { key: "visaNotice", label: "Vize uyarı", type: "textarea" },
      { key: "visaAssistTitle", label: "Vize destek başlık" },
      { key: "visaAssistPoints", label: "Vize destek maddeleri (JSON)", type: "json" },
      { key: "visaDocTitle", label: "Belge hazırlama başlık" },
      { key: "visaDocPoints", label: "Belge hazırlama maddeleri (JSON)", type: "json" },
      { key: "contactEyebrow", label: "İletişim üst yazı" },
      { key: "contactTitle", label: "İletişim başlık" },
      { key: "contactFormNote", label: "Form notu", type: "textarea" },
      { key: "legalUpdatedAt", label: "Yasal sayfa güncelleme tarihi" },
    ],
  },
];

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => {
        if (r.status === 401) {
          window.location.href = "/admin/login";
          return null;
        }
        return r.json();
      })
      .then((d) => d && setSettings(d));
  }, []);

  async function save() {
    if (!settings) return;
    setSaving(true);
    setMsg("");
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setMsg(res.ok ? "Kaydedildi." : "Kayıt başarısız.");
  }

  if (!settings) {
    return (
      <AdminShellClient active="/admin/settings">
        <p>Yükleniyor…</p>
      </AdminShellClient>
    );
  }

  return (
    <AdminShellClient active="/admin/settings">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: 32, margin: 0, color: "var(--navy)" }}>Site ayarları</h1>
          <p style={{ margin: "8px 0 0", color: "var(--muted)" }}>Tüm metinler dinamik — kaydettiğiniz anda sitede görünür.</p>
        </div>
        <button type="button" className="btn-navy" onClick={save} disabled={saving}>
          {saving ? "Kaydediliyor…" : "Kaydet"}
        </button>
      </div>
      {msg && <div style={{ marginBottom: 16, color: "var(--gold)" }}>{msg}</div>}
      {groups.map((g) => (
        <section key={g.title} style={{ background: "#fff", border: "1px solid var(--line)", padding: 24, marginBottom: 18 }}>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: 20, margin: "0 0 18px", color: "var(--navy)" }}>{g.title}</h2>
          <div style={{ display: "grid", gap: 14 }}>
            {g.fields.map((f) => (
              <label key={f.key} style={{ display: "block" }}>
                <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--soft)", marginBottom: 6 }}>{f.label}</div>
                {f.type === "bool" ? (
                  <input
                    type="checkbox"
                    checked={Boolean(settings[f.key])}
                    onChange={(e) => setSettings({ ...settings, [f.key]: e.target.checked })}
                  />
                ) : f.type === "textarea" || f.type === "json" ? (
                  <textarea
                    rows={f.type === "json" ? 5 : 3}
                    value={String(settings[f.key] ?? "")}
                    onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })}
                    style={areaStyle}
                  />
                ) : (
                  <input
                    value={String(settings[f.key] ?? "")}
                    onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })}
                    style={inputStyle}
                  />
                )}
              </label>
            ))}
          </div>
        </section>
      ))}
      <button type="button" className="btn-navy" onClick={save} disabled={saving}>
        {saving ? "Kaydediliyor…" : "Kaydet"}
      </button>
    </AdminShellClient>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 42,
  border: "1px solid #d8d3c8",
  padding: "0 12px",
  fontSize: 14,
  background: "var(--panel)",
};

const areaStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid #d8d3c8",
  padding: 12,
  fontSize: 14,
  background: "var(--panel)",
  fontFamily: "inherit",
  resize: "vertical",
};
