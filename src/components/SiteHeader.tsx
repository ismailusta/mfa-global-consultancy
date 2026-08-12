"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { LogoMark } from "./LogoMark";

type NavItem = { id: string; label: string; href: string };

type Props = {
  companyName: string;
  shortName: string;
  tagline: string;
  showTopBar: boolean;
  topBarLeft: string;
  topBarRight: string;
  nav: NavItem[];
  locale: string;
  enableTr: boolean;
  logoUrl?: string | null;
};

export function SiteHeader({
  companyName,
  shortName,
  tagline,
  showTopBar,
  topBarLeft,
  topBarRight,
  nav,
  locale,
  enableTr,
  logoUrl,
}: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {showTopBar && (
        <div style={{ background: "var(--navy)", color: "var(--topbar)", fontSize: 12.5, letterSpacing: "0.04em" }}>
          <div
            className="container"
            style={{
              paddingTop: 9,
              paddingBottom: 9,
              display: "flex",
              justifyContent: "space-between",
              gap: "6px 24px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <span>{topBarLeft}</span>
            <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
              <span>{topBarRight}</span>
              <LanguageSwitcher locale={locale} enabled={enableTr} />
            </div>
          </div>
        </div>
      )}
      <header
        className="site-header"
        style={{ borderBottom: "1px solid var(--line)", background: "#fff", position: "sticky", top: 0, zIndex: 20 }}
      >
        <div
          className="container site-header-inner"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px 32px",
            flexWrap: "wrap",
          }}
        >
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 0", flex: "0 0 auto" }}>
            <LogoMark shortName={shortName} imageUrl={logoUrl} alt={companyName} />
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 18,
                  fontWeight: 600,
                  color: "var(--navy)",
                  letterSpacing: "0.02em",
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                }}
              >
                {companyName}
              </div>
              <div style={{ fontSize: 11, letterSpacing: "0.16em", color: "var(--soft)", textTransform: "uppercase" }}>
                {tagline}
              </div>
            </div>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {!showTopBar && (
              <div style={{ color: "var(--navy)" }}>
                <LanguageSwitcher locale={locale} enabled={enableTr} />
              </div>
            )}
            <button type="button" className="nav-toggle" onClick={() => setOpen((v) => !v)} aria-label="Menü">
              Menü
            </button>
          </div>

          <nav className={open ? "site-nav open" : "site-nav"}>
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="site-nav-link"
                  style={{
                    borderBottomColor: active ? "var(--gold)" : "transparent",
                    color: active ? "var(--navy)" : "#5c6570",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
    </>
  );
}
