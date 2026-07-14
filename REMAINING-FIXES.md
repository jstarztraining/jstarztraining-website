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

### 🔴 Proper fix (before handover) — verify the domain in Resend
**Blocker discovered:** Resend needs a **subdomain MX** record (`send.…` → `feedback-smtp…ses.com`), and **Wix's DNS editor cannot create MX records on a subdomain.** So the domain can't be verified while DNS lives at Wix.

**The fix: move DNS from Wix to Cloudflare** (free, supports subdomain MX, faster). Then:
1. In Cloudflare, add the domain; it imports existing records. **Carefully recreate every current record** — especially the 5 Google Workspace **MX** records + SPF TXT (so `jstarz@` email keeps working), the Vercel **A `@` → 76.76.21.21**, and the `www` record.
2. Point the registrar's **nameservers** to Cloudflare's (from `ns4/ns5.wixdns.net`).
3. In Resend, add the **root** domain `jstarztraining.com` (not a subdomain — avoids the `send.send` double-prefix). Add its DKIM/SPF/MX records in Cloudflare and **Verify**.
4. Update env (Production + Preview + `.env`):
   - `CONTACT_FROM_EMAIL` = `JStarz Website <noreply@jstarztraining.com>`
   - `CONTACT_TO_EMAIL` = `jstarz@jstarztraining.com` (Jordan's real inbox — matches the site)
5. Redeploy and test the live form → confirm it arrives at `jstarz@jstarztraining.com`.

> Current documented DNS (for the Cloudflare recreate): apex A `76.76.21.21`; www → Vercel; MX = Google (`aspmx.l.google.com` +4 alts); TXT = `v=spf1 include:_spf.google.com ~all`, a `google-site-verification=…`, and a stale `replit-verify=…` (can drop that one).

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
