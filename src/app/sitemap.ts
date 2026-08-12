import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { getSiteUrl, resolveSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let base = getSiteUrl();
  try {
    const settings = await prisma.siteSettings.findUnique({ where: { id: "main" }, select: { siteUrl: true } });
    base = resolveSiteUrl(settings?.siteUrl);
  } catch {
    // keep env/default
  }

  const now = new Date();
  const path = (p: string) => (p === "/" ? base : `${base}${p}`);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: path("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: path("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: path("/services"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: path("/commerce"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: path("/visa"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: path("/contact"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: path("/legal/terms"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: path("/legal/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: path("/legal/refund"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  try {
    const legal = await prisma.legalPage.findMany({ select: { slug: true } });
    for (const p of legal) {
      const url = path(`/legal/${p.slug}`);
      if (!staticRoutes.some((m) => m.url === url)) {
        staticRoutes.push({ url, lastModified: now, changeFrequency: "yearly", priority: 0.3 });
      }
    }
  } catch {
    // ignore
  }

  return staticRoutes;
}
