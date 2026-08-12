"use client";

export function LogoutButton() {
  return (
    <button
      type="button"
      onClick={async () => {
        await fetch("/api/auth/login", { method: "DELETE" });
        window.location.href = "/admin/login";
      }}
      style={{
        background: "transparent",
        border: "1px solid #43587a",
        color: "#fff",
        padding: "8px 12px",
        fontSize: 12,
        cursor: "pointer",
      }}
    >
      Çıkış
    </button>
  );
}
