import 'server-only';
import { createClient } from '@supabase/supabase-js';

// Server-only Supabase client using the service-role key (bypasses RLS).
// Never import this into client components.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const MEDIA_BUCKET = 'media';

export const supabaseAdmin =
  url && serviceKey
    ? createClient(url, serviceKey, { auth: { persistSession: false } })
    : null;

let bucketReady = false;

/** Idempotently ensure the public media bucket exists. */
export async function ensureMediaBucket() {
  if (!supabaseAdmin || bucketReady) return;
  const { data } = await supabaseAdmin.storage.getBucket(MEDIA_BUCKET);
  if (!data) {
    await supabaseAdmin.storage.createBucket(MEDIA_BUCKET, {
      public: true,
      fileSizeLimit: '8MB',
    });
  }
  bucketReady = true;
}
