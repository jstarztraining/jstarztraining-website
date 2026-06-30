import type { Metadata } from 'next';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { Crest } from '@/components/ui/Crest';
import { LoginForm } from '@/components/admin/LoginForm';

export const metadata: Metadata = {
  title: 'Sign in',
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect('/admin');

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-navy px-5 py-24">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(120% 100% at 50% -10%, var(--brand-crown) 0%, #0a2a63 45%, #06183f 80%, var(--navy-floor) 100%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] top-1/3 -z-10 h-96 w-96 rounded-full bg-brand-bright/20 blur-[130px]"
      />
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="h-14 w-14">
            <Crest />
          </span>
          <h1 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-white">
            JStarz Admin
          </h1>
          <p className="mt-2 text-sm text-white/60">Sign in to manage your site content.</p>
        </div>
        <div className="rounded-[1.5rem] bg-white p-7 shadow-card-hover sm:p-9">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
        <p className="mt-6 text-center text-xs text-white/45">
          Forgot your password? Your admin can reset it for you.
        </p>
      </div>
    </section>
  );
}
