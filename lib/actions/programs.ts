'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { requireEditor } from '@/lib/auth-guard';
import { isAbsoluteUrl, isUrlOrPath, withScheme, ABSOLUTE_URL_ERROR, URL_OR_PATH_ERROR } from '@/lib/url';

// Purge the public pages that read programs + the admin list, so edits show
// immediately rather than waiting out the ISR window.
function revalidatePrograms() {
  revalidatePath('/');
  revalidatePath('/programs');
  revalidatePath('/admin/programs');
}

export type ProgramFormState = {
  fieldErrors?: Partial<Record<'title' | 'priceDisplay' | 'shopifyUrl' | 'imageUrl', string>>;
  error?: string;
};

export async function saveProgram(
  _prev: ProgramFormState,
  formData: FormData,
): Promise<ProgramFormState> {
  await requireEditor();

  const id = String(formData.get('id') ?? '').trim();
  const title = String(formData.get('title') ?? '').trim();
  const priceDisplay = String(formData.get('priceDisplay') ?? '').trim();
  // Normalized before validating, so the tidied value is what we store.
  const shopifyUrl = withScheme(String(formData.get('shopifyUrl') ?? ''));
  const description = String(formData.get('description') ?? '').trim();
  const imageUrl = String(formData.get('imageUrl') ?? '').trim();
  const isActive = formData.get('isActive') === 'on';

  const fieldErrors: ProgramFormState['fieldErrors'] = {};
  if (!title) fieldErrors.title = 'Title is required.';
  if (!priceDisplay) fieldErrors.priceDisplay = 'Price text is required (e.g. “From $54.99”).';
  if (!shopifyUrl) fieldErrors.shopifyUrl = 'Shopify link is required.';
  else if (!isAbsoluteUrl(shopifyUrl)) fieldErrors.shopifyUrl = ABSOLUTE_URL_ERROR;
  if (imageUrl && !isUrlOrPath(imageUrl)) fieldErrors.imageUrl = URL_OR_PATH_ERROR;

  if (Object.keys(fieldErrors).length > 0) return { fieldErrors };

  const data = {
    title,
    priceDisplay,
    shopifyUrl,
    description,
    imageUrl: imageUrl || null,
    isActive,
  };

  try {
    if (id) {
      await prisma.program.update({ where: { id }, data });
    } else {
      const count = await prisma.program.count();
      await prisma.program.create({ data: { ...data, sortOrder: count } });
    }
  } catch {
    return { error: 'Something went wrong saving the program. Please try again.' };
  }

  revalidatePrograms();
  redirect('/admin/programs');
}

export async function deleteProgram(id: string) {
  await requireEditor();
  await prisma.program.delete({ where: { id } });
  revalidatePrograms();
}

export async function toggleProgramActive(id: string, isActive: boolean) {
  await requireEditor();
  await prisma.program.update({ where: { id }, data: { isActive } });
  revalidatePrograms();
}

export async function reorderPrograms(orderedIds: string[]) {
  await requireEditor();
  await prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.program.update({ where: { id }, data: { sortOrder: index } }),
    ),
  );
  revalidatePrograms();
}
