import type { Metadata } from 'next';
import { PagePlaceholder } from '@/components/layout/PagePlaceholder';

export const metadata: Metadata = { title: 'Contact' };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Contact"
      title="Get in Touch"
      blurb="Questions about programs or booking? A full contact form is on its way — in the meantime, reach us directly."
    />
  );
}
