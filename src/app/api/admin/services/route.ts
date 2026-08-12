import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(services);
}

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const service = await prisma.service.create({
    data: {
      number: body.number || "01",
      title: body.title || "New service",
      summary: body.summary || "",
      body: body.body || "",
      points: typeof body.points === "string" ? body.points : JSON.stringify(body.points || []),
      sortOrder: Number(body.sortOrder || 99),
      published: body.published !== false,
    },
  });
  return NextResponse.json(service);
}

export async function PUT(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const service = await prisma.service.update({
    where: { id: body.id },
    data: {
      number: body.number,
      title: body.title,
      summary: body.summary,
      body: body.body,
      points: typeof body.points === "string" ? body.points : JSON.stringify(body.points || []),
      sortOrder: Number(body.sortOrder),
      published: Boolean(body.published),
    },
  });
  return NextResponse.json(service);
}

export async function DELETE(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  await prisma.service.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
