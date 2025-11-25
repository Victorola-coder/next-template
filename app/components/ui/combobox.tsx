"use client";

import { clsx } from "clsx";
import { useState, useRef, useEffect } from "react";
import { useClickOutside, useKeyboard } from "@/app/hooks";
import { motion, AnimatePresence } from "framer-motion";

export function Combobox({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "Select an option...",
  searchPlaceholder = "Search...",
  emptyMessage = "No results found",
  disabled = false,
  className,
  error,
}: ComboboxProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentValue = isControlled ? value : internalValue;
  const selectedOption = options.find((opt) => opt.value === currentValue);

  useClickOutside(containerRef, () => setIsOpen(false));
  useKeyboard("Escape", () => setIsOpen(false));

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (optionValue: string) => {
    if (!isControlled) {
      setInternalValue(optionValue);
    }
    onChange?.(optionValue);
    setIsOpen(false);
    setSearchQuery("");
    setHighlightedIndex(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        if (filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex].value);
        }
        break;
    }
  };

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <div ref={containerRef} className={clsx("relative", className)}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={clsx(
          "w-full px-4 py-2 rounded-lg border text-left",
          "bg-[#1A1A1A] transition-colors flex items-center justify-between",
          error ? "border-red-500" : "border-[#FFFFFF20]",
          !disabled && "hover:border-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={selectedOption ? "text-white" : "text-[#FFFFFF40]"}>
          {selectedOption?.label || placeholder}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-5 h-5 text-[#FFFFFF60]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-[#1A1A1A] border border-[#FFFFFF20] rounded-lg shadow-xl overflow-hidden"
          >
            {/* Search input */}
            <div className="p-2 border-b border-[#FFFFFF10]">
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setHighlightedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder={searchPlaceholder}
                className="w-full px-3 py-2 bg-[#0f0f0f] border border-[#FFFFFF20] rounded-lg text-white placeholder:text-[#FFFFFF40] focus:outline-none focus:border-primary"
              />
            </div>

            {/* Options list */}
            <div className="max-h-60 overflow-auto" role="listbox">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-8 text-center text-[#FFFFFF60]">
                  {emptyMessage}
                </div>
              ) : (
                filteredOptions.map((option, index) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    disabled={option.disabled}
                    className={clsx(
                      "w-full px-4 py-2 text-left transition-colors",
                      "flex items-center justify-between",
                      option.value === currentValue && "bg-primary/20 text-primary",
                      option.value !== currentValue && "text-white",
                      index === highlightedIndex && "bg-[#FFFFFF10]",
                      option.disabled && "opacity-50 cursor-not-allowed",
                      !option.disabled && "hover:bg-[#FFFFFF10]"
                    )}
                    role="option"
                    aria-selected={option.value === currentValue}
                  >
                    <span>{option.label}</span>
                    {option.value === currentValue && (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <p className="text-xs text-red-400 mt-1">{error}</p>
      )}
    </div>
  );
}
