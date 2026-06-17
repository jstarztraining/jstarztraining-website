'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { requireEditor } from '@/lib/auth-guard';
import type { FormState } from '@/lib/form-state';

function revalidateTestimonials() {
  revalidatePath('/');
  revalidatePath('/testimonials');
  revalidatePath('/admin/testimonials');
}

export async function saveTestimonial(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireEditor();

  const id = String(formData.get('id') ?? '').trim();
  const name = String(formData.get('name') ?? '').trim();
  const quote = String(formData.get('quote') ?? '').trim();
  const isActive = formData.get('isActive') === 'on';

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = 'A name / attribution is required.';
  if (!quote) fieldErrors.quote = 'The quote is required.';
  if (Object.keys(fieldErrors).length) return { fieldErrors };

  const data = { name, quote, isActive };

  try {
    if (id) {
      await prisma.testimonial.update({ where: { id }, data });
    } else {
      const count = await prisma.testimonial.count();
      await prisma.testimonial.create({ data: { ...data, sortOrder: count } });
    }
  } catch {
    return { error: 'Something went wrong saving this testimonial. Please try again.' };
  }

  revalidateTestimonials();
  redirect('/admin/testimonials');
}

export async function deleteTestimonial(id: string) {
  await requireEditor();
  await prisma.testimonial.delete({ where: { id } });
  revalidateTestimonials();
}

export async function toggleTestimonialActive(id: string, isActive: boolean) {
  await requireEditor();
  await prisma.testimonial.update({ where: { id }, data: { isActive } });
  revalidateTestimonials();
}

export async function reorderTestimonials(orderedIds: string[]) {
  await requireEditor();
  await prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.testimonial.update({ where: { id }, data: { sortOrder: index } }),
    ),
  );
  revalidateTestimonials();
}
