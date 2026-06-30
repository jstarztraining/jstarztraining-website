import { VENUES } from '@/lib/content';

// Seamless scrolling venue strip. Doubled content + translateX(-50%) loop.
export function VenueMarquee() {
  const items = [...VENUES, ...VENUES];
  return (
    <section
      aria-label="Training venues"
      className="border-y border-navy/10 bg-mist py-5"
    >
      <div className="mask-x-fade overflow-hidden">
        <ul className="flex w-max items-center gap-12 animate-marquee whitespace-nowrap pr-12">
          {items.map((venue, i) => (
            <li key={i} className="flex items-center gap-12" aria-hidden={i >= VENUES.length}>
              <span className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-navy/70">
                {venue}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
