'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import type { Sponsor } from '@prisma/client';
import { saveSponsor } from '@/lib/actions/sponsors';
import type { FormState } from '@/lib/form-state';
import { SPONSOR_TIERS, DEFAULT_SPONSOR_TIER } from '@/lib/sponsor-tiers';
import {
  inputCls,
  labelCls,
  FieldError,
  FormError,
  FormActions,
  ActiveCheckbox,
} from '@/components/admin/form-ui';
import { ImageUploader } from '@/components/admin/ImageUploader';

export function SponsorForm({ sponsor }: { sponsor?: Sponsor }) {
  const editing = Boolean(sponsor);
  const [state, formAction] = useFormState<FormState, FormData>(saveSponsor, {});

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      {editing ? <input type="hidden" name="id" value={sponsor!.id} /> : null}
      <FormError message={state.error} />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Name
          </label>
          <input
            id="name"
            name="name"
            defaultValue={sponsor?.name ?? ''}
            className={inputCls}
            placeholder="Acme Sports Co. — or a person's name"
          />
          <FieldError message={state.fieldErrors?.name} />
        </div>
        <div>
          <label htmlFor="tier" className={labelCls}>
            Tier
          </label>
          <select
            id="tier"
            name="tier"
            defaultValue={sponsor?.tier ?? DEFAULT_SPONSOR_TIER}
            className={inputCls}
          >
            {SPONSOR_TIERS.map((tier) => (
              <option key={tier} value={tier}>
                {tier}
              </option>
            ))}
          </select>
          <FieldError message={state.fieldErrors?.tier} />
          <p className="mt-1.5 text-xs text-ink/55">
            Premier &amp; Community Partners show as logo tiles; Supporters show as name chips.
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="role" className={labelCls}>
          Role / label <span className="font-normal text-ink/50">(optional)</span>
        </label>
        <input
          id="role"
          name="role"
          defaultValue={sponsor?.role ?? ''}
          className={inputCls}
          placeholder="e.g. Web Developer — mostly for individual supporters"
        />
        <FieldError message={state.fieldErrors?.role} />
      </div>

      <div>
        <label htmlFor="websiteUrl" className={labelCls}>
          Website URL <span className="font-normal text-ink/50">(optional)</span>
        </label>
        <input
          id="websiteUrl"
          name="websiteUrl"
          type="text"
          inputMode="url"
          defaultValue={sponsor?.websiteUrl ?? ''}
          className={inputCls}
          placeholder="https://example.com"
        />
        <FieldError message={state.fieldErrors?.websiteUrl} />
      </div>

      <div>
        <span className={labelCls}>
          Logo <span className="font-normal text-ink/50">(optional — leave blank to show the name)</span>
        </span>
        <div className="mt-2">
          <ImageUploader
            name="logoUrl"
            defaultValue={sponsor?.logoUrl ?? ''}
            folder="sponsors"
            previewClassName="h-24 w-40 bg-white"
          />
        </div>
        <FieldError message={state.fieldErrors?.logoUrl} />
      </div>

      <ActiveCheckbox defaultChecked={sponsor ? sponsor.isActive : true} />

      <div className="flex items-center gap-3 border-t border-navy/10 pt-6">
        <FormActions editing={editing} entity="sponsor" />
        <Link
          href="/admin/sponsors"
          className="inline-flex h-11 items-center rounded-full px-5 font-heading font-semibold text-ink/70 transition-colors hover:text-navy"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
