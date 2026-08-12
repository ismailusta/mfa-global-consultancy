import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const settings = await prisma.siteSettings.findUnique({ where: { id: "main" } });
  return NextResponse.json(settings);
}

export async function PUT(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { id: _id, updatedAt: _u, ...raw } = body;

  const data = {
    ...raw,
    showTopBar: Boolean(raw.showTopBar),
    showStats: Boolean(raw.showStats),
    enableTr: Boolean(raw.enableTr),
    defaultLocale: raw.defaultLocale === "tr" ? "tr" : "en",
  };

  const settings = await prisma.siteSettings.update({
    where: { id: "main" },
    data,
  });
  return NextResponse.json(settings);
}
