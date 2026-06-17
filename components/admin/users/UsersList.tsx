'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { Role } from '@prisma/client';
import { resetPassword, setUserRole, deleteUser } from '@/lib/actions/users';
import { cn } from '@/lib/utils';

export interface UserRow {
  id: string;
  email: string;
  name: string | null;
  role: Role;
}

export function UsersList({ users, currentUserId }: { users: UserRow[]; currentUserId: string }) {
  return (
    <ul className="space-y-2">
      {users.map((u) => (
        <UserItem key={u.id} user={u} isSelf={u.id === currentUserId} />
      ))}
    </ul>
  );
}

function UserItem({ user, isSelf }: { user: UserRow; isSelf: boolean }) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [resetting, setResetting] = useState(false);
  const [pw, setPw] = useState('');
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function onReset() {
    setBusy(true);
    setMsg(null);
    const res = await resetPassword(user.id, pw);
    setBusy(false);
    if (res.ok) {
      setMsg({ ok: true, text: 'Password updated.' });
      setPw('');
      setResetting(false);
    } else {
      setMsg({ ok: false, text: res.error || 'Failed.' });
    }
  }

  async function onRole(role: Role) {
    setBusy(true);
    setMsg(null);
    const res = await setUserRole(user.id, role);
    setBusy(false);
    if (!res.ok) setMsg({ ok: false, text: res.error || 'Failed.' });
    else startTransition(() => router.refresh());
  }

  async function onDelete() {
    if (!confirm(`Delete ${user.name || user.email}? This can’t be undone.`)) return;
    setBusy(true);
    const res = await deleteUser(user.id);
    setBusy(false);
    if (!res.ok) setMsg({ ok: false, text: res.error || 'Failed.' });
    else startTransition(() => router.refresh());
  }

  return (
    <li className={cn('rounded-2xl border border-navy/10 bg-white p-4 shadow-card', busy && 'opacity-60')}>
      <div className="flex flex-wrap items-center gap-4">
        <div className="min-w-0 flex-1">
          <p className="truncate font-heading font-semibold text-navy">
            {user.name || user.email}
            {isSelf ? <span className="ml-2 text-xs font-medium text-ink/45">(you)</span> : null}
          </p>
          {user.name ? <p className="truncate text-sm text-ink/55">{user.email}</p> : null}
        </div>

        <select
          value={user.role}
          onChange={(e) => onRole(e.target.value as Role)}
          disabled={busy}
          className="rounded-full border border-navy/15 bg-white px-3 py-1.5 text-sm font-semibold text-navy outline-none focus:border-brand"
          aria-label={`Role for ${user.email}`}
        >
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
        </select>

        <button
          type="button"
          onClick={() => {
            setResetting((v) => !v);
            setMsg(null);
          }}
          className="rounded-full border border-navy/15 px-4 py-1.5 text-sm font-semibold text-navy transition-colors hover:border-brand hover:text-brand"
        >
          Reset password
        </button>

        <button
          type="button"
          onClick={onDelete}
          disabled={isSelf}
          className="rounded-full px-2.5 py-1.5 text-sm font-semibold text-ink/40 transition-colors hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30"
          title={isSelf ? 'You can’t delete your own account' : 'Delete account'}
        >
          Delete
        </button>
      </div>

      {resetting ? (
        <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-navy/10 pt-4">
          <input
            type="text"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="New password (8+ chars)"
            className="flex-1 rounded-xl border border-navy/15 bg-white px-4 py-2 text-sm text-navy outline-none focus:border-brand focus:ring-2 focus:ring-brand/25"
          />
          <button
            type="button"
            onClick={onReset}
            disabled={busy || pw.length < 8}
            className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-navy hover:bg-gold-soft disabled:opacity-50"
          >
            Save password
          </button>
        </div>
      ) : null}

      {msg ? (
        <p className={cn('mt-3 text-sm font-medium', msg.ok ? 'text-emerald-600' : 'text-red-600')}>{msg.text}</p>
      ) : null}
    </li>
  );
}
