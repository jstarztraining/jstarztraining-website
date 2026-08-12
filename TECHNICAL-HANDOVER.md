# JStarz Training — Technical Handover

_Last updated: 2026-07-14_

The developer/maintainer reference for the JStarz site. For the non-technical "how to run your site" guide, see **[HANDOVER.md](HANDOVER.md)** (Owner's Guide).

---

## 1. Live addresses

| What | Address |
|---|---|
| Production site | **https://jstarztraining.com** |
| Vercel deploy URL | **https://jstarz-website.vercel.app** |
| Admin dashboard | **/admin** (login at **/login**) |
| Store / checkout | Shopify (`9bejay-2u.myshopify.com`) |

## 2. Stack

- **Next.js 14 (App Router) + TypeScript + Tailwind** on **Vercel**
- **Supabase** — Postgres + Storage (uploaded images)
- **Prisma** ORM · **Auth.js (NextAuth)** email+password, roles in DB, JWT sessions
- **SendGrid** — contact-form email (from `noreply@jstarztraining.com` → `jstarz@jstarztraining.com`; domain-authenticated with `sgz` DKIM selector)
- Public pages: SSG + ISR (~60s). Dashboard writes to the DB and re-renders via ISR (no redeploy)

## 3. Accounts & ownership

The **website build** accounts are under the dedicated Google account **jstarztraining.web@gmail.com**:

| Service | Purpose | Identifier |
|---|---|---|
| **GitHub** | Source code | `github.com/jstarztraining/jstarztraining-website` |
| **Vercel** | Hosting / deploys | project `jstarz-website`, team `jstarz` |
| **Supabase** | Database + image storage | — |
| **SendGrid** | Contact-form email | — |

**Separately, Jordan already owns his email:** the `jstarz@jstarztraining.com` mailbox runs on **Google Workspace under Jordan's own account** (the Google MX records on the domain). It is *not* part of the `jstarztraining.web@gmail.com` build account and does not transfer — it was already his. The build must simply avoid breaking it (see §6).

### Access architecture after handover (2026-08-13)

Jordan is **master owner of everything**. The developer keeps exactly **one** standing key.

| Service | Owner | Developer access after handover |
|---|---|---|
| **GitHub** | Jordan | **Collaborator (Write)** — added on the developer's *personal* GitHub account, not the shared `jstarztraining.web@gmail.com` identity. This is the only standing access. |
| **Vercel** | Jordan, sole owner | **None.** Not needed — pushes to `main` auto-deploy. |
| **Supabase** | Jordan | **None.** Schema changes are request-based. |
| **SendGrid** | Jordan | **None.** |
| **Shopify** | Jordan | **None.** No developer staff seat ever existed — the developer used Jordan's own admin login (temporary password, July 2026), which Jordan has since changed. Closed. |
| **Site dashboard** | Jordan (Admin) | One Admin account, `jeremycrooks20@gmail.com`, retained for troubleshooting. Disclosed in [HANDOVER.md](HANDOVER.md); Jordan can delete it himself at any time. |
| **Local `.env`** | — | Developer retains his copy of the production configuration (see the disclosure below). Disclosed in [HANDOVER.md](HANDOVER.md). |

### There is no single master account

`jstarztraining.web@gmail.com` is **not** a master key. GitHub personal accounts have no Google SSO,
and Vercel and Supabase were almost certainly created *through GitHub*. What exists is **four
independent accounts that each happen to use that address in their email field** — four separate
email settings, not one login.

Practical consequences:

- **Jordan can move each service onto `jstarz@jstarztraining.com` himself**, one at a time, at his own
  pace, with no developer involvement. His address is Google-hosted (Workspace), so it functions as a
  real login. This was offered as optional in the handover email; the developer is not doing it.
- **Changing an account's email address is harmless.** It does not disturb the site and does not
  affect the developer's GitHub collaborator seat.
- **Creating a brand-new GitHub account and transferring the repository WOULD drop that access** — and
  can break the Vercel↔GitHub integration. Don't.

> ⚠️ **Confirm the collaborator seat works before relying on it.** The developer's personal GitHub
> account must be able to push *on its own credential*, independently of the build-account identity.
> Verified 2026-08-12: `gh api user` returns `CrooksJeremy`, the repo collaborator list shows
> `CrooksJeremy role=write push=true`, and a push from a clean clone was attributed to that account.

> ⚠️ **The developer's local `.env` still holds production secrets.** `DATABASE_URL`, `DIRECT_URL`,
> `SUPABASE_SERVICE_ROLE_KEY`, `SENDGRID_API_KEY`, `AUTH_SECRET` and `CRON_SECRET` are all real
> production values on the developer's machine. That is broader than the access split above intends —
> the service-role key bypasses RLS for full database access, and `AUTH_SECRET` could be used to mint
> a valid admin session. It is a normal consequence of having built the site, but it should be a
> decision rather than an oversight. Three options:
>
> 1. **Delete the local `.env` after handover** (simplest). GitHub Write is retained; if a local run is
>    ever needed for a fix, Jordan supplies the variables at that point.
> 2. **Rotate the six values** — the clean break. Roughly 15 minutes, and Jordan can do it at any time,
>    not necessarily on handover day. Rotate in Vercel (Production + Preview), then redeploy: new
>    Supabase database password + service-role key, new SendGrid API key, and freshly generated
>    `AUTH_SECRET` and `CRON_SECRET`. Note that changing `AUTH_SECRET` signs everyone out — they log
>    back in with the same passwords.
> 3. **Leave it as-is, disclosed** — also fine, provided it is a stated choice.

> ⚠️ **Do not move the GitHub repo.** The repo lives under the `jstarztraining` GitHub account — a
> GitHub account that merely *uses* `jstarztraining.web@gmail.com` as its email address, not a Google
> identity. Handing over that GitHub account's own credentials makes Jordan the owner with no repo
> migration at all, and he can re-point its email afterwards. Creating a new GitHub account and
> transferring the repository to it would drop the developer's collaborator seat and can break the
> Vercel↔GitHub integration, requiring a reconnect (Vercel → Settings → Git) before pushes deploy.

All **build** credentials transfer to Jordan (final payment received 2026-07-15); he owns site, code,
and every account.

## 4. Deploys — GitHub is connected to Vercel

Pushing to `main` **auto-builds and deploys to production**:

```bash
git push origin main      # → Vercel builds & deploys to jstarztraining.com
```

- The live site = whatever is on `main`. Don't push unfinished work to `main`; push a branch to get a safe preview URL first.
- Manual fallback: `vercel deploy --prod --yes` (Vercel CLI logged in as the jstarztraining account).
- **Content note:** dashboard edits write straight to the DB (no deploy needed). Only content baked into `lib/content.ts` needs `npm run db:seed` **before** pushing, because pages read the DB at build time.

## 5. Environment variables

In **Vercel → Settings → Environment Variables**, set for **Production _and_ Preview**:

`DATABASE_URL`, `DIRECT_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `AUTH_SECRET`, `SENDGRID_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `CRON_SECRET`

> ⚠️ **Never set `AUTH_URL`.** The app uses `trustHost: true` and derives its URL from the request. A leftover `AUTH_URL=http://localhost:3000` previously broke admin login (secure-cookie mismatch → `/admin` redirect loop). `.vercelignore` now stops the local `.env` from ever shipping and reintroducing it.

The local `.env` (never committed, never deployed) holds the same values for local dev.

## 6. Domain & email — critical

- **DNS is hosted at Wix.** Website records edited in **Wix → Domains → Manage DNS Records**:
  - `A` `@` → `76.76.21.21`
  - `www` → Vercel (308-redirects to the apex via `next.config.mjs`)
- **Email = MX / TXT (SPF) records → leave untouched.** Changing them breaks `jstarz@jstarztraining.com`.
- **Never switch nameservers to Vercel** (its dashboard suggests it). That drops the Google Workspace MX records and breaks email. Keep nameservers on Wix; manage A/CNAME there.
- **Revert website:** set `A` `@` back to `34.111.179.208` (old host).

### Recorded DNS state — for disaster recovery

Captured 2026-07-14 before the cutover and re-checked 2026-08-12. If DNS is ever wiped or has to be
rebuilt at another provider, this is what must exist. **The MX and SPF rows are the email** — recreate
them exactly or `jstarz@jstarztraining.com` stops working.

| Type | Name | Value | Priority |
|---|---|---|---|
| A | `@` | `76.76.21.21` (Vercel) | — |
| A | `www` | `76.76.21.21` (Vercel) | — |
| MX | `@` | `aspmx.l.google.com` | 10 |
| MX | `@` | `alt1.aspmx.l.google.com` | 20 |
| MX | `@` | `alt2.aspmx.l.google.com` | 30 |
| MX | `@` | `alt3.aspmx.l.google.com` | 40 |
| MX | `@` | `alt4.aspmx.l.google.com` | 50 |
| TXT | `@` | `v=spf1 include:_spf.google.com ~all` | — |
| TXT | `@` | `google-site-verification=xfoVMp4fomy4xvBDmtOzrZnTj2Jg3xQG56Id4SUawBE` | — |
| TXT | `_dmarc` | `v=DMARC1; p=none;` | — |
| CNAME | `em6492` | `u110946341.wl092.sendgrid.net` | — |
| CNAME | `sgz._domainkey` | `sgz.domainkey.u110946341.wl092.sendgrid.net` | — |
| CNAME | `sgz2._domainkey` | `sgz2.domainkey.u110946341.wl092.sendgrid.net` | — |

The three `sendgrid`/`sgz` CNAMEs authenticate the contact-form sender (§2). A stale
`replit-verify=…` TXT from the pre-Vercel host is still present and can be deleted safely.

> **Nameservers stay at Wix** (`ns4.wixdns.net` / `ns5.wixdns.net`). A migration to Cloudflare was
> investigated in July and abandoned: Wix marks nameservers non-editable on its own registered domains
> and offers no self-service DNSSEC toggle, so delegating away would have required a support ticket or
> a full registrar transfer. The contact-form problem that prompted it was solved instead by moving to
> a provider that verifies with CNAMEs only (SendGrid), which needed no DNS delegation at all.

## 7. User logins

```bash
npm run user:create -- <email> <password> <Admin|Editor> "Full Name"
```

Upserts by email (re-running resets the password). Points at the same Supabase DB as production. No public signup / email-reset by design — Admin resets Editors from the dashboard; a locked-out Admin is reset via this script.

## 8. Database & storage

- Postgres + Storage on Supabase. Schema: `prisma/schema.prisma`; seed: `prisma/seed.ts`.
- `npm run db:seed` **overwrites** seeded content — run only intentionally (it does not preserve dashboard edits to seeded rows).
- Uploads go to a public Supabase Storage bucket via `/api/upload` (auto-resized/optimized).

## 9. Keep-warm cron

`vercel.json` runs a daily cron (`0 6 * * *`) → `/api/cron/keep-warm` (guarded by `CRON_SECRET`) so the Supabase free tier doesn't sleep.

## 10. SEO

Per-page title/meta/OG set in code. Structured data (LocalBusiness, FAQPage, Breadcrumbs), `sitemap.xml`, `robots.txt` auto-generated. **At launch:** connect Google Search Console + submit the sitemap.

## 11. Troubleshooting

| Symptom | Cause / fix |
|---|---|
| Admin login loops back to `/login` | An `AUTH_URL` is set in Vercel env — remove it (§5) |
| Old site still shows after DNS change | DNS cache; wait up to ~1 hour |
| Email breaks after a DNS edit | MX/TXT changed — restore Google Workspace MX records |
| Preview/branch build fails | Env vars missing from **Preview** scope (§5) |
| A push didn't deploy | Check GitHub is still connected: Vercel → Settings → Git |

## 12. Outstanding at handover

Done: Jordan's Admin login is live and his password was changed on first login; final payment
received; hero, About and footer copy signed off by Jordan; Shopify closed out (no staff seat ever
existed — Jordan changed the admin password he had shared); Vercel plan confirmed Hobby; developer's
personal GitHub collaborator seat verified working on its own credential (§3); the retained local
`.env` is a made decision, disclosed to Jordan in writing in [HANDOVER.md](HANDOVER.md).

- [ ] Send the handover email (drafted outside the repo:
      `C:\JStarz\Contract & Admin\Jordan_Handover_Email_DRAFT.md`)
- [ ] Transfer the account credentials. Note these are **four independent accounts** sharing one
      email address, not one master login (§3) — Jordan can re-point each to
      `jstarz@jstarztraining.com` himself afterwards, at his own pace.
- [ ] Confirm **Google Search Console** property + sitemap submission
- [ ] Confirm the **keep-warm cron** has recent successful runs in Vercel
- [ ] Jordan creates his 2 **Editor** logins himself (dashboard → **Users**; names/emails never supplied)
- [ ] Jordan supplies the FAQ **cancellation/rescheduling policy**

**Note — the database has drifted from the seed file.** Jordan has edited program cards through the
dashboard (e.g. a card now titled "Outdoor Soccer & Goalkeeping Sessions" that does not exist in
`lib/content.ts`). The DB is the source of truth for the live site. **Running `npm run db:seed` would
overwrite his edits** — see §8.

---

30-day bug warranty from launch. Work beyond the agreed scope is a Phase-2 add-on, quoted separately.
