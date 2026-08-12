import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const locale = searchParams.get("locale") || "tr";

  const [translations, settings, nav, services, steps] = await Promise.all([
    prisma.translation.findMany({ where: { locale } }),
    prisma.siteSettings.findUnique({ where: { id: "main" } }),
    prisma.navItem.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.service.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.processStep.findMany({ orderBy: [{ section: "asc" }, { sortOrder: "asc" }] }),
  ]);

  return NextResponse.json({ translations, settings, nav, services, steps, locale });
}

export async function PUT(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const locale = body.locale === "en" ? "en" : "tr";
  const items = Array.isArray(body.items) ? body.items : [];

  for (const item of items) {
    const key = String(item.key || "");
    const value = String(item.value ?? "");
    if (!key) continue;
    if (!value.trim()) {
      await prisma.translation.deleteMany({ where: { locale, key } });
      continue;
    }
    await prisma.translation.upsert({
      where: { locale_key: { locale, key } },
      update: { value },
      create: { locale, key, value },
    });
  }

  return NextResponse.json({ ok: true });
}
