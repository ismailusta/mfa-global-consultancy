import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getSiteData } from "@/lib/content";
import {
  organizationJsonLd,
  professionalServiceJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const data = await getSiteData();
  const s = data.settings;
  const logoUrl = data.media.logo?.url || null;
  const logoLightUrl = data.media.logoLight?.url || logoUrl;
  const brandLogo = logoUrl || data.media.favicon?.url || data.media.hero?.url || s.ogImageUrl || null;

  return (
    <div
      lang={data.locale}
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#fff" }}
    >
      <JsonLd data={organizationJsonLd(s, brandLogo)} />
      <JsonLd data={websiteJsonLd(s)} />
      <JsonLd data={professionalServiceJsonLd(s)} />
      <SiteHeader
        companyName={s.companyName}
        shortName={s.companyShortName}
        tagline={s.tagline}
        showTopBar={s.showTopBar}
        topBarLeft={s.topBarLeft}
        topBarRight={s.topBarRight}
        nav={data.nav}
        locale={data.locale}
        enableTr={s.enableTr}
        logoUrl={logoUrl}
      />
      <main style={{ flex: 1 }}>{children}</main>
      <SiteFooter
        companyName={s.companyName}
        shortName={s.companyShortName}
        footerNote={s.footerNote}
        copyrightText={s.copyrightText}
        disclaimerLine={s.disclaimerLine}
        logoUrl={logoLightUrl}
      />
    </div>
  );
}
