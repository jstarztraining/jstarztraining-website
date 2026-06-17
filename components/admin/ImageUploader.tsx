'use client';

import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

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

  async function upload(file: File) {
    setError('');
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', folder);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed.');
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
          <span className="text-xs text-ink/50">JPG, PNG, WebP, AVIF — up to 8MB</span>
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
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://…"
          className="mt-2 w-full max-w-sm rounded-xl border border-navy/15 bg-white px-4 py-2.5 text-sm text-navy outline-none focus:border-brand focus:ring-2 focus:ring-brand/25"
        />
      </details>
    </div>
  );
}
