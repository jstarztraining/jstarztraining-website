import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Keep-warm ping: prevents the Supabase free-tier database from pausing after
// inactivity. Triggered daily by Vercel Cron (see vercel.json) — a single trivial
// query is enough to register activity and reset the inactivity timer.
//
// Secured with CRON_SECRET: Vercel automatically sends it as a Bearer token on
// scheduled invocations. If the env var is unset the route still works (so local
// hits and first deploys don't break), but set it in production to block randoms.
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const header = req.headers.get('authorization');
    if (header !== `Bearer ${secret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true, pingedAt: new Date().toISOString() });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'ping failed' },
      { status: 500 },
    );
  }
}
