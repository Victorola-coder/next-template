"use client";

import { clsx } from "clsx";
import { useState } from "react";

const sizeStyles = {
  sm: "w-5 h-5",
  md: "w-7 h-7",
  lg: "w-10 h-10",
};

export function Rating({
  value,
  defaultValue = 0,
  onChange,
  max = 5,
  precision = 1,
  disabled = false,
  readOnly = false,
  size = "md",
  className,
  icon,
  emptyIcon,
}: RatingProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const currentValue = isControlled ? value : internalValue;
  const displayValue = hoverValue !== null ? hoverValue : currentValue;

  const handleClick = (rating: number) => {
    if (disabled || readOnly) return;
    
    if (!isControlled) {
      setInternalValue(rating);
    }
    onChange?.(rating);
  };

  const handleMouseEnter = (rating: number) => {
    if (disabled || readOnly) return;
    setHoverValue(rating);
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };

  const getStarValue = (index: number, offset: number = 0) => {
    return index + offset;
  };

  const isStarFilled = (starValue: number) => {
    return displayValue >= starValue;
  };

  const isStarHalf = (starValue: number) => {
    if (precision === 1) return false;
    return displayValue >= starValue - 0.5 && displayValue < starValue;
  };

  const renderStar = (index: number) => {
    const starValue = getStarValue(index, 1);
    const filled = isStarFilled(starValue);
    const half = isStarHalf(starValue);

    const defaultIcon = (
      <svg
        className="w-full h-full"
        fill={filled || half ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {half ? (
          <defs>
            <linearGradient id={`half-${index}`}>
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
        ) : null}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          fill={half ? `url(#half-${index})` : filled ? "currentColor" : "none"}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    );

    return (
      <button
        key={index}
        type="button"
        onClick={() => handleClick(starValue)}
        onMouseEnter={() => handleMouseEnter(starValue)}
        disabled={disabled || readOnly}
        className={clsx(
          sizeStyles[size],
          "transition-all",
          filled || half ? "text-yellow-400" : "text-[#FFFFFF30]",
          !disabled && !readOnly && "hover:scale-110 cursor-pointer",
          (disabled || readOnly) && "cursor-default",
          disabled && "opacity-50"
        )}
        aria-label={`Rate ${starValue} out of ${max}`}
      >
        {icon || defaultIcon}
      </button>
    );
  };

  // Support for half stars
  const stars = [];
  for (let i = 0; i < max; i++) {
    if (precision === 0.5 && !disabled && !readOnly) {
      // Render two half-star buttons
      stars.push(
        <div key={i} className="relative inline-block">
          <button
            type="button"
            onClick={() => handleClick(i + 0.5)}
            onMouseEnter={() => handleMouseEnter(i + 0.5)}
            className={clsx(
              "absolute left-0 top-0 w-1/2 h-full z-10",
              !disabled && !readOnly && "cursor-pointer"
            )}
            aria-label={`Rate ${i + 0.5} out of ${max}`}
          />
          {renderStar(i)}
        </div>
      );
    } else {
      stars.push(renderStar(i));
    }
  }

  return (
    <div
      className={clsx("inline-flex gap-1", className)}
      onMouseLeave={handleMouseLeave}
      role="radiogroup"
      aria-label={`Rating out of ${max}`}
    >
      {stars}
    </div>
  );
}
