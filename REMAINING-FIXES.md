# JStarz Training — Remaining Fixes Before Launch / Handover

_Last updated: 2026-07-14_

The punch-list to close out before final handover. Ordered by priority. 🔴 = blocker, 🟡 = should-do, 🟢 = launch/nice-to-have.

---

## 🟡 1. Contact form email

### ✅ Interim fix applied (2026-07-14) — form works now
The form was broken (it tried to send from the unverified `website@jstarztraining.com`, which Resend rejects). **Interim fix is live:**
- `CONTACT_FROM_EMAIL` = `JStarz Website <onboarding@resend.dev>` (Resend's shared sender — no domain verification needed)
- `CONTACT_TO_EMAIL` = `jstarztraining.web@gmail.com` (unverified Resend can only deliver to the account's own email)
- Updated in Vercel (Production + Preview) and `.env`, redeployed. Verified sending works.

**Limitations of the interim:** emails come from `onboarding@resend.dev` (unbranded) and land in the **build Gmail**, not Jordan's real inbox. Fine for now; upgrade before final handover.

### 🟡 Branded fix (before handover) — PARKED, pick a path
Goal: enquiries from `noreply@jstarztraining.com` → Jordan's real inbox `jstarz@jstarztraining.com`.

**Two Wix walls block the obvious routes:**
- Resend needs a **subdomain MX** — Wix can't create subdomain MX records.
- Moving DNS to Cloudflare would fix that, BUT on this Wix-registered domain the **nameservers are "not editable"** and **DNSSEC has no self-service toggle** (it's ON). So Cloudflare needs a Wix support ticket or a domain transfer.

**Recommended path when resumed — switch mail provider (no DNS migration):**
Use **SendGrid / Amazon SES / Postmark**, which verify a sending domain with **CNAME/TXT records only** — which Wix CAN create. Then:
1. Create the account; add domain `jstarztraining.com`; add the CNAME/TXT records it gives you in **Wix → Manage DNS Records** (leave the Google MX/SPF alone).
2. Swap `lib/actions/contact.ts` from Resend to the new provider (or SMTP).
3. Env (Production + Preview + `.env`): `CONTACT_FROM_EMAIL` = `JStarz Website <noreply@jstarztraining.com>`, `CONTACT_TO_EMAIL` = `jstarz@jstarztraining.com`.
4. Redeploy, test the live form.

**Alternative paths:** Wix support to unlock Cloudflare (see `CLOUDFLARE-MIGRATION.md`, zone already set up), or transfer the domain off Wix (5-7 days, best long-term — Jordan should own it at a real registrar anyway).

> Documented current DNS: apex A `76.76.21.21`; www → Vercel; MX = Google (`aspmx.l.google.com` +4 alts); TXT = `v=spf1 include:_spf.google.com ~all` + `google-site-verification=…`; DKIM CNAMEs `s1/s2._domainkey` → ascendbywix.com (Wix email marketing, not Google); `_dmarc` CNAME → wixemails.com; stale `replit-verify` TXT (droppable).

---

## 🔴 2. Create the real admin + editor logins

Only login in the database today is `jeremycrooks20@gmail.com` (developer, temporary password).

- [ ] Get from Jordan: **his admin email** + the **2 editor names/emails**
- [ ] Create them:
  ```bash
  npm run user:create -- jordan@jstarztraining.com '<temp-pass>' Admin "Jordan Ellis"
  npm run user:create -- <editor1-email> '<temp-pass>' Editor "Editor One"
  npm run user:create -- <editor2-email> '<temp-pass>' Editor "Editor Two"
  ```
- [ ] Jordan changes his password on first login (Users module)
- [ ] Remove or keep the developer account per Jordan's preference

---

## 🟡 3. Content gaps to confirm

- [ ] **Cancellation / rescheduling policy** — still marked [NEED] in the FAQ. Get the wording from Jordan and add it via the FAQ module.
- [ ] Confirm any final **gallery photos** Jordan wants added.
- [ ] Confirm the "what to bring" details and any other copy tweaks from his review.

---

## 🟡 4. Verify all Shopify program links

- [ ] Click through **every** program card on the live site and confirm each opens the correct Shopify product/collection.
- [ ] Confirm each displayed price still matches Shopify (prices are typed by hand — they don't sync).

---

## 🟢 5. SEO launch tasks

- [ ] Connect **Google Search Console** (verify the domain) and **submit the sitemap** (`https://jstarztraining.com/sitemap.xml`).
- [ ] Confirm `robots.txt` and structured data are live (they generate automatically).

---

## 🟢 6. Confirm the keep-warm cron is firing

- [ ] In Vercel → the project → **Crons**, confirm the daily `/api/cron/keep-warm` job (`0 6 * * *`) is running, so the Supabase free tier doesn't sleep.

---

## 🟢 7. Final handover steps (on final payment)

- [ ] Transfer all build credentials (GitHub / Vercel / Supabase / Resend under `jstarztraining.web@gmail.com`) to Jordan.
- [ ] Walk Jordan through the [Owner's Guide](HANDOVER.md) (login + editing).
- [ ] Confirm 30-day bug warranty start date.

---

## 🐞 Known open issue (not a blocker)

- **Nav readability on scroll (iPhone):** white nav links can be hard to read against light sections after scrolling on Home. Not reliably reproduced yet — needs a screenshot from Jordan's device to pin down. Track and fix within the warranty window if it recurs.
