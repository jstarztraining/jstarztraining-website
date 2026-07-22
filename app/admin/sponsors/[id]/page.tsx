import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { SponsorForm } from '@/components/admin/sponsors/SponsorForm';

export const dynamic = 'force-dynamic';

export default async function EditSponsorPage({ params }: { params: { id: string } }) {
  const sponsor = await prisma.sponsor.findUnique({ where: { id: params.id } });
  if (!sponsor) notFound();

  return (
    <div>
      <AdminPageHeader title="Edit sponsor" backHref="/admin/sponsors" backLabel="Sponsors" />
      <SponsorForm sponsor={sponsor} />
    </div>
  );
}
