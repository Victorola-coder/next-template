"use client";

import { clsx } from "clsx";

export function Separator({
  orientation = "horizontal",
  className,
  decorative = true,
}: SeparatorProps) {
  return (
    <div
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={clsx(
        "bg-[#FFFFFF20]",
        orientation === "horizontal" ? "h-px w-full" : "w-px h-full",
        className
      )}
    />
  );
}
