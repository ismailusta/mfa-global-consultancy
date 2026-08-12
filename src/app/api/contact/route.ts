import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { isMailConfigured, sendContactEnquiry } from "@/lib/mail";

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(160),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(5000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);
    await prisma.contactMessage.create({ data });

    if (isMailConfigured()) {
      try {
        await sendContactEnquiry(data);
      } catch (err) {
        console.error("Contact mail failed:", err);
        return NextResponse.json(
          { error: "Enquiry saved, but email could not be sent." },
          { status: 502 },
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid enquiry." }, { status: 400 });
  }
}
