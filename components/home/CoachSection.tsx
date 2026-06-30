import Image from 'next/image';
import type { Coach } from '@prisma/client';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';
import { HEAD_COACH } from '@/lib/content';

export function CoachSection({ coach }: { coach: Coach | null }) {
  // Resilience: the founder is the heart of this section. If no active coach is
  // in the DB yet, fall back to Jordan's real bio (§10) rather than dropping the
  // whole section and the only human face on the homepage.
  const c = coach ?? HEAD_COACH;

  return (
    <section className="relative overflow-hidden bg-navy py-24 text-white lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-6%] top-1/4 h-96 w-96 rounded-full bg-brand/25 blur-[130px]"
      />
      <Container className="relative grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal direction="left" className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-brand-deep shadow-card-hover">
            {c.imageUrl ? (
              <Image
                src={c.imageUrl}
                alt={`${c.name} — ${c.role}`}
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
              />
            ) : null}
          </div>
          <div
            aria-hidden
            className="absolute -left-4 -top-4 -z-10 h-full w-full rounded-[1.75rem] border border-gold/40"
          />
        </Reveal>

        <div>
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-black leading-[1.02] tracking-tightest">
              Meet {c.name.split(' ')[0]}.
            </h2>
            <p className="mt-3 text-base font-semibold text-gold-soft">{c.role}</p>
          </Reveal>
          <Reveal delay={90}>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-white/75">{c.bio}</p>
          </Reveal>
          <Reveal delay={150}>
            <blockquote className="mt-7">
              <p className="font-display text-xl font-extrabold leading-snug tracking-tight text-gold-soft">
                “Train with purpose. Build confidence. Enjoy the game.”
              </p>
            </blockquote>
          </Reveal>
          <Reveal delay={210} className="mt-9">
            <Button href="/coaches" variant="ghost" size="lg">
              Meet the team
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
