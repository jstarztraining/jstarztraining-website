'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireEditor } from '@/lib/auth-guard';
import { getPageDef } from '@/lib/content-blocks';
import type { FormState } from '@/lib/form-state';

export async function saveContent(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireEditor();

  const slug = String(formData.get('slug') ?? '');
  const def = getPageDef(slug);
  if (!def) return { error: 'Unknown page.' };

  const page = await prisma.page.findUnique({ where: { slug } });
  if (!page) return { error: 'Page not found.' };

  try {
    await prisma.$transaction(
      def.blocks.map((b) => {
        const value = String(formData.get(b.key) ?? '').trim();
        return prisma.contentBlock.upsert({
          where: { pageId_key: { pageId: page.id, key: b.key } },
          update: { value, type: 'text' },
          create: { pageId: page.id, key: b.key, value, type: 'text' },
        });
      }),
    );
  } catch {
    return { error: 'Something went wrong saving. Please try again.' };
  }

  revalidatePath(`/${slug}`);
  revalidatePath(`/admin/content/${slug}`);
  return { success: 'Saved — your changes are live on the site.' };
}
