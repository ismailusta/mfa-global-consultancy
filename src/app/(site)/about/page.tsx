import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { MediaBlock } from "@/components/MediaBlock";
import { getSiteData, parseJsonArray } from "@/lib/content";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, media } = await getSiteData();
  return buildPageMetadata({
    settings,
    title: "About Us",
    description: settings.aboutTitle,
    path: "/about",
    image: settings.ogImageUrl || media.about?.url || null,
  });
}

export default async function AboutPage() {
  const { settings, media } = await getSiteData();
  const paragraphs = parseJsonArray(settings.aboutParagraphs);

  return (
    <div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ])}
      />
      <section style={{ borderBottom: "1px solid var(--line)", background: "var(--sand)" }}>
        <div className="container fade-up" style={{ paddingTop: 64, paddingBottom: 64 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>{settings.aboutEyebrow}</div>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(30px, 4vw, 42px)", fontWeight: 600, margin: 0, color: "var(--navy)", lineHeight: 1.2 }}>
            {settings.aboutTitle}
          </h1>
        </div>
      </section>
      <section className="container" style={{ paddingTop: 70, paddingBottom: 90, display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: 64 }}>
        <div>
          {paragraphs.map((p) => (
            <p key={p.slice(0, 24)} style={{ fontSize: 16.5, lineHeight: 1.85, color: "var(--muted)", margin: "0 0 22px" }}>
              {p}
            </p>
          ))}
          <MediaBlock url={media.about?.url} label={media.about?.label || settings.aboutImageLabel} height={280} />
        </div>
        <aside>
          <div style={{ border: "1px solid var(--line)", padding: "30px 28px", marginBottom: 26 }}>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: 19, margin: "0 0 20px", color: "var(--navy)" }}>Company details</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 14, lineHeight: 1.6, color: "var(--muted)" }}>
              {[
                ["Legal name", settings.legalName],
                ["Entity type", settings.entityType],
                ["Jurisdiction", settings.jurisdiction],
                ["Registered address", settings.registeredAddress],
                ["Principal place of business", settings.businessAddress],
                ["EIN", settings.ein],
              ].map(([label, value]) => (
                <div key={label}>
                  <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--soft)", marginBottom: 5 }}>{label}</div>
                  {value}
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "var(--sand)", border: "1px solid var(--line)", padding: "26px 24px", fontSize: 13.5, lineHeight: 1.75, color: "var(--muted)" }}>
            {settings.aboutAsideNote}
          </div>
        </aside>
      </section>
      <style>{`@media (max-width: 900px) { .container[style*="grid-template-columns"] { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
