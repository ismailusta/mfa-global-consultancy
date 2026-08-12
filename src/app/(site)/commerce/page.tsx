import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { MediaBlock } from "@/components/MediaBlock";
import { getSiteData, parseJsonArray } from "@/lib/content";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getSiteData();
  return buildPageMetadata({
    settings,
    title: "E-Commerce",
    description: settings.commerceIntro,
    path: "/commerce",
  });
}

export default async function CommercePage() {
  const { settings, media } = await getSiteData();
  const categories = parseJsonArray(settings.commerceCategories);
  const channels = parseJsonArray(settings.commerceChannels);
  const processParas = settings.commerceProcessBody.split("\n\n");
  const payParas = settings.commercePaymentsBody.split("\n\n");

  return (
    <div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "E-Commerce", path: "/commerce" },
        ])}
      />
      <section style={{ borderBottom: "1px solid var(--line)", background: "var(--sand)" }}>
        <div className="container fade-up" style={{ paddingTop: 64, paddingBottom: 64 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>{settings.commerceEyebrow}</div>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(30px, 4vw, 42px)", fontWeight: 600, margin: "0 0 18px", color: "var(--navy)", lineHeight: 1.2 }}>
            {settings.commerceTitle}
          </h1>
          <p style={{ fontSize: 16.5, lineHeight: 1.8, color: "var(--muted)", margin: 0, maxWidth: 720 }}>{settings.commerceIntro}</p>
        </div>
      </section>

      <section className="container" style={{ paddingTop: 70, paddingBottom: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--line)", border: "1px solid var(--line)" }}>
        <div style={{ background: "#fff", padding: "38px 34px" }}>
          <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, margin: "0 0 14px", color: "var(--navy)" }}>Product categories</h3>
          <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 9, fontSize: 15, lineHeight: 1.7, color: "var(--muted)" }}>
            {categories.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </div>
        <div style={{ background: "#fff", padding: "38px 34px" }}>
          <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, margin: "0 0 14px", color: "var(--navy)" }}>Sales channels</h3>
          <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 9, fontSize: 15, lineHeight: 1.7, color: "var(--muted)" }}>
            {channels.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </div>
      </section>

      <section className="container" style={{ paddingTop: 36, paddingBottom: 0 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {(["product1", "product2", "product3"] as const).map((key) => (
            <MediaBlock key={key} url={media[key]?.url} label={media[key]?.label} height={180} />
          ))}
        </div>
      </section>

      <section className="container" style={{ paddingTop: 60, paddingBottom: 90, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56 }}>
        <div>
          <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, margin: "0 0 14px", color: "var(--navy)" }}>{settings.commerceProcessTitle}</h3>
          {processParas.map((p) => (
            <p key={p.slice(0, 20)} style={{ fontSize: 15.5, lineHeight: 1.8, color: "var(--muted)", margin: "0 0 16px" }}>{p}</p>
          ))}
        </div>
        <div>
          <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, margin: "0 0 14px", color: "var(--navy)" }}>{settings.commercePaymentsTitle}</h3>
          {payParas.map((p) => (
            <p key={p.slice(0, 20)} style={{ fontSize: 15.5, lineHeight: 1.8, color: "var(--muted)", margin: "0 0 16px" }}>{p}</p>
          ))}
        </div>
      </section>
      <style>{`@media (max-width: 900px) { .container[style*="grid-template-columns"], .container > div[style*="grid-template-columns"] { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
