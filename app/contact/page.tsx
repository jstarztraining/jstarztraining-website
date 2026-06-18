import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/site/PageHero';
import { Reveal } from '@/components/motion/Reveal';
import { ContactForm } from '@/components/site/ContactForm';
import { getSiteSettings } from '@/lib/queries';
import { SITE } from '@/lib/site';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with JStarz Training in Halifax, NS. Questions about private soccer or goalkeeper training, programs, camps, or parties — we’re happy to help.',
  alternates: { canonical: '/contact' },
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const email = settings?.email || SITE.email;
  const phone = settings?.phone || SITE.phone;
  const phoneHref = phone ? `tel:${phone.replace(/[^0-9+]/g, '')}` : SITE.phoneHref;
  const address =
    settings?.address ||
    `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postal}`;
  const hours = settings?.hours;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        titleLead="Get in"
        titleAccent="touch."
        subtitle="Questions about programs, booking, camps, or parties? Send us a note and we’ll get back to you."
        crumb={{ name: 'Contact', path: '/contact' }}
      />

      <section className="bg-white py-24 lg:py-32">
        <Container className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy">Send a message</h2>
            <p className="mt-2 text-ink/65">We usually reply within a day or two.</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-[1.5rem] bg-mist p-8">
              <h2 className="font-heading text-sm font-bold uppercase tracking-[0.16em] text-ink/50">
                Reach us directly
              </h2>
              <ul className="mt-6 space-y-6">
                <ContactRow label="Email">
                  <a href={`mailto:${email}`} className="text-navy transition-colors hover:text-brand">
                    {email}
                  </a>
                </ContactRow>
                <ContactRow label="Phone">
                  <a href={phoneHref} className="text-navy transition-colors hover:text-brand">
                    {phone}
                  </a>
                </ContactRow>
                <ContactRow label="Location">
                  <span className="text-navy">{address}</span>
                </ContactRow>
                {hours ? (
                  <ContactRow label="Hours">
                    <span className="text-navy">{hours}</span>
                  </ContactRow>
                ) : null}
              </ul>

              {settings?.mapEmbed ? (
                <div className="mt-8 aspect-video overflow-hidden rounded-2xl ring-1 ring-navy/10">
                  <iframe
                    src={settings.mapEmbed}
                    title="JStarz location map"
                    className="h-full w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              ) : null}

              <p className="mt-8 rounded-xl bg-white p-4 text-sm leading-relaxed text-ink/65 ring-1 ring-navy/10">
                Ready to book? Browse{' '}
                <a href="/programs" className="font-semibold text-brand hover:underline">
                  our programs
                </a>{' '}
                and check out securely through our store.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

function ContactRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <li>
      <span className="block text-xs font-bold uppercase tracking-wider text-brand">{label}</span>
      <span className="mt-1 block font-heading">{children}</span>
    </li>
  );
}
