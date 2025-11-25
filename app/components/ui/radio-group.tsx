"use client";

import { clsx } from "clsx";
import { useId } from "react";

export function RadioGroup({
  options,
  value,
  defaultValue,
  onChange,
  name,
  disabled = false,
  orientation = "vertical",
  className,
  error,
}: RadioGroupProps) {
  const groupId = useId();
  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : defaultValue;

  return (
    <div className={className}>
      <div
        role="radiogroup"
        className={clsx(
          "flex gap-4",
          orientation === "vertical" ? "flex-col" : "flex-row flex-wrap"
        )}
      >
        {options.map((option) => (
          <RadioOption
            key={option.value}
            option={option}
            checked={selectedValue === option.value}
            onChange={() => onChange?.(option.value)}
            name={name || groupId}
            disabled={disabled || option.disabled}
          />
        ))}
      </div>
      {error && (
        <p className="text-xs text-red-400 mt-2">{error}</p>
      )}
    </div>
  );
}

interface RadioOptionProps {
  option: RadioOption;
  checked: boolean;
  onChange: () => void;
  name: string;
  disabled?: boolean;
}

function RadioOption({
  option,
  checked,
  onChange,
  name,
  disabled,
}: RadioOptionProps) {
  const id = useId();

  return (
    <div className="flex items-start gap-3">
      <button
        id={id}
        role="radio"
        type="button"
        aria-checked={checked}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={onChange}
        className={clsx(
          "flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#0f0f0f]",
          checked
            ? "bg-transparent border-primary"
            : "bg-transparent border-[#FFFFFF40]",
          disabled && "opacity-50 cursor-not-allowed",
          !disabled && "cursor-pointer hover:border-primary"
        )}
      >
        {checked && (
          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
        )}
      </button>

      <div className="flex-1">
        <label
          htmlFor={id}
          className={clsx(
            "block text-sm font-medium text-white cursor-pointer",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {option.label}
        </label>
        {option.description && (
          <p className="text-xs text-[#FFFFFF60] mt-0.5">
            {option.description}
          </p>
        )}
      </div>
    </div>
  );
}
