'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type RevealDirection = 'up' | 'left' | 'right' | 'scale';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Direction the element travels in from. Default: up. */
  direction?: RevealDirection;
  /** Stagger delay in ms (used for cascading lists). */
  delay?: number;
  /** Render element. Default: div. */
  as?: ElementType;
  /** Reveal once then stop observing. Default: true. */
  once?: boolean;
}

/**
 * Scroll-reveal wrapper. Content renders visible by default; only when JS has
 * added `.reveal-ready` to <html> (see layout's pre-paint script) does it start
 * hidden and animate in. The observer reports initial intersection on first
 * callback, so above-the-fold items reveal immediately — no blank sections on
 * headless renderers, no-JS, or reduced-motion.
 */
export function Reveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  as,
  once = true,
}: RevealProps) {
  const Tag = as ?? 'div';
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref}
      data-reveal={direction === 'up' ? '' : direction}
      className={cn(visible && 'is-visible', className)}
      style={delay ? { ['--reveal-delay' as string]: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
