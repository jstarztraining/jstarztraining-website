import type { Metadata } from 'next';
import { PagePlaceholder } from '@/components/layout/PagePlaceholder';

export const metadata: Metadata = { title: 'FAQ' };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="FAQ"
      title="Frequently Asked Questions"
      blurb="Ages, group sizes, locations, what to bring, and how to register — answers coming soon."
    />
  );
}
