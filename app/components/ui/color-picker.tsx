"use client";

import { clsx } from "clsx";
import { useState, useRef } from "react";
import { useClickOutside } from "@/app/hooks";

export function ColorPicker({
  value,
  defaultValue = "#000000",
  onChange,
  format = "hex",
  presets = [],
  disabled = false,
  className,
  showAlpha = false,
}: ColorPickerProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentValue = isControlled ? value : internalValue;

  useClickOutside(containerRef, () => setIsOpen(false));

  const handleColorChange = (newColor: string) => {
    if (!isControlled) {
      setInternalValue(newColor);
    }
    onChange?.(newColor);
  };

  const defaultPresets = [
    "#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF",
    "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#800080",
  ];

  const colorPresets = presets.length > 0 ? presets : defaultPresets;

  return (
    <div ref={containerRef} className={clsx("relative inline-block", className)}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={clsx(
          "flex items-center gap-2 px-3 py-2 rounded-lg border",
          "bg-[#1A1A1A] border-[#FFFFFF20] transition-colors",
          !disabled && "hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <div
          className="w-6 h-6 rounded border border-[#FFFFFF20]"
          style={{ backgroundColor: currentValue }}
        />
        <span className="text-white font-mono text-sm">{currentValue}</span>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 p-4 bg-[#1A1A1A] border border-[#FFFFFF20] rounded-lg shadow-xl space-y-4">
          {/* Color input */}
          <div className="space-y-2">
            <label className="text-xs text-[#FFFFFF80]">Color</label>
            <input
              type="color"
              value={currentValue}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-full h-10 rounded cursor-pointer"
            />
          </div>

          {/* Hex input */}
          <div className="space-y-2">
            <label className="text-xs text-[#FFFFFF80]">Hex</label>
            <input
              type="text"
              value={currentValue}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-full px-3 py-2 bg-[#0f0f0f] border border-[#FFFFFF20] rounded-lg text-white font-mono text-sm focus:outline-none focus:border-primary"
              placeholder="#000000"
            />
          </div>

          {/* Presets */}
          {colorPresets.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs text-[#FFFFFF80]">Presets</label>
              <div className="grid grid-cols-5 gap-2">
                {colorPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handleColorChange(preset)}
                    className={clsx(
                      "w-8 h-8 rounded border-2 transition-transform hover:scale-110",
                      preset === currentValue ? "border-primary" : "border-[#FFFFFF20]"
                    )}
                    style={{ backgroundColor: preset }}
                    aria-label={`Select color ${preset}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
