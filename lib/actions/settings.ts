'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireEditor } from '@/lib/auth-guard';
import type { FormState } from '@/lib/form-state';
import { isAbsoluteUrl, isUrlOrPath, withScheme, ABSOLUTE_URL_ERROR, URL_OR_PATH_ERROR } from '@/lib/url';

const SINGLETON = 'singleton';

export async function saveHomeHero(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireEditor();

  const headline = String(formData.get('headline') ?? '').trim();
  const subhead = String(formData.get('subhead') ?? '').trim();
  const ctaLabel = String(formData.get('ctaLabel') ?? '').trim();
  const ctaUrl = withScheme(String(formData.get('ctaUrl') ?? ''));
  const imageUrl = String(formData.get('imageUrl') ?? '').trim();
  const bannerMessage = String(formData.get('bannerMessage') ?? '').trim();
  const bannerUrl = withScheme(String(formData.get('bannerUrl') ?? ''));
  const bannerEnabled = formData.get('bannerEnabled') === 'on';

  const fieldErrors: Record<string, string> = {};
  if (!headline) fieldErrors.headline = 'A headline is required.';
  // CTA and banner links may point at internal pages ("/programs"), so paths are valid.
  if (ctaUrl && !isUrlOrPath(ctaUrl)) fieldErrors.ctaUrl = URL_OR_PATH_ERROR;
  if (imageUrl && !isUrlOrPath(imageUrl)) fieldErrors.imageUrl = URL_OR_PATH_ERROR;
  if (bannerUrl && !isUrlOrPath(bannerUrl)) fieldErrors.bannerUrl = URL_OR_PATH_ERROR;
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
  const instagram = withScheme(String(formData.get('instagram') ?? ''));
  const facebook = withScheme(String(formData.get('facebook') ?? ''));
  const tiktok = withScheme(String(formData.get('tiktok') ?? ''));
  const footerText = String(formData.get('footerText') ?? '').trim();

  const fieldErrors: Record<string, string> = {};
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) fieldErrors.email = 'Enter a valid email.';
  for (const [k, v] of [
    ['instagram', instagram],
    ['facebook', facebook],
    ['tiktok', tiktok],
  ] as const) {
    // Social profiles always live off-site — keep these strict.
    if (v && !isAbsoluteUrl(v)) fieldErrors[k] = ABSOLUTE_URL_ERROR;
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
