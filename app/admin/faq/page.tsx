import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { SortableAdminList } from '@/components/admin/SortableAdminList';
import { reorderFaqs, toggleFaqActive, deleteFaq } from '@/lib/actions/faqs';

export const dynamic = 'force-dynamic';

export default async function AdminFaqPage() {
  const faqs = await prisma.faqItem.findMany({ orderBy: { sortOrder: 'asc' } });
  const rows = faqs.map((f) => ({
    id: f.id,
    isActive: f.isActive,
    primary: f.question,
    secondary: f.answer,
  }));

  return (
    <div>
      <AdminPageHeader
        title="FAQ"
        description="Add, edit, reorder, and show/hide questions. Drag the handle (or use ▲▼) to reorder."
        backHref="/admin"
        backLabel="Dashboard"
        action={
          <Link href="/admin/faq/new" className="inline-flex h-11 items-center rounded-full bg-gold px-6 font-heading font-semibold text-navy transition-colors hover:bg-gold-soft">
            + New question
          </Link>
        }
      />
      <SortableAdminList
        rows={rows}
        editHrefBase="/admin/faq"
        newHref="/admin/faq/new"
        entityLabel="question"
        actions={{ reorder: reorderFaqs, toggle: toggleFaqActive, remove: deleteFaq }}
      />
    </div>
  );
}
