import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  locale: z.enum(["en", "tr"]),
});

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());
    const res = NextResponse.json({ ok: true, locale: body.locale });
    res.cookies.set("locale", body.locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Geçersiz dil" }, { status: 400 });
  }
}
