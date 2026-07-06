import type { Metadata } from 'next';
import Image from 'next/image';
import type { Coach } from '@prisma/client';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/site/PageHero';
import { Reveal } from '@/components/motion/Reveal';
import { getActiveCoaches } from '@/lib/queries';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Coaches & Staff',
  description:
    'Meet the JStarz coaching team — led by founder Jordan Ellis. Experienced, club-neutral coaches developing players and goalkeepers across Halifax, NS.',
  alternates: { canonical: '/coaches' },
};

const FLIS = [
  { letter: 'F', word: 'Fun' },
  { letter: 'L', word: 'Learn' },
  { letter: 'I', word: 'Intense' },
  { letter: 'S', word: 'Safe' },
];

const CULTURES = ['Jamaican', 'Canadian', 'Korean', 'Indian', 'Brazilian', 'Arabic', 'African'];

export default async function CoachesPage() {
  const coaches = await getActiveCoaches();

  return (
    <>
      <PageHero
        eyebrow="The Team"
        titleLead="Meet your"
        titleAccent="coaches."
        subtitle="The people who make JStarz feel like family — and push every player to grow."
        crumb={{ name: 'Coaches & Staff', path: '/coaches' }}
      />

      {/* Coaching team philosophy */}
      <section className="bg-white py-24 lg:py-32">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)] font-black leading-[1.03] tracking-tightest text-navy">
                More than <span className="text-brand">coaches.</span>
              </h2>
              <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink/75">
                At JStarz, everyone on our team understands they are more than just a coach. Our
                coaches are passionate about the game and enjoy training and having fun just as much
                as the players we work with.
              </p>
              <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink/75">
                Private training is the foundation of what we do, while our group sessions are highly
                interactive, with coaches actively involved throughout. What truly separates JStarz
                is the diversity, passion, and community our coaches create together.
              </p>
            </Reveal>

            <Reveal direction="right">
              <div className="rounded-[1.75rem] bg-navy p-8 text-white shadow-card-hover sm:p-10">
                <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-gold-soft">
                  The FLIS Philosophy
                </p>
                <p className="mt-2 text-sm text-white/60">Every coach trains under it.</p>
                <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-6">
                  {FLIS.map((f) => (
                    <div key={f.word} className="flex items-baseline gap-3">
                      <dt className="font-display text-3xl font-black leading-none text-gold">{f.letter}</dt>
                      <dd className="font-heading text-lg font-bold tracking-tight text-white">{f.word}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/15 pt-7">
                  <div>
                    <p className="font-display text-3xl font-extrabold tracking-tight">20+</p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/55">
                      Senior &amp; junior coaches
                    </p>
                  </div>
                  <div>
                    <p className="font-display text-3xl font-extrabold tracking-tight">5</p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/55">
                      Goalkeeper specialists
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Diversity */}
          <Reveal delay={80} className="mt-14 border-t border-navy/10 pt-10">
            <p className="max-w-prose text-lg leading-relaxed text-ink/75">
              Our coaches come from a wide variety of backgrounds — creating an inclusive environment
              where every player can feel represented and welcomed.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {CULTURES.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-navy/12 bg-mist px-4 py-1.5 font-heading text-sm font-semibold text-navy"
                >
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Featured coaches */}
      <section className="bg-mist py-24 lg:py-32">
        <Container>
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-brand">Meet some of the team</p>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-black tracking-tightest text-navy">
              The coaches leading your sessions.
            </h2>
          </Reveal>
          {coaches.length === 0 ? (
            <p className="text-center text-lg text-ink/60">Coach profiles are coming soon.</p>
          ) : (
            <div className="grid gap-10 sm:grid-cols-2 lg:gap-12">
              {coaches.map((coach, i) => (
                <Reveal key={coach.id} delay={(i % 2) * 90}>
                  <CoachCard coach={coach} />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="bg-white py-20 text-center lg:py-24">
        <Container>
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-display text-[clamp(1.75rem,4vw,2.5rem)] font-black tracking-tightest text-navy">
              Ready to train with us?
            </h2>
          </Reveal>
          <Reveal delay={90} className="mt-8">
            <Button href="/programs" size="lg">
              Book a Session
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

function CoachCard({ coach }: { coach: Coach }) {
  return (
    <article className="flex flex-col gap-6 sm:flex-row">
      <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden rounded-[1.5rem] bg-brand-deep shadow-card sm:w-48">
        {coach.imageUrl ? (
          <Image
            src={coach.imageUrl}
            alt={`${coach.name} — ${coach.role}`}
            fill
            sizes="(max-width: 640px) 100vw, 12rem"
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy">{coach.name}</h2>
        <p className="mt-1 font-heading text-sm font-bold uppercase tracking-wide text-brand">{coach.role}</p>
        <div className="mt-4 space-y-3">
          {coach.bio.split('\n').map((para) => para.trim()).filter(Boolean).map((para, i) => (
            <p key={i} className="leading-relaxed text-ink/75">{para}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
