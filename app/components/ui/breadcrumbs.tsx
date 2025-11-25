"use client";

import { clsx } from "clsx";
import Link from "next/link";

const defaultSeparator = (
  <svg
    className="w-4 h-4 text-[#FFFFFF40]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

export function Breadcrumbs({
  items,
  separator = defaultSeparator,
  className,
}: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center gap-2 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-1.5 text-sm",
                    "text-[#FFFFFF80] hover:text-white transition-colors"
                  )}
                >
                  {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                  {item.label}
                </Link>
              ) : (
                <span
                  className={clsx(
                    "flex items-center gap-1.5 text-sm",
                    isLast ? "text-white font-medium" : "text-[#FFFFFF80]"
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                  {item.label}
                </span>
              )}

              {!isLast && (
                <span className="flex-shrink-0" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
