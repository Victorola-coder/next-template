import { useEffect } from "react";

/**
 * Hook to handle keyboard events
 * @param key - The key to listen for (e.g., 'Escape', 'Enter')
 * @param handler - Callback function to execute when key is pressed
 * @param options - Additional options for the event listener
 */
export function useKeyboard(
  key: string,
  handler: (event: KeyboardEvent) => void,
  options?: {
    ctrlKey?: boolean;
    metaKey?: boolean;
    shiftKey?: boolean;
    altKey?: boolean;
  }
) {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      // Check if the pressed key matches
      if (event.key !== key) return;

      // Check modifier keys if specified
      if (options?.ctrlKey && !event.ctrlKey) return;
      if (options?.metaKey && !event.metaKey) return;
      if (options?.shiftKey && !event.shiftKey) return;
      if (options?.altKey && !event.altKey) return;

      handler(event);
    };

    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [key, handler, options]);
}

/**
 * Hook to handle multiple keyboard shortcuts
 * @param shortcuts - Array of shortcut configurations
 */
export function useKeyboardShortcuts(
  shortcuts: Array<{
    key: string;
    handler: (event: KeyboardEvent) => void;
    ctrlKey?: boolean;
    metaKey?: boolean;
    shiftKey?: boolean;
    altKey?: boolean;
  }>
) {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      shortcuts.forEach((shortcut) => {
        if (event.key !== shortcut.key) return;
        if (shortcut.ctrlKey && !event.ctrlKey) return;
        if (shortcut.metaKey && !event.metaKey) return;
        if (shortcut.shiftKey && !event.shiftKey) return;
        if (shortcut.altKey && !event.altKey) return;

        event.preventDefault();
        shortcut.handler(event);
      });
    };

    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [shortcuts]);
}
