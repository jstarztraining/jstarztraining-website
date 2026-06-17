import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { TestimonialForm } from '@/components/admin/testimonials/TestimonialForm';

export default function NewTestimonialPage() {
  return (
    <div>
      <AdminPageHeader title="New testimonial" backHref="/admin/testimonials" backLabel="Testimonials" />
      <TestimonialForm />
    </div>
  );
}
