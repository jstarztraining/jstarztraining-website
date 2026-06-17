'use client';

import { useFormState } from 'react-dom';
import type { SiteSettings } from '@prisma/client';
import { saveSiteSettings } from '@/lib/actions/settings';
import type { FormState } from '@/lib/form-state';
import {
  inputCls,
  labelCls,
  FieldError,
  FormError,
  FormSuccess,
  SaveButton,
} from '@/components/admin/form-ui';

export function SettingsForm({ settings }: { settings: SiteSettings | null }) {
  const [state, formAction] = useFormState<FormState, FormData>(saveSiteSettings, {});

  return (
    <form action={formAction} className="max-w-2xl space-y-8">
      <FormError message={state.error} />
      <FormSuccess message={state.success} />

      <fieldset className="space-y-6">
        <legend className="font-heading text-sm font-bold uppercase tracking-[0.16em] text-ink/50">
          Contact
        </legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className={labelCls}>
              Email
            </label>
            <input id="email" name="email" defaultValue={settings?.email ?? ''} className={inputCls} placeholder="jstarz@jstarztraining.com" />
            <FieldError message={state.fieldErrors?.email} />
          </div>
          <div>
            <label htmlFor="phone" className={labelCls}>
              Phone
            </label>
            <input id="phone" name="phone" defaultValue={settings?.phone ?? ''} className={inputCls} placeholder="(782) 821-2300" />
          </div>
        </div>
        <div>
          <label htmlFor="address" className={labelCls}>
            Address
          </label>
          <input id="address" name="address" defaultValue={settings?.address ?? ''} className={inputCls} placeholder="313-680 Parkland Drive, Halifax, NS, B3S 1M5" />
        </div>
        <div>
          <label htmlFor="hours" className={labelCls}>
            Hours <span className="font-normal text-ink/50">(optional)</span>
          </label>
          <input id="hours" name="hours" defaultValue={settings?.hours ?? ''} className={inputCls} placeholder="See the schedule for weekly session times." />
        </div>
      </fieldset>

      <fieldset className="space-y-6 border-t border-navy/10 pt-8">
        <legend className="font-heading text-sm font-bold uppercase tracking-[0.16em] text-ink/50">
          Social links
        </legend>
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <label htmlFor="instagram" className={labelCls}>
              Instagram
            </label>
            <input id="instagram" name="instagram" defaultValue={settings?.instagram ?? ''} className={inputCls} placeholder="https://instagram.com/…" />
            <FieldError message={state.fieldErrors?.instagram} />
          </div>
          <div>
            <label htmlFor="facebook" className={labelCls}>
              Facebook
            </label>
            <input id="facebook" name="facebook" defaultValue={settings?.facebook ?? ''} className={inputCls} placeholder="https://facebook.com/…" />
            <FieldError message={state.fieldErrors?.facebook} />
          </div>
          <div>
            <label htmlFor="tiktok" className={labelCls}>
              TikTok
            </label>
            <input id="tiktok" name="tiktok" defaultValue={settings?.tiktok ?? ''} className={inputCls} placeholder="https://tiktok.com/@…" />
            <FieldError message={state.fieldErrors?.tiktok} />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-6 border-t border-navy/10 pt-8">
        <legend className="font-heading text-sm font-bold uppercase tracking-[0.16em] text-ink/50">
          Footer & map
        </legend>
        <div>
          <label htmlFor="footerText" className={labelCls}>
            Footer tagline
          </label>
          <input id="footerText" name="footerText" defaultValue={settings?.footerText ?? ''} className={inputCls} placeholder="No ego. No politics. Just soccer." />
        </div>
        <div>
          <label htmlFor="mapEmbed" className={labelCls}>
            Map embed <span className="font-normal text-ink/50">(optional — Google Maps embed URL)</span>
          </label>
          <textarea id="mapEmbed" name="mapEmbed" defaultValue={settings?.mapEmbed ?? ''} rows={2} className={inputCls} placeholder="https://www.google.com/maps/embed?…" />
          <p className="mt-1.5 text-xs text-ink/50">Used on the Contact page when that page is built.</p>
        </div>
      </fieldset>

      <div className="border-t border-navy/10 pt-6">
        <SaveButton />
      </div>
    </form>
  );
}
