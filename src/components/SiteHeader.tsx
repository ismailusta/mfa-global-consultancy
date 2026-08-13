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
              gap: "6px 16px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <span style={{ minWidth: 0, overflowWrap: "anywhere" }}>{topBarLeft}</span>
            <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ minWidth: 0, overflowWrap: "anywhere" }}>{topBarRight}</span>
              <LanguageSwitcher locale={locale} enabled={enableTr} />
            </div>
          </div>
        </div>
      )}
      <header
        className="site-header"
        style={{ borderBottom: "1px solid var(--line)", background: "#fff", position: "sticky", top: 0, zIndex: 20 }}
      >
        <div className="container site-header-inner">
          <Link href="/" className="brand-link">
            <LogoMark shortName={shortName} imageUrl={logoUrl} alt={companyName} size={logoUrl ? 52 : 40} />
            {!logoUrl && (
              <div className="brand-text">
                <div className="brand-name">{companyName}</div>
                <div className="brand-tagline">{tagline}</div>
              </div>
            )}
          </Link>

          <div className="header-actions">
            {!showTopBar && (
              <div style={{ color: "var(--navy)" }}>
                <LanguageSwitcher locale={locale} enabled={enableTr} />
              </div>
            )}
            <button
              type="button"
              className="nav-toggle"
              onClick={() => setOpen((v) => !v)}
              aria-label={locale === "tr" ? "Menü" : "Menu"}
              aria-expanded={open}
            >
              {locale === "tr" ? (open ? "Kapat" : "Menü") : open ? "Close" : "Menu"}
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
                    borderBottomColor: active ? "var(--gold)" : undefined,
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
