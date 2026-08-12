type Props = {
  url?: string | null;
  label?: string | null;
  className?: string;
  dark?: boolean;
  height?: number | string;
};

export function MediaBlock({ url, label, className = "", dark, height = 280 }: Props) {
  if (url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt={label || ""}
        className={className}
        style={{ width: "100%", height, objectFit: "cover", display: "block", border: "1px solid var(--line)" }}
      />
    );
  }

  return (
    <div className={`placeholder-media ${dark ? "dark" : ""} ${className}`} style={{ height, width: "100%" }}>
      <span>{label || "[ image ]"}</span>
    </div>
  );
}
