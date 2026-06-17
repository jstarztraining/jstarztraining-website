import { Hero } from '@/components/home/Hero';
import { VenueMarquee } from '@/components/home/VenueMarquee';
import { StorySection } from '@/components/home/StorySection';
import { ProgramsPreview } from '@/components/home/ProgramsPreview';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { CoachSection } from '@/components/home/CoachSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { FinalCta } from '@/components/home/FinalCta';
import { SITE } from '@/lib/site';

// Time-based ISR — public pages re-render ~60s after the dashboard writes (§3).
export const revalidate = 60;

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsActivityLocation',
  name: SITE.legalName,
  description:
    'Private and small-group soccer and goalkeeper training in Halifax, Nova Scotia.',
  url: 'https://jstarztraining.com',
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
  areaServed: 'Halifax, Nova Scotia',
  sport: 'Soccer',
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <Hero />
      <VenueMarquee />
      <StorySection />
      <ProgramsPreview />
      <FeaturesSection />
      <CoachSection />
      <TestimonialsSection />
      <FinalCta />
    </>
  );
}
