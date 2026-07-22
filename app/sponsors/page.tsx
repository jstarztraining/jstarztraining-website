import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Sponsor } from '@prisma/client';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/site/PageHero';
import { Reveal } from '@/components/motion/Reveal';
import { getActiveSponsors, getSiteSettings } from '@/lib/queries';
import { SPONSOR_TIERS } from '@/lib/sponsor-tiers';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Sponsors & Supporters',
  description:
    'The businesses, partners, and community supporters who help JStarz grow the game across Halifax & Nova Scotia. Thank you for backing local soccer.',
  alternates: { canonical: '/sponsors' },
};

export default async function SponsorsPage() {
  // Hidden until switched on in Site Settings — 404 even for direct visits.
  const settings = await getSiteSettings();
  if (!settings?.sponsorsEnabled) notFound();

  const sponsors = await getActiveSponsors();

  // Group by tier, preserving the fixed tier order and dropping empty tiers.
  const grouped = SPONSOR_TIERS.map((tier) => ({
    tier,
    items: sponsors.filter((s) => s.tier === tier),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      <PageHero
        eyebrow="Community"
        titleLead="Our sponsors &"
        titleAccent="supporters."
        subtitle="JStarz is powered by the people and businesses who believe in developing players — and community — across Halifax & Nova Scotia. Thank you."
        crumb={{ name: 'Sponsors & Supporters', path: '/sponsors' }}
      />

      <section className="bg-white py-24 lg:py-32">
        <Container>
          {grouped.length === 0 ? (
            <Reveal className="mx-auto max-w-xl text-center">
              <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-black tracking-tightest text-navy">
                Our sponsor wall is just getting started.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink/70">
                We&rsquo;re building a community of partners and supporters who help us keep training
                accessible. Want to be one of the first?
              </p>
              <div className="mt-8">
                <Button href="/contact" size="lg">
                  Become a Sponsor
                </Button>
              </div>
            </Reveal>
          ) : (
            <div className="space-y-20 lg:space-y-28">
              {grouped.map((group) => (
                <TierBlock key={group.tier} tier={group.tier} items={group.items} />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Become a sponsor CTA (hidden when the page is already the empty-state CTA). */}
      {grouped.length > 0 ? (
        <section className="bg-mist py-20 text-center lg:py-24">
          <Container>
            <Reveal className="mx-auto max-w-2xl">
              <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-brand">
                Back the game
              </p>
              <h2 className="mt-4 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-black tracking-tightest text-navy">
                Want to see your name here?
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink/70">
                Sponsoring JStarz puts your business in front of a growing community of players and
                families — and helps us keep developing the next generation. Let&rsquo;s talk.
              </p>
            </Reveal>
            <Reveal delay={90} className="mt-8">
              <Button href="/contact" size="lg">
                Become a Sponsor
              </Button>
            </Reveal>
          </Container>
        </section>
      ) : null}
    </>
  );
}

function TierBlock({ tier, items }: { tier: string; items: Sponsor[] }) {
  const isSupporters = tier === 'Supporters';
  const isPremier = tier === 'Premier Sponsors';

  return (
    <div>
      <Reveal className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="font-display text-[clamp(1.5rem,3.5vw,2.25rem)] font-black tracking-tightest text-navy">
          {tier}
        </h2>
        <span className="mx-auto mt-4 block h-px w-14 bg-gold" aria-hidden />
      </Reveal>

      {isSupporters ? (
        <Reveal>
          <ul className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
            {items.map((s) => (
              <li key={s.id}>
                <SupporterChip sponsor={s} />
              </li>
            ))}
          </ul>
        </Reveal>
      ) : (
        <div
          className={
            isPremier
              ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
              : 'grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4'
          }
        >
          {items.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 70}>
              <LogoTile sponsor={s} large={isPremier} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}

function LogoTile({ sponsor, large }: { sponsor: Sponsor; large: boolean }) {
  const inner = sponsor.logoUrl ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={sponsor.logoUrl}
      alt={sponsor.name}
      loading="lazy"
      className={`w-full object-contain ${large ? 'h-24 lg:h-28' : 'h-16 lg:h-20'}`}
    />
  ) : (
    <span
      className={`text-center font-display font-extrabold tracking-tight text-navy ${
        large ? 'text-xl lg:text-2xl' : 'text-base lg:text-lg'
      }`}
    >
      {sponsor.name}
    </span>
  );

  const cardCls =
    'flex h-full items-center justify-center rounded-2xl border border-navy/10 bg-white shadow-card ' +
    'transition-all duration-300 ease-out-quint hover:-translate-y-1 hover:border-brand/30 hover:shadow-card-hover ' +
    (large ? 'p-8 lg:p-10' : 'p-6');

  if (sponsor.websiteUrl) {
    return (
      <a
        href={sponsor.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${sponsor.name}`}
        className={cardCls}
      >
        {inner}
      </a>
    );
  }

  return <div className={cardCls}>{inner}</div>;
}

function SupporterChip({ sponsor }: { sponsor: Sponsor }) {
  const inner = (
    <>
      <span className="font-heading text-sm font-bold text-navy">{sponsor.name}</span>
      {sponsor.role ? (
        <span className="text-xs font-medium text-ink/55">· {sponsor.role}</span>
      ) : null}
    </>
  );

  const chipCls =
    'inline-flex items-center gap-2 rounded-full border border-navy/12 bg-mist px-5 py-2.5 transition-colors duration-300';

  if (sponsor.websiteUrl) {
    return (
      <a
        href={sponsor.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${chipCls} hover:border-brand/40 hover:bg-brand/5`}
      >
        {inner}
      </a>
    );
  }

  return <span className={chipCls}>{inner}</span>;
}
