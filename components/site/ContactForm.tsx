'use client';

import { useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { sendContact } from '@/lib/actions/contact';
import type { FormState } from '@/lib/form-state';
import { inputCls, labelCls, FieldError } from '@/components/admin/form-ui';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 w-full items-center justify-center rounded-full bg-gold font-heading font-semibold text-navy transition-all duration-300 ease-out-quint hover:bg-gold-soft disabled:opacity-60 sm:w-auto sm:px-8"
    >
      {pending ? 'Sending…' : 'Send message'}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useFormState<FormState, FormData>(sendContact, {});

  if (state.success) {
    return (
      <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-2xl text-white">
          ✓
        </div>
        <h2 className="mt-4 font-display text-xl font-extrabold text-navy">Message sent</h2>
        <p className="mt-2 text-ink/70">{state.success}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {state.error ? (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {state.error}
        </p>
      ) : null}

      {/* Honeypot — visually hidden, ignored by humans */}
      <div aria-hidden className="absolute left-[-9999px]" style={{ position: 'absolute', left: '-9999px' }}>
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Name
          </label>
          <input
            id="name"
            name="name"
            className={inputCls}
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={state.fieldErrors?.name ? true : undefined}
            aria-describedby={state.fieldErrors?.name ? 'name-error' : undefined}
          />
          <FieldError id="name-error" message={state.fieldErrors?.name} />
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>
            Phone <span className="font-normal text-ink/50">(optional)</span>
          </label>
          <input id="phone" name="phone" className={inputCls} placeholder="(782) 000-0000" autoComplete="tel" />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelCls}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={inputCls}
          placeholder="you@example.com"
          autoComplete="email"
          aria-invalid={state.fieldErrors?.email ? true : undefined}
          aria-describedby={state.fieldErrors?.email ? 'email-error' : undefined}
        />
        <FieldError id="email-error" message={state.fieldErrors?.email} />
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={inputCls}
          placeholder="Tell us about your player and what you’re looking for…"
          aria-invalid={state.fieldErrors?.message ? true : undefined}
          aria-describedby={state.fieldErrors?.message ? 'message-error' : undefined}
        />
        <FieldError id="message-error" message={state.fieldErrors?.message} />
      </div>

      <SubmitButton />
    </form>
  );
}
