'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  to: number;
  durationMs?: number;
  prefix?: string;
  suffix?: string;
  /** If set, renders this string and skips the animation (non-numeric stats). */
  staticValue?: string;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// ease-out-expo
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export function CountUp({ to, durationMs = 1600, prefix = '', suffix = '', staticValue }: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (staticValue) return;
    const node = ref.current;
    if (!node || done) return;

    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      setValue(to);
      setDone(true);
      return;
    }

    let raf = 0;
    let start = 0;

    const animate = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / durationMs, 1);
      setValue(Math.round(easeOutExpo(progress) * to));
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        setDone(true);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          observer.disconnect();
          raf = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, durationMs, done, staticValue]);

  if (staticValue) {
    return <span ref={ref}>{staticValue}</span>;
  }

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString('en-CA')}
      {suffix}
    </span>
  );
}
