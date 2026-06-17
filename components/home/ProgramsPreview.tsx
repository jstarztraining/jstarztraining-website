import type { Program } from '@prisma/client';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';
import { FeaturedProgramCard, ProgramCard } from '@/components/programs/ProgramCard';

export function ProgramsPreview({ programs }: { programs: Program[] }) {
  if (programs.length === 0) return null;

  const [featured, ...rest] = programs.slice(0, 6);

  return (
    <section className="relative bg-mist py-24 lg:py-32">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal className="max-w-2xl">
            <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-brand">
              Programs
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-black leading-[1.02] tracking-tightest text-navy">
              Training for every player.
            </h2>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink/70">
              Private sessions, small-group development, goalkeeper specialists, camps and parties —
              pick your path and book straight through.
            </p>
          </Reveal>
          <Reveal delay={120} className="hidden sm:block">
            <Button href="/programs" variant="ghost-dark">
              View all programs
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:auto-rows-[1fr]">
          <Reveal direction="scale" className="lg:col-span-2 lg:row-span-2">
            <FeaturedProgramCard program={featured} />
          </Reveal>

          {rest.map((program, i) => (
            <Reveal key={program.id} direction="up" delay={i * 70}>
              <ProgramCard program={program} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 sm:hidden">
          <Button href="/programs" variant="ghost-dark" className="w-full">
            View all programs
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
