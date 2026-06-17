import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/site/PageHero';
import { Reveal } from '@/components/motion/Reveal';
import { getActiveTestimonials } from '@/lib/queries';
import { SITE } from '@/lib/site';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Testimonials',
  description:
    'What parents and players say about JStarz private soccer training in Halifax, NS — real stories from the JStarz community.',
};

export default async function TestimonialsPage() {
  const testimonials = await getActiveTestimonials();

  return (
    <>
      <PageHero
        eyebrow="From the JStarz family"
        titleLead="Voices of our"
        titleAccent="community."
        subtitle="The best measure of our work is how players and parents feel about it."
      />

      <section className="bg-white py-24 lg:py-32">
        <Container>
          {testimonials.length === 0 ? (
            <p className="text-center text-lg text-ink/60">Testimonials are coming soon.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t, i) => {
                const [name, role] = t.name.split(' — ');
                return (
                  <Reveal key={t.id} delay={(i % 3) * 80} className="h-full">
                    <figure className="flex h-full flex-col rounded-[1.5rem] border border-navy/10 bg-mist p-7 transition-all duration-500 ease-out-quint hover:-translate-y-1 hover:border-gold/50 hover:shadow-card">
                      <span aria-hidden className="font-display text-5xl leading-none text-gold">“</span>
                      <blockquote className="mt-2 flex-1 text-lg leading-relaxed text-ink/80">{t.quote}</blockquote>
                      <figcaption className="mt-6 border-t border-navy/10 pt-5">
                        <span className="block font-heading font-bold text-navy">{name}</span>
                        {role ? <span className="mt-0.5 block text-sm text-ink/55">{role}</span> : null}
                      </figcaption>
                    </figure>
                  </Reveal>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      <section className="relative overflow-hidden bg-navy py-20 text-center text-white lg:py-24">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-gold/15 blur-[120px]" />
        <Container className="relative">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-display text-[clamp(1.75rem,4vw,2.75rem)] font-black tracking-tightest">
              Become part of the story.
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
