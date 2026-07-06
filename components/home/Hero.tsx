import type { HomeHero } from '@prisma/client';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { HeroShowcase } from '@/components/home/HeroShowcase';
import { CountUp } from '@/components/motion/CountUp';
import { HERO_STATS } from '@/lib/content';
import { cn } from '@/lib/utils';

const FALLBACK = {
  headline: 'Elevate Your Game.',
  subhead:
    'One-on-one and small-group training (4–6 max) for players and goalkeepers of every age and background. More touches. Real coaching. A community that feels like family.',
  ctaLabel: 'Book a Session',
  // Guided path: the primary CTA routes to the on-site catalog (visitors pick a
  // program, then that card links out to Shopify) rather than a raw storefront.
  // Owner-editable via the dashboard if a direct store/product link is wanted.
  ctaUrl: '/programs',
};

// Split a headline so the final word renders as the gold accent (with underline).
function splitAccent(headline: string) {
  const trimmed = headline.trim();
  const idx = trimmed.lastIndexOf(' ');
  if (idx === -1) return { lead: '', accent: trimmed };
  return { lead: trimmed.slice(0, idx), accent: trimmed.slice(idx + 1) };
}

export function Hero({ hero }: { hero: HomeHero | null }) {
  const headline = hero?.headline?.trim() || FALLBACK.headline;
  const subhead = hero?.subhead?.trim() || FALLBACK.subhead;
  const ctaLabel = hero?.ctaLabel?.trim() || FALLBACK.ctaLabel;
  const ctaUrl = hero?.ctaUrl?.trim() || FALLBACK.ctaUrl;
  const { lead, accent } = splitAccent(headline);

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy text-white">
      {/* The promo banner lives in the fixed header stack (Navbar), above the
          nav row — see components/layout/Navbar.tsx. */}

      {/* Full-bleed background — real JStarz session, heavily darkened to navy */}
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-30 object-cover object-center"
      />
      {/* Navy wash: near-solid on the left for text legibility, opening up on the
          right so the photograph reads. Crown glow on top, floor darken at base. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage:
            'radial-gradient(82% 78% at 50% 44%, rgba(6,24,63,0.88) 0%, rgba(6,24,63,0.62) 48%, rgba(17,64,137,0.36) 78%, rgba(31,122,224,0.24) 100%), radial-gradient(120% 92% at 50% -12%, rgba(31,122,224,0.4) 0%, rgba(6,24,63,0) 55%), linear-gradient(to bottom, rgba(5,15,41,0.14) 0%, rgba(5,15,41,0) 32%, rgba(5,15,41,0.55) 100%)',
        }}
      />
      {/* Drifting brand + gold glows */}
      <div
        aria-hidden
        className="absolute -left-[12%] top-1/3 -z-10 h-[34rem] w-[34rem] rounded-full bg-brand-bright/25 blur-[130px] animate-drift"
      />
      <div
        aria-hidden
        className="absolute right-[-8%] top-[-6%] -z-10 h-[28rem] w-[28rem] rounded-full bg-gold/15 blur-[120px] animate-drift"
        style={{ animationDelay: '-8s' }}
      />

      {/* Floating real-photo clusters flank the centred content (xl+) */}
      <HeroShowcase side="left" />
      <HeroShowcase side="right" />

      <Container
        className={cn(
          'relative flex flex-1 flex-col items-center justify-center pb-16 text-center',
          // Extra top padding when the promo banner adds a row to the fixed header.
          hero?.bannerEnabled && hero.bannerMessage ? 'pt-40 lg:pt-44' : 'pt-32 lg:pt-36',
        )}
      >
        <div className="mx-auto max-w-2xl">
          {/* Single deliberate brand kicker (not repeated per section) —
              crest badge: Archivo display label in a gold-outlined pill. */}
          <p className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 font-heading text-sm tracking-tight text-gold-soft">
              <span className="font-extrabold">Private Soccer Training</span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-gold/70" />
              <span className="font-medium text-gold-soft/75">Halifax, NS</span>
            </span>
          </p>

          <h1 className="mt-6 font-display text-[clamp(2.75rem,8.5vw,5.5rem)] font-black leading-[0.95] tracking-tightest text-white text-balance">
            {lead ? <>{lead} </> : null}
            <span className="accent-underline text-gold">{accent}</span>
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl">{subhead}</p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
            <Button href={ctaUrl} variant="glow" size="lg">
              {ctaLabel}
              <span aria-hidden className="transition-transform duration-300 ease-out-quint group-hover/btn:translate-x-1">
                →
              </span>
            </Button>
            <Button href="/about" variant="ghost" size="lg">
              Our story
            </Button>
          </div>
        </div>

        {/* Stats strip */}
        <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-8 border-t border-white/15 pt-9 sm:grid-cols-4 lg:mt-20">
          {HERO_STATS.map((stat) => (
            <div key={stat.label}>
              <dd className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                <CountUp
                  to={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  staticValue={stat.staticValue}
                />
              </dd>
              <dt className="mt-1.5 text-xs font-medium uppercase tracking-wider text-white/55 sm:text-sm">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
