# JStarz Training — Website + Dashboard · Claude Code Build Brief

> Paste this as your kickoff context in Claude Code (VSCode). It is the single source of truth for the build. Where it conflicts with anything, the signed Agreement + Scope Document win.

---

## ⭐ THE STANDARD — READ FIRST

This build must be **IMPECCABLE**. Top-tier design and execution, end to end, on every page. The client is paying for a premium, custom site that looks and feels better than any template/Wix/Shopify-theme competitor in Halifax. Hold a high bar on polish, spacing, typography, motion, responsiveness, accessibility, and performance. Nothing rough ships. When in doubt, make it cleaner, faster, and more refined.

---

## 1. Project at a glance

- **Client:** JStarz Private Soccer Training — Jordan Ellis, Owner. Halifax, NS. (NS Registry ID 4643639.)
- **Contact shown on site:** jstarz@jstarztraining.com · (782) 821-2300 · 313-680 Parkland Drive, Halifax, NS, B3S 1M5.
- **Deal:** $2,000 CAD fixed (deposit paid; $1,000 due on completion before handover). Binding delivery deadline **Mon July 6, 2026** (aiming ~June 29).
- **Ownership:** site, code, and all accounts are Jordan's; full control transfers on final payment.
- **Domain:** jstarztraining.com (currently a basic placeholder landing page — replace it). Repoint to the new site **at launch, gated on final payment**.
- **Store:** Shopify at `9bejay-2u.myshopify.com` — stays the checkout; the site links to it.

## 2. Accounts (LIVE)

Dedicated Google account **jstarztraining.web@gmail.com** (Jordan's, separate from personal) is created and linked to **Vercel, Supabase, Resend, and GitHub**. Build the repo on GitHub under this account; deploy via Vercel; DB/storage on Supabase; transactional email via Resend. Jeremy operates during build; hand over credentials on final payment.

## 3. Stack (LOCKED)

- **Next.js 14 (App Router) + TypeScript + Tailwind**, deployed on **Vercel**.
- **Supabase** Postgres + **Supabase Storage** (images).
- **Prisma** ORM.
- **Auth.js (NextAuth)** — email + password, roles in DB, JWT sessions (no adapter tables needed).
- **Resend** for the contact-form email.
- Public pages **SSG/ISR** (time-based, ~60s revalidate). Add a lightweight **keep-warm cron** (e.g. Vercel Cron hitting a route) so the Supabase free tier never sleeps.
- Public marketing pages read the same DB the dashboard writes; editor saves → DB → ISR re-render (no redeploy).

## 4. Pages (9, LOCKED — no blog)

home, about, programs, schedule, gallery, testimonials, coaches/staff, FAQ, contact.
**Build order:** Home → Programs → Contact (the workhorses), then About/Coaches/Testimonials/FAQ, then Gallery/Schedule. Build the **public site first** (it triggers the completion payment), dashboard right after.

## 5. Programs + Shopify (LOCKED)

- Program cards link OUT to Shopify for checkout. Site never handles money.
- **Link rule:** nearly all of Jordan's products are multi-variant ("Choose options" / "From $X"), so use **product-page links by default**. Use a **cart-permalink only** for genuinely single-option products (e.g. the flat-$20 "1v1 Championship"). The dashboard field is a free URL box → mixable per card.
- **Price = manual display text** Jordan types (e.g. "From $54.99"). It does NOT sync from Shopify — he keeps them aligned. Note this at training + in handover docs.
- **Unlimited** programs — full CRUD. Seed with the 20 below (these are starting rows, not a cap).

**The 20 current programs (title · price display):**
1. Saturday BMO Private Soccer Training · From $54.99
2. Sunday BMO Private Soccer Training · From $54.99
3. Sunday BMO Private Goalkeeper Sessions · From $54.99
4. Saturday BMO Private Goalkeeper Sessions · From $54.99
5. Outdoor Private Soccer Sessions · From $49.99
6. Outdoor Private Goalkeeping Sessions · From $49.99
7. Private Speed & Performance Training · From $54.99
8. Thursday Technical Soccer Lab · From $49.99
9. Thursday Technical Goalkeeper Lab · From $49.99
10. U9 Player Development Program · From $35.00
11. U12 Attacker Development Program · From $35.00
12. U13 Goalkeeper Group Training (Ages 8–13) · From $35.00
13. U15 Attacker Development Program · From $35.00
14. U18 Goalkeeper Group Training (Ages 14–18) · From $35.00
15. Defender Development Workshops · From $31.99
16. JStarz Team Training Programs · From $29.99
17. Goalie Warz Camp · From $40.00
18. JStarz Soccer Birthday Party · From $46.99
19. Sunday Team Starz: Play • Win • Save (Rec Games) · From $14.00
20. JStarz x Soccer House U18 1v1 Championship · $20.00 (single price → cart-permalink candidate)

Need exact product URLs from Shopify admin once staff access is granted.

## 6. Admin dashboard (LOCKED)

Lives at `/admin` (protected route group). 3 logins: **Jordan = Admin** (everything + manage the 2 users / reset their passwords); **2 Editors** = full edit of all content, cannot manage users. Admin creates the editor accounts (sets starting passwords); Admin resets passwords (no email reset flow). **No draft/publish** — saves go live after ISR. Flat gallery (albums = Phase 2).

8 modules, all CRUD with image upload (to Supabase Storage, auto-resize/optimize) and drag-to-reorder where noted:
A. **Site content** — per-page text blocks + images across the 9 pages; gallery manager (upload/delete/reorder).
B. **Programs** — fields per §5; active toggle; sort order. Unlimited.
C. **Schedule** — sessions (title/program, start/end, allDay, location, notes); calendar grid + list; informational only, NO register buttons/links.
D. **Coaches & staff** — name, role, bio, photo, active toggle, sort order. Unlimited.
E. **Testimonials** — quote, name, active toggle, sort order. Unlimited.
F. **Site settings** (single row) — contact email, phone, address, map embed, hours, social links, footer text.
G. **Homepage hero & promo banner** (single row) — hero headline/subhead/CTA label+url/image; banner message/url/on-off toggle.
H. **FAQ** — question, answer, active toggle, sort order. Unlimited.

## 7. Data model (Prisma, LOCKED)

11 tables: User(role enum Admin|Editor, passwordHash), Page, ContentBlock(pageId, key, type text|image, value; unique [pageId,key]), MediaAsset(url, alt, type, sortOrder), Program(title, description, priceDisplay, imageUrl?, shopifyUrl, isActive, sortOrder), Session(title, programId?, startsAt, endsAt?, allDay, location?, notes?), Coach(name, role, bio, imageUrl?, isActive, sortOrder), Testimonial(name, quote, isActive, sortOrder), FaqItem(question, answer, isActive, sortOrder), SiteSettings(singleton), HomeHero(singleton).
Tweaks already applied: **createdAt/updatedAt on every table**, FaqItem has **isActive**, **no slug** on Program, Session has **allDay**, **no ContactSubmission table** (contact form just emails via Resend — inbox is Phase 2).

## 8. SEO (LOCKED — it's a core deliverable)

SSG/ISR pre-rendered HTML; clean semantic structure (one H1/page), descriptive alt text, logical URLs. Per-page hand-written title + meta description + Open Graph/Twitter cards (set in code, NOT Jordan-editable — that's Phase 2). **Structured data:** LocalBusiness/SportsActivityLocation (name, address, phone, hours, geo), FAQPage on the FAQ, BreadcrumbList. Optimized/lazy images, mobile-first, strong Core Web Vitals. Auto `sitemap.xml` + `robots.txt` + canonical tags. Local-intent copy ("private soccer training Halifax", "goalkeeper sessions BMO Soccer Centre", etc.). At launch: connect Google Search Console + submit sitemap. Out (parked retainer): ongoing SEO campaign + analytics.

## 9. Design direction (APPROVED)

Use JStarz's existing brand. **Pull EXACT hex from the live site / logo — do not invent.** Working placeholders from the approved hero concept:
- Royal/bright blue `#1f7ae0` → blue `#1158c4` → deep `#0a2a63` → navy `#06183f`; gold `#e6b945` (soft `#f4d889`, deep `#b98a1f`); ink `#0a1430`.
- Logo: circular crest — gold crown, "J-ST★RZ SOCCER TRAINING", black player silhouette + ball, gold stars, blue gradient. Real crest + Jordan's action photos drop in.
- **Light-based site** (white/light-grey sections) with blue + gold as brand colours. Inspiration: Suburban FC (clean).

**Approved hero look:** full-bleed navy→blue radial-gradient hero, gold eyebrow with a short rule, huge display headline ("Elevate Your **Game.**" — accent word in gold with an animated underline swipe), subhead, gold primary CTA + ghost secondary CTA, a drifting blurred glow, a floating soccer ball, a bottom stats strip, and a scroll cue. Sticky nav that condenses + gains a blurred navy bg on scroll; gold "Book Now" pill; nav links with gold underline-grow on hover.

**Motion — DYNAMIC, and it must carry through the WHOLE page (Jeremy's explicit ask), not just the hero:** scroll-reveal on every section (IntersectionObserver — fade + rise), cascading/staggered cards, subtle parallax on imagery, smooth hover states on all cards/buttons, count-up stats. One consistent motion personality top to bottom. ALL lightweight CSS/GPU-friendly, and **respect `prefers-reduced-motion`**. Never at the cost of speed or SEO.

Fonts: clean modern sans for body (e.g. Inter) + a bold display face for headings (e.g. Montserrat) — confirm/refine.

## 10. Content (Jordan's real voice — use verbatim, refine lightly)

### About / Our Story — "More than an academy — a soccer community"
JStarz Training was founded by **Jordan Ellis**, a Jamaican-born Canadian coach who grew up loving the game and wishing he'd had access to the kind of support, development, and mentorship JStarz now provides. What started as a passion became a purpose: a space where players of all ages, backgrounds, and abilities feel welcomed, supported, and challenged to grow.

At JStarz, soccer isn't just training — it's **confidence, connection, and community.** Sessions feel less like traditional training and more like a family. Players are encouraged to express themselves, make mistakes and grow, and compete, laugh, and build confidence. Parents are part of it too. We specialize in **individual and small-group training (4–6 players max)** for maximum touches and coach interaction, and we're proudly **club-neutral** — all teams, all backgrounds. If it involves a soccer ball, we do it.

What we do: private 1-on-1 & small-group training (players & goalkeepers) · goalkeeper development · strength, speed & conditioning · school programs & community events · soccer birthday parties · camps & tournaments · fundraisers & community initiatives. *All group packages include discount codes for private sessions.*

The JStarz Mentality: **No ego. No politics. Just soccer.** We believe in hustle, creativity, and failing fast to learn faster.
Mission: grow the game across Halifax & Nova Scotia, develop confident players and people, create youth-leadership opportunities, connect communities through sport.
Close: **Train with purpose. Build confidence. Enjoy the game.** You're not just joining training — you're joining a community.

### Program schedule (Programs page + seed the Schedule board)
Venues: **BMO Soccer Centre · NDO Fitness Gym · Sandy Lake Academy Gym · outdoor (summer).**
- U9 Development (6–9): Wed NDO 7:30–8:30pm · Sat 1st hr BMO
- U12 Development: Sat 1st hr BMO
- U15 Development: Sat 2nd hr BMO
- U13 Goalkeeping (8–13): Sat 1st hr BMO
- U18 Goalkeeping (14+): Sat 2nd hr BMO
- Private (all ages): Wed NDO · Thu Sandy Lake 6–9pm · Sat & Sun BMO · Outdoor summer Mon–Fri

### FAQ (ready)
Ages (6→U18 + adult private) · group size (4–6 max) · locations (BMO/NDO/Sandy Lake/outdoor) · private vs group · club-neutral · goalkeeping specialty · how to register (site → Shopify checkout) · what to bring (proper footwear for venue, shin guards, water, training gear) · group packages include private-session discount codes · camps & birthday parties · team/school/community programs · cancellation policy [NEED] · indoor + outdoor.

## 11. Scope guard (protect the fixed $2,000)

- **IN:** the 9 pages, 8-module dashboard, Shopify-linked cards, contact form→email, SEO+structured data+sitemap, domain repoint, 3 logins, 3 revision rounds, 30-day bug warranty, launch training.
- **PHASE 2 (quote separately later):** contact-form inbox, per-page editable SEO fields, sponsors logo strip, gallery albums by event, draft/publish, blog, >3 logins/custom roles.
- **OUT ENTIRELY:** registrations/checkout, rosters, attendance, payments, parent email blasts, analytics, auto price-sync from Shopify, schedule register buttons.
- **Revision vs new feature:** revision = changing something already in scope; new feature = new capability → amendment + quote, NOT a revision round.
- Response to creep: "Love that — that's outside our build scope, but a great phase-2 add-on. Want a quick quote after launch?" (Backed by the Agreement: work outside scope is quoted by written amendment.)

## 12. Domain cutover (launch, gated on final payment)

Stage on the `*.vercel.app` URL for review. At cutover, change ONLY the website records (A/CNAME) — the domain has **live email** (jstarz@jstarztraining.com = MX records); leave MX/TXT/SPF untouched or email breaks. Document existing DNS first for instant revert. Need registrar + access from Jordan. Lower TTL beforehand. Canonical apex vs www: confirm (recommend apex, redirect www).

## 13. Still outstanding from Jordan

2 editor logins (names + emails) · coach bios (names, roles, backgrounds, photos) · cancellation/rescheduling policy · real testimonials (+ permission) · photos (action/team/gallery) · Shopify staff access (for product URLs) · domain registrar + access (launch-time) · confirm any "what to bring" extras.

## 14. Suggested first moves in Claude Code

1. Scaffold Next.js 14 + TS + Tailwind; init GitHub repo; connect Vercel.
2. Tailwind theme with exact brand hex; fonts; global motion utilities (reveal + prefers-reduced-motion).
3. Prisma schema (§7) → Supabase; migrate; seed the 20 programs + content.
4. Layout (sticky condensing nav + footer) → Home (approved hero + scroll-reveal sections) → Programs → Contact (Resend).
5. Remaining pages → Auth.js (email/password, roles, /admin protection) → 8 dashboard CRUD modules → image uploads → ISR wiring → keep-warm cron.
6. SEO pass (metadata, structured data, sitemap/robots, CWV) → QA (mobile/cross-browser/a11y) → review/revisions → launch (domain cutover + Search Console + GBP tune-up).