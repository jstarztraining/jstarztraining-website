import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';

export function StorySection() {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Imagery — placeholder, swaps for Jordan's real action photos */}
        <Reveal direction="left" className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-card">
            <Image
              src="https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1100&q=80"
              alt="Coach guiding a player through a small-group training drill."
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
          </div>
          {/* Floating pull-quote chip */}
          <div className="absolute -bottom-6 -right-3 max-w-[15rem] rounded-2xl bg-navy p-5 text-white shadow-card-hover sm:-right-6">
            <p className="font-display text-lg font-extrabold leading-tight tracking-tight">
              “No ego. No politics. Just soccer.”
            </p>
            <p className="mt-2 text-xs uppercase tracking-wider text-gold-soft">The JStarz mentality</p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-black leading-[1.02] tracking-tightest text-navy">
              A soccer community, <span className="text-brand">not just training.</span>
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink/75">
              JStarz was founded by Jordan Ellis, a Jamaican-born Canadian coach who grew up loving
              the game and wishing he’d had the support and mentorship JStarz now provides. What
              started as a passion became a purpose.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink/75">
              Sessions feel less like traditional training and more like family. Players are
              encouraged to express themselves, compete, laugh, and build real confidence — and
              parents are part of it too.
            </p>
          </Reveal>
          <Reveal delay={210} className="mt-9">
            <Button href="/about" variant="ghost-dark" size="lg">
              Read our story
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
