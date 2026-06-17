'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import type { Testimonial } from '@prisma/client';
import { saveTestimonial } from '@/lib/actions/testimonials';
import type { FormState } from '@/lib/form-state';
import {
  inputCls,
  labelCls,
  FieldError,
  FormError,
  FormActions,
  ActiveCheckbox,
} from '@/components/admin/form-ui';

export function TestimonialForm({ testimonial }: { testimonial?: Testimonial }) {
  const editing = Boolean(testimonial);
  const [state, formAction] = useFormState<FormState, FormData>(saveTestimonial, {});

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      {editing ? <input type="hidden" name="id" value={testimonial!.id} /> : null}
      <FormError message={state.error} />

      <div>
        <label htmlFor="quote" className={labelCls}>
          Quote
        </label>
        <textarea
          id="quote"
          name="quote"
          defaultValue={testimonial?.quote ?? ''}
          rows={4}
          className={inputCls}
          placeholder="What the parent or player said…"
        />
        <FieldError message={state.fieldErrors?.quote} />
      </div>

      <div>
        <label htmlFor="name" className={labelCls}>
          Name / attribution
        </label>
        <input
          id="name"
          name="name"
          defaultValue={testimonial?.name ?? ''}
          className={inputCls}
          placeholder="Sarah M. — Parent, U12 player"
        />
        <p className="mt-1.5 text-xs text-ink/50">
          Shown under the quote. Use “Name — role” to show a smaller role line.
        </p>
        <FieldError message={state.fieldErrors?.name} />
      </div>

      <ActiveCheckbox defaultChecked={testimonial ? testimonial.isActive : true} />

      <div className="flex items-center gap-3 border-t border-navy/10 pt-6">
        <FormActions editing={editing} entity="testimonial" />
        <Link href="/admin/testimonials" className="inline-flex h-11 items-center rounded-full px-5 font-heading font-semibold text-ink/70 transition-colors hover:text-navy">
          Cancel
        </Link>
      </div>
    </form>
  );
}
