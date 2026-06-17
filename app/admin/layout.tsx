import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { Crest } from '@/components/ui/Crest';
import { SignOutButton } from '@/components/admin/SignOutButton';

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Defense in depth — middleware already gates /admin, but never trust it alone.
  const session = await auth();
  if (!session?.user) redirect('/login');

  const { name, email, role } = session.user;

  return (
    <div className="min-h-[100svh] bg-mist">
      <header className="sticky top-0 z-nav border-b border-white/10 bg-navy text-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/admin" className="flex items-center gap-2.5">
            <span className="h-8 w-8">
              <Crest />
            </span>
            <span className="font-display text-base font-extrabold tracking-tight">
              JStarz <span className="text-gold-soft">Admin</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-right text-sm leading-tight sm:block">
              <span className="block font-medium text-white">{name || email}</span>
              <span className="block text-xs text-gold-soft">{role}</span>
            </span>
            <Link
              href="/"
              target="_blank"
              className="hidden text-sm text-white/70 transition-colors hover:text-gold sm:inline"
            >
              View site ↗
            </Link>
            <SignOutButton />
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">{children}</div>
    </div>
  );
}
