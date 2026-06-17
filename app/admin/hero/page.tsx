import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { HeroForm } from '@/components/admin/HeroForm';

export const dynamic = 'force-dynamic';

export default async function AdminHeroPage() {
  const hero = await prisma.homeHero.findUnique({ where: { id: 'singleton' } });

  return (
    <div>
      <AdminPageHeader
        title="Hero & Banner"
        description="The homepage headline, subheading, call-to-action button, and optional promo banner."
        backHref="/admin"
        backLabel="Dashboard"
      />
      <HeroForm hero={hero} />
    </div>
  );
}
