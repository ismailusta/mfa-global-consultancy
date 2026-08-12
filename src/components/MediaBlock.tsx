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
        className={`media-block ${className}`}
        style={{ height, maxHeight: "min(420px, 55vh)" }}
      />
    );
  }

  return (
    <div
      className={`placeholder-media ${dark ? "dark" : ""} ${className}`}
      style={{ height, maxHeight: "min(420px, 55vh)" }}
    >
      <span>{label || "[ image ]"}</span>
    </div>
  );
}
