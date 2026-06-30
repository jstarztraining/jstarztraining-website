'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Thumb-zone booking CTA for small screens. The nav's "Book Now" pill is hidden
 * below `sm`, so once the hero scrolls away a phone user has no persistent way to
 * book — the single likeliest conversion leak on mobile. This fills that gap and
 * is hidden at `sm`+ where the nav pill returns.
 *
 * Appears after the first viewport scrolls past (so it never competes with the
 * hero's own CTA), and uses touch states (`active:`) rather than hover.
 */
export function MobileBookBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-nav px-4 pt-2 sm:hidden',
        'pb-[max(0.75rem,env(safe-area-inset-bottom))]',
        // visibility is in the transition list so the fade-out completes before
        // the bar leaves the a11y tree / tab order.
        'transition-[opacity,transform,visibility] duration-300 ease-out-quint',
        visible
          ? 'visible translate-y-0 opacity-100'
          : 'invisible translate-y-3 opacity-0',
      )}
    >
      <Link
        href="/programs"
        className="group flex h-14 w-full items-center justify-center gap-2 rounded-full bg-gold font-heading font-semibold text-navy shadow-[0_-4px_30px_-6px_rgba(6,24,63,0.5)] transition-colors duration-300 active:bg-gold-soft"
      >
        Book a Session
        <span
          aria-hidden
          className="transition-transform duration-300 ease-out-quint group-active:translate-x-1"
        >
          →
        </span>
      </Link>
    </div>
  );
}
