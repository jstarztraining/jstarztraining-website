'use client';

import { signOut } from 'next-auth/react';

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:border-gold hover:text-gold"
    >
      Sign out
    </button>
  );
}
