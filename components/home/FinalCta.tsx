import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 text-white lg:py-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(110% 120% at 50% 120%, var(--brand-crown) 0%, #0a2a63 45%, #06183f 100%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-gold/15 blur-[120px]"
      />
      <Container className="relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl font-display text-[clamp(2.25rem,5.5vw,4rem)] font-black leading-[0.98] tracking-tightest">
            Ready to train with{' '}
            <span className="accent-underline text-gold">purpose?</span>
          </h2>
        </Reveal>
        <Reveal delay={90}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            Join a community where every player is welcomed, challenged, and developed. Book your
            first session today — all teams, all backgrounds, all welcome.
          </p>
        </Reveal>
        <Reveal delay={150} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/programs" size="lg">
            Book a Session
            <span aria-hidden className="transition-transform duration-300 ease-out-quint group-hover/btn:translate-x-1">
              →
            </span>
          </Button>
          <Button href="/contact" variant="ghost" size="lg">
            Get in touch
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
