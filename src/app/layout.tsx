import type { Metadata, Viewport } from "next";
import { Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { prisma } from "@/lib/prisma";
import { getSiteUrl } from "@/lib/site";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  let favicon = "/favicon.png";
  let apple = "/apple-touch-icon.png";

  try {
    const media = await prisma.mediaAsset.findMany({
      where: { key: { in: ["favicon", "logo"] } },
    });
    const map = Object.fromEntries(media.map((m) => [m.key, m.url]));
    if (map.favicon) {
      favicon = map.favicon;
      apple = map.favicon;
    } else if (map.logo) {
      favicon = map.logo;
      apple = map.logo;
    }
  } catch {
    // DB unavailable during build — keep defaults
  }

  return {
    metadataBase: new URL(base),
    title: {
      default: "MFA Global Consultancy LLC | Visa, Documents & E-Commerce",
      template: "%s · MFA",
    },
    description:
      "MFA Global Consultancy LLC provides administrative support for electronic applications, document preparation, and online commerce services worldwide.",
    icons: {
      icon: [
        { url: favicon },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      shortcut: [favicon],
      apple: [{ url: apple }],
    },
    manifest: "/site.webmanifest",
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sourceSerif.variable} h-full`}>
      <body
        className="min-h-full"
        style={{
          fontFamily: "var(--sans)",
          ["--serif" as string]: "var(--font-serif), Georgia, serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
