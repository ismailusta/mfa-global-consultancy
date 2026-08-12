import { AdminShell } from "@/components/admin/AdminShell";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [messages, services, unread] = await Promise.all([
    prisma.contactMessage.count(),
    prisma.service.count(),
    prisma.contactMessage.count({ where: { read: false } }),
  ]);

  return (
    <AdminShell active="/admin/dashboard">
      <h1 style={h1}>Özet</h1>
      <p style={sub}>Panele hoş geldiniz. Soldaki menüden tüm site içeriğini düzenleyebilirsiniz.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 28 }}>
        {[
          ["Okunmamış mesaj", String(unread)],
          ["Toplam mesaj", String(messages)],
          ["Hizmet sayısı", String(services)],
        ].map(([label, value]) => (
          <div key={label} style={{ background: "#fff", border: "1px solid var(--line)", padding: 22 }}>
            <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--soft)" }}>{label}</div>
            <div style={{ fontFamily: "var(--serif)", fontSize: 32, color: "var(--navy)", marginTop: 8 }}>{value}</div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}

const h1: React.CSSProperties = { fontFamily: "var(--serif)", fontSize: 32, margin: 0, color: "var(--navy)" };
const sub: React.CSSProperties = { margin: "10px 0 0", color: "var(--muted)", fontSize: 15 };
