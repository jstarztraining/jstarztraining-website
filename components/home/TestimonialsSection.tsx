import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/motion/Reveal';
import { TESTIMONIALS } from '@/lib/content';

export function TestimonialsSection() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <Container>
        <Reveal className="max-w-3xl">
          <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-brand">
            From the JStarz family
          </p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-black leading-[1.02] tracking-tightest text-navy">
            What parents and players say.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 90} className="h-full">
              <figure className="flex h-full flex-col rounded-[1.5rem] border border-navy/10 bg-mist p-7 transition-all duration-500 ease-out-quint hover:-translate-y-1 hover:border-gold/50 hover:shadow-card">
                <span aria-hidden className="font-display text-5xl leading-none text-gold">“</span>
                <blockquote className="mt-2 flex-1 text-lg leading-relaxed text-ink/80">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-navy/10 pt-5">
                  <span className="block font-heading font-bold text-navy">{t.name}</span>
                  <span className="mt-0.5 block text-sm text-ink/55">{t.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-sm text-ink/45">Sample testimonials — real, permissioned quotes coming soon.</p>
      </Container>
    </section>
  );
}
