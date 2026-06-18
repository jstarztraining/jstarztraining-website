import type { Metadata } from 'next';
import type { Session } from '@prisma/client';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/site/PageHero';
import { Reveal } from '@/components/motion/Reveal';
import { getSessions } from '@/lib/queries';
import { groupByWeekday, SCHEDULE_TZ } from '@/lib/schedule';
import { VENUES } from '@/lib/content';
import { SITE } from '@/lib/site';

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

export default async function SchedulePage() {
  const sessions = await getSessions();

  // Weekly board: group by weekday + time-of-day, regardless of calendar week.
  const groups = groupByWeekday(sessions);

  return (
    <>
      <PageHero
        eyebrow="Schedule"
        titleLead="Weekly"
        titleAccent="training."
        subtitle="Where and when we train each week. Informational only — book any session through our store."
        crumb={{ name: 'Schedule', path: '/schedule' }}
      />

      <section className="bg-white py-24 lg:py-32">
        <Container className="max-w-4xl">
          {groups.length === 0 ? (
            <p className="text-center text-lg text-ink/60">The schedule is being finalized — check back soon.</p>
          ) : (
            <div className="space-y-10">
              {groups.map((group, gi) => (
                <Reveal key={group.day} delay={Math.min(gi, 5) * 60}>
                  <div className="grid gap-4 sm:grid-cols-[8rem_1fr]">
                    <h2 className="font-display text-xl font-extrabold tracking-tight text-navy sm:pt-2">
                      {group.day}
                    </h2>
                    <ul className="space-y-3">
                      {group.items.map((s) => (
                        <li
                          key={s.id}
                          className="flex flex-col gap-1 rounded-2xl border border-navy/10 bg-mist p-5 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div>
                            <p className="font-heading font-bold text-navy">{s.title}</p>
                            <p className="mt-0.5 text-sm text-ink/60">
                              {s.location}
                              {s.notes ? ` · ${s.notes}` : ''}
                            </p>
                          </div>
                          <span className="shrink-0 font-heading text-sm font-semibold text-brand">
                            {timeRange(s)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {/* Venues legend */}
          <Reveal className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-navy/10 pt-8 text-sm text-ink/60">
            <span className="font-bold uppercase tracking-wide text-ink/45">Venues</span>
            {VENUES.map((v) => (
              <span key={v} className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
                {v}
              </span>
            ))}
          </Reveal>

          <Reveal className="mt-12 rounded-[1.5rem] bg-navy p-8 text-center text-white sm:p-10">
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
