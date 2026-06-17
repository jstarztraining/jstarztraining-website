'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireEditor } from '@/lib/auth-guard';
import type { FormState } from '@/lib/form-state';

const isUrl = (v: string) => /^https?:\/\//i.test(v);
const SINGLETON = 'singleton';

export async function saveHomeHero(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireEditor();

  const headline = String(formData.get('headline') ?? '').trim();
  const subhead = String(formData.get('subhead') ?? '').trim();
  const ctaLabel = String(formData.get('ctaLabel') ?? '').trim();
  const ctaUrl = String(formData.get('ctaUrl') ?? '').trim();
  const imageUrl = String(formData.get('imageUrl') ?? '').trim();
  const bannerMessage = String(formData.get('bannerMessage') ?? '').trim();
  const bannerUrl = String(formData.get('bannerUrl') ?? '').trim();
  const bannerEnabled = formData.get('bannerEnabled') === 'on';

  const fieldErrors: Record<string, string> = {};
  if (!headline) fieldErrors.headline = 'A headline is required.';
  if (ctaUrl && !isUrl(ctaUrl)) fieldErrors.ctaUrl = 'Must be a full URL (https://…).';
  if (imageUrl && !isUrl(imageUrl)) fieldErrors.imageUrl = 'Must be a full URL (https://…).';
  if (bannerUrl && !isUrl(bannerUrl)) fieldErrors.bannerUrl = 'Must be a full URL (https://…).';
  if (bannerEnabled && !bannerMessage) fieldErrors.bannerMessage = 'Add a message, or turn the banner off.';
  if (Object.keys(fieldErrors).length) return { fieldErrors };

  const data = {
    headline,
    subhead,
    ctaLabel,
    ctaUrl,
    imageUrl: imageUrl || null,
    bannerMessage: bannerMessage || null,
    bannerUrl: bannerUrl || null,
    bannerEnabled,
  };

  try {
    await prisma.homeHero.upsert({
      where: { id: SINGLETON },
      update: data,
      create: { id: SINGLETON, ...data },
    });
  } catch {
    return { error: 'Something went wrong saving the hero. Please try again.' };
  }

  revalidatePath('/');
  revalidatePath('/admin/hero');
  return { success: 'Saved — your homepage is updated.' };
}

export async function saveSiteSettings(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireEditor();

  const email = String(formData.get('email') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const address = String(formData.get('address') ?? '').trim();
  const hours = String(formData.get('hours') ?? '').trim();
  const mapEmbed = String(formData.get('mapEmbed') ?? '').trim();
  const instagram = String(formData.get('instagram') ?? '').trim();
  const facebook = String(formData.get('facebook') ?? '').trim();
  const tiktok = String(formData.get('tiktok') ?? '').trim();
  const footerText = String(formData.get('footerText') ?? '').trim();

  const fieldErrors: Record<string, string> = {};
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) fieldErrors.email = 'Enter a valid email.';
  for (const [k, v] of [
    ['instagram', instagram],
    ['facebook', facebook],
    ['tiktok', tiktok],
  ] as const) {
    if (v && !isUrl(v)) fieldErrors[k] = 'Must be a full URL (https://…).';
  }
  if (Object.keys(fieldErrors).length) return { fieldErrors };

  const data = {
    email,
    phone,
    address,
    hours: hours || null,
    mapEmbed: mapEmbed || null,
    instagram: instagram || null,
    facebook: facebook || null,
    tiktok: tiktok || null,
    footerText: footerText || null,
  };

  try {
    await prisma.siteSettings.upsert({
      where: { id: SINGLETON },
      update: data,
      create: { id: SINGLETON, ...data },
    });
  } catch {
    return { error: 'Something went wrong saving settings. Please try again.' };
  }

  // Footer/contact appear site-wide → revalidate everything under the root layout.
  revalidatePath('/', 'layout');
  return { success: 'Saved — your changes are live across the site.' };
}
