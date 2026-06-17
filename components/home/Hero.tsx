import type { HomeHero } from '@prisma/client';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SoccerBall } from '@/components/ui/SoccerBall';
import { CountUp } from '@/components/motion/CountUp';
import { HERO_STATS } from '@/lib/content';
import { SITE } from '@/lib/site';
import { cn } from '@/lib/utils';

const FALLBACK = {
  headline: 'Elevate Your Game.',
  subhead:
    'One-on-one and small-group training (4–6 max) for players and goalkeepers of every age and background. More touches. Real coaching. A community that feels like family.',
  ctaLabel: 'Book a Session',
  ctaUrl: SITE.shopifyStoreUrl,
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

      {/* Base radial gradient: deep blue crown → navy floor */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage:
            'radial-gradient(130% 95% at 50% -10%, #114089 0%, #0a2a63 38%, #06183f 70%, #050f29 100%)',
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
      {/* Faint pitch-line grid */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(80% 70% at 50% 35%, #000 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(80% 70% at 50% 35%, #000 30%, transparent 100%)',
        }}
      />

      {/* Floating ball */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[4%] top-[20%] -z-10 hidden h-44 w-44 opacity-90 animate-float md:block lg:right-[8%] lg:h-56 lg:w-56 xl:h-64 xl:w-64"
      >
        <SoccerBall className="drop-shadow-[0_30px_60px_rgba(5,15,41,0.6)]" />
      </div>

      <Container
        className={cn(
          'relative flex flex-1 flex-col justify-center pb-16',
          // Extra top padding when the promo banner adds a row to the fixed header.
          hero?.bannerEnabled && hero.bannerMessage ? 'pt-40 lg:pt-44' : 'pt-32 lg:pt-36',
        )}
      >
        <div className="max-w-3xl">
          {/* Single deliberate brand kicker (not repeated per section) */}
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold-soft">
            <span className="h-px w-10 bg-gold" aria-hidden />
            Private Soccer Training · Halifax, NS
          </p>

          <h1 className="mt-6 font-display text-[clamp(2.75rem,8.5vw,5.5rem)] font-black leading-[0.95] tracking-tightest text-white">
            {lead ? <>{lead} </> : null}
            <span className="accent-underline text-gold">{accent}</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl">{subhead}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={ctaUrl} size="lg">
              {ctaLabel}
              <span aria-hidden className="transition-transform duration-300 ease-out-quint group-hover/btn:translate-x-1">
                →
              </span>
            </Button>
            <Button href="/programs" variant="ghost" size="lg">
              Explore Programs
            </Button>
          </div>
        </div>

        {/* Stats strip */}
        <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-8 border-t border-white/15 pt-9 sm:grid-cols-4 lg:mt-20">
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

      {/* Scroll cue */}
      <div aria-hidden className="absolute inset-x-0 bottom-6 flex justify-center">
        <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/25 p-1.5">
          <span className="h-2 w-1 rounded-full bg-gold animate-scroll-cue" />
        </span>
      </div>
    </section>
  );
}
