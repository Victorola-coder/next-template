"use client";

import { clsx } from "clsx";
import { useState } from "react";

const sizeStyles = {
  xs: "w-6 h-6 text-xs",
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-12 h-12 text-lg",
  xl: "w-16 h-16 text-xl",
  "2xl": "w-24 h-24 text-2xl",
};

const statusStyles = {
  online: "bg-green-500",
  offline: "bg-gray-500",
  away: "bg-yellow-500",
  busy: "bg-red-500",
};

const statusSizes = {
  xs: "w-1.5 h-1.5",
  sm: "w-2 h-2",
  md: "w-2.5 h-2.5",
  lg: "w-3 h-3",
  xl: "w-4 h-4",
  "2xl": "w-5 h-5",
};

export function Avatar({
  src,
  alt,
  fallback,
  size = "md",
  status,
  className,
  shape = "circle",
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  // Generate initials from alt text
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const showFallback = !src || imageError;
  const initials = fallback || getInitials(alt);

  return (
    <div className={clsx("relative inline-block", className)}>
      <div
        className={clsx(
          "flex items-center justify-center overflow-hidden font-semibold",
          "bg-gradient-to-br from-primary to-[#6366F1]",
          "text-white",
          sizeStyles[size],
          shape === "circle" ? "rounded-full" : "rounded-lg"
        )}
      >
        {showFallback ? (
          <span>{initials}</span>
        ) : (
          <img
            src={src}
            alt={alt}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Status Indicator */}
      {status && (
        <span
          className={clsx(
            "absolute bottom-0 right-0 block rounded-full ring-2 ring-[#0f0f0f]",
            statusStyles[status],
            statusSizes[size]
          )}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
}

// Avatar Group Component
export function AvatarGroup({
  avatars,
  max = 5,
  size = "md",
  className,
}: AvatarGroupProps) {
  const displayAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className={clsx("flex -space-x-2", className)}>
      {displayAvatars.map((avatar, index) => (
        <div
          key={index}
          className="ring-2 ring-[#0f0f0f] rounded-full"
          style={{ zIndex: displayAvatars.length - index }}
        >
          <Avatar {...avatar} size={size} />
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={clsx(
            "flex items-center justify-center rounded-full",
            "bg-[#283142] text-white font-semibold ring-2 ring-[#0f0f0f]",
            sizeStyles[size]
          )}
          style={{ zIndex: 0 }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}
