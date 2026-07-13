import type { Metadata } from 'next';
import type { Session } from '@prisma/client';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/site/PageHero';
import { Reveal } from '@/components/motion/Reveal';
import { getSessions } from '@/lib/queries';
import { weekGrid, SCHEDULE_TZ } from '@/lib/schedule';
import { SITE } from '@/lib/site';
import { cn } from '@/lib/utils';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Schedule',
  description:
    'Weekly JStarz training schedule across BMO Soccer Centre, NDO Fitness, Sandy Lake Academy, and outdoor venues in Halifax, NS. Informational — book through our store.',
  alternates: { canonical: '/schedule' },
};

const timeFmt = new Intl.DateTimeFormat('en-CA', {
  hour: 'numeric',
  minute: '2-digit',
  timeZone: SCHEDULE_TZ,
});

function timeRange(s: Session) {
  if (s.allDay) return 'All day';
  const start = timeFmt.format(s.startsAt);
  return s.endsAt ? `${start} – ${timeFmt.format(s.endsAt)}` : start;
}

// Venue → accent dot (brand palette; outdoor gets a green).
function venueColor(location?: string | null) {
  const l = (location ?? '').toLowerCase();
  if (l.includes('bmo')) return 'bg-brand';
  if (l.includes('ndo')) return 'bg-gold';
  if (l.includes('sandy')) return 'bg-brand-bright';
  if (l.includes('outdoor')) return 'bg-emerald-500';
  return 'bg-navy/40';
}

// Venue detail (§10) — what happens where, keyed to the same colour dots.
const VENUE_INFO = [
  { name: 'BMO Soccer Centre', detail: 'Weekend home base — group development, goalkeeping, and private sessions on Saturdays and Sundays.' },
  { name: 'NDO Fitness Gym', detail: 'Winter-only indoor home for Wednesday-night private training and U9 player development — closed in summer.' },
  { name: 'Sandy Lake Academy Gym', detail: 'Winter-only indoor venue for Thursday technical labs and private 1-on-1 sessions — closed in summer.' },
  { name: 'Outdoor — Summer', detail: 'Private outdoor sessions Monday through Friday across the summer months.' },
];

// Session essentials (§10) — pulled from the FAQ.
const GOOD_TO_KNOW = [
  { title: 'Ages & levels', body: 'Everyone from age 6 through U18, plus adult private clients — all levels welcome.' },
  { title: 'Group size', body: 'Small by design: a maximum of 4–6 players per session for real, individual coaching.' },
  { title: 'What to bring', body: 'Proper footwear for the venue, shin guards, a water bottle, and weather-appropriate gear.' },
  { title: 'Booking', body: 'This board is for reference only — reserve any session through our secure store.' },
];

export default async function SchedulePage() {
  const sessions = await getSessions();
  const week = weekGrid(sessions);
  const hasAny = week.some((d) => d.items.length > 0);

  return (
    <>
      <PageHero
        eyebrow="Schedule"
        titleLead="Your training"
        titleAccent="week."
        subtitle="Where and when we train, at a glance. Informational only — book any session through our store."
        crumb={{ name: 'Schedule', path: '/schedule' }}
      />

      <section className="bg-white py-24 lg:py-32">
        <Container>
          {!hasAny ? (
            <p className="text-center text-lg text-ink/60">The schedule is being finalized — check back soon.</p>
          ) : (
            <Reveal className="overflow-hidden rounded-[1.5rem] border border-navy/12 shadow-card">
              <div className="grid grid-cols-1 gap-px bg-navy/10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
                {week.map((col) => {
                  const rest = col.items.length === 0;
                  return (
                    <div key={col.day} className={cn('flex flex-col p-3', rest ? 'bg-mist/50' : 'bg-white')}>
                      <div className="mb-3 flex items-baseline justify-between border-b border-navy/10 pb-2">
                        <span className="font-display text-base font-black tracking-tight text-navy">{col.short}</span>
                        <span className="text-[0.62rem] font-semibold uppercase tracking-wider text-ink/40">
                          {rest ? 'Rest' : col.items.length}
                        </span>
                      </div>

                      {rest ? (
                        <p className="flex flex-1 items-center justify-center py-6 text-xs text-ink/25">Rest day</p>
                      ) : (
                        <ul className="space-y-2">
                          {col.items.map((s) => (
                            <li key={s.id} className="rounded-xl bg-mist p-2.5 transition-colors duration-300 hover:bg-cloud">
                              <div className="flex items-center gap-1.5">
                                <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', venueColor(s.location))} aria-hidden />
                                <span className="font-heading text-xs font-bold text-brand">{timeRange(s)}</span>
                              </div>
                              <p className="mt-1 text-sm font-semibold leading-snug text-navy">{s.title}</p>
                              <p className="mt-0.5 text-xs leading-snug text-ink/55">
                                {s.location}
                                {s.notes ? ` · ${s.notes}` : ''}
                              </p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </Reveal>
          )}

          {/* Where we train */}
          <Reveal className="mt-16 border-t border-navy/10 pt-14">
            <h2 className="font-display text-[clamp(1.5rem,3.2vw,2.15rem)] font-black tracking-tightest text-navy">
              Where we train
            </h2>
            <p className="mt-3 max-w-prose text-ink/65">
              Four venues across Halifax &amp; Nova Scotia — BMO year-round, NDO and Sandy Lake winter-only, and outdoors all summer.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {VENUE_INFO.map((v) => (
                <div key={v.name} className="rounded-2xl border border-navy/10 bg-mist p-6">
                  <div className="flex items-center gap-2.5">
                    <span className={cn('h-2.5 w-2.5 shrink-0 rounded-full', venueColor(v.name))} aria-hidden />
                    <h3 className="font-heading font-bold leading-tight text-navy">{v.name}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink/65">{v.detail}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Good to know */}
          <Reveal className="mt-16">
            <h2 className="font-display text-[clamp(1.5rem,3.2vw,2.15rem)] font-black tracking-tightest text-navy">
              Good to know
            </h2>
            <div className="mt-8 grid gap-px overflow-hidden rounded-[1.5rem] border border-navy/10 bg-navy/10 sm:grid-cols-2 lg:grid-cols-4">
              {GOOD_TO_KNOW.map((g) => (
                <div key={g.title} className="flex flex-col bg-white p-6">
                  <h3 className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-brand">{g.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink/70">{g.body}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-16 rounded-[1.5rem] bg-navy p-8 text-center text-white sm:p-10">
            <h2 className="font-display text-2xl font-extrabold tracking-tight">Found your session?</h2>
            <p className="mx-auto mt-3 max-w-md text-white/75">
              Booking happens through our secure store — pick your program and check out.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/programs" size="lg">
                Browse programs
              </Button>
              <Button href={SITE.shopifyStoreUrl} variant="ghost" size="lg">
                Visit the store
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
