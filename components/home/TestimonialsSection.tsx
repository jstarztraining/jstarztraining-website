import type { Testimonial } from '@prisma/client';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/motion/Reveal';

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  // Resilience: no real testimonials yet (they're permissioned, §13). Rather than
  // fabricate quotes or drop the section — which would collapse two navy sections
  // together and break the world rhythm — hold the white beat with a confident,
  // honest brand band until real ones are added in the dashboard.
  if (testimonials.length === 0) {
    return (
      <section className="bg-white py-24 lg:py-32">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-black leading-[1.02] tracking-tightest text-navy">
              Built on <span className="text-brand">word of mouth.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-prose text-lg leading-relaxed text-ink/70">
              Families across Halifax &amp; Nova Scotia choose JStarz for real coaching, small
              groups, and a place every player wants to come back to.
            </p>
            <p className="mt-8 font-display text-xl font-extrabold tracking-tight text-navy">
              “No ego. No politics. Just soccer.”
            </p>
          </Reveal>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-white py-24 lg:py-32">
      <Container>
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-black leading-[1.02] tracking-tightest text-navy">
            What parents and players say.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.slice(0, 3).map((t, i) => {
            // Seed stores "Name — Role" in a single field (no role column in §7).
            const [name, role] = t.name.split(' — ');
            return (
              <Reveal key={t.id} delay={i * 90} className="h-full">
                <figure className="flex h-full flex-col rounded-[1.5rem] border border-navy/10 bg-mist p-7 transition-all duration-500 ease-out-quint hover:-translate-y-1 hover:border-gold/50 hover:shadow-card">
                  <span aria-hidden className="font-display text-5xl leading-none text-gold">“</span>
                  <blockquote className="mt-2 flex-1 text-lg leading-relaxed text-ink/80">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-6 border-t border-navy/10 pt-5">
                    <span className="block font-heading font-bold text-navy">{name}</span>
                    {role ? <span className="mt-0.5 block text-sm text-ink/70">{role}</span> : null}
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
