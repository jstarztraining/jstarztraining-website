import type { Program } from '@prisma/client';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';
import {
  FeaturedProgramCard,
  ProgramCard,
  type CardProgram,
} from '@/components/programs/ProgramCard';
import { FEATURED_PROGRAMS } from '@/lib/content';

type PreviewProgram = CardProgram & { id: string };

// Resilience: if the DB has no active programs (unseeded, or an editor
// deactivated everything), the home page must not lose its conversion core.
// Fall back to the real featured offerings from the brief (§5) so the section
// — and the path to Shopify — always renders.
const FALLBACK: PreviewProgram[] = FEATURED_PROGRAMS.map((p) => ({
  id: p.id,
  title: p.title,
  description: p.blurb,
  priceDisplay: p.priceDisplay,
  imageUrl: p.imageUrl,
  shopifyUrl: p.shopifyUrl,
}));

export function ProgramsPreview({ programs }: { programs: Program[] }) {
  const source: PreviewProgram[] = programs.length > 0 ? programs : FALLBACK;

  const [featured, ...rest] = source.slice(0, 6);

  return (
    <section className="relative bg-mist py-24 lg:py-32">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal className="max-w-2xl">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-black leading-[1.02] tracking-tightest text-navy">
              Training for every player.
            </h2>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink/70">
              Private sessions, small-group development, goalkeeper specialists, camps and parties —
              pick your path and check out securely on our store.
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
