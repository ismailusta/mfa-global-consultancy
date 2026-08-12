import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadMediaObject } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const form = await req.formData();
    const file = form.get("file");
    const key = String(form.get("key") || "");
    const label = String(form.get("label") || "");

    if (!key) return NextResponse.json({ error: "key gerekli" }, { status: 400 });
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "file gerekli" }, { status: 400 });
    }
    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json({ error: "Dosya 8MB üzeri olamaz" }, { status: 400 });
    }

    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const path = `${key}/${Date.now()}.${ext || "jpg"}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const url = await uploadMediaObject({
      path,
      body: buffer,
      contentType: file.type || "application/octet-stream",
    });

    const media = await prisma.mediaAsset.upsert({
      where: { key },
      update: { url, label: label || undefined },
      create: { key, url, label: label || key },
    });

    return NextResponse.json(media);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
