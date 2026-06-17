import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SITE } from '@/lib/site';

/**
 * Temporary on-brand placeholder for routes not yet built, so the nav never
 * dead-links during preview. Each gets replaced by its real page in build order.
 */
export function PagePlaceholder({
  eyebrow,
  title,
  blurb,
}: {
  eyebrow: string;
  title: string;
  blurb: string;
}) {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-navy text-white">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(120% 95% at 50% -10%, #114089 0%, #0a2a63 40%, #06183f 75%, #050f29 100%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-1/4 -z-10 h-96 w-96 rounded-full bg-brand-bright/20 blur-[130px] animate-drift"
      />
      <Container className="py-32 text-center">
        <p className="flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold-soft">
          <span className="h-px w-8 bg-gold" aria-hidden />
          {eyebrow}
          <span className="h-px w-8 bg-gold" aria-hidden />
        </p>
        <h1 className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2.25rem,6vw,4rem)] font-black leading-[0.98] tracking-tightest">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/70">{blurb}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={SITE.shopifyStoreUrl} size="lg">
            Book a Session
          </Button>
          <Button href="/" variant="ghost" size="lg">
            Back to home
          </Button>
        </div>
      </Container>
    </section>
  );
}
