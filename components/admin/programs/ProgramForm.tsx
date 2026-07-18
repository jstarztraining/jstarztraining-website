'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import type { Program } from '@prisma/client';
import { saveProgram, type ProgramFormState } from '@/lib/actions/programs';
import { ImageUploader } from '@/components/admin/ImageUploader';

const inputCls =
  'mt-2 w-full rounded-xl border border-navy/15 bg-white px-4 py-2.5 text-navy outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/25';
const labelCls = 'block text-sm font-semibold text-navy';
const errCls = 'mt-1.5 text-sm font-medium text-red-600';

function SubmitButton({ editing }: { editing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 items-center justify-center rounded-full bg-gold px-6 font-heading font-semibold text-navy transition-all duration-300 ease-out-quint hover:bg-gold-soft disabled:opacity-60"
    >
      {pending ? 'Saving…' : editing ? 'Save changes' : 'Create program'}
    </button>
  );
}

export function ProgramForm({ program }: { program?: Program }) {
  const editing = Boolean(program);
  const [state, formAction] = useFormState<ProgramFormState, FormData>(saveProgram, {});

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      {editing ? <input type="hidden" name="id" value={program!.id} /> : null}

      {state.error ? (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {state.error}
        </p>
      ) : null}

      <div>
        <label htmlFor="title" className={labelCls}>
          Title
        </label>
        <input
          id="title"
          name="title"
          defaultValue={program?.title ?? ''}
          className={inputCls}
          placeholder="Saturday BMO Private Soccer Training"
        />
        {state.fieldErrors?.title ? <p className={errCls}>{state.fieldErrors.title}</p> : null}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="priceDisplay" className={labelCls}>
            Price text
          </label>
          <input
            id="priceDisplay"
            name="priceDisplay"
            defaultValue={program?.priceDisplay ?? ''}
            className={inputCls}
            placeholder="From $54.99"
          />
          <p className="mt-1.5 text-xs text-ink/50">
            Typed manually — keep it aligned with Shopify (it doesn’t sync).
          </p>
          {state.fieldErrors?.priceDisplay ? (
            <p className={errCls}>{state.fieldErrors.priceDisplay}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="shopifyUrl" className={labelCls}>
            Shopify link
          </label>
          <input
            id="shopifyUrl"
            name="shopifyUrl"
            defaultValue={program?.shopifyUrl ?? ''}
            className={inputCls}
            placeholder="https://…myshopify.com/products/…"
          />
          <p className="mt-1.5 text-xs text-ink/65">
            Product page, or a cart permalink for single-option items. Paste it however you
            copied it — the <span className="font-medium">https://</span> gets added for you.
          </p>
          {state.fieldErrors?.shopifyUrl ? (
            <p className={errCls}>{state.fieldErrors.shopifyUrl}</p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="description" className={labelCls}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={program?.description ?? ''}
          rows={3}
          className={inputCls}
          placeholder="A short, friendly summary of the program."
        />
      </div>

      <div>
        <span className={labelCls}>
          Image <span className="font-normal text-ink/50">(optional)</span>
        </span>
        <div className="mt-2">
          <ImageUploader name="imageUrl" defaultValue={program?.imageUrl ?? ''} folder="programs" />
        </div>
        {state.fieldErrors?.imageUrl ? <p className={errCls}>{state.fieldErrors.imageUrl}</p> : null}
      </div>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={program ? program.isActive : true}
          className="h-5 w-5 rounded border-navy/30 text-brand focus:ring-brand/30"
        />
        <span className="text-sm font-medium text-navy">
          Active <span className="font-normal text-ink/55">(visible on the site)</span>
        </span>
      </label>

      <div className="flex items-center gap-3 border-t border-navy/10 pt-6">
        <SubmitButton editing={editing} />
        <Link
          href="/admin/programs"
          className="inline-flex h-11 items-center justify-center rounded-full px-5 font-heading font-semibold text-ink/70 transition-colors hover:text-navy"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
