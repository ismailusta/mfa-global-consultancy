import type { Metadata } from "next";
import type { SiteSettings } from "@prisma/client";
import { absoluteUrl, resolveSiteUrl } from "./site";

type PageSeoInput = {
  settings: SiteSettings;
  title?: string;
  description?: string;
  path?: string;
  image?: string | null;
  noIndex?: boolean;
};

export function buildPageMetadata({
  settings,
  title,
  description,
  path = "/",
  image,
  noIndex = false,
}: PageSeoInput): Metadata {
  const base = resolveSiteUrl(settings.siteUrl);
  const siteName = settings.companyName;
  const pageTitle = title || settings.seoTitle || siteName;
  const desc =
    description ||
    settings.seoDescription ||
    settings.heroText ||
    settings.tagline;
  const canonical = path === "/" ? base : `${base}${path.startsWith("/") ? path : `/${path}`}`;
  const ogImage = image || settings.ogImageUrl || undefined;
  const keywords = settings.seoKeywords
    ? settings.seoKeywords.split(",").map((k) => k.trim()).filter(Boolean)
    : undefined;

  return {
    metadataBase: new URL(base),
    title: title
      ? { absolute: `${title} · ${settings.companyShortName}` }
      : settings.seoTitle || siteName,
    description: desc,
    keywords,
    applicationName: siteName,
    authors: [{ name: siteName, url: base }],
    creator: siteName,
    publisher: siteName,
    category: "Business",
    alternates: {
      canonical,
      languages: {
        "en-US": canonical,
      },
    },
    openGraph: {
      type: path === "/" ? "website" : "article",
      url: canonical,
      siteName,
      title: pageTitle,
      description: desc,
      locale: "en_US",
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: siteName }]
        : undefined,
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: pageTitle,
      description: desc,
      images: ogImage ? [ogImage] : undefined,
      creator: settings.twitterHandle || undefined,
      site: settings.twitterHandle || undefined,
    },
    robots: noIndex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    verification: {
      google: settings.googleVerification || undefined,
      other: settings.bingVerification
        ? { "msvalidate.01": settings.bingVerification }
        : undefined,
    },
  };
}

export function organizationJsonLd(settings: SiteSettings, logoUrl?: string | null) {
  const base = resolveSiteUrl(settings.siteUrl);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${base}/#organization`,
    name: settings.companyName,
    legalName: settings.legalName,
    url: base,
    logo: logoUrl || `${base}/icon.svg`,
    email: settings.email,
    telephone: settings.phone.startsWith("[") ? undefined : settings.phone,
    description: settings.seoDescription || settings.heroText,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.registeredAddress,
      addressLocality: "Sheridan",
      addressRegion: "WY",
      postalCode: "82801",
      addressCountry: "US",
    },
    areaServed: ["Europe", "Middle East", "North America"],
    sameAs: [] as string[],
  };
}

export function websiteJsonLd(settings: SiteSettings) {
  const base = resolveSiteUrl(settings.siteUrl);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${base}/#website`,
    url: base,
    name: settings.companyName,
    description: settings.seoDescription || settings.heroText,
    publisher: { "@id": `${base}/#organization` },
    inLanguage: "en-US",
  };
}

export function professionalServiceJsonLd(settings: SiteSettings) {
  const base = resolveSiteUrl(settings.siteUrl);
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${base}/#service`,
    name: settings.companyName,
    url: base,
    image: settings.ogImageUrl || undefined,
    description: settings.seoDescription || settings.heroText,
    email: settings.email,
    telephone: settings.phone.startsWith("[") ? undefined : settings.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.registeredAddress,
      addressLocality: "Sheridan",
      addressRegion: "WY",
      postalCode: "82801",
      addressCountry: "US",
    },
    openingHours: settings.businessHours,
    priceRange: "$$",
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
