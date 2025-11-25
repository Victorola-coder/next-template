import { useEffect, useState } from "react";

/**
 * Hook to create a portal container in the DOM
 * Useful for modals, tooltips, and other overlay components
 * @param id - Optional ID for the portal container
 */
export function usePortal(id?: string) {
  const [container] = useState(() => {
    if (typeof document === "undefined") return null;
    
    const div = document.createElement("div");
    if (id) div.id = id;
    div.setAttribute("data-portal", "true");
    return div;
  });

  useEffect(() => {
    if (!container) return;

    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return container;
}
