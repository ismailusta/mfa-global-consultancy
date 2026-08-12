import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "@/lib/site";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "MFA Global Consultancy LLC | Visa, Documents & E-Commerce",
    template: "%s · MFA",
  },
  description:
    "MFA Global Consultancy LLC provides administrative support for electronic applications, document preparation, and online commerce services worldwide.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"],
    apple: [{ url: "/icon.svg" }],
  },
  manifest: "/site.webmanifest",
};

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
