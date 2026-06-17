import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { SortableAdminList } from '@/components/admin/SortableAdminList';
import {
  reorderTestimonials,
  toggleTestimonialActive,
  deleteTestimonial,
} from '@/lib/actions/testimonials';

export const dynamic = 'force-dynamic';

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { sortOrder: 'asc' } });
  const rows = testimonials.map((t) => ({
    id: t.id,
    isActive: t.isActive,
    primary: t.name,
    secondary: t.quote,
  }));

  return (
    <div>
      <AdminPageHeader
        title="Testimonials"
        description="Add, edit, reorder, and show/hide testimonials. Drag the handle (or use ▲▼) to reorder."
        backHref="/admin"
        backLabel="Dashboard"
        action={
          <Link href="/admin/testimonials/new" className="inline-flex h-11 items-center rounded-full bg-gold px-6 font-heading font-semibold text-navy transition-colors hover:bg-gold-soft">
            + New testimonial
          </Link>
        }
      />
      <SortableAdminList
        rows={rows}
        editHrefBase="/admin/testimonials"
        newHref="/admin/testimonials/new"
        entityLabel="testimonial"
        actions={{
          reorder: reorderTestimonials,
          toggle: toggleTestimonialActive,
          remove: deleteTestimonial,
        }}
      />
    </div>
  );
}
