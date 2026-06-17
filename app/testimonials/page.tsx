import type { Metadata } from 'next';
import { PagePlaceholder } from '@/components/layout/PagePlaceholder';

export const metadata: Metadata = { title: 'Testimonials' };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Testimonials"
      title="Voices of the JStarz Family"
      blurb="Real stories from players and parents — coming soon."
    />
  );
}
