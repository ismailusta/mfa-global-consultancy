"use client";

import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

const links = [
  { href: "/admin/dashboard", label: "Özet" },
  { href: "/admin/settings", label: "Site ayarları" },
  { href: "/admin/translations", label: "Türkçe çeviriler" },
  { href: "/admin/services", label: "Hizmetler" },
  { href: "/admin/lists", label: "Menü / İstatistik / Adımlar" },
  { href: "/admin/legal", label: "Yasal sayfalar" },
  { href: "/admin/media", label: "Medya" },
  { href: "/admin/messages", label: "Mesajlar" },
];

export function AdminShellClient({
  children,
  active,
}: {
  children: React.ReactNode;
  active: string;
}) {
  return (
    <div className="admin-shell">
      <aside style={{ background: "var(--navy)", color: "#fff", padding: "28px 20px", position: "sticky", top: 0, height: "100vh", overflow: "auto" }}>
        <div className="eyebrow" style={{ color: "var(--gold)", marginBottom: 10 }}>
          MFA Admin
        </div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 18, marginBottom: 28 }}>Kontrol paneli</div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                padding: "10px 12px",
                fontSize: 13,
                letterSpacing: "0.04em",
                background: active === l.href ? "rgba(154,123,63,0.25)" : "transparent",
                borderLeft: active === l.href ? "2px solid var(--gold)" : "2px solid transparent",
                color: active === l.href ? "#fff" : "var(--topbar)",
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 10 }}>
          <Link href="/" style={{ fontSize: 12, color: "var(--topbar)" }}>
            ← Siteye dön
          </Link>
          <LogoutButton />
        </div>
      </aside>
      <div style={{ padding: "20px 16px 60px", minWidth: 0, overflowX: "auto" }}>{children}</div>
    </div>
  );
}
