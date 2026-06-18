'use client';

import { useFormState } from 'react-dom';
import type { BlockDef } from '@/lib/content-blocks';
import { saveContent } from '@/lib/actions/content';
import type { FormState } from '@/lib/form-state';
import { inputCls, labelCls, FormError, FormSuccess, SaveButton } from '@/components/admin/form-ui';

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
          <label htmlFor={b.key} className={labelCls}>
            {b.label}
          </label>
          {b.type === 'text' ? (
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
          {b.help ? <p className="mt-1.5 text-xs text-ink/50">{b.help}</p> : null}
        </div>
      ))}

      <div className="border-t border-navy/10 pt-6">
        <SaveButton />
      </div>
    </form>
  );
}
