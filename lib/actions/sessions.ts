'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { requireEditor } from '@/lib/auth-guard';
import type { FormState } from '@/lib/form-state';

function revalidateSchedule() {
  revalidatePath('/schedule');
  revalidatePath('/admin/schedule');
}

// datetime-local values ("2026-06-17T18:00") are interpreted in the server's
// local timezone. Set TZ=America/Halifax on the server (Vercel) so admin-entered
// times match what visitors see.
function parseLocal(value: string): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

export async function saveSession(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireEditor();

  const id = String(formData.get('id') ?? '').trim();
  const title = String(formData.get('title') ?? '').trim();
  const programId = String(formData.get('programId') ?? '').trim() || null;
  const allDay = formData.get('allDay') === 'on';
  const startsRaw = String(formData.get('startsAt') ?? '').trim();
  const endsRaw = String(formData.get('endsAt') ?? '').trim();
  const location = String(formData.get('location') ?? '').trim() || null;
  const notes = String(formData.get('notes') ?? '').trim() || null;

  const fieldErrors: Record<string, string> = {};
  if (!title) fieldErrors.title = 'A title is required.';
  const startsAt = parseLocal(startsRaw);
  if (!startsAt) fieldErrors.startsAt = 'A start date & time is required.';
  const endsAt = parseLocal(endsRaw);
  if (endsRaw && !endsAt) fieldErrors.endsAt = 'Invalid end date & time.';
  if (startsAt && endsAt && endsAt < startsAt) fieldErrors.endsAt = 'End must be after the start.';
  if (Object.keys(fieldErrors).length) return { fieldErrors };

  const data = {
    title,
    programId,
    allDay,
    startsAt: startsAt!,
    endsAt,
    location,
    notes,
  };

  try {
    if (id) {
      await prisma.session.update({ where: { id }, data });
    } else {
      await prisma.session.create({ data });
    }
  } catch {
    return { error: 'Something went wrong saving this session. Please try again.' };
  }

  revalidateSchedule();
  redirect('/admin/schedule');
}

export async function deleteSession(id: string) {
  await requireEditor();
  await prisma.session.delete({ where: { id } });
  revalidateSchedule();
}
