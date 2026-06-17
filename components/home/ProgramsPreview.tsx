import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';
import { FEATURED_PROGRAMS, type Program } from '@/lib/content';

export function ProgramsPreview() {
  const [featured, ...rest] = FEATURED_PROGRAMS;

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
              View all 20 programs
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:auto-rows-[1fr]">
          {/* Featured card — image overlay, spans two columns + rows on desktop */}
          <Reveal direction="scale" className="lg:col-span-2 lg:row-span-2">
            <FeaturedProgramCard program={featured} />
          </Reveal>

          {rest.map((program, i) => (
            <Reveal key={program.id} direction="up" delay={i * 70}>
              <ProgramCard program={program} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FeaturedProgramCard({ program }: { program: Program }) {
  return (
    <a
      href={program.shopifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-[1.5rem] bg-navy p-7 text-white shadow-card transition-all duration-500 ease-out-quint hover:-translate-y-1 hover:shadow-card-hover sm:p-9"
    >
      <Image
        src={program.imageUrl}
        alt={program.imageAlt}
        fill
        sizes="(max-width: 1024px) 100vw, 66vw"
        className="object-cover transition-transform duration-700 ease-out-quint group-hover:scale-105"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/10" />
      <div className="relative">
        <span className="inline-flex rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-navy">
          {program.category}
        </span>
        <h3 className="mt-4 max-w-md font-display text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
          {program.title}
        </h3>
        <p className="mt-3 max-w-md text-white/75">{program.blurb}</p>
        <div className="mt-5 flex items-center gap-4">
          <span className="font-heading text-lg font-bold text-gold-soft">{program.priceDisplay}</span>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-transform duration-300 ease-out-quint group-hover:translate-x-1">
            Choose options <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </a>
  );
}

function ProgramCard({ program }: { program: Program }) {
  return (
    <a
      href={program.shopifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-card transition-all duration-500 ease-out-quint hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={program.imageUrl}
          alt={program.imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out-quint group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 inline-flex rounded-full bg-white/90 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-navy backdrop-blur">
          {program.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-lg font-bold leading-snug tracking-tight text-navy">
          {program.title}
        </h3>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-heading font-bold text-brand">{program.priceDisplay}</span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-ink/55 transition-all duration-300 ease-out-quint group-hover:text-brand group-hover:gap-2">
            Choose options <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </a>
  );
}
