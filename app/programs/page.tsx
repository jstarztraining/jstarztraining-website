import type { Metadata } from 'next';
import { PagePlaceholder } from '@/components/layout/PagePlaceholder';

export const metadata: Metadata = { title: 'Programs' };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Programs"
      title="Programs"
      blurb="20 programs across private training, small-group development, goalkeeping, and camps — full details coming soon. Book any program now through our store."
    />
  );
}
