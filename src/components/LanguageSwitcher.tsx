"use client";

import { useRouter } from "next/navigation";
import { useTransition, type CSSProperties } from "react";

export function LanguageSwitcher({ locale, enabled = true }: { locale: string; enabled?: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  if (!enabled) return null;

  async function setLocale(next: "en" | "tr") {
    if (next === locale) return;
    await fetch("/api/locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale: next }),
    });
    startTransition(() => router.refresh());
  }

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 11,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}
      aria-label="Dil"
    >
      <button type="button" disabled={pending} onClick={() => setLocale("en")} style={btnStyle(locale === "en")}>
        EN
      </button>
      <span style={{ opacity: 0.5 }}>/</span>
      <button type="button" disabled={pending} onClick={() => setLocale("tr")} style={btnStyle(locale === "tr")}>
        TR
      </button>
    </div>
  );
}

function btnStyle(active: boolean): CSSProperties {
  return {
    background: "transparent",
    border: "none",
    color: active ? "#9a7b3f" : "inherit",
    cursor: "pointer",
    padding: 0,
    fontSize: 11,
    letterSpacing: "0.12em",
    fontWeight: active ? 700 : 400,
  };
}
