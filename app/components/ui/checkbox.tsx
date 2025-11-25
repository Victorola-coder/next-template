"use client";

import { clsx } from "clsx";
import { useId } from "react";
import { motion } from "framer-motion";

export function Checkbox({
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  label,
  description,
  error,
  className,
  indeterminate = false,
}: CheckboxProps) {
  const id = useId();
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : defaultChecked;

  const handleChange = () => {
    if (!disabled && onChange) {
      onChange(!isChecked);
    }
  };

  return (
    <div className={clsx("flex items-start gap-3", className)}>
      <button
        id={id}
        role="checkbox"
        type="button"
        aria-checked={indeterminate ? "mixed" : isChecked}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={handleChange}
        className={clsx(
          "flex items-center justify-center w-5 h-5 rounded border-2 transition-all",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#0f0f0f]",
          isChecked || indeterminate
            ? "bg-primary border-primary"
            : "bg-transparent border-[#FFFFFF40]",
          disabled && "opacity-50 cursor-not-allowed",
          !disabled && "cursor-pointer hover:border-primary"
        )}
      >
        {indeterminate ? (
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-3 h-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 12h14" />
          </motion.svg>
        ) : isChecked ? (
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-3 h-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </motion.svg>
        ) : null}
      </button>

      {(label || description) && (
        <div className="flex-1">
          {label && (
            <label
              htmlFor={id}
              className={clsx(
                "block text-sm font-medium text-white cursor-pointer",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-xs text-[#FFFFFF60] mt-0.5">{description}</p>
          )}
          {error && (
            <p className="text-xs text-red-400 mt-1">{error}</p>
          )}
        </div>
      )}
    </div>
  );
}
