import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { getSiteData } from "@/lib/content";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getSiteData();
  return buildPageMetadata({
    settings,
    title: "Services",
    description: settings.servicesIntro,
    path: "/services",
  });
}

export default async function ServicesPage() {
  const { settings, services } = await getSiteData();

  return (
    <div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: s.title,
            description: s.summary,
          })),
        }}
      />
      <section style={{ borderBottom: "1px solid var(--line)", background: "var(--sand)" }}>
        <div className="container fade-up" style={{ paddingTop: 64, paddingBottom: 64 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>{settings.servicesEyebrow}</div>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(30px, 4vw, 42px)", fontWeight: 600, margin: "0 0 18px", color: "var(--navy)", lineHeight: 1.2 }}>
            {settings.servicesTitle}
          </h1>
          <p style={{ fontSize: 16.5, lineHeight: 1.8, color: "var(--muted)", margin: 0, maxWidth: 720 }}>{settings.servicesIntro}</p>
        </div>
      </section>
      <section className="container" style={{ paddingTop: 20, paddingBottom: 90 }}>
        {services.map((d) => (
          <div key={d.id} style={{ display: "grid", gridTemplateColumns: "0.35fr 0.65fr", gap: 56, padding: "46px 0", borderBottom: "1px solid var(--line)" }}>
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11.5, color: "var(--gold)", letterSpacing: "0.1em", marginBottom: 12 }}>{d.number}</div>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: 25, fontWeight: 600, margin: 0, color: "var(--navy)", lineHeight: 1.3 }}>{d.title}</h2>
            </div>
            <div>
              <p style={{ fontSize: 16, lineHeight: 1.85, color: "var(--muted)", margin: "0 0 22px" }}>{d.body}</p>
              <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 9 }}>
                {d.points.map((p) => (
                  <li key={p} style={{ fontSize: 15, lineHeight: 1.7, color: "var(--muted)" }}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>
      <style>{`@media (max-width: 800px) { .container > div[style*="grid-template-columns"] { grid-template-columns: 1fr !important; gap: 18px !important; } }`}</style>
    </div>
  );
}
