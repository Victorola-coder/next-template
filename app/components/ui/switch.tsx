"use client";

import { clsx } from "clsx";
import { motion } from "framer-motion";

const sizeStyles = {
  sm: {
    track: "w-8 h-4",
    thumb: "w-3 h-3",
    translate: "translate-x-4",
  },
  md: {
    track: "w-11 h-6",
    thumb: "w-4 h-4",
    translate: "translate-x-5",
  },
  lg: {
    track: "w-14 h-7",
    thumb: "w-5 h-5",
    translate: "translate-x-7",
  },
};

export function Switch({
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  label,
  description,
  size = "md",
  className,
}: SwitchProps) {
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : defaultChecked;

  const handleToggle = () => {
    if (!disabled && onChange) {
      onChange(!isChecked);
    }
  };

  return (
    <div className={clsx("flex items-center gap-3", className)}>
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={handleToggle}
        className={clsx(
          "relative inline-flex flex-shrink-0 rounded-full transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#0f0f0f]",
          sizeStyles[size].track,
          isChecked ? "bg-primary" : "bg-[#FFFFFF20]",
          disabled && "opacity-50 cursor-not-allowed",
          !disabled && "cursor-pointer"
        )}
      >
        <motion.span
          layout
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          className={clsx(
            "inline-block rounded-full bg-white shadow-lg transform",
            sizeStyles[size].thumb,
            isChecked ? sizeStyles[size].translate : "translate-x-1"
          )}
        />
      </button>

      {(label || description) && (
        <div className="flex-1">
          {label && (
            <span
              className={clsx(
                "block text-sm font-medium text-white",
                disabled && "opacity-50"
              )}
            >
              {label}
            </span>
          )}
          {description && (
            <p className="text-xs text-[#FFFFFF60] mt-0.5">{description}</p>
          )}
        </div>
      )}
    </div>
  );
}
