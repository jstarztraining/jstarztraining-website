import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/motion/Reveal';
import { FEATURES } from '@/lib/content';

export function FeaturesSection() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <Container>
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-black leading-[1.02] tracking-tightest text-navy">
            Why families choose JStarz.
          </h2>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink/70">
            We specialize in individual and small-group training built for maximum touches, real
            development, and a place every player wants to come back to.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] border border-navy/10 bg-navy/10 sm:grid-cols-2">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 80} className="group bg-white">
              <div className="flex h-full flex-col p-8 transition-colors duration-500 ease-out-quint group-hover:bg-mist lg:p-10">
                <span
                  aria-hidden
                  className="h-1 w-10 rounded-full bg-gold transition-all duration-500 ease-out-quint group-hover:w-20"
                />
                <h3 className="mt-6 font-display text-xl font-extrabold tracking-tight text-navy lg:text-2xl">
                  {feature.title}
                </h3>
                <p className="mt-3 max-w-prose leading-relaxed text-ink/70">{feature.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
