type LogoProps = {
  shortName: string;
  variant?: "light" | "dark";
  size?: number;
};

export function LogoMark({ shortName, variant = "dark", size = 48 }: LogoProps) {
  const bg = variant === "dark" ? "#10243f" : "#ffffff";
  const ring = variant === "dark" ? "#43587a" : "#b9c3d1";
  const ring2 = variant === "dark" ? "#2c4166" : "#d3dae3";
  const text = variant === "dark" ? "#ffffff" : "#10243f";
  const bar = "#9a7b3f";
  const center = bg;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: bg,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "0 0 auto",
        overflow: "hidden",
      }}
      aria-hidden
    >
      <div
        style={{
          position: "absolute",
          width: size * 0.42,
          height: size,
          borderRadius: "50%",
          border: `1px solid ${ring}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: size * 0.75,
          height: size,
          borderRadius: "50%",
          border: `1px solid ${ring2}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          background: center,
          padding: "2px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <div style={{ width: size * 0.67, height: 1, background: bar }} />
        <span
          style={{
            fontFamily: "var(--serif)",
            fontSize: size * 0.22,
            fontWeight: 600,
            color: text,
            letterSpacing: "0.08em",
            lineHeight: 1.1,
          }}
        >
          {shortName}
        </span>
        <div style={{ width: size * 0.67, height: 1, background: bar }} />
      </div>
    </div>
  );
}
