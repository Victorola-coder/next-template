"use client";

import { clsx } from "clsx";
import { useState, useRef } from "react";
import { useClickOutside } from "@/app/hooks";
import { Badge } from "./badge";
import { motion, AnimatePresence } from "framer-motion";

export function MultiSelect({
  options,
  value = [],
  defaultValue = [],
  onChange,
  placeholder = "Select options...",
  searchPlaceholder = "Search...",
  maxSelected,
  disabled = false,
  className,
  error,
}: MultiSelectProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentValue = isControlled ? value : internalValue;

  useClickOutside(containerRef, () => setIsOpen(false));

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggle = (optionValue: string) => {
    let newValue: string[];
    
    if (currentValue.includes(optionValue)) {
      newValue = currentValue.filter((v) => v !== optionValue);
    } else {
      if (maxSelected && currentValue.length >= maxSelected) return;
      newValue = [...currentValue, optionValue];
    }

    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const removeValue = (optionValue: string) => {
    const newValue = currentValue.filter((v) => v !== optionValue);
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const selectedOptions = options.filter((opt) => currentValue.includes(opt.value));

  return (
    <div ref={containerRef} className={clsx("relative", className)}>
      <div
        onClick={() => !disabled && setIsOpen(true)}
        className={clsx(
          "min-h-[42px] px-3 py-2 rounded-lg border cursor-pointer",
          "bg-[#1A1A1A] transition-colors",
          error ? "border-red-500" : "border-[#FFFFFF20]",
          !disabled && "hover:border-primary",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {selectedOptions.length === 0 ? (
          <span className="text-[#FFFFFF40]">{placeholder}</span>
        ) : (
          <div className="flex flex-wrap gap-1">
            {selectedOptions.map((option) => (
              <Badge
                key={option.value}
                variant="primary"
                size="sm"
                onRemove={!disabled ? () => removeValue(option.value) : undefined}
              >
                {option.label}
              </Badge>
            ))}
          </div>
        )}
      </div>

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
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full px-3 py-2 bg-[#0f0f0f] border border-[#FFFFFF20] rounded-lg text-white placeholder:text-[#FFFFFF40] focus:outline-none focus:border-primary"
              />
            </div>

            {/* Options list */}
            <div className="max-h-60 overflow-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-8 text-center text-[#FFFFFF60]">
                  No results found
                </div>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = currentValue.includes(option.value);
                  const isDisabled = option.disabled || (maxSelected !== undefined && !isSelected && currentValue.length >= maxSelected);
                  
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => !isDisabled && handleToggle(option.value)}
                      disabled={isDisabled}
                      className={clsx(
                        "w-full px-4 py-2 text-left transition-colors",
                        "flex items-center gap-3",
                        isSelected && "bg-primary/10",
                        !isDisabled && "hover:bg-[#FFFFFF10]",
                        isDisabled && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {/* Checkbox */}
                      <div
                        className={clsx(
                          "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                          isSelected ? "bg-primary border-primary" : "border-[#FFFFFF40]"
                        )}
                      >
                        {isSelected && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-white">{option.label}</span>
                    </button>
                  );
                })
              )}
            </div>

            {maxSelected && (
              <div className="px-4 py-2 border-t border-[#FFFFFF10] text-xs text-[#FFFFFF60]">
                {currentValue.length} / {maxSelected} selected
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <p className="text-xs text-red-400 mt-1">{error}</p>
      )}
    </div>
  );
}
