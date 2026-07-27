'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { requireEditor } from '@/lib/auth-guard';
import type { FormState } from '@/lib/form-state';
import { weeklyInstant } from '@/lib/schedule';

function revalidateSchedule() {
  revalidatePath('/schedule');
  revalidatePath('/admin/schedule');
}

/**
 * The form posts a weekday plus a plain "HH:mm" wall clock, which we resolve
 * against Halifax time in weeklyInstant(). Previously it posted a datetime-local
 * value straight into `new Date()`, which reads it in the *server's* timezone —
 * UTC on Vercel — while every display formatter uses America/Halifax. A session
 * entered as 7:00 PM was stored as 19:00 UTC and shown back as 4:00 PM.
 */
function parseTime(value: string): { h: number; m: number } | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const h = Number(match[1]);
  const m = Number(match[2]);
  if (h > 23 || m > 59) return null;
  return { h, m };
}

const minutes = ({ h, m }: { h: number; m: number }) => h * 60 + m;

export async function saveSession(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireEditor();

  const id = String(formData.get('id') ?? '').trim();
  const title = String(formData.get('title') ?? '').trim();
  const programId = String(formData.get('programId') ?? '').trim() || null;
  const allDay = formData.get('allDay') === 'on';
  const weekday = Number(String(formData.get('weekday') ?? '').trim());
  const startsRaw = String(formData.get('startsAt') ?? '').trim();
  const endsRaw = String(formData.get('endsAt') ?? '').trim();
  const location = String(formData.get('location') ?? '').trim() || null;
  const notes = String(formData.get('notes') ?? '').trim() || null;

  const fieldErrors: Record<string, string> = {};
  if (!title) fieldErrors.title = 'A title is required.';
  if (!Number.isInteger(weekday) || weekday < 0 || weekday > 6) {
    fieldErrors.weekday = 'Pick the day of the week this session runs.';
  }

  // An all-day session has no clock, so it's pinned to midnight and the time
  // fields are ignored.
  const start = allDay ? { h: 0, m: 0 } : parseTime(startsRaw);
  if (!start) fieldErrors.startsAt = 'A start time is required.';
  const end = allDay || !endsRaw ? null : parseTime(endsRaw);
  if (!allDay && endsRaw && !end) fieldErrors.endsAt = 'That end time isn’t valid.';
  if (start && end && minutes(end) <= minutes(start)) {
    fieldErrors.endsAt = 'The end time must be later in the day than the start time.';
  }
  if (Object.keys(fieldErrors).length) return { fieldErrors };

  const data = {
    title,
    programId,
    allDay,
    startsAt: weeklyInstant(weekday, start!.h, start!.m),
    endsAt: end ? weeklyInstant(weekday, end.h, end.m) : null,
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
