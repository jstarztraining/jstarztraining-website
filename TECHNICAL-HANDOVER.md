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
- **Resend** — contact-form email
- Public pages: SSG + ISR (~60s). Dashboard writes to the DB and re-renders via ISR (no redeploy)

## 3. Accounts & ownership

The **website build** accounts are under the dedicated Google account **jstarztraining.web@gmail.com**:

| Service | Purpose | Identifier |
|---|---|---|
| **GitHub** | Source code | `github.com/jstarztraining/jstarztraining-website` |
| **Vercel** | Hosting / deploys | project `jstarz-website`, team `jstarz` |
| **Supabase** | Database + image storage | — |
| **Resend** | Contact-form email | — |

**Separately, Jordan already owns his email:** the `jstarz@jstarztraining.com` mailbox runs on **Google Workspace under Jordan's own account** (the Google MX records on the domain). It is *not* part of the `jstarztraining.web@gmail.com` build account and does not transfer — it was already his. The build must simply avoid breaking it (see §6).

On final payment, all **build** credentials (GitHub/Vercel/Supabase/Resend) transfer to Jordan; he owns site, code, and every account.

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

`DATABASE_URL`, `DIRECT_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `AUTH_SECRET`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `CRON_SECRET`

> ⚠️ **Never set `AUTH_URL`.** The app uses `trustHost: true` and derives its URL from the request. A leftover `AUTH_URL=http://localhost:3000` previously broke admin login (secure-cookie mismatch → `/admin` redirect loop). `.vercelignore` now stops the local `.env` from ever shipping and reintroducing it.

The local `.env` (never committed, never deployed) holds the same values for local dev.

## 6. Domain & email — critical

- **DNS is hosted at Wix.** Website records edited in **Wix → Domains → Manage DNS Records**:
  - `A` `@` → `76.76.21.21`
  - `www` → Vercel (308-redirects to the apex via `next.config.mjs`)
- **Email = MX / TXT (SPF) records → leave untouched.** Changing them breaks `jstarz@jstarztraining.com`.
- **Never switch nameservers to Vercel** (its dashboard suggests it). That drops the Google Workspace MX records and breaks email. Keep nameservers on Wix; manage A/CNAME there.
- **Revert website:** set `A` `@` back to `34.111.179.208` (old host).

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

- [ ] Create Jordan's **Admin** login + up to **2 Editor** logins (names/emails needed)
- [ ] Jordan changes the temporary admin password on first login
- [ ] Transfer all account credentials to Jordan (on final payment)
- [ ] Confirm remaining content (e.g. cancellation/rescheduling policy) + any final gallery photos
- [ ] Connect Google Search Console + submit sitemap
- [ ] Confirm the keep-warm cron is firing in Vercel

---

30-day bug warranty from launch. Work beyond the agreed scope is a Phase-2 add-on, quoted separately.
