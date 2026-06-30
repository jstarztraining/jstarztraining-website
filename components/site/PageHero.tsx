import { Container } from '@/components/ui/Container';
import { BreadcrumbJsonLd } from '@/components/site/BreadcrumbJsonLd';

/**
 * Shared navy page header for interior public pages — clears the fixed nav,
 * with the gold eyebrow + accented title used across the site. When `crumb` is
 * passed it also emits BreadcrumbList structured data (§8).
 */
export function PageHero({
  eyebrow,
  titleLead,
  titleAccent,
  subtitle,
  crumb,
}: {
  eyebrow: string;
  titleLead: string;
  titleAccent?: string;
  subtitle?: string;
  crumb?: { name: string; path: string };
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      {crumb ? <BreadcrumbJsonLd name={crumb.name} path={crumb.path} /> : null}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(120% 110% at 50% -20%, var(--brand-crown) 0%, #0a2a63 45%, #06183f 80%, var(--navy-floor) 100%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-8%] top-0 -z-10 h-80 w-80 rounded-full bg-brand-bright/20 blur-[120px] animate-drift"
      />
      <Container className="pt-36 pb-20 lg:pt-40 lg:pb-24">
        <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold-soft">
          <span className="h-px w-10 bg-gold" aria-hidden />
          {eyebrow}
        </p>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,7vw,4.5rem)] font-black leading-[0.95] tracking-tightest">
          {titleLead}
          {titleAccent ? (
            <>
              {' '}
              <span className="accent-underline text-gold">{titleAccent}</span>
            </>
          ) : null}
        </h1>
        {subtitle ? (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{subtitle}</p>
        ) : null}
      </Container>
    </section>
  );
}
