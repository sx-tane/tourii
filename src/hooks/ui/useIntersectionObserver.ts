import { useEffect, useRef, useState } from "react";
import type { UseIntersectionObserverOptions } from "../types";

/**
 * Custom hook for intersection observer
 * Detects when an element enters/exits the viewport
 */
export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  const {
    rootMargin = "0px",
    threshold = 0.1,
    freezeOnceVisible = false,
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // If frozen and already visible, don't observe
    if (freezeOnceVisible && hasIntersected) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isCurrentlyIntersecting = entry.isIntersecting;
        setIsIntersecting(isCurrentlyIntersecting);

        if (isCurrentlyIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }

        // If freezeOnceVisible is true and element becomes visible, stop observing
        if (freezeOnceVisible && isCurrentlyIntersecting) {
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [rootMargin, threshold, freezeOnceVisible, hasIntersected]);

  return {
    elementRef,
    isIntersecting,
    hasIntersected,
  };
};