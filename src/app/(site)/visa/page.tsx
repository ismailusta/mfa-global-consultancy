import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { getSiteData, parseJsonArray } from "@/lib/content";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getSiteData();
  return buildPageMetadata({
    settings,
    title: "Visa & Document Services",
    description: settings.visaIntro,
    path: "/visa",
  });
}

export default async function VisaPage() {
  const { settings, visaSteps } = await getSiteData();
  const assist = parseJsonArray(settings.visaAssistPoints);
  const docs = parseJsonArray(settings.visaDocPoints);

  return (
    <div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Visa & Document Services", path: "/visa" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Visa & Document Services",
          provider: { "@type": "Organization", name: settings.companyName },
          description: settings.visaIntro,
          areaServed: "Worldwide",
        }}
      />
      <section style={{ borderBottom: "1px solid var(--line)", background: "var(--sand)" }}>
        <div className="container fade-up" style={{ paddingTop: 64, paddingBottom: 64 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>{settings.visaEyebrow}</div>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(30px, 4vw, 42px)", fontWeight: 600, margin: "0 0 18px", color: "var(--navy)", lineHeight: 1.2 }}>
            {settings.visaTitle}
          </h1>
          <p style={{ fontSize: 16.5, lineHeight: 1.8, color: "var(--muted)", margin: 0, maxWidth: 760 }}>{settings.visaIntro}</p>
        </div>
      </section>

      <section className="container" style={{ paddingTop: 44, paddingBottom: 0 }}>
        <div style={{ border: "1px solid var(--gold)", background: "#fbf8f2", padding: "26px 30px" }}>
          <div style={{ fontSize: 11.5, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 10 }}>Important notice</div>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--muted)", margin: 0 }}>{settings.visaNotice}</p>
        </div>
      </section>

      <section className="container" style={{ paddingTop: 60, paddingBottom: 30, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--line)", border: "1px solid var(--line)" }}>
        <div style={{ background: "#fff", padding: "38px 34px" }}>
          <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, margin: "0 0 16px", color: "var(--navy)" }}>{settings.visaAssistTitle}</h3>
          <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 10, fontSize: 15, lineHeight: 1.7, color: "var(--muted)" }}>
            {assist.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
        <div style={{ background: "#fff", padding: "38px 34px" }}>
          <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, margin: "0 0 16px", color: "var(--navy)" }}>{settings.visaDocTitle}</h3>
          <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 10, fontSize: 15, lineHeight: 1.7, color: "var(--muted)" }}>
            {docs.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
      </section>

      <section className="container" style={{ paddingTop: 50, paddingBottom: 90 }}>
        <h3 style={{ fontFamily: "var(--serif)", fontSize: 24, margin: "0 0 28px", color: "var(--navy)" }}>Process</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "var(--line)", border: "1px solid var(--line)" }}>
          {visaSteps.map((step) => (
            <div key={step.id} style={{ background: "#fff", padding: "28px 24px" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--gold)", marginBottom: 10 }}>{step.code}</div>
              <div style={{ fontSize: 14.5, lineHeight: 1.7, color: "var(--muted)" }}>{step.text}</div>
            </div>
          ))}
        </div>
      </section>
      <style>{`@media (max-width: 900px) { .container[style*="grid-template-columns"], .container > div[style*="grid-template-columns"] { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
