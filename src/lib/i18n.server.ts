import { cookies } from "next/headers";
import type { Locale } from "./i18n";

export async function getRequestLocale(defaultLocale: Locale = "en"): Promise<Locale> {
  const jar = await cookies();
  const value = jar.get("locale")?.value;
  if (value === "tr" || value === "en") return value;
  return defaultLocale === "tr" ? "tr" : "en";
}
