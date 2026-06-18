import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/site/PageHero';
import { Reveal } from '@/components/motion/Reveal';
import { prisma } from '@/lib/prisma';
import { SITE } from '@/lib/site';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Action shots, team moments, and community events from JStarz Training in Halifax, NS.',
  alternates: { canonical: '/gallery' },
};

export default async function GalleryPage() {
  const assets = await prisma.mediaAsset.findMany({ orderBy: { sortOrder: 'asc' } });

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        titleLead="Moments on the"
        titleAccent="pitch."
        subtitle="Action, team spirit, and community — a look at JStarz in motion."
        crumb={{ name: 'Gallery', path: '/gallery' }}
      />

      <section className="bg-white py-24 lg:py-32">
        <Container>
          {assets.length === 0 ? (
            <div className="rounded-[1.5rem] border border-dashed border-navy/15 bg-mist p-16 text-center">
              <p className="text-lg text-ink/60">Photos are coming soon.</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-ink/50">
                We’re putting together a gallery of action shots and team moments. Check back soon.
              </p>
            </div>
          ) : (
            <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
              {assets.map((asset, i) => (
                <Reveal key={asset.id} delay={Math.min(i, 8) * 40}>
                  <div className="overflow-hidden rounded-2xl shadow-card">
                    <Image
                      src={asset.url}
                      alt={asset.alt || 'JStarz Training photo'}
                      width={600}
                      height={600}
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="h-auto w-full transition-transform duration-500 ease-out-quint hover:scale-[1.03]"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal className="mt-16 text-center">
            <Button href={SITE.shopifyStoreUrl} size="lg">
              Join the JStarz family
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
