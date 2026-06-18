import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/site/PageHero';
import { Reveal } from '@/components/motion/Reveal';
import { getPageContent } from '@/lib/queries';
import { SITE } from '@/lib/site';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'About',
  description:
    'JStarz Training is more than an academy — a soccer community in Halifax, NS founded by Jordan Ellis. Small-group, club-neutral training built on confidence, connection, and community.',
  alternates: { canonical: '/about' },
};

const toList = (s: string) => s.split('\n').map((l) => l.trim()).filter(Boolean);

export default async function AboutPage() {
  const c = await getPageContent('about');
  const whatWeDo = toList(c('whatwedo_items'));
  const mission = toList(c('mission_items'));

  return (
    <>
      <PageHero
        eyebrow="Our Story"
        titleLead="More than an"
        titleAccent="academy."
        subtitle={c('hero_subtitle')}
        crumb={{ name: 'About', path: '/about' }}
      />

      {/* Founding story */}
      <section className="bg-white py-24 lg:py-32">
        <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal direction="left" className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-card">
              <Image
                src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1100&q=80"
                alt="Young players together at a JStarz training session."
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div aria-hidden className="absolute -bottom-5 -right-3 max-w-[15rem] rounded-2xl bg-gold p-5 shadow-card-hover sm:-right-6">
              <p className="font-display text-lg font-extrabold leading-tight tracking-tight text-navy">
                Founded on belonging.
              </p>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-black leading-[1.04] tracking-tightest text-navy">
                {c('story_heading')}
              </h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink/75">{c('story_p1')}</p>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink/75">{c('story_p2')}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* What we do */}
      <section className="bg-mist py-24 lg:py-32">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-brand">What we do</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3rem)] font-black leading-[1.04] tracking-tightest text-navy">
              {c('whatwedo_heading')}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] border border-navy/10 bg-navy/10 sm:grid-cols-2 lg:grid-cols-3">
            {whatWeDo.map((item, i) => (
              <Reveal key={item} delay={(i % 3) * 70} className="bg-white">
                <div className="flex h-full items-start gap-4 p-7">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-gold" aria-hidden />
                  <p className="font-heading font-semibold leading-snug text-navy">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <p className="mt-6 text-sm text-ink/60">
              All group packages include discount codes for private sessions.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Mentality + mission */}
      <section className="relative overflow-hidden bg-navy py-24 text-white lg:py-32">
        <div aria-hidden className="pointer-events-none absolute left-[-8%] top-1/4 h-96 w-96 rounded-full bg-brand/25 blur-[130px]" />
        <Container className="relative grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-gold-soft">The JStarz mentality</p>
              <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.25rem)] font-black leading-[0.98] tracking-tightest">
                No ego. No politics. <span className="text-gold">Just soccer.</span>
              </h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="mt-6 max-w-prose text-lg leading-relaxed text-white/75">{c('mentality_body')}</p>
            </Reveal>
          </div>
          <div>
            <Reveal delay={120}>
              <h3 className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-gold-soft">Our mission</h3>
            </Reveal>
            <ul className="mt-5 space-y-4">
              {mission.map((m, i) => (
                <Reveal key={m} delay={150 + i * 70} as="li" className="flex items-start gap-4 border-b border-white/10 pb-4">
                  <span className="font-display text-lg font-extrabold text-gold">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-lg leading-snug text-white/85">{m}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Close CTA */}
      <section className="bg-white py-24 text-center lg:py-28">
        <Container>
          <Reveal>
            <h2 className="mx-auto max-w-3xl font-display text-[clamp(1.75rem,4.5vw,3rem)] font-black leading-[1.04] tracking-tightest text-navy">
              {c('close_heading')}
            </h2>
          </Reveal>
          <Reveal delay={90} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={SITE.shopifyStoreUrl} size="lg">
              Book a Session
            </Button>
            <Button href="/programs" variant="ghost-dark" size="lg">
              Explore Programs
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
