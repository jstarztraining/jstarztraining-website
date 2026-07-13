'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import type { HomeHero } from '@prisma/client';
import { saveHomeHero } from '@/lib/actions/settings';
import type { FormState } from '@/lib/form-state';
import {
  inputCls,
  labelCls,
  FieldError,
  FormError,
  FormSuccess,
  SaveButton,
} from '@/components/admin/form-ui';
import { ImageUploader } from '@/components/admin/ImageUploader';

export function HeroForm({ hero }: { hero: HomeHero | null }) {
  const [state, formAction] = useFormState<FormState, FormData>(saveHomeHero, {});
  const [bannerOn, setBannerOn] = useState(hero?.bannerEnabled ?? false);

  return (
    <form action={formAction} className="max-w-2xl space-y-8">
      <FormError message={state.error} />
      <FormSuccess message={state.success} />

      {/* Hero */}
      <fieldset className="space-y-6">
        <legend className="font-heading text-sm font-bold uppercase tracking-[0.16em] text-ink/50">
          Homepage hero
        </legend>

        <div>
          <label htmlFor="headline" className={labelCls}>
            Headline
          </label>
          <input id="headline" name="headline" defaultValue={hero?.headline ?? ''} className={inputCls} placeholder="Develop Your Game." />
          <p className="mt-1.5 text-xs text-ink/50">The last word is shown in gold with the animated underline.</p>
          <FieldError message={state.fieldErrors?.headline} />
        </div>

        <div>
          <label htmlFor="subhead" className={labelCls}>
            Subheading
          </label>
          <textarea id="subhead" name="subhead" defaultValue={hero?.subhead ?? ''} rows={3} className={inputCls} />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="ctaLabel" className={labelCls}>
              Button label
            </label>
            <input id="ctaLabel" name="ctaLabel" defaultValue={hero?.ctaLabel ?? ''} className={inputCls} placeholder="Book a Session" />
          </div>
          <div>
            <label htmlFor="ctaUrl" className={labelCls}>
              Button link
            </label>
            <input id="ctaUrl" name="ctaUrl" defaultValue={hero?.ctaUrl ?? ''} className={inputCls} placeholder="https://…myshopify.com" />
            <FieldError message={state.fieldErrors?.ctaUrl} />
          </div>
        </div>

        <div>
          <span className={labelCls}>
            Hero image <span className="font-normal text-ink/50">(optional)</span>
          </span>
          <div className="mt-2">
            <ImageUploader name="imageUrl" defaultValue={hero?.imageUrl ?? ''} folder="hero" />
          </div>
          <FieldError message={state.fieldErrors?.imageUrl} />
        </div>
      </fieldset>

      {/* Promo banner */}
      <fieldset className="space-y-6 border-t border-navy/10 pt-8">
        <legend className="font-heading text-sm font-bold uppercase tracking-[0.16em] text-ink/50">
          Promo banner
        </legend>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="bannerEnabled"
            checked={bannerOn}
            onChange={(e) => setBannerOn(e.target.checked)}
            className="h-5 w-5 rounded border-navy/30 text-brand focus:ring-brand/30"
          />
          <span className="text-sm font-medium text-navy">
            Show the banner <span className="font-normal text-ink/55">(gold bar at the top of the homepage)</span>
          </span>
        </label>

        <div className={bannerOn ? '' : 'pointer-events-none opacity-50'}>
          <div className="space-y-6">
            <div>
              <label htmlFor="bannerMessage" className={labelCls}>
                Banner message
              </label>
              <input id="bannerMessage" name="bannerMessage" defaultValue={hero?.bannerMessage ?? ''} className={inputCls} placeholder="Summer camp registration is open!" />
              <FieldError message={state.fieldErrors?.bannerMessage} />
            </div>
            <div>
              <label htmlFor="bannerUrl" className={labelCls}>
                Banner link <span className="font-normal text-ink/50">(optional)</span>
              </label>
              <input id="bannerUrl" name="bannerUrl" defaultValue={hero?.bannerUrl ?? ''} className={inputCls} placeholder="https://…" />
              <FieldError message={state.fieldErrors?.bannerUrl} />
            </div>
          </div>
        </div>
      </fieldset>

      <div className="border-t border-navy/10 pt-6">
        <SaveButton />
      </div>
    </form>
  );
}
