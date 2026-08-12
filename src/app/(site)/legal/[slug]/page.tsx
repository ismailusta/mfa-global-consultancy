import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { getLegalPage, getSiteData } from "@/lib/content";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return [{ slug: "terms" }, { slug: "privacy" }, { slug: "refund" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const [page, { settings }] = await Promise.all([getLegalPage(slug), getSiteData()]);
  if (!page) return { title: "Legal" };
  return buildPageMetadata({
    settings,
    title: page.title,
    description: `${page.title} for ${settings.companyName}. Last updated ${settings.legalUpdatedAt}.`,
    path: `/legal/${slug}`,
  });
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [page, { settings }] = await Promise.all([getLegalPage(slug), getSiteData()]);
  if (!page) notFound();

  return (
    <div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: page.title, path: `/legal/${slug}` },
        ])}
      />
      <section style={{ borderBottom: "1px solid var(--line)", background: "var(--sand)" }}>
        <div className="container fade-up" style={{ paddingTop: 64, paddingBottom: 64 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Legal</div>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 600, margin: "0 0 12px", color: "var(--navy)", lineHeight: 1.2 }}>
            {page.title}
          </h1>
          <p style={{ fontSize: 14, color: "var(--soft)", margin: 0 }}>Last updated: {settings.legalUpdatedAt}</p>
        </div>
      </section>
      <section style={{ maxWidth: 820, margin: "0 auto", padding: "64px 32px 90px" }}>
        {page.sections.map((sec) => (
          <div key={sec.h} style={{ marginBottom: 38 }}>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 21, fontWeight: 600, margin: "0 0 14px", color: "var(--navy)" }}>{sec.h}</h2>
            {sec.p.map((para) => (
              <p key={para.slice(0, 32)} style={{ fontSize: 15.5, lineHeight: 1.85, color: "var(--muted)", margin: "0 0 14px" }}>
                {para}
              </p>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}
