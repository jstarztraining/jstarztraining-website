import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Floating photo cluster ("bubbles") that flanks the hero: a portrait card with
 * a landscape card overlapping toward the centre, gentle drift motion. Purely
 * decorative (aria-hidden) — the same photos carry real alt text elsewhere.
 * The global prefers-reduced-motion guard freezes the float.
 *
 * The four images are owner-editable (dashboard → Hero & Banner). When a slot is
 * left blank the DEFAULT_SHOWCASE photo below is used, so the hero always looks
 * complete. Hero.tsx resolves DB value → default and passes the URLs in.
 */
export const DEFAULT_SHOWCASE = {
  leftMain: '/images/gk-portrait.jpg',
  leftSub: '/images/coach-action.jpg',
  rightMain: '/images/dribbling-portrait.jpg',
  rightSub: '/images/event-trophy.jpg',
} as const;

const GLOW = {
  left: { cls: 'bg-brand-bright/25', side: 'right-0' },
  right: { cls: 'bg-gold/12', side: 'left-0' },
} as const;

export function HeroShowcase({ side, main, sub }: { side: 'left' | 'right'; main: string; sub: string }) {
  const isLeft = side === 'left';
  const glow = GLOW[side];

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute top-1/2 hidden w-[15rem] -translate-y-1/2 xl:block 2xl:w-[17rem]',
        isLeft ? 'left-[7.5vw]' : 'right-[7.5vw]',
      )}
    >
      {/* Depth glow */}
      <div className={cn('absolute bottom-2 -z-10 h-72 w-72 rounded-full blur-[90px]', glow.cls, glow.side)} />

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

/**
 * Mobile-only sibling of HeroShowcase: the same tilted, drifting "bubbles" but as
 * a compact overlapping pair that sits in its own row between the CTAs and the
 * stats (xl:hidden so it never meets the flanking desktop pair). Uses the same
 * two photos as the right-hand desktop cluster. Images lazy-load — dropping
 * priority here protects mobile LCP, where bandwidth is tightest.
 */
export function HeroShowcaseMobile({ main, sub }: { main: string; sub: string }) {
  return (
    <div aria-hidden className="pointer-events-none relative mx-auto mt-14 h-[15rem] w-[17rem] xl:hidden">
      {/* Depth glow */}
      <div className="absolute bottom-4 left-1/2 -z-10 h-56 w-56 -translate-x-1/2 rounded-full bg-gold/12 blur-[80px]" />

      {/* Main portrait bubble */}
      <div className="absolute left-0 top-0 w-[9.5rem] animate-float -rotate-[3deg]">
        <div className="relative aspect-[3/4] overflow-hidden rounded-[1.4rem] shadow-[0_32px_70px_-20px_rgba(3,10,28,0.9)] ring-1 ring-white/15">
          <Image src={main} alt="" fill sizes="9.5rem" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-navy/10" />
        </div>
      </div>

      {/* Secondary landscape bubble — overlaps toward the lower right */}
      <div className="absolute -bottom-1 right-0 w-[8.5rem] animate-float [animation-delay:-3.5s] rotate-[5deg]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.1rem] shadow-[0_26px_54px_-16px_rgba(3,10,28,0.92)] ring-1 ring-white/15">
          <Image src={sub} alt="" fill sizes="8.5rem" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/45 to-transparent" />
        </div>
      </div>
    </div>
  );
}
