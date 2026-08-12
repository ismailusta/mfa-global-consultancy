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
  const logo = data.media.hero?.url || s.ogImageUrl || null;

  return (
    <div
      lang={data.locale}
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#fff" }}
    >
      <JsonLd data={organizationJsonLd(s, logo)} />
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
      />
      <main style={{ flex: 1 }}>{children}</main>
      <SiteFooter
        companyName={s.companyName}
        shortName={s.companyShortName}
        footerNote={s.footerNote}
        copyrightText={s.copyrightText}
        disclaimerLine={s.disclaimerLine}
      />
    </div>
  );
}
