import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { TestimonialForm } from '@/components/admin/testimonials/TestimonialForm';

export const dynamic = 'force-dynamic';

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
  const testimonial = await prisma.testimonial.findUnique({ where: { id: params.id } });
  if (!testimonial) notFound();

  return (
    <div>
      <AdminPageHeader title="Edit testimonial" backHref="/admin/testimonials" backLabel="Testimonials" />
      <TestimonialForm testimonial={testimonial} />
    </div>
  );
}
