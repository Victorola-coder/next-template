"use client";

import { clsx } from "clsx";

const variantStyles = {
  default: "bg-[#283142] text-white border-[#FFFFFF20]",
  primary: "bg-primary/20 text-primary border-primary/30",
  success: "bg-green-500/20 text-green-400 border-green-500/30",
  warning: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  error: "bg-red-500/20 text-red-400 border-red-500/30",
  info: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
  lg: "px-3 py-1.5 text-base",
};

const dotSizes = {
  sm: "w-1.5 h-1.5",
  md: "w-2 h-2",
  lg: "w-2.5 h-2.5",
};

export function Badge({
  children,
  variant = "default",
  size = "md",
  dot = false,
  onRemove,
  className,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full font-medium border",
        "transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dot && (
        <span
          className={clsx(
            "rounded-full",
            dotSizes[size],
            variant === "default" && "bg-white",
            variant === "primary" && "bg-primary",
            variant === "success" && "bg-green-400",
            variant === "warning" && "bg-yellow-400",
            variant === "error" && "bg-red-400",
            variant === "info" && "bg-blue-400"
          )}
        />
      )}
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-0.5 hover:opacity-70 transition-opacity"
          aria-label="Remove badge"
        >
          <svg
            className={clsx(
              size === "sm" && "w-3 h-3",
              size === "md" && "w-3.5 h-3.5",
              size === "lg" && "w-4 h-4"
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </span>
  );
}
