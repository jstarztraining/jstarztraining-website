'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { requireEditor } from '@/lib/auth-guard';
import type { FormState } from '@/lib/form-state';

function revalidateFaqs() {
  revalidatePath('/faq');
  revalidatePath('/admin/faq');
}

export async function saveFaq(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireEditor();

  const id = String(formData.get('id') ?? '').trim();
  const question = String(formData.get('question') ?? '').trim();
  const answer = String(formData.get('answer') ?? '').trim();
  const isActive = formData.get('isActive') === 'on';

  const fieldErrors: Record<string, string> = {};
  if (!question) fieldErrors.question = 'The question is required.';
  if (!answer) fieldErrors.answer = 'The answer is required.';
  if (Object.keys(fieldErrors).length) return { fieldErrors };

  const data = { question, answer, isActive };

  try {
    if (id) {
      await prisma.faqItem.update({ where: { id }, data });
    } else {
      const count = await prisma.faqItem.count();
      await prisma.faqItem.create({ data: { ...data, sortOrder: count } });
    }
  } catch {
    return { error: 'Something went wrong saving this FAQ. Please try again.' };
  }

  revalidateFaqs();
  redirect('/admin/faq');
}

export async function deleteFaq(id: string) {
  await requireEditor();
  await prisma.faqItem.delete({ where: { id } });
  revalidateFaqs();
}

export async function toggleFaqActive(id: string, isActive: boolean) {
  await requireEditor();
  await prisma.faqItem.update({ where: { id }, data: { isActive } });
  revalidateFaqs();
}

export async function reorderFaqs(orderedIds: string[]) {
  await requireEditor();
  await prisma.$transaction(
    orderedIds.map((id, index) => prisma.faqItem.update({ where: { id }, data: { sortOrder: index } })),
  );
  revalidateFaqs();
}
