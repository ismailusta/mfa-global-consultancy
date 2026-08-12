import Link from "next/link";
import { LogoMark } from "./LogoMark";

type Props = {
  companyName: string;
  shortName: string;
  footerNote: string;
  copyrightText: string;
  disclaimerLine: string;
};

export function SiteFooter({ companyName, shortName, footerNote, copyrightText, disclaimerLine }: Props) {
  const lines = footerNote.split("\n");
  const brandLines = companyName.includes("CONSULTANCY")
    ? ["MFA GLOBAL", "CONSULTANCY LLC"]
    : [companyName];

  return (
    <footer style={{ background: "var(--navy)", color: "var(--topbar)" }}>
      <div className="container" style={{ paddingTop: 64, paddingBottom: 40, display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 48 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <LogoMark shortName={shortName} variant="light" size={44} />
            <div style={{ fontFamily: "var(--serif)", fontSize: 16, color: "#fff", lineHeight: 1.3 }}>
              {brandLines.map((l) => (
                <div key={l}>{l}</div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.8 }}>
            {lines.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--footer-muted)", marginBottom: 16 }}>Company</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: 14 }}>
            <Link href="/">Home</Link>
            <Link href="/about">About us</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--footer-muted)", marginBottom: 16 }}>Services</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: 14 }}>
            <Link href="/services">All services</Link>
            <Link href="/visa">Visa & document services</Link>
            <Link href="/commerce">E-commerce</Link>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--footer-muted)", marginBottom: 16 }}>Legal</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: 14 }}>
            <Link href="/legal/terms">Terms of Service</Link>
            <Link href="/legal/privacy">Privacy Policy</Link>
            <Link href="/legal/refund">Refund Policy</Link>
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid #23375a" }}>
        <div className="container" style={{ paddingTop: 22, paddingBottom: 22, display: "flex", justifyContent: "space-between", gap: 24, flexWrap: "wrap", fontSize: 12.5, color: "var(--footer-muted)" }}>
          <span>{copyrightText}</span>
          <span>{disclaimerLine}</span>
        </div>
      </div>
      <style>{`
        footer a:hover { color: var(--gold); }
        @media (max-width: 900px) {
          footer .container { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          footer .container { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
