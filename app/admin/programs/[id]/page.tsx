import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ProgramForm } from '@/components/admin/programs/ProgramForm';

export const dynamic = 'force-dynamic';

export default async function EditProgramPage({ params }: { params: { id: string } }) {
  const program = await prisma.program.findUnique({ where: { id: params.id } });
  if (!program) notFound();

  return (
    <div>
      <AdminPageHeader title="Edit program" backHref="/admin/programs" backLabel="Programs" />
      <ProgramForm program={program} />
    </div>
  );
}
