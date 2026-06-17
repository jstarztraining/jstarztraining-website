import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { FaqForm } from '@/components/admin/faq/FaqForm';

export const dynamic = 'force-dynamic';

export default async function EditFaqPage({ params }: { params: { id: string } }) {
  const faq = await prisma.faqItem.findUnique({ where: { id: params.id } });
  if (!faq) notFound();

  return (
    <div>
      <AdminPageHeader title="Edit question" backHref="/admin/faq" backLabel="FAQ" />
      <FaqForm faq={faq} />
    </div>
  );
}
