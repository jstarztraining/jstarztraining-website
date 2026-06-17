'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { requireEditor } from '@/lib/auth-guard';
import type { FormState } from '@/lib/form-state';

function revalidateCoaches() {
  revalidatePath('/');
  revalidatePath('/coaches');
  revalidatePath('/admin/coaches');
}

const isUrl = (v: string) => /^https?:\/\//i.test(v);

export async function saveCoach(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireEditor();

  const id = String(formData.get('id') ?? '').trim();
  const name = String(formData.get('name') ?? '').trim();
  const role = String(formData.get('role') ?? '').trim();
  const bio = String(formData.get('bio') ?? '').trim();
  const imageUrl = String(formData.get('imageUrl') ?? '').trim();
  const isActive = formData.get('isActive') === 'on';

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = 'Name is required.';
  if (!role) fieldErrors.role = 'Role is required.';
  if (!bio) fieldErrors.bio = 'A short bio is required.';
  if (imageUrl && !isUrl(imageUrl)) fieldErrors.imageUrl = 'Must be a full URL (https://…).';
  if (Object.keys(fieldErrors).length) return { fieldErrors };

  const data = { name, role, bio, imageUrl: imageUrl || null, isActive };

  try {
    if (id) {
      await prisma.coach.update({ where: { id }, data });
    } else {
      const count = await prisma.coach.count();
      await prisma.coach.create({ data: { ...data, sortOrder: count } });
    }
  } catch {
    return { error: 'Something went wrong saving this coach. Please try again.' };
  }

  revalidateCoaches();
  redirect('/admin/coaches');
}

export async function deleteCoach(id: string) {
  await requireEditor();
  await prisma.coach.delete({ where: { id } });
  revalidateCoaches();
}

export async function toggleCoachActive(id: string, isActive: boolean) {
  await requireEditor();
  await prisma.coach.update({ where: { id }, data: { isActive } });
  revalidateCoaches();
}

export async function reorderCoaches(orderedIds: string[]) {
  await requireEditor();
  await prisma.$transaction(
    orderedIds.map((id, index) => prisma.coach.update({ where: { id }, data: { sortOrder: index } })),
  );
  revalidateCoaches();
}
