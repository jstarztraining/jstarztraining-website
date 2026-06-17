'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireEditor } from '@/lib/auth-guard';

function revalidateGallery() {
  revalidatePath('/gallery');
  revalidatePath('/admin/gallery');
}

export async function addMedia(url: string, alt = '') {
  await requireEditor();
  if (!/^https?:\/\//i.test(url)) return;
  const count = await prisma.mediaAsset.count();
  await prisma.mediaAsset.create({
    data: { url, alt, type: 'gallery', sortOrder: count },
  });
  revalidateGallery();
}

export async function updateMediaAlt(id: string, alt: string) {
  await requireEditor();
  await prisma.mediaAsset.update({ where: { id }, data: { alt } });
  revalidateGallery();
}

export async function deleteMedia(id: string) {
  await requireEditor();
  await prisma.mediaAsset.delete({ where: { id } });
  revalidateGallery();
}

export async function reorderMedia(orderedIds: string[]) {
  await requireEditor();
  await prisma.$transaction(
    orderedIds.map((id, index) => prisma.mediaAsset.update({ where: { id }, data: { sortOrder: index } })),
  );
  revalidateGallery();
}
