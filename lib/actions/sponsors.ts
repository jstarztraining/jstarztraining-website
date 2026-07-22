'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { requireEditor } from '@/lib/auth-guard';
import type { FormState } from '@/lib/form-state';
import { isUrlOrPath, URL_OR_PATH_ERROR } from '@/lib/url';
import { SPONSOR_TIERS } from '@/lib/sponsor-tiers';

function revalidateSponsors() {
  revalidatePath('/');
  revalidatePath('/sponsors');
  revalidatePath('/admin/sponsors');
}

export async function saveSponsor(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireEditor();

  const id = String(formData.get('id') ?? '').trim();
  const name = String(formData.get('name') ?? '').trim();
  const tier = String(formData.get('tier') ?? '').trim();
  const role = String(formData.get('role') ?? '').trim();
  const logoUrl = String(formData.get('logoUrl') ?? '').trim();
  const websiteUrl = String(formData.get('websiteUrl') ?? '').trim();
  const isActive = formData.get('isActive') === 'on';

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = 'Name is required.';
  if (!tier) fieldErrors.tier = 'Choose a tier.';
  else if (!SPONSOR_TIERS.includes(tier as (typeof SPONSOR_TIERS)[number]))
    fieldErrors.tier = 'Choose a valid tier.';
  if (logoUrl && !isUrlOrPath(logoUrl)) fieldErrors.logoUrl = URL_OR_PATH_ERROR;
  if (websiteUrl && !isUrlOrPath(websiteUrl)) fieldErrors.websiteUrl = URL_OR_PATH_ERROR;
  if (Object.keys(fieldErrors).length) return { fieldErrors };

  const data = {
    name,
    tier,
    role: role || null,
    logoUrl: logoUrl || null,
    websiteUrl: websiteUrl || null,
    isActive,
  };

  try {
    if (id) {
      await prisma.sponsor.update({ where: { id }, data });
    } else {
      const count = await prisma.sponsor.count();
      await prisma.sponsor.create({ data: { ...data, sortOrder: count } });
    }
  } catch {
    return { error: 'Something went wrong saving this sponsor. Please try again.' };
  }

  revalidateSponsors();
  redirect('/admin/sponsors');
}

export async function deleteSponsor(id: string) {
  await requireEditor();
  await prisma.sponsor.delete({ where: { id } });
  revalidateSponsors();
}

export async function toggleSponsorActive(id: string, isActive: boolean) {
  await requireEditor();
  await prisma.sponsor.update({ where: { id }, data: { isActive } });
  revalidateSponsors();
}

export async function reorderSponsors(orderedIds: string[]) {
  await requireEditor();
  await prisma.$transaction(
    orderedIds.map((id, index) => prisma.sponsor.update({ where: { id }, data: { sortOrder: index } })),
  );
  revalidateSponsors();
}
