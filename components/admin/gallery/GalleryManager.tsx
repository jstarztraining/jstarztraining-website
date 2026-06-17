'use client';

import { useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { MediaAsset } from '@prisma/client';
import { addMedia, updateMediaAlt, deleteMedia, reorderMedia } from '@/lib/actions/gallery';
import { cn } from '@/lib/utils';

export function GalleryManager({ assets }: { assets: MediaAsset[] }) {
  const router = useRouter();
  const [items, setItems] = useState(assets);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  async function uploadFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError('');
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append('file', file);
        fd.append('folder', 'gallery');
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Upload failed.');
        await addMedia(data.url);
      }
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  }

  function persistOrder(next: MediaAsset[]) {
    setItems(next);
    startTransition(() => reorderMedia(next.map((m) => m.id)));
  }

  function onDragOver(e: React.DragEvent, overIndex: number) {
    e.preventDefault();
    if (dragIndex === null || dragIndex === overIndex) return;
    const next = [...items];
    const [moved] = next.splice(dragIndex, 1);
    next.splice(overIndex, 0, moved);
    setItems(next);
    setDragIndex(overIndex);
  }

  function onDelete(asset: MediaAsset) {
    if (!confirm('Delete this image?')) return;
    setItems((cur) => cur.filter((m) => m.id !== asset.id));
    startTransition(() => deleteMedia(asset.id));
  }

  function onAltBlur(asset: MediaAsset, alt: string) {
    if (alt === asset.alt) return;
    setItems((cur) => cur.map((m) => (m.id === asset.id ? { ...m, alt } : m)));
    startTransition(() => updateMediaAlt(asset.id, alt));
  }

  return (
    <div>
      {/* Uploader */}
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
          uploadFiles(e.dataTransfer.files);
        }}
        className={cn(
          'flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors',
          dragOver ? 'border-brand bg-brand/5' : 'border-navy/20 hover:border-brand/50 hover:bg-white',
        )}
      >
        <span className="text-3xl" aria-hidden>
          {uploading ? '⏳' : '↑'}
        </span>
        <span className="font-heading font-semibold text-navy">
          {uploading ? 'Uploading…' : 'Click or drag images here to upload'}
        </span>
        <span className="text-xs text-ink/50">You can drop multiple at once · JPG, PNG, WebP, AVIF — up to 8MB each</span>
      </button>
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => uploadFiles(e.target.files)} />
      {error ? <p className="mt-2 text-sm font-medium text-red-600">{error}</p> : null}

      {/* Grid */}
      {items.length === 0 ? (
        <p className="mt-10 text-center text-ink/55">No images yet. Upload your first above.</p>
      ) : (
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((asset, i) => (
            <li
              key={asset.id}
              draggable
              onDragStart={() => setDragIndex(i)}
              onDragOver={(e) => onDragOver(e, i)}
              onDragEnd={() => {
                setDragIndex(null);
                persistOrder(items);
              }}
              className={cn(
                'group overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-card',
                dragIndex === i && 'opacity-60 ring-2 ring-brand/40',
              )}
            >
              <div className="relative aspect-square cursor-grab active:cursor-grabbing">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset.url} alt={asset.alt} className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => onDelete(asset)}
                  aria-label="Delete image"
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-navy/70 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100"
                >
                  ×
                </button>
              </div>
              <input
                type="text"
                defaultValue={asset.alt}
                placeholder="Alt text (describe the photo)"
                onBlur={(e) => onAltBlur(asset, e.target.value.trim())}
                className="w-full border-t border-navy/10 bg-white px-3 py-2 text-xs text-navy outline-none focus:bg-mist"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
