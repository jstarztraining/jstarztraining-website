# JStarz Training — Status at Handover

_Final pass: 2026-08-12. Project delivered and paid in full. 30-day bug warranty ends **2026-08-13**._

This is the closing record: what was completed, what is formally closed, and what is **handed to
Jordan** as an ongoing content/maintenance item rather than a build defect.

---

## ✅ Closed — completed during the build/warranty

| Item | Outcome |
|---|---|
| **Contact form email** | Live and branded — `noreply@jstarztraining.com` → `jstarz@jstarztraining.com` via SendGrid (CNAME-only domain auth, custom `sgz` DKIM selector to avoid the existing Wix Ascend `s1`/`s2` records). Delivery confirmed. |
| **Shopify program links** | All 13 program cards click through to a live product, collection, or page. Re-verified 2026-08-12 — no dead links. |
| **Admin login** | Jordan's Admin account is live (`jstarz@jstarztraining.com`) and his password was changed on first login. |
| **Domain cutover** | `jstarztraining.com` points at Vercel (Wix A-record `76.76.21.21`, `www` → apex 308). MX/SPF untouched — email unaffected. |
| **Athletic Conditioning price** | Card read `From $49.99 + HST` while the cheapest variant on the linked product is `$54.99`. Corrected to `From $54.99 + HST` (commit `2898879`). See the pricing note below. |

## ✅ Closed — no defect found

**Nav readability on scroll (iPhone).** Reported after launch: white nav links hard to read against
light sections on Home. Never reproduced across devices or in testing, and no screenshot was obtained
to pin it down. **Formally closed at the end of the warranty period, 2026-08-13.** If it resurfaces,
it's a fresh report — send a screenshot showing the scroll position and device.

---

## 📋 Open — handed to Jordan (content/maintenance, not build defects)

These are **not** bugs in the site. Each is content that lives in Jordan's control (Shopify or the
dashboard) and can be changed by him at any time without a developer.

### 1. Program price copy drifts from Shopify

Program prices on the site are **hand-typed text**. They do not sync from Shopify — by design and by
scope. Every time a Shopify price changes, the matching card must be updated in **Programs**.

As of 2026-08-12 the numbers had drifted over roughly three weeks. Full card-by-card comparison lives
in the internal `PRICE-TRUTH-TABLE.md`.

> **Two corrections to that internal table**, verified against the live Shopify feed on 2026-08-12 —
> apply these before acting on it:
>
> - **Athletic Conditioning:** the table lists `$62.99` as the cheapest bookable variant. There is no
>   `$62.99` variant on that product. All six variants are **in stock**, and the cheapest is
>   **`$54.99` (Drop In: 1 on 1)**. `$62.99` appears only in Jordan's hand-written product
>   *description*, as a tax-included figure — and it doesn't reconcile: at Nova Scotia's **14%** HST,
>   $54.99 × 1.14 = **$62.69**. Jordan's typed numbers are approximate, which is exactly why the
>   descriptions can't be used as a pricing source.
> - **"All Shopify prices are HST included"** does not hold for the checkout. The Shopify line item is
>   `$54.99` and HST is applied on top; the "HST included" wording sits above the bundle tables Jordan
>   typed into his descriptions. The `+ HST` convention on the site cards is therefore **correct** and
>   should not be stripped. Worth one confirmation with Jordan against his Shopify tax setting.

**Structural option (Phase 2):** replace the typed numbers with `See pricing` on every card and let
Shopify be the single source of truth. That ends this whole class of drift permanently.

**How to check prices correctly.** Query the structured product feed, which carries real variant
prices *and* `available` flags — never scrape the rendered product page, whose visible numbers are
Jordan's hand-typed description text:

```bash
curl -s "https://jstarztraining.myshopify.com/products.json?limit=250"        # all products
curl -s "https://jstarztraining.myshopify.com/collections/<handle>/products.json"
```

(The old `9bejay-2u.myshopify.com` host 301-redirects to the same store.) Nova Scotia HST is **14%**
as of April 1 2025 — useful for spotting which of Jordan's typed figures are tax-inclusive: his
Birthday description quotes `$341.99`, which is exactly $299.99 × 1.14, and `$518` against a $454.99
variant (× 1.14 = $518.69).

### 2. Sold-out Shopify variants behind live cards

Live cards send traffic to products that can't currently be bought. Jordan's store, one minute to fix
in Shopify admin:

- **Birthday Parties & Private Camps** — all three party packages (`$299.99` 1 Hour, `$374.99`
  1.5 Hour, `$454.99` 2 Hour) are **sold out**. Only the add-ons (Add Party Room `$46.99`, Add
  Photographer `$80.00`) remain buyable, so the product is effectively unbookable.
- **Team Training & Workshops** (JStarz Masters Program) — 3 of 4 variants sold out.
- Minor: one sold-out variant each on the Outdoor, Mornings, and Saturday BMO products.

### 3. "Soccer Camps" card points at Goalie Warz Camp

The **Soccer Camps** card links to `/products/soccer-camps`, but that handle belongs to a product
titled **"Goalie Warz Camp"** — a striker-vs-goalkeeper event, not a general camp. Both its variants
(`$56.99` Full Day, `$40.00` Half Day) are in stock, so the link works; it's the wrong destination,
not a broken one.

Two clean options for Jordan: repoint the card at a genuine camp product, or set it to "Coming soon"
until one exists.

### 4. "Online Development & Game Analysis" still Coming soon

The card has no Shopify link, so it renders as a non-clickable "Coming soon" card (intended
behaviour). It still shows a `From $56.99 + HST` price with nothing to buy. Either build the product
in Shopify and paste the link in, or clear the price text.

### 5. FAQ cancellation / rescheduling policy

Still outstanding **from Jordan** — it was never supplied during the build. The FAQ module is ready
for it: paste the wording into **FAQ**, save, and it's live in about a minute. No developer needed.

---

## 🔍 Still unverified at handover — needs dashboard access

Neither of these could be confirmed from the codebase or the public site, and **neither has been
checked**. Do not assume either way.

- [ ] **Keep-warm cron — check this first.** `vercel.json` declares `0 6 * * *` →
  `/api/cron/keep-warm`, but **declared is not the same as firing**. Confirm in **Vercel → the
  project → Cron Jobs** that it is enabled with recent successful runs.

  **Why it matters more now:** the cron exists to stop the Supabase free tier from sleeping. If it
  isn't firing, the database sleeps and the first visitor to the site gets a cold, slow load — or an
  error. After handover the developer has **no Supabase access**, so there is nobody else to wake it.
  This is the single highest-consequence unknown at handover.

- [ ] **Google Search Console** — is the property verified and `sitemap.xml` actually submitted? A
  `google-site-verification` TXT record exists on the domain, but that is equally consistent with the
  Google Workspace email setup and does **not** prove a Search Console property exists.
  `robots.txt` does correctly advertise `https://jstarztraining.com/sitemap.xml`.

---

## 💳 Vercel plan — confirmed **Hobby** (free), 2026-08-12

Three consequences worth recording:

1. **Fair use.** Vercel's Hobby tier is for **non-commercial, personal use**. This site sells training,
   which is commercial use. Rarely enforced, but it is a real term of the plan — Jordan should hear it
   from his developer rather than from Vercel. **Pro is $20/month** and resolves it cleanly.
2. **No team members.** Hobby cannot add team members at all — which independently confirms the access
   split: Jordan is sole owner on Vercel, the developer takes nothing, and deploys run automatically
   from GitHub `main`.
3. **Limits pause, they don't bill.** If usage ever exceeds Hobby limits, Vercel **pauses the
   deployment** rather than charging overage. That would look like an unexplained outage rather than
   an invoice — worth knowing so it isn't a mystery later.

---

## Ongoing after handover

- Warranty ends **2026-08-13**. Work after that date is quoted separately.
- Phase-2 candidates already identified: contact-message inbox, per-page editable SEO fields, gallery
  albums, draft/publish, blog, `See pricing` conversion (above).
