import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { getSiteData } from "@/lib/content";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getSiteData();
  return buildPageMetadata({
    settings,
    title: "Contact",
    description: `Contact ${settings.companyName}. ${settings.contactFormNote}`,
    path: "/contact",
  });
}

export default async function ContactPage() {
  const { settings, locale } = await getSiteData();

  return (
    <div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: locale === "tr" ? "İletişim" : "Contact", path: "/contact" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: locale === "tr" ? "İletişim" : "Contact",
          url: absoluteUrl("/contact"),
        }}
      />
      <section style={{ borderBottom: "1px solid var(--line)", background: "var(--sand)" }}>
        <div className="container fade-up" style={{ paddingTop: 64, paddingBottom: 64 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>{settings.contactEyebrow}</div>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(30px, 4vw, 42px)", fontWeight: 600, margin: 0, color: "var(--navy)", lineHeight: 1.2 }}>
            {settings.contactTitle}
          </h1>
        </div>
      </section>
      <section className="container grid-contact section-pad">
        <div style={{ display: "flex", flexDirection: "column", gap: 26, fontSize: 15, lineHeight: 1.75, color: "var(--muted)" }}>
          {[
            [locale === "tr" ? "E-posta" : "Email", settings.email],
            [locale === "tr" ? "Adres" : "Address", `${settings.legalName}\n${settings.registeredAddress}`],
            [locale === "tr" ? "Çalışma saatleri" : "Business hours", settings.businessHours],
          ].map(([label, value]) => (
            <div key={label}>
              <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--soft)", marginBottom: 6 }}>{label}</div>
              <div style={{ whiteSpace: "pre-line", overflowWrap: "anywhere" }}>{value}</div>
            </div>
          ))}
        </div>
        <ContactForm note={settings.contactFormNote} locale={locale} />
      </section>
    </div>
  );
}
