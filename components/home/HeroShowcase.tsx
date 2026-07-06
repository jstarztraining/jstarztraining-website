import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Floating photo cluster that flanks the hero on one side (xl+ only): a portrait
 * card with a landscape card overlapping toward the centre, gentle drift motion.
 * Purely decorative (aria-hidden) — the same photos carry real alt text elsewhere.
 * The global prefers-reduced-motion guard freezes the float.
 */
const SIDES = {
  left: { main: '/images/gk-portrait.jpg', sub: '/images/coach-action.jpg', glow: 'bg-brand-bright/25' },
  right: { main: '/images/dribbling-portrait.jpg', sub: '/images/event-trophy.jpg', glow: 'bg-gold/12' },
} as const;

export function HeroShowcase({ side }: { side: 'left' | 'right' }) {
  const isLeft = side === 'left';
  const { main, sub, glow } = SIDES[side];

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute top-1/2 hidden w-[15rem] -translate-y-1/2 xl:block 2xl:w-[17rem]',
        isLeft ? 'left-[7.5vw]' : 'right-[7.5vw]',
      )}
    >
      {/* Depth glow */}
      <div className={cn('absolute bottom-2 -z-10 h-72 w-72 rounded-full blur-[90px]', glow, isLeft ? 'right-0' : 'left-0')} />

      {/* Main portrait card */}
      <div className={cn('relative w-[84%] animate-float', isLeft ? 'mr-auto -rotate-[2.5deg]' : 'ml-auto rotate-[2.5deg]')}>
        <div className="relative aspect-[3/4] overflow-hidden rounded-[1.6rem] shadow-[0_40px_90px_-24px_rgba(3,10,28,0.9)] ring-1 ring-white/15">
          <Image src={main} alt="" fill priority sizes="17rem" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-navy/10" />
        </div>
      </div>

      {/* Secondary landscape card — overlaps toward the centre of the hero */}
      <div
        className={cn(
          'absolute -bottom-8 w-[64%] animate-float [animation-delay:-3.5s]',
          isLeft ? '-right-4 rotate-[6deg]' : '-left-4 -rotate-[6deg]',
        )}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] shadow-[0_32px_64px_-18px_rgba(3,10,28,0.92)] ring-1 ring-white/15">
          <Image src={sub} alt="" fill sizes="12rem" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/45 to-transparent" />
        </div>
      </div>
    </div>
  );
}
