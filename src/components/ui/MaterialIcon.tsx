"use client";

interface MaterialIconProps {
  name: string;
  className?: string;
  filled?: boolean;
  size?: number;
}

export function MaterialIcon({
  name,
  className = "",
  filled = false,
  size = 24,
}: MaterialIconProps) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 300, 'GRAD' 0, 'opsz' ${size}`,
        fontSize: size,
      }}
    >
      {name}
    </span>
  );
}
