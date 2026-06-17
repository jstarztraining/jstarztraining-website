import type { Metadata } from 'next';
import { PagePlaceholder } from '@/components/layout/PagePlaceholder';

export const metadata: Metadata = { title: 'Gallery' };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Gallery"
      title="Gallery"
      blurb="Action shots, team moments, and community events — gallery coming soon."
    />
  );
}
