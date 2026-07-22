# JStarz Training — Remaining Fixes Before Launch / Handover

_Last updated: 2026-07-14_

The punch-list to close out before final handover. Ordered by priority. 🔴 = blocker, 🟡 = should-do, 🟢 = launch/nice-to-have.

---

## ✅ 1. Contact form email — DONE (2026-07-22, branded + live)

Enquiries now send **from `noreply@jstarztraining.com` → Jordan's real inbox `jstarz@jstarztraining.com`** via **SendGrid**. (Resend was dropped: it needed a subdomain MX record Wix can't create, so the domain was never verifiable. SendGrid verifies with CNAME records only, which Wix can create.)

**What was done:**
- `lib/actions/contact.ts` swapped from Resend (`resend`) to SendGrid (`@sendgrid/mail`).
- SendGrid "Authenticate Your Domain" for `jstarztraining.com` with a **custom DKIM selector `sgz`** — necessary because the default `s1`/`s2._domainkey` hosts already existed (Wix Ascend, → `ascendbywix.com`) and would have collided. Three CNAMEs added in Wix (MX/SPF/existing records left untouched, so email is unaffected):
  - `em6492` → `u110946341.wl092.sendgrid.net`
  - `sgz._domainkey` → `sgz.domainkey.u110946341.wl092.sendgrid.net`
  - `sgz2._domainkey` → `sgz2.domainkey.u110946341.wl092.sendgrid.net`
  - (skipped SendGrid's `_dmarc` TXT — the domain already has one)
- Env in Vercel (Production + Preview) + local `.env`: `SENDGRID_API_KEY`, `CONTACT_FROM_EMAIL="JStarz Website <noreply@jstarztraining.com>"`, `CONTACT_TO_EMAIL="jstarz@jstarztraining.com"`. Stale `RESEND_API_KEY` removed.
- Deployed (commit `4c918be`). Direct SendGrid API test returned **202** (accepted) and delivered a test email to Jordan's inbox.

> SendGrid account is under `jstarztraining.web@gmail.com` (transfers with the other build accounts on final payment). Free trial ends 2026-09-15; the free tier continues after.

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

## ✅ 4. Verify all Shopify program links — DONE (2026-07-22)

- [x] Clicked through every program card on the live site — each opens the correct Shopify product/collection.
- [x] Displayed prices confirmed against Shopify (prices are typed by hand — they don't sync).

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
