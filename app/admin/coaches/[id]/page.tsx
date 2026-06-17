import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { CoachForm } from '@/components/admin/coaches/CoachForm';

export const dynamic = 'force-dynamic';

export default async function EditCoachPage({ params }: { params: { id: string } }) {
  const coach = await prisma.coach.findUnique({ where: { id: params.id } });
  if (!coach) notFound();

  return (
    <div>
      <AdminPageHeader title="Edit coach" backHref="/admin/coaches" backLabel="Coaches" />
      <CoachForm coach={coach} />
    </div>
  );
}
