'use client';

import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Vercel rejects serverless request bodies over 4.5MB before the route runs, so
 * keep the ceiling under that. The UI used to advertise 8MB, which meant any
 * photo in the gap failed with an unreadable platform error.
 */
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

/** Matches the server's cap — nothing on the site renders larger. */
const MAX_DIMENSION = 2000;

/**
 * Downscale oversized images in the browser before uploading.
 *
 * A modern phone photo is 4–8MB, which the platform would reject outright. The
 * server already downscales to MAX_DIMENSION, so doing it here first costs no
 * quality and keeps the request under the limit.
 *
 * Returns the original file whenever shrinking isn't possible or wouldn't help,
 * leaving the size check downstream to reject it with a clear message.
 */
async function downscale(file: File): Promise<File> {
  // Canvas would flatten an animated GIF to a single frame.
  if (file.type === 'image/gif') return file;

  const needsResize = file.size > MAX_UPLOAD_BYTES;
  if (!needsResize) return file;

  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/jpeg', 0.85),
    );
    // If re-encoding didn't actually help, keep the original.
    if (!blob || blob.size >= file.size) return file;

    const name = file.name.replace(/\.[^.]+$/, '') || 'image';
    return new File([blob], `${name}.jpg`, { type: 'image/jpeg' });
  } catch {
    return file;
  }
}

export function ImageUploader({
  name,
  defaultValue = '',
  folder = 'uploads',
  previewClassName = 'h-40 w-full max-w-sm',
}: {
  name: string;
  defaultValue?: string;
  folder?: string;
  previewClassName?: string;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Pull a readable message off a failed response.
   *
   * The route always answers with JSON, but failures upstream of it don't: Vercel
   * rejects oversized bodies with a plain 413 before the function runs. Parsing
   * that as JSON throws, and the browser's raw parse error ("The string did not
   * match the expected pattern") reached the user instead of anything actionable.
   */
  async function readError(res: Response): Promise<string> {
    if (res.status === 413) {
      return 'That image is too large to upload. Try one under 4MB.';
    }
    try {
      const data = await res.json();
      if (data?.error) return String(data.error);
    } catch {
      // Not JSON — fall through to the status-based message.
    }
    return `Upload failed (${res.status}). Please try again.`;
  }

  async function upload(file: File) {
    setError('');
    setUploading(true);
    try {
      // Shrink before sending. Phone photos routinely exceed the request-body
      // limit, and the server downscales to the same bound anyway.
      const prepared = await downscale(file);
      if (prepared.size > MAX_UPLOAD_BYTES) {
        throw new Error('That image is too large to upload. Try one under 4MB.');
      }

      const fd = new FormData();
      fd.append('file', prepared);
      fd.append('folder', folder);

      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      if (!res.ok) throw new Error(await readError(res));

      const data = await res.json().catch(() => null);
      if (!data?.url) throw new Error('Upload finished but no image came back. Please try again.');
      setUrl(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  }

  function onFiles(files: FileList | null) {
    const file = files?.[0];
    if (file) upload(file);
  }

  return (
    <div>
      <input type="hidden" name={name} value={url} />

      {url ? (
        <div className="flex items-start gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="Preview" className={cn('rounded-xl object-cover ring-1 ring-navy/10', previewClassName)} />
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-full border border-navy/15 px-4 py-1.5 text-sm font-semibold text-navy transition-colors hover:border-brand hover:text-brand"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => setUrl('')}
              className="rounded-full px-4 py-1.5 text-sm font-semibold text-ink/50 transition-colors hover:text-red-600"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            onFiles(e.dataTransfer.files);
          }}
          className={cn(
            'flex w-full max-w-sm flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors',
            dragOver ? 'border-brand bg-brand/5' : 'border-navy/20 hover:border-brand/50 hover:bg-mist',
          )}
        >
          <span className="text-2xl" aria-hidden>
            {uploading ? '⏳' : '↑'}
          </span>
          <span className="text-sm font-semibold text-navy">
            {uploading ? 'Uploading…' : 'Click or drag an image here'}
          </span>
          <span className="text-xs text-ink/65">JPG, PNG, WebP, AVIF — large photos are resized automatically</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onFiles(e.target.files)}
      />

      {error ? <p className="mt-2 text-sm font-medium text-red-600">{error}</p> : null}

      {/* Paste-URL fallback */}
      <details className="mt-3">
        <summary className="cursor-pointer text-xs font-semibold text-ink/50 hover:text-brand">
          …or paste an image URL
        </summary>
        {/*
          Deliberately type="text", not type="url". Seeded images are root-relative
          paths ("/images/x.jpg"), which fail type="url" validation — and since this
          input sits inside a collapsed <details>, the browser can't focus it to show
          the error, so it blocks form submission silently. Validation lives server-side.
        */}
        <input
          type="text"
          inputMode="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://… or /images/…"
          className="mt-2 w-full max-w-sm rounded-xl border border-navy/15 bg-white px-4 py-2.5 text-sm text-navy outline-none focus:border-brand focus:ring-2 focus:ring-brand/25"
        />
      </details>
    </div>
  );
}
