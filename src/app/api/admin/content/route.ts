import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function guard() {
  const user = await getSessionUser();
  if (!user) return null;
  return user;
}

export async function GET() {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const [nav, stats, steps, legal, media, messages] = await Promise.all([
    prisma.navItem.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.stat.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.processStep.findMany({ orderBy: [{ section: "asc" }, { sortOrder: "asc" }] }),
    prisma.legalPage.findMany({ orderBy: { slug: "asc" } }),
    prisma.mediaAsset.findMany({ orderBy: { key: "asc" } }),
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } }),
  ]);
  return NextResponse.json({ nav, stats, steps, legal, media, messages });
}

export async function PUT(req: Request) {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const type = body.type as string;

  if (type === "nav") {
    const item = await prisma.navItem.update({
      where: { id: body.id },
      data: { label: body.label, href: body.href, sortOrder: Number(body.sortOrder), visible: Boolean(body.visible) },
    });
    return NextResponse.json(item);
  }
  if (type === "stat") {
    const item = await prisma.stat.update({
      where: { id: body.id },
      data: { value: body.value, label: body.label, sortOrder: Number(body.sortOrder) },
    });
    return NextResponse.json(item);
  }
  if (type === "step") {
    const item = await prisma.processStep.update({
      where: { id: body.id },
      data: { code: body.code, text: body.text, sortOrder: Number(body.sortOrder), section: body.section },
    });
    return NextResponse.json(item);
  }
  if (type === "legal") {
    const item = await prisma.legalPage.update({
      where: { id: body.id },
      data: { title: body.title, content: typeof body.content === "string" ? body.content : JSON.stringify(body.content) },
    });
    return NextResponse.json(item);
  }
  if (type === "media") {
    const item = await prisma.mediaAsset.update({
      where: { id: body.id },
      data: { url: body.url || "", label: body.label || null, alt: body.alt || null },
    });
    return NextResponse.json(item);
  }
  if (type === "message-read") {
    const item = await prisma.contactMessage.update({
      where: { id: body.id },
      data: { read: true },
    });
    return NextResponse.json(item);
  }

  return NextResponse.json({ error: "Unknown type" }, { status: 400 });
}

export async function POST(req: Request) {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const type = body.type as string;

  if (type === "nav") {
    return NextResponse.json(
      await prisma.navItem.create({
        data: { label: body.label || "Item", href: body.href || "/", sortOrder: Number(body.sortOrder || 99), visible: true },
      }),
    );
  }
  if (type === "stat") {
    return NextResponse.json(
      await prisma.stat.create({
        data: { value: body.value || "0", label: body.label || "Label", sortOrder: Number(body.sortOrder || 99) },
      }),
    );
  }
  if (type === "step") {
    return NextResponse.json(
      await prisma.processStep.create({
        data: {
          code: body.code || "01",
          text: body.text || "",
          section: body.section || "home",
          sortOrder: Number(body.sortOrder || 99),
        },
      }),
    );
  }
  return NextResponse.json({ error: "Unknown type" }, { status: 400 });
}

export async function DELETE(req: Request) {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  if (!type || !id) return NextResponse.json({ error: "Missing params" }, { status: 400 });

  if (type === "nav") await prisma.navItem.delete({ where: { id } });
  else if (type === "stat") await prisma.stat.delete({ where: { id } });
  else if (type === "step") await prisma.processStep.delete({ where: { id } });
  else if (type === "message") await prisma.contactMessage.delete({ where: { id } });
  else return NextResponse.json({ error: "Unknown type" }, { status: 400 });

  return NextResponse.json({ ok: true });
}
