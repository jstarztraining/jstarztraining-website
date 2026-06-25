import { Hero } from '@/components/home/Hero';
import { VenueMarquee } from '@/components/home/VenueMarquee';
import { StorySection } from '@/components/home/StorySection';
import { ProgramsPreview } from '@/components/home/ProgramsPreview';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { CoachSection } from '@/components/home/CoachSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { FinalCta } from '@/components/home/FinalCta';
import {
  getActivePrograms,
  getActiveTestimonials,
  getActiveCoaches,
  getHomeHero,
} from '@/lib/queries';
import type { Metadata } from 'next';
import { SITE } from '@/lib/site';

// Time-based ISR — public pages re-render ~60s after the dashboard writes (§3).
export const revalidate = 60;

// Home shares the layout's default title/description; declared explicitly so its
// canonical is self-contained rather than relying on the layout default.
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsActivityLocation',
  name: SITE.legalName,
  description:
    'Private and small-group soccer and goalkeeper training in Halifax, Nova Scotia.',
  url: 'https://jstarztraining.com',
  image: 'https://jstarztraining.com/opengraph-image',
  email: SITE.email,
  telephone: '+17828212300',
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postal,
    addressCountry: 'CA',
  },
  // Verified coordinates for 680 Parkland Drive, Halifax (Clayton Park West).
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 44.6761,
    longitude: -63.6777,
  },
  // Public training windows per the documented weekly schedule (§10).
  // Set in code (not Jordan-editable, §8) — update here if the schedule shifts.
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Wednesday', opens: '18:00', closes: '21:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Thursday', opens: '18:00', closes: '21:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '13:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '10:00', closes: '14:00' },
  ],
  areaServed: 'Halifax, Nova Scotia',
  sport: 'Soccer',
};

export default async function HomePage() {
  const [hero, programs, testimonials, coaches] = await Promise.all([
    getHomeHero(),
    getActivePrograms(),
    getActiveTestimonials(),
    getActiveCoaches(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <Hero hero={hero} />
      <VenueMarquee />
      <StorySection />
      <ProgramsPreview programs={programs} />
      <FeaturesSection />
      <CoachSection coach={coaches[0] ?? null} />
      <TestimonialsSection testimonials={testimonials} />
      <FinalCta />
    </>
  );
}
