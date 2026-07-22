import { useEffect, useState, RefObject } from 'react';

/**
 * Fires once when the element scrolls into view.
 * Returns { visible } — use as a CSS transition trigger.
 */
export function useInViewAnimation(
  ref: RefObject<Element | null>,
  options?: IntersectionObserverInit
) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px', ...options }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);

  return { visible };
}
