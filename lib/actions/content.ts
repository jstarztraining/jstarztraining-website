'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireEditor } from '@/lib/auth-guard';
import { getPageDef } from '@/lib/content-blocks';
import type { FormState } from '@/lib/form-state';
import { isUrlOrPath, URL_OR_PATH_ERROR } from '@/lib/url';

export async function saveContent(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireEditor();

  const slug = String(formData.get('slug') ?? '');
  const def = getPageDef(slug);
  if (!def) return { error: 'Unknown page.' };

  const entries = def.blocks.map((b) => ({ block: b, value: String(formData.get(b.key) ?? '').trim() }));

  // Image blocks accept an uploaded Supabase URL or a root-relative path
  // ("/images/…"), matching every other image field in the dashboard.
  const fieldErrors: Record<string, string> = {};
  for (const { block, value } of entries) {
    if (block.type === 'image' && value && !isUrlOrPath(value)) fieldErrors[block.key] = URL_OR_PATH_ERROR;
  }
  if (Object.keys(fieldErrors).length) return { fieldErrors };

  // The Page row is seeded, but upsert so a page added to the registry later
  // saves on first use instead of failing with "Page not found".
  const page = await prisma.page.upsert({
    where: { slug },
    update: {},
    create: { slug, title: def.title },
  });

  try {
    await prisma.$transaction(
      entries.map(({ block, value }) => {
        const type = block.type === 'image' ? 'image' : 'text';
        return prisma.contentBlock.upsert({
          where: { pageId_key: { pageId: page.id, key: block.key } },
          update: { value, type },
          create: { pageId: page.id, key: block.key, value, type },
        });
      }),
    );
  } catch {
    return { error: 'Something went wrong saving. Please try again.' };
  }

  // "home" lives at "/", not "/home".
  revalidatePath(slug === 'home' ? '/' : `/${slug}`);
  revalidatePath(`/admin/content/${slug}`);
  return { success: 'Saved — your changes are live on the site.' };
}
