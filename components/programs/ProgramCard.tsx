import Image from 'next/image';
import type { Program } from '@prisma/client';

type CardProgram = Pick<
  Program,
  'title' | 'description' | 'priceDisplay' | 'imageUrl' | 'shopifyUrl'
>;

const linkProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const;

/** Fallback when a program has no image yet (real photos drop in later). */
function ImageFallback() {
  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        backgroundImage:
          'radial-gradient(120% 120% at 30% 0%, #114089 0%, #0a2a63 55%, #06183f 100%)',
      }}
    />
  );
}

/** A program with no store link yet is "Coming soon" — a non-clickable card. */
function isComingSoon(program: CardProgram) {
  return !program.shopifyUrl?.trim();
}

/** Large image-overlay card for a featured program. */
export function FeaturedProgramCard({ program }: { program: CardProgram }) {
  const comingSoon = isComingSoon(program);
  const baseClass =
    'relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-[1.5rem] bg-navy p-7 text-white shadow-card transition-all duration-500 ease-out-quint sm:p-9';

  const body = (
    <>
      {program.imageUrl ? (
        <Image
          src={program.imageUrl}
          alt={program.title}
          fill
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover transition-transform duration-700 ease-out-quint group-hover:scale-105"
        />
      ) : (
        <ImageFallback />
      )}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/10" />
      <div className="relative">
        <span className="inline-flex rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-navy">
          Featured
        </span>
        <h3 className="mt-4 max-w-md font-display text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
          {program.title}
        </h3>
        <p className="mt-3 max-w-md text-white/75">{program.description}</p>
        <div className="mt-5 flex items-center gap-4">
          <span className="font-heading text-lg font-bold text-gold-soft">{program.priceDisplay}</span>
          {comingSoon ? (
            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-white/60">
              Coming soon
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-transform duration-300 ease-out-quint group-hover:translate-x-1">
              Choose options <span aria-hidden>→</span>
            </span>
          )}
        </div>
      </div>
    </>
  );

  if (comingSoon) {
    return <div className={`${baseClass} cursor-default`}>{body}</div>;
  }
  return (
    <a
      href={program.shopifyUrl}
      {...linkProps}
      className={`group ${baseClass} hover:-translate-y-1 hover:shadow-card-hover`}
    >
      {body}
    </a>
  );
}

/** Standard image-top program card. */
export function ProgramCard({ program }: { program: CardProgram }) {
  const comingSoon = isComingSoon(program);
  const baseClass =
    'flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-card transition-all duration-500 ease-out-quint';

  const body = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden">
        {program.imageUrl ? (
          <Image
            src={program.imageUrl}
            alt={program.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out-quint group-hover:scale-105"
          />
        ) : (
          <ImageFallback />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-lg font-bold leading-snug tracking-tight text-navy">
          {program.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/65">{program.description}</p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-heading font-bold text-brand">{program.priceDisplay}</span>
          {comingSoon ? (
            <span className="inline-flex items-center rounded-full bg-ink/5 px-3 py-1 text-sm font-semibold text-ink/60">
              Coming soon
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-ink/55 transition-all duration-300 ease-out-quint group-hover:text-brand group-hover:gap-2">
              Choose options <span aria-hidden>→</span>
            </span>
          )}
        </div>
      </div>
    </>
  );

  if (comingSoon) {
    return <div className={`${baseClass} cursor-default`}>{body}</div>;
  }
  return (
    <a
      href={program.shopifyUrl}
      {...linkProps}
      className={`group ${baseClass} hover:-translate-y-1 hover:shadow-card-hover`}
    >
      {body}
    </a>
  );
}
