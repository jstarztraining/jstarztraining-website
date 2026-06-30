# JStarz Training — Website + Admin Dashboard

Custom marketing site and content dashboard for JStarz Private Soccer Training (Halifax, NS).
Public pages are server-rendered with ISR and read the same database the `/admin` dashboard writes to,
so content edits go live without a redeploy. Checkout is handled off-site by Shopify — the site never
touches money.

## Stack

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**
- **Prisma** ORM → **Supabase** Postgres
- **Supabase Storage** for uploaded images (optimized server-side with **sharp** on upload)
- **Auth.js (NextAuth v5)** — email/password, roles (`Admin` | `Editor`), JWT sessions
- **Resend** for the contact-form email
- Deployed on **Vercel** (ISR + a daily keep-warm cron)

## Local setup

```bash
npm install
cp .env.example .env      # then fill in real values (see below)
npm run db:migrate        # apply Prisma migrations to your DB
npm run db:seed           # seed pages, programs, FAQs, coach, testimonials
npm run user:create       # create your first Admin login (interactive)
npm run dev               # http://localhost:3000  (admin at /admin)
```

### Environment variables

All keys live in `.env.example` with notes on where to find each. Summary:

| Var | Purpose |
|-----|---------|
| `DATABASE_URL` / `DIRECT_URL` | Supabase Postgres (pooled / direct-for-migrations) |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase API |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only — image uploads (bypasses RLS). Never expose. |
| `AUTH_SECRET` / `AUTH_URL` | Auth.js session signing + base URL |
| `RESEND_API_KEY` / `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` | Contact-form email |
| `CRON_SECRET` | Bearer token Vercel Cron sends to the keep-warm route |

## Scripts

| Command | Does |
|---------|------|
| `npm run dev` | Dev server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run lint` | ESLint (next) |
| `npm run db:migrate` | `prisma migrate dev` (local) |
| `npm run db:deploy` | `prisma migrate deploy` (CI/prod) |
| `npm run db:seed` | Seed reference content (**destructive re-seed** of seeded tables) |
| `npm run db:studio` | Prisma Studio |
| `npm run user:create` | Create a login from the terminal |

## Architecture notes

- **Public pages** set `export const revalidate = 60` (ISR). Admin mutations call `revalidatePath()`
  so saved changes show up on the next request — no redeploy.
- **`/admin`** is a protected route group, gated by `middleware.ts` (JWT) with a second check in
  `app/admin/layout.tsx`. Role helpers live in `lib/auth-guard.ts` (`requireEditor`, `requireAdmin`).
  Only `Admin` can reach `/admin/users`.
- **Server actions** for all CRUD live in `lib/actions/*`. Each validates input, writes via Prisma,
  then revalidates the affected public path(s).
- **Image uploads** go through `POST /api/upload` → sharp downscales to ≤2000px and re-encodes
  (animated GIFs pass through) → Supabase public `media` bucket → returns a CDN URL.
- **Keep-warm cron**: `vercel.json` schedules a daily `GET /api/cron/keep-warm`, which runs a trivial
  query so the Supabase free tier never pauses. Secured by `CRON_SECRET`.
- **SEO**: per-page metadata + canonicals in code; structured data (LocalBusiness/SportsActivityLocation,
  FAQPage, BreadcrumbList); auto `sitemap.ts` + `robots.ts`.

## Deploy (Vercel)

1. Import the repo into Vercel under the `jstarztraining.web@gmail.com` account.
2. Add every env var above (use `npm run db:deploy` as part of the build, or run migrations manually).
3. Vercel picks up `vercel.json` and registers the keep-warm cron automatically.
4. Domain cutover is gated on final payment — see `HANDOVER.md` and CLAUDE.md §12 (leave the MX
   records alone or email breaks).

## Reference docs

- **`CLAUDE.md`** — full build brief / source of truth for scope.
- **`DESIGN.md`** — brand, color, typography, motion system.
- **`PRODUCT.md`** — product purpose and audience.
- **`HANDOVER.md`** — non-technical guide for the site owner.
