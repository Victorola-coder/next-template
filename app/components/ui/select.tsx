"use client";

import clsx from "clsx";
import { useState, useEffect } from "react";

type SelectProps = {
  value?: string;
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options: { label: string; value: string }[];
};

export default function Select({
  value,
  options,
  onChange,
  className,
  defaultValue,
  placeholder,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(
    value || defaultValue || options[0]?.value
  );

  useEffect(() => {
    if (value !== undefined) {
      setSelected(value);
    }
  }, [value]);

  const handleSelect = (newValue: string) => {
    setSelected(newValue);
    onChange?.(newValue);
    setIsOpen(false);
  };

  const selectedLabel =
    options.find((opt) => opt.value === selected)?.label || placeholder;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "w-full  px-4 py-3 rounded-[12px] border border-[#FFFFFF29] text-white text-[12px] md:text-base font-medium font-aloeMed gap-2 text-left flex items-center justify-between",
          className
        )}
      >
        <span>{selectedLabel}</span>
        <svg
          className={`size-3 md:size-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-[#283142] rounded-[12px] shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={clsx(
                "w-full px-4 py-3 text-[12px] whitespace-nowrap md:text-base font-medium font-aloeMed text-left hover:bg-[#374151] transition-colors",
                option.value === selected ? "text-white" : "text-[#FFFFFF80]",
                "first:rounded-t-[12px] last:rounded-b-[12px]"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
