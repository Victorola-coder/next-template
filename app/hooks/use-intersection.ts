import { RefObject, useEffect, useState } from "react";

/**
 * Hook to detect when an element enters/exits the viewport
 * @param ref - React ref object pointing to the element
 * @param options - IntersectionObserver options
 */
export function useIntersectionObserver(
  ref: RefObject<HTMLElement>,
  options?: IntersectionObserverInit
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        setEntry(entry);
      },
      options
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return { isIntersecting, entry };
}

/**
 * Hook for infinite scroll implementation
 * @param callback - Function to call when element is visible
 * @param options - IntersectionObserver options
 */
export function useInfiniteScroll(
  callback: () => void,
  options?: IntersectionObserverInit
) {
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      },
      options
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, callback, options]);

  return setRef;
}
