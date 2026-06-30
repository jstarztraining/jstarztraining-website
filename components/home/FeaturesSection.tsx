import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/motion/Reveal';
import { FEATURES } from '@/lib/content';

// Verified Unsplash id — placeholder for Jordan's real action photography (§13).
const ACTION_PHOTO =
  'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?auto=format&fit=crop&w=1600&q=80';

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

        {/* Warm, full-width action band — the human/field moment this section was
            missing. Landscape framing keeps it distinct from the portrait side-
            photos in Story/Coach. */}
        <Reveal direction="scale" className="relative mt-12">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] shadow-card sm:aspect-[16/7] lg:aspect-[16/6]">
            <Image
              src={ACTION_PHOTO}
              alt="Young players competing during a small-group JStarz training session."
              fill
              sizes="(max-width: 1024px) 100vw, 80rem"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/15 to-transparent"
            />
            <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-white sm:bottom-6 sm:left-6">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
              Halifax · Nova Scotia
            </span>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] border border-navy/10 bg-navy/10 sm:grid-cols-2">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 80} className="group bg-white">
              <div className="flex h-full flex-col p-8 transition-colors duration-500 ease-out-quint group-hover:bg-mist lg:p-10">
                <span
                  aria-hidden
                  className="h-1 w-20 origin-left scale-x-50 rounded-full bg-gold transition-transform duration-500 ease-out-quint group-hover:scale-x-100"
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
