"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useId } from "react";
import { clsx } from "clsx";

export function Accordion({
  items,
  type = "single",
  defaultValue,
  className,
  collapsible = true,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    if (!defaultValue) return new Set();
    if (Array.isArray(defaultValue)) return new Set(defaultValue);
    return new Set([defaultValue]);
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);

      if (type === "single") {
        // Single mode: only one item open at a time
        if (next.has(id)) {
          // If collapsible, allow closing the open item
          return collapsible ? new Set() : next;
        }
        return new Set([id]);
      } else {
        // Multiple mode: toggle individual items
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      }
    });
  };

  return (
    <div className={clsx("space-y-2", className)}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={openItems.has(item.id)}
          onToggle={() => !item.disabled && toggleItem(item.id)}
        />
      ))}
    </div>
  );
}

interface AccordionItemProps {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ item, isOpen, onToggle }: AccordionItemProps) {
  const contentId = useId();
  const headerId = useId();

  return (
    <div
      className={clsx(
        "border border-[#FFFFFF20] rounded-lg overflow-hidden",
        "bg-[#1A1A1A] transition-colors",
        item.disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <button
        id={headerId}
        aria-expanded={isOpen}
        aria-controls={contentId}
        aria-disabled={item.disabled}
        onClick={onToggle}
        disabled={item.disabled}
        className={clsx(
          "w-full px-4 py-3 flex items-center justify-between",
          "text-left font-medium text-white",
          "hover:bg-[#FFFFFF10] transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-primary",
          !item.disabled && "cursor-pointer"
        )}
      >
        <span>{item.title}</span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={contentId}
            role="region"
            aria-labelledby={headerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-4 py-3 text-[#FFFFFF80] border-t border-[#FFFFFF10]">
              {item.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
