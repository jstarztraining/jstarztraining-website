# DNS Migration: Wix → Cloudflare (+ Resend domain verification)

> **⏸️ PARKED 2026-07-14.** Hit a hard Wix wall: on this Wix-registered domain, **nameservers are "not editable"** and **DNSSEC has no self-service toggle** (DNSSEC is ON — DS record at registry). So delegating DNS to Cloudflare requires either a **Wix support ticket** (to disable DNSSEC + change NS — Wix often refuses and pushes a transfer) or a **domain registration transfer off Wix** (~5-7 days). The Cloudflare zone was created (NS `jean`/`rudy.ns.cloudflare.com`) but nameservers were NEVER switched, so it's inert and has no effect on the live domain. Contact form stays on the working Resend interim (→ build Gmail). Resume this only if pursuing the Cloudflare/transfer route.
>
> **Lower-friction alternative (recommended when resumed):** switch the mail provider to one that verifies a sending domain with **CNAME/TXT records only** (SendGrid, Amazon SES, Postmark) — Wix CAN create those. Gets branded `noreply@jstarztraining.com` with **no nameserver change, no DNSSEC, no migration**. Only a new account + a code swap in `lib/actions/contact.ts`.

_Started 2026-07-14. Goal: move DNS to Cloudflare so we can verify jstarztraining.com in Resend (Wix can't create the subdomain MX Resend needs), enabling branded contact-form email from `noreply@jstarztraining.com` → `jstarz@jstarztraining.com`._

> **Golden rule:** every record below must exist in Cloudflare **before** we change nameservers. The moment nameservers point to Cloudflare, Cloudflare is authoritative — any missing MX/SPF record = broken email.

## Current DNS to recreate exactly (captured 2026-07-14)

| Type | Name | Value | Priority | Proxy |
|---|---|---|---|---|
| A | `@` | `76.76.21.21` | — | **DNS only (grey)** |
| A | `www` | `76.76.21.21` | — | **DNS only (grey)** |
| MX | `@` | `aspmx.l.google.com` | 10 | DNS only |
| MX | `@` | `alt1.aspmx.l.google.com` | 20 | DNS only |
| MX | `@` | `alt2.aspmx.l.google.com` | 30 | DNS only |
| MX | `@` | `alt3.aspmx.l.google.com` | 40 | DNS only |
| MX | `@` | `alt4.aspmx.l.google.com` | 50 | DNS only |
| TXT | `@` | `v=spf1 include:_spf.google.com ~all` | — | — |
| TXT | `@` | `google-site-verification=xfoVMp4fomy4xvBDmtOzrZnTj2Jg3xQG56Id4SUawBE` | — | — |
| TXT | `_dmarc` | `v=DMARC1; p=none;` | — | — |

**Dropped:** `replit-verify=…` TXT (stale, old host).

## Steps

- [ ] **1. Cloudflare account + add site.** Sign up (free) at cloudflare.com under `jstarztraining.web@gmail.com`. Add site `jstarztraining.com`, Free plan. Cloudflare auto-scans and imports existing records.
- [ ] **2. Verify imported records** against the table above. Add anything missing. **Set both Vercel A records to DNS-only (grey cloud), not proxied.** Add the `_dmarc` TXT. Delete the `replit-verify` TXT.
- [ ] **3. Add Resend (root domain).** In Resend, delete the old `send.jstarztraining.com` domain; add **`jstarztraining.com`** (root). Add the 3 records it gives (DKIM TXT `resend._domainkey`, SPF TXT `send`, MX `send` → `feedback-smtp…ses.com` pri 10) into Cloudflare. These are new — safe to add now.
- [ ] **3b. ⚠️ DISABLE DNSSEC AT WIX FIRST.** DNSSEC is ON (DS record `54175 8 2 75D0CEC4…` at the registry as of 2026-07-14). Switching nameservers with DNSSEC still active = domain goes dark (site + email). Turn off DNSSEC in Wix domain settings, then WAIT until the DS record is gone from the registry (verify with `dns.google/resolve?name=jstarztraining.com&type=DS`) before step 4. Can re-enable DNSSEC from Cloudflare afterward.
- [ ] **4. Change nameservers at Wix** (ONLY after DNSSEC is confirmed off). Cloudflare nameservers: **`jean.ns.cloudflare.com`** + **`rudy.ns.cloudflare.com`**. In Wix → Domains → jstarztraining.com → Advanced/Nameservers → switch to **custom/external** nameservers → paste Cloudflare's → save.
- [ ] **5. Wait for Cloudflare activation** (email from Cloudflare; can take 15 min–a few hours). Then in Resend click **Verify**.
- [ ] **6. Verify nothing broke:** site loads (apex + www, valid SSL); send a test email to `jstarz@jstarztraining.com` (email still flows).
- [ ] **7. Switch the app to branded sending** (developer): env `CONTACT_FROM_EMAIL=JStarz Website <noreply@jstarztraining.com>`, `CONTACT_TO_EMAIL=jstarz@jstarztraining.com` (Production + Preview + `.env`); redeploy; test the live form → confirm arrival at `jstarz@`.

## Rollback
If anything breaks, revert nameservers at Wix back to **`ns4.wixdns.net`** + **`ns5.wixdns.net`** — that restores the current working setup (apex A `76.76.21.21` came from Wix records; if reverting before Wix records are re-added, temporarily set A `@` back to Vercel there).
