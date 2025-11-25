"use client";

import { clsx } from "clsx";
import { useState, useRef, KeyboardEvent } from "react";
import { Badge } from "./badge";

export function TagInput({
  value,
  defaultValue = [],
  onChange,
  placeholder = "Add tags...",
  maxTags,
  allowDuplicates = false,
  disabled = false,
  className,
  error,
  suggestions = [],
}: TagInputProps) {
  const isControlled = value !== undefined;
  const [internalTags, setInternalTags] = useState<string[]>(defaultValue);
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentTags = isControlled ? value : internalTags;

  const handleTagsChange = (newTags: string[]) => {
    if (!isControlled) {
      setInternalTags(newTags);
    }
    onChange?.(newTags);
  };

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (!trimmedTag) return;

    // Check max tags
    if (maxTags && currentTags.length >= maxTags) return;

    // Check duplicates
    if (!allowDuplicates && currentTags.includes(trimmedTag)) return;

    handleTagsChange([...currentTags, trimmedTag]);
    setInputValue("");
    setShowSuggestions(false);
  };

  const removeTag = (index: number) => {
    handleTagsChange(currentTags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && !inputValue && currentTags.length > 0) {
      removeTag(currentTags.length - 1);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
      !currentTags.includes(suggestion)
  );

  return (
    <div className={clsx("relative", className)}>
      <div
        className={clsx(
          "flex flex-wrap gap-2 p-2 rounded-lg border",
          "bg-[#1A1A1A] transition-colors min-h-[42px]",
          error ? "border-red-500" : "border-[#FFFFFF20]",
          !disabled && "focus-within:border-primary",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onClick={() => inputRef.current?.focus()}
      >
        {currentTags.map((tag, index) => (
          <Badge
            key={index}
            variant="primary"
            size="sm"
            onRemove={!disabled ? () => removeTag(index) : undefined}
          >
            {tag}
          </Badge>
        ))}

        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowSuggestions(e.target.value.length > 0);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(inputValue.length > 0)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={currentTags.length === 0 ? placeholder : ""}
          disabled={disabled || (maxTags !== undefined && currentTags.length >= maxTags)}
          className={clsx(
            "flex-1 min-w-[120px] bg-transparent outline-none",
            "text-white placeholder:text-[#FFFFFF40]",
            "disabled:cursor-not-allowed"
          )}
        />
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-[#1A1A1A] border border-[#FFFFFF20] rounded-lg shadow-lg max-h-48 overflow-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => addTag(suggestion)}
              className={clsx(
                "w-full px-3 py-2 text-left text-white",
                "hover:bg-[#FFFFFF10] transition-colors",
                "first:rounded-t-lg last:rounded-b-lg"
              )}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {error && (
        <p className="text-xs text-red-400 mt-1">{error}</p>
      )}

      {maxTags && (
        <p className="text-xs text-[#FFFFFF60] mt-1">
          {currentTags.length} / {maxTags} tags
        </p>
      )}
    </div>
  );
}
