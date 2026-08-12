import Link from "next/link";
import type { Metadata } from "next";
import { MediaBlock } from "@/components/MediaBlock";
import { getSiteData } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, media } = await getSiteData();
  return buildPageMetadata({
    settings,
    path: "/",
    image: settings.ogImageUrl || media.hero?.url || null,
  });
}

export default async function HomePage() {
  const { settings, stats, services, homeSteps, media } = await getSiteData();

  return (
    <div>
      <section style={{ background: "var(--navy)", color: "#fff" }}>
        <div className="container fade-up" style={{ paddingTop: 96, paddingBottom: 104, display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 64, alignItems: "center" }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 26 }}>{settings.heroEyebrow}</div>
            <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(34px, 5vw, 52px)", lineHeight: 1.14, fontWeight: 600, margin: "0 0 26px", letterSpacing: "-0.01em" }}>
              {settings.heroTitle}
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: "var(--topbar)", margin: "0 0 36px", maxWidth: 560 }}>{settings.heroText}</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="/services" className="btn-gold">{settings.heroCtaPrimary}</Link>
              <Link href="/contact" className="btn-outline">{settings.heroCtaSecondary}</Link>
            </div>
          </div>
          <MediaBlock url={media.hero?.url} label={media.hero?.label || settings.heroImageLabel} dark height={330} className="fade-up-delay" />
        </div>
      </section>

      {settings.showStats && (
        <section style={{ borderBottom: "1px solid var(--line)", background: "var(--sand)" }}>
          <div className="container" style={{ paddingTop: 34, paddingBottom: 34, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32 }}>
            {stats.map((s) => (
              <div key={s.id} style={{ borderLeft: "1px solid #d8d3c8", paddingLeft: 20 }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: 26, color: "var(--navy)" }}>{s.value}</div>
                <div style={{ fontSize: 12, letterSpacing: "0.09em", textTransform: "uppercase", color: "var(--soft)", marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="container" style={{ paddingTop: 86, paddingBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 64, marginBottom: 54 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>{settings.homeServicesEyebrow}</div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 34, lineHeight: 1.25, fontWeight: 600, margin: 0, color: "var(--navy)" }}>{settings.homeServicesTitle}</h2>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--muted)", margin: 0, alignSelf: "end" }}>{settings.homeServicesIntro}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "var(--line)", border: "1px solid var(--line)" }}>
          {services.map((s) => (
            <div key={s.id} style={{ background: "#fff", padding: "34px 30px 38px", display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11.5, color: "var(--gold)", letterSpacing: "0.1em" }}>{s.number}</div>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: 20, fontWeight: 600, margin: 0, color: "var(--navy)", lineHeight: 1.35 }}>{s.title}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.75, color: "var(--muted)", margin: 0 }}>{s.summary}</p>
            </div>
          ))}
          <div style={{ background: "var(--sand)", padding: "34px 30px", display: "flex", alignItems: "flex-end" }}>
            <Link href="/services" style={{ fontSize: 12.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--navy)", borderBottom: "1px solid var(--gold)", paddingBottom: 5 }}>
              Read the full service list
            </Link>
          </div>
        </div>
      </section>

      <section className="container" style={{ paddingTop: 80, paddingBottom: 96 }}>
        <div style={{ background: "var(--sand)", border: "1px solid var(--line)", padding: "48px 52px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56 }}>
          <div>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: 26, fontWeight: 600, margin: "0 0 16px", color: "var(--navy)" }}>{settings.howWeWorkTitle}</h3>
            <p style={{ fontSize: 15.5, lineHeight: 1.8, color: "var(--muted)", margin: "0 0 18px" }}>{settings.howWeWorkP1}</p>
            <p style={{ fontSize: 15.5, lineHeight: 1.8, color: "var(--muted)", margin: 0 }}>{settings.howWeWorkP2}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {homeSteps.map((step) => (
              <div key={step.id} style={{ background: "#fff", border: "1px solid var(--line)", padding: "22px 24px" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--gold)", marginBottom: 8 }}>{step.code}</div>
                <div style={{ fontSize: 14.5, lineHeight: 1.7, color: "var(--muted)" }}>{step.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--navy)", color: "#fff" }}>
        <div className="container" style={{ paddingTop: 60, paddingBottom: 60, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
          <div>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 600, margin: "0 0 10px" }}>{settings.ctaTitle}</h3>
            <p style={{ fontSize: 15.5, color: "var(--topbar)", margin: 0 }}>{settings.ctaText}</p>
          </div>
          <Link href="/contact" className="btn-gold">{settings.ctaButton}</Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .container[style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
          section .container > div[style*="repeat(4"] { grid-template-columns: 1fr 1fr !important; }
          section .container > div[style*="repeat(3"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
