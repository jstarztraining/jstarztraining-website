'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import type { FaqItem } from '@prisma/client';
import { saveFaq } from '@/lib/actions/faqs';
import type { FormState } from '@/lib/form-state';
import {
  inputCls,
  labelCls,
  FieldError,
  FormError,
  FormActions,
  ActiveCheckbox,
} from '@/components/admin/form-ui';

export function FaqForm({ faq }: { faq?: FaqItem }) {
  const editing = Boolean(faq);
  const [state, formAction] = useFormState<FormState, FormData>(saveFaq, {});

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      {editing ? <input type="hidden" name="id" value={faq!.id} /> : null}
      <FormError message={state.error} />

      <div>
        <label htmlFor="question" className={labelCls}>
          Question
        </label>
        <input
          id="question"
          name="question"
          defaultValue={faq?.question ?? ''}
          className={inputCls}
          placeholder="What ages do you train?"
        />
        <FieldError message={state.fieldErrors?.question} />
      </div>

      <div>
        <label htmlFor="answer" className={labelCls}>
          Answer
        </label>
        <textarea
          id="answer"
          name="answer"
          defaultValue={faq?.answer ?? ''}
          rows={5}
          className={inputCls}
          placeholder="The answer, in a friendly, clear voice."
        />
        <FieldError message={state.fieldErrors?.answer} />
      </div>

      <ActiveCheckbox defaultChecked={faq ? faq.isActive : true} />

      <div className="flex items-center gap-3 border-t border-navy/10 pt-6">
        <FormActions editing={editing} entity="FAQ" />
        <Link href="/admin/faq" className="inline-flex h-11 items-center rounded-full px-5 font-heading font-semibold text-ink/70 transition-colors hover:text-navy">
          Cancel
        </Link>
      </div>
    </form>
  );
}
