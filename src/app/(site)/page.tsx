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
        <div className="container grid-hero hero-pad fade-up">
          <div>
            <div className="eyebrow" style={{ marginBottom: 26 }}>{settings.heroEyebrow}</div>
            <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 7vw, 52px)", lineHeight: 1.14, fontWeight: 600, margin: "0 0 26px", letterSpacing: "-0.01em" }}>
              {settings.heroTitle}
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "var(--topbar)", margin: "0 0 36px", maxWidth: 560 }}>{settings.heroText}</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="/services" className="btn-gold">{settings.heroCtaPrimary}</Link>
              <Link href="/contact" className="btn-outline">{settings.heroCtaSecondary}</Link>
            </div>
          </div>
          <div className="media-hero fade-up-delay">
            <MediaBlock url={media.hero?.url} label={media.hero?.label || settings.heroImageLabel} dark height={280} />
          </div>
        </div>
      </section>

      {settings.showStats && (
        <section style={{ borderBottom: "1px solid var(--line)", background: "var(--sand)" }}>
          <div className="container grid-4" style={{ paddingTop: 34, paddingBottom: 34 }}>
            {stats.map((s) => (
              <div key={s.id} style={{ borderLeft: "1px solid #d8d3c8", paddingLeft: 20 }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: 26, color: "var(--navy)" }}>{s.value}</div>
                <div style={{ fontSize: 12, letterSpacing: "0.09em", textTransform: "uppercase", color: "var(--soft)", marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="container" style={{ paddingTop: 64, paddingBottom: 20 }}>
        <div className="grid-intro">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>{settings.homeServicesEyebrow}</div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(26px, 5vw, 34px)", lineHeight: 1.25, fontWeight: 600, margin: 0, color: "var(--navy)" }}>{settings.homeServicesTitle}</h2>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--muted)", margin: 0, alignSelf: "end" }}>{settings.homeServicesIntro}</p>
        </div>
        <div className="grid-3">
          {services.map((s) => (
            <div key={s.id} style={{ background: "#fff", padding: "28px 24px 32px", display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11.5, color: "var(--gold)", letterSpacing: "0.1em" }}>{s.number}</div>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: 20, fontWeight: 600, margin: 0, color: "var(--navy)", lineHeight: 1.35 }}>{s.title}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.75, color: "var(--muted)", margin: 0 }}>{s.summary}</p>
            </div>
          ))}
          <div style={{ background: "var(--sand)", padding: "28px 24px", display: "flex", alignItems: "flex-end" }}>
            <Link href="/services" style={{ fontSize: 12.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--navy)", borderBottom: "1px solid var(--gold)", paddingBottom: 5 }}>
              Read the full service list
            </Link>
          </div>
        </div>
      </section>

      <section className="container section-pad">
        <div className="panel-box grid-2">
          <div>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: "clamp(22px, 4vw, 26px)", fontWeight: 600, margin: "0 0 16px", color: "var(--navy)" }}>{settings.howWeWorkTitle}</h3>
            <p style={{ fontSize: 15.5, lineHeight: 1.8, color: "var(--muted)", margin: "0 0 18px" }}>{settings.howWeWorkP1}</p>
            <p style={{ fontSize: 15.5, lineHeight: 1.8, color: "var(--muted)", margin: 0 }}>{settings.howWeWorkP2}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {homeSteps.map((step) => (
              <div key={step.id} style={{ background: "#fff", border: "1px solid var(--line)", padding: "20px 22px" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--gold)", marginBottom: 8 }}>{step.code}</div>
                <div style={{ fontSize: 14.5, lineHeight: 1.7, color: "var(--muted)" }}>{step.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--navy)", color: "#fff" }}>
        <div className="container" style={{ paddingTop: 48, paddingBottom: 48, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <div style={{ minWidth: 0, flex: "1 1 240px" }}>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: "clamp(22px, 4vw, 28px)", fontWeight: 600, margin: "0 0 10px" }}>{settings.ctaTitle}</h3>
            <p style={{ fontSize: 15.5, color: "var(--topbar)", margin: 0 }}>{settings.ctaText}</p>
          </div>
          <Link href="/contact" className="btn-gold">{settings.ctaButton}</Link>
        </div>
      </section>
    </div>
  );
}
