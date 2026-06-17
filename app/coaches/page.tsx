import type { Metadata } from 'next';
import Image from 'next/image';
import type { Coach } from '@prisma/client';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/site/PageHero';
import { Reveal } from '@/components/motion/Reveal';
import { getActiveCoaches } from '@/lib/queries';
import { SITE } from '@/lib/site';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Coaches & Staff',
  description:
    'Meet the JStarz coaching team — led by founder Jordan Ellis. Experienced, club-neutral coaches developing players and goalkeepers across Halifax, NS.',
};

export default async function CoachesPage() {
  const coaches = await getActiveCoaches();

  return (
    <>
      <PageHero
        eyebrow="The Team"
        titleLead="Meet your"
        titleAccent="coaches."
        subtitle="The people who make JStarz feel like family — and push every player to grow."
      />

      <section className="bg-white py-24 lg:py-32">
        <Container>
          {coaches.length === 0 ? (
            <p className="text-center text-lg text-ink/60">Coach profiles are coming soon.</p>
          ) : (
            <div className="grid gap-10 sm:grid-cols-2 lg:gap-12">
              {coaches.map((coach, i) => (
                <Reveal key={coach.id} delay={(i % 2) * 90}>
                  <CoachCard coach={coach} />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="bg-mist py-20 text-center lg:py-24">
        <Container>
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-display text-[clamp(1.75rem,4vw,2.5rem)] font-black tracking-tightest text-navy">
              Ready to train with us?
            </h2>
          </Reveal>
          <Reveal delay={90} className="mt-8">
            <Button href={SITE.shopifyStoreUrl} size="lg">
              Book a Session
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

function CoachCard({ coach }: { coach: Coach }) {
  return (
    <article className="flex flex-col gap-6 sm:flex-row">
      <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden rounded-[1.5rem] bg-brand-deep shadow-card sm:w-48">
        {coach.imageUrl ? (
          <Image
            src={coach.imageUrl}
            alt={`${coach.name} — ${coach.role}`}
            fill
            sizes="(max-width: 640px) 100vw, 12rem"
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy">{coach.name}</h2>
        <p className="mt-1 font-heading text-sm font-bold uppercase tracking-wide text-brand">{coach.role}</p>
        <p className="mt-4 leading-relaxed text-ink/75">{coach.bio}</p>
      </div>
    </article>
  );
}
