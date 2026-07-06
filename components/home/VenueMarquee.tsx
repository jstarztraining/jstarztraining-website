import { VENUES } from '@/lib/content';

// Where-we-train strip: the four training homes as an honest, filled-width row
// of real places — gold pin badge, name, and a day/type note. Daylight (mist)
// world, gold as the only accent. Static by design; four venues are a knowable
// set, not an infinite ticker.

const VENUE_NOTES: Record<string, string> = {
  'BMO Soccer Centre': 'Sat & Sun · indoor turf',
  'NDO Fitness Gym': 'Wed · speed & strength',
  'Sandy Lake Academy Gym': 'Thu · private sessions',
  'Outdoor — Summer': 'Mon–Fri · outdoor',
};

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[19px] w-[19px]">
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"
        fill="#e6b945"
      />
    </svg>
  );
}

export function VenueMarquee() {
  return (
    <section
      aria-label="Training venues"
      className="border-y border-navy/10 bg-mist"
    >
      <div className="mx-auto grid max-w-[92rem] grid-cols-1 items-center gap-4 px-[clamp(1.25rem,5vw,3rem)] py-[clamp(1.15rem,2.3vw,1.7rem)] md:grid-cols-[auto_1fr] md:gap-[clamp(1.5rem,4vw,3.5rem)]">
        <div className="flex items-baseline gap-2 border-b border-navy/10 pb-3 md:flex-col md:items-start md:gap-0.5 md:border-b-0 md:border-r md:border-navy/[0.12] md:pb-0 md:pr-[clamp(1.25rem,2.5vw,2.25rem)]">
          <p className="whitespace-nowrap font-heading text-base font-extrabold tracking-tight text-navy">
            Where we train
          </p>
          <p className="whitespace-nowrap text-[0.78rem] text-navy/70">
            Four homes across Halifax
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 md:grid-cols-4 md:gap-[clamp(0.85rem,2.2vw,2rem)]">
          {VENUES.map((venue) => (
            <li
              key={venue}
              className="group flex items-center gap-3 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5"
            >
              <span className="grid h-[38px] w-[38px] flex-none place-items-center rounded-[11px] bg-gold/[0.15] shadow-[inset_0_0_0_1px_rgba(230,185,69,0.35)] transition duration-300 group-hover:bg-gold/[0.26] group-hover:shadow-[inset_0_0_0_1px_rgba(230,185,69,0.55),0_7px_16px_-8px_rgba(230,185,69,0.65)]">
                <PinIcon />
              </span>
              <span className="min-w-0">
                <span className="block font-heading text-[clamp(0.92rem,1.35vw,1.05rem)] font-extrabold leading-[1.12] tracking-tight text-navy">
                  {venue}
                </span>
                {VENUE_NOTES[venue] ? (
                  <span className="block text-[0.8rem] leading-tight text-[#47506a]">
                    {VENUE_NOTES[venue]}
                  </span>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
