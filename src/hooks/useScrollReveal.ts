'use client';

import { useEffect, useRef } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Attach to a container element. All children with [data-reveal] will
 * animate in with a fade + rise when they enter the viewport.
 */
export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -60px 0px', once = true } = options;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll<HTMLElement>('[data-reveal]');

    // Set initial state via inline style (not CSS class to avoid FOUC)
    targets.forEach((t, i) => {
      t.style.opacity = '0';
      t.style.transform = 'translateY(28px)';
      t.style.transition = `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 80}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 80}ms`;
      t.style.willChange = 'opacity, transform';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.style.opacity = '1';
            target.style.transform = 'translateY(0)';
            if (once) observer.unobserve(target);
          }
        });
      },
      { threshold, rootMargin }
    );

    targets.forEach((t) => observer.observe(t));

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}
