import 'server-only';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

/** Any authenticated user (Admin or Editor). */
export async function requireUser() {
  const session = await auth();
  if (!session?.user) redirect('/login');
  return session.user;
}

/** Content editing — both Admin and Editor are allowed (§6). */
export const requireEditor = requireUser;

/** Admin-only actions (user management, etc.). */
export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== 'Admin') redirect('/admin');
  return user;
}
