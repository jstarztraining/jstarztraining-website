# JStarz Training — Owner's Guide

A plain-English guide to running your website. No code required — everything here is done from your
admin dashboard in a web browser.

## Logging in

1. Go to **your-site-address/admin** (e.g. `jstarztraining.com/admin`).
2. Sign in with the email and password you were given.
3. You'll land on the dashboard, with a section for each part of the site.

There are two kinds of login:

- **Admin (you):** can edit everything **and** manage other logins — create them, reset their
  passwords, and delete them.
- **Editor:** can edit all site content, but can't manage logins.

**Your editor logins haven't been created yet** — that was waiting on names and email addresses from
you. You don't need a developer for it: go to **Users → Create account**, enter their name, email, a
starting password, and choose **Editor**. Tell them the password; they can't reset it themselves, but
you can reset it for them any time.

## What you can edit

Each tile on the dashboard edits a part of the public site. Changes go **live within a minute** of
saving — there's no separate "publish" step.

| Section | What it controls |
|---------|------------------|
| **Programs** | Your training programs — title, description, price text, photo, and the Shopify link. Add/remove/reorder freely. |
| **Schedule** | The session times shown on the Schedule page (informational only — no sign-up buttons). |
| **Coaches** | Coach/staff names, roles, bios, and photos. |
| **Testimonials** | Quotes from players and parents. |
| **FAQ** | Questions and answers. |
| **Gallery** | Photos shown on the Gallery page (upload, delete, drag to reorder). |
| **Site Content** | Editable wording **and photos** on the Home and About pages. |
| **Hero & Banner** | Everything in the big blue homepage banner — headline, button, the background photo, the four floating photo bubbles — plus the optional promo bar across the top of the site (toggle on/off). |
| **Site Settings** | Contact email, phone, address, map, hours, social links, footer text. |
| **Users** (Admin only) | Create the two editor logins and reset passwords. |

Most lists let you **drag items to reorder** them and **toggle them active/inactive** (inactive items
stay saved but hide from the public site).

## ⚠️ Important: program prices are typed by hand

The price on each program card (e.g. "From $54.99") is **text you type** — it does **not** automatically
match Shopify. If you change a price in Shopify, **also update it here**, or the two won't agree.
The same goes for the program's **link**: paste the correct Shopify product (or cart) URL into the link
box for each program.

## Where each homepage photo lives

The homepage pulls photos from two different tiles. If you're looking at a photo and can't find it:

| Photo on the homepage | Where to change it |
|---|---|
| The big photo **behind** the headline and the floating bubbles | **Hero & Banner** → *Hero background photo* |
| The four tilted, floating **photo bubbles** in the banner | **Hero & Banner** → *Photo bubbles* (phones show the two "right" ones) |
| The wide action photo under **"Why families choose JStarz."** | **Site Content** → *Home* |
| The photo beside **"A soccer community, not just training."** | **Site Content** → *Home* |
| Photos on the program cards | **Programs** (each program has its own) |
| The coach photo | **Coaches** |

Removing a photo from **Hero & Banner** doesn't leave a hole — the built-in default comes back.

## How the Schedule works

The Schedule page is a **repeating weekly board**, not a calendar of specific dates. You pick a **day of
the week** and a **start/end time**, so a session set to *Sunday, 7:00 PM – 9:00 PM* shows on **every**
Sunday until you change or delete it. There's no need to re-enter it each week.

Times are Halifax time and appear on the public board exactly as you type them.

## Photos

- Upload from the program/coach/gallery/hero/site-content editors — drag a file in, or paste an image URL.
- Use clear, well-lit photos. The site automatically shrinks and optimizes large photos on upload, so
  you don't need to resize them first — a normal phone photo is fine. If one is ever refused as too
  large, screenshot it or export it at a smaller size and try again.
- Add a short description ("alt text") when asked — it helps Google and accessibility.

## Passwords

- **Forgot an editor's password?** As Admin, go to **Users**, pick the person, and set a new one. Tell
  them the new password.
- **Forgot your own Admin password?** There's no self-serve reset by design — contact your developer to
  reset it.

## Who owns and can access what

**You own all of it** — the website, the code, the database, and every account behind them. Nothing
about the site depends on your developer continuing to be involved.

| Service | What it does | Who controls it |
|---|---|---|
| **Vercel** | Runs the live website | **You, sole owner.** Your developer has no access. |
| **Supabase** | Your database + uploaded photos | **You, owner.** No standing developer access. |
| **SendGrid** | Sends the contact-form emails | **You, owner.** No standing developer access. |
| **Shopify** | Your store and checkout | **You, and only you.** Your developer never had his own staff account — he used the login you gave him, and you've since changed that password. |
| **GitHub** | Where the website's code is stored | **You own it.** Your developer stays on as a collaborator so he can make fixes if you ask for them. |

### What your developer still has — all of it, in one place

Three things, listed together so you can see the whole picture at a glance. Every one of them is
yours to end whenever you want.

1. **Access to the code (GitHub).** He remains a collaborator so he can push a fix when you ask for
   one. This does **not** give him your database, your store, your customers, or your payment data.
   Remove it yourself any time in GitHub under **Settings → Collaborators**.

2. **A login on your dashboard.** There is an Admin account under **jeremycrooks20@gmail.com**, kept
   so he can troubleshoot quickly if something breaks. Delete it yourself whenever you like — go to
   **Users**, find that account, remove it. Nothing on the site depends on it.

3. **A copy of the site's configuration file.** This holds the database and email keys. It is what
   lets him actually repair something rather than only look at it. If you'd prefer he didn't have it,
   say so and these keys can be changed over to you.

Nothing else. He has no access to your Vercel, Supabase, SendGrid or Shopify accounts.

### Your hosting plan — one thing to know

Your site runs on Vercel's **free plan**, and it works fine there. Two things to be aware of, neither
urgent:

- The free plan is officially intended for **personal, non-commercial** sites, and you sell training
  through yours. It's rarely enforced and nothing is wrong today — but it's a real term of the plan,
  so you're hearing it from us rather than from Vercel. Their paid plan is **$20/month** and settles
  it if you ever want it settled.
- If the site ever gets busy enough to pass the free plan's limits, Vercel **pauses the site** rather
  than sending you a bill. So an unexplained outage is worth checking your Vercel account for — it
  won't arrive as a surprise charge.

### Moving the accounts to your own email address

Vercel, Supabase, SendGrid and GitHub are **four separate accounts**. They simply each use
`jstarztraining.web@gmail.com` as their email address — there is no single master account tying them
together. That means you can move each one onto `jstarz@jstarztraining.com` yourself, one at a time,
at your own pace, without needing your developer. Each service has its own account-email setting.

Changing an account's email address is harmless — it won't disturb the site or your developer's
collaborator access. The one thing **not** to do is create a brand-new GitHub account and transfer
the code to it; that would drop his access and break the automatic publishing.

## Don't touch (important)

- **The domain's email settings.** Your website and your `@jstarztraining.com` email share the same
  domain. The website address can be changed safely, but the **email (MX) records must be left alone** —
  changing them will break your email. Any domain changes should go through your developer.

## Getting help

For anything outside this dashboard — design changes, new features, domain/email, or bugs — contact your
developer. New capabilities (e.g. a contact-message inbox, photo albums, a blog) are available as
add-ons beyond the original build.
