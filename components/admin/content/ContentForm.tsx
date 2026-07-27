'use client';

import { useFormState } from 'react-dom';
import type { BlockDef } from '@/lib/content-blocks';
import { saveContent } from '@/lib/actions/content';
import type { FormState } from '@/lib/form-state';
import { inputCls, labelCls, FieldError, FormError, FormSuccess, SaveButton } from '@/components/admin/form-ui';
import { ImageUploader } from '@/components/admin/ImageUploader';

export function ContentForm({
  slug,
  blocks,
  values,
}: {
  slug: string;
  blocks: BlockDef[];
  values: Record<string, string>;
}) {
  const [state, formAction] = useFormState<FormState, FormData>(saveContent, {});

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <input type="hidden" name="slug" value={slug} />
      <FormError message={state?.error} />
      <FormSuccess message={state?.success} />

      {blocks.map((b) => (
        <div key={b.key}>
          {/* An image block's control is the uploader, which has no single
              focusable field — so it gets a plain label, not a <label for>. */}
          {b.type === 'image' ? (
            <span className={labelCls}>{b.label}</span>
          ) : (
            <label htmlFor={b.key} className={labelCls}>
              {b.label}
            </label>
          )}

          {b.help ? <p className="mt-1 text-xs text-ink/55">{b.help}</p> : null}

          {b.type === 'image' ? (
            <div className="mt-2">
              {/* The upload route strips non-alphanumeric characters from the
                  folder, so keep it hyphenated: "content-home". */}
              <ImageUploader name={b.key} defaultValue={values[b.key]} folder={`content-${slug}`} />
            </div>
          ) : b.type === 'text' ? (
            <input id={b.key} name={b.key} defaultValue={values[b.key]} className={inputCls} />
          ) : (
            <textarea
              id={b.key}
              name={b.key}
              defaultValue={values[b.key]}
              rows={b.type === 'list' ? 6 : 4}
              className={inputCls}
            />
          )}

          <FieldError message={state?.fieldErrors?.[b.key]} />
        </div>
      ))}

      <div className="border-t border-navy/10 pt-6">
        <SaveButton />
      </div>
    </form>
  );
}
