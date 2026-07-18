import { NextResponse } from 'next/server';
import sharp from 'sharp';
import { auth } from '@/auth';
import { supabaseAdmin, ensureMediaBucket, MEDIA_BUCKET } from '@/lib/supabase-admin';

// sharp needs the Node.js runtime (not Edge).
export const runtime = 'nodejs';

const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];
// Vercel rejects serverless request bodies over 4.5MB before this route runs, so
// anything above that never reaches us. Keep our own cap just under it, and match
// it in ImageUploader (which downscales client-side to stay within it).
const MAX_BYTES = 4 * 1024 * 1024;

// Cap stored images so an 8MB phone photo doesn't sit in the bucket at full size.
// Nothing on the site renders larger than this; Next/Image handles delivery sizing.
const MAX_DIMENSION = 2000;

/**
 * Downscale (never upscale) and re-encode the upload to shrink the stored file.
 * Animated GIFs are passed through untouched so the animation survives.
 * Returns the original buffer unchanged if sharp can't decode it.
 */
async function optimizeImage(
  buffer: Buffer,
  type: string,
  fallbackExt: string,
): Promise<{ buffer: Buffer; contentType: string; ext: string }> {
  if (type === 'image/gif') {
    return { buffer, contentType: type, ext: 'gif' };
  }
  try {
    const pipeline = sharp(buffer, { failOn: 'none' })
      .rotate() // bake in EXIF orientation so portrait photos aren't sideways
      .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: 'inside', withoutEnlargement: true });

    switch (type) {
      case 'image/png':
        return { buffer: await pipeline.png({ compressionLevel: 9 }).toBuffer(), contentType: 'image/png', ext: 'png' };
      case 'image/webp':
        return { buffer: await pipeline.webp({ quality: 82 }).toBuffer(), contentType: 'image/webp', ext: 'webp' };
      case 'image/avif':
        return { buffer: await pipeline.avif({ quality: 55 }).toBuffer(), contentType: 'image/avif', ext: 'avif' };
      default:
        return {
          buffer: await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer(),
          contentType: 'image/jpeg',
          ext: 'jpg',
        };
    }
  } catch {
    // Couldn't process it (corrupt/unsupported) — store the original as-is.
    return { buffer, contentType: type, ext: fallbackExt };
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'Image storage isn’t configured (missing Supabase service key).' },
      { status: 500 },
    );
  }

  const form = await req.formData();
  const file = form.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json({ error: 'Unsupported file type. Use JPG, PNG, WebP, AVIF or GIF.' }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'That image is too large to upload. Try one under 4MB.' }, { status: 400 });
  }

  await ensureMediaBucket();

  const folder = String(form.get('folder') || 'uploads').replace(/[^a-z0-9-]/gi, '');
  const fallbackExt = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
  const original = Buffer.from(await file.arrayBuffer());
  const optimized = await optimizeImage(original, file.type, fallbackExt);
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${optimized.ext}`;

  const { error } = await supabaseAdmin.storage
    .from(MEDIA_BUCKET)
    .upload(path, optimized.buffer, { contentType: optimized.contentType, upsert: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const {
    data: { publicUrl },
  } = supabaseAdmin.storage.from(MEDIA_BUCKET).getPublicUrl(path);

  return NextResponse.json({ url: publicUrl });
}
