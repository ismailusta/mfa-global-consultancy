import { prisma } from "./prisma";
import {
  applySettingTranslations,
  tMap,
  type Locale,
} from "./i18n";
import { getRequestLocale } from "./i18n.server";

export function parseJsonArray(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export type LegalSection = { h: string; p: string[] };

export function parseLegalContent(value: string): LegalSection[] {
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((s) => ({
      h: String(s.h ?? ""),
      p: Array.isArray(s.p) ? s.p.map(String) : [],
    }));
  } catch {
    return [];
  }
}

export async function getSiteData(localeOverride?: Locale) {
  const settingsBase = await prisma.siteSettings.findUniqueOrThrow({ where: { id: "main" } });
  const defaultLocale = (settingsBase.defaultLocale === "tr" ? "tr" : "en") as Locale;
  const locale =
    localeOverride ||
    (settingsBase.enableTr ? await getRequestLocale(defaultLocale) : "en");

  const [nav, stats, services, homeSteps, visaSteps, media, translations] = await Promise.all([
    prisma.navItem.findMany({ where: { visible: true }, orderBy: { sortOrder: "asc" } }),
    prisma.stat.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.service.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } }),
    prisma.processStep.findMany({ where: { section: "home" }, orderBy: { sortOrder: "asc" } }),
    prisma.processStep.findMany({ where: { section: "visa" }, orderBy: { sortOrder: "asc" } }),
    prisma.mediaAsset.findMany(),
    locale === "en"
      ? Promise.resolve([])
      : prisma.translation.findMany({ where: { locale } }),
  ]);

  const map = tMap(translations);
  const settings = applySettingTranslations(settingsBase, map);

  const localizedNav = nav.map((item) => ({
    ...item,
    label: map[`nav.${item.id}.label`] || item.label,
  }));

  const localizedStats = stats.map((item) => ({
    ...item,
    label: map[`stat.${item.id}.label`] || item.label,
    value: map[`stat.${item.id}.value`] || item.value,
  }));

  const localizedServices = services.map((s) => ({
    ...s,
    title: map[`service.${s.id}.title`] || s.title,
    summary: map[`service.${s.id}.summary`] || s.summary,
    body: map[`service.${s.id}.body`] || s.body,
    points: parseJsonArray(map[`service.${s.id}.points`] || s.points),
  }));

  const localizeSteps = (steps: typeof homeSteps) =>
    steps.map((step) => ({
      ...step,
      code: map[`step.${step.id}.code`] || step.code,
      text: map[`step.${step.id}.text`] || step.text,
    }));

  const mediaMap = Object.fromEntries(media.map((m) => [m.key, m]));

  return {
    locale,
    settings,
    nav: localizedNav,
    stats: localizedStats,
    services: localizedServices,
    homeSteps: localizeSteps(homeSteps),
    visaSteps: localizeSteps(visaSteps),
    media: mediaMap,
  };
}

export async function getLegalPage(slug: string, localeOverride?: Locale) {
  const page = await prisma.legalPage.findUnique({ where: { slug } });
  if (!page) return null;

  const settings = await prisma.siteSettings.findUnique({ where: { id: "main" } });
  const defaultLocale = (settings?.defaultLocale === "tr" ? "tr" : "en") as Locale;
  const locale =
    localeOverride ||
    (settings?.enableTr ? await getRequestLocale(defaultLocale) : "en");

  if (locale === "en") {
    return { ...page, sections: parseLegalContent(page.content), locale };
  }

  const rows = await prisma.translation.findMany({
    where: {
      locale,
      OR: [{ key: `legal.${slug}.title` }, { key: `legal.${slug}.content` }],
    },
  });
  const map = tMap(rows);
  return {
    ...page,
    title: map[`legal.${slug}.title`] || page.title,
    content: map[`legal.${slug}.content`] || page.content,
    sections: parseLegalContent(map[`legal.${slug}.content`] || page.content),
    locale,
  };
}
