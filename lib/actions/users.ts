'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { Prisma, Role } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth-guard';
import type { FormState } from '@/lib/form-state';

type Result = { ok: boolean; error?: string };

export async function createUser(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();

  const email = String(formData.get('email') ?? '').toLowerCase().trim();
  const name = String(formData.get('name') ?? '').trim();
  const role = String(formData.get('role') ?? 'Editor');
  const password = String(formData.get('password') ?? '');

  const fieldErrors: Record<string, string> = {};
  if (!email) fieldErrors.email = 'Email is required.';
  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) fieldErrors.email = 'Enter a valid email.';
  if (role !== 'Admin' && role !== 'Editor') fieldErrors.role = 'Pick a role.';
  if (password.length < 8) fieldErrors.password = 'Password must be at least 8 characters.';
  if (Object.keys(fieldErrors).length) return { fieldErrors };

  try {
    await prisma.user.create({
      data: {
        email,
        name: name || null,
        role: role as Role,
        passwordHash: await bcrypt.hash(password, 12),
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
      return { fieldErrors: { email: 'An account with this email already exists.' } };
    }
    return { error: 'Something went wrong creating the account.' };
  }

  revalidatePath('/admin/users');
  redirect('/admin/users');
}

export async function resetPassword(userId: string, newPassword: string): Promise<Result> {
  await requireAdmin();
  if (newPassword.length < 8) return { ok: false, error: 'Password must be at least 8 characters.' };
  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash: await bcrypt.hash(newPassword, 12) },
  });
  return { ok: true };
}

export async function setUserRole(userId: string, role: Role): Promise<Result> {
  const admin = await requireAdmin();
  if (userId === admin.id && role !== 'Admin') {
    return { ok: false, error: 'You can’t remove your own admin access.' };
  }
  if (role !== 'Admin') {
    const adminCount = await prisma.user.count({ where: { role: 'Admin' } });
    const target = await prisma.user.findUnique({ where: { id: userId } });
    if (target?.role === 'Admin' && adminCount <= 1) {
      return { ok: false, error: 'There must be at least one admin.' };
    }
  }
  await prisma.user.update({ where: { id: userId }, data: { role } });
  revalidatePath('/admin/users');
  return { ok: true };
}

export async function deleteUser(userId: string): Promise<Result> {
  const admin = await requireAdmin();
  if (userId === admin.id) return { ok: false, error: 'You can’t delete your own account.' };
  const target = await prisma.user.findUnique({ where: { id: userId } });
  if (target?.role === 'Admin') {
    const adminCount = await prisma.user.count({ where: { role: 'Admin' } });
    if (adminCount <= 1) return { ok: false, error: 'There must be at least one admin.' };
  }
  await prisma.user.delete({ where: { id: userId } });
  revalidatePath('/admin/users');
  return { ok: true };
}
