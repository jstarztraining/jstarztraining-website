import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';
import { ProgramCard } from '@/components/programs/ProgramCard';
import { BreadcrumbJsonLd } from '@/components/site/BreadcrumbJsonLd';
import { getActivePrograms } from '@/lib/queries';
import { SITE } from '@/lib/site';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Programs',
  description:
    'Private soccer training, small-group development, goalkeeper sessions, camps and parties in Halifax, NS. Browse JStarz programs and book through our store.',
  alternates: { canonical: '/programs' },
};

export default async function ProgramsPage() {
  const programs = await getActivePrograms();

  return (
    <>
      <BreadcrumbJsonLd name="Programs" path="/programs" />
      {/* Page header — navy band, clears the fixed nav */}
      <section className="relative isolate overflow-hidden bg-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              'radial-gradient(120% 110% at 50% -20%, #114089 0%, #0a2a63 45%, #06183f 80%, #050f29 100%)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-8%] top-0 -z-10 h-80 w-80 rounded-full bg-brand-bright/20 blur-[120px] animate-drift"
        />
        <Container className="pt-36 pb-20 lg:pt-40 lg:pb-24">
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold-soft">
            <span className="h-px w-10 bg-gold" aria-hidden />
            Programs
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.5rem,7vw,4.5rem)] font-black leading-[0.95] tracking-tightest">
            Find your <span className="accent-underline text-gold">program.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            Private and small-group training, goalkeeper specialists, camps and parties — for every
            age and level. Choose a program and book straight through our secure store.
          </p>
        </Container>
      </section>

      {/* Catalog grid */}
      <section className="bg-mist py-20 lg:py-28">
        <Container>
          {programs.length === 0 ? (
            <p className="text-center text-lg text-ink/60">Programs are coming soon.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {programs.map((program, i) => (
                <Reveal key={program.id} delay={(i % 3) * 80}>
                  <ProgramCard program={program} />
                </Reveal>
              ))}
            </div>
          )}

          {/* Booking note — site never handles money */}
          <Reveal className="mt-16">
            <div className="overflow-hidden rounded-[1.5rem] bg-navy p-8 text-white sm:p-12">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-xl">
                  <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                    How booking works
                  </h2>
                  <p className="mt-3 leading-relaxed text-white/75">
                    Pick a program, choose your options, and check out securely through our store.
                    Group packages include discount codes for private sessions. Questions first?
                    We’re happy to help.
                  </p>
                </div>
                <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                  <Button href={SITE.shopifyStoreUrl} size="lg">
                    Visit the store
                  </Button>
                  <Button href="/contact" variant="ghost" size="lg">
                    Contact us
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
