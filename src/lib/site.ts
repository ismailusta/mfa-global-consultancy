export const DEFAULT_SITE_URL = "https://mfaglobalconsultancy.com";

export function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  return DEFAULT_SITE_URL;
}

/** Prefer DB setting when available, else env / default domain */
export function resolveSiteUrl(dbUrl?: string | null) {
  const fromDb = dbUrl?.replace(/\/$/, "");
  if (fromDb) return fromDb;
  return getSiteUrl();
}

export function absoluteUrl(path = "/", dbUrl?: string | null) {
  const base = resolveSiteUrl(dbUrl);
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
