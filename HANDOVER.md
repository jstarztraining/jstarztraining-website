# JStarz Training — Owner's Guide

A plain-English guide to running your website. No code required — everything here is done from your
admin dashboard in a web browser.

## Logging in

1. Go to **your-site-address/admin** (e.g. `jstarztraining.com/admin`).
2. Sign in with the email and password you were given.
3. You'll land on the dashboard, with a section for each part of the site.

There are two kinds of login:

- **Admin (you):** can edit everything **and** manage the two editor logins (create them, reset their
  passwords).
- **Editor (×2):** can edit all site content, but can't manage logins.

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
| **Site Content** | Editable text on the About page and a few other spots. |
| **Hero & Banner** | The big homepage headline/button, and the optional promo banner across the top of the site (toggle on/off). |
| **Site Settings** | Contact email, phone, address, map, hours, social links, footer text. |
| **Users** (Admin only) | Create the two editor logins and reset passwords. |

Most lists let you **drag items to reorder** them and **toggle them active/inactive** (inactive items
stay saved but hide from the public site).

## ⚠️ Important: program prices are typed by hand

The price on each program card (e.g. "From $54.99") is **text you type** — it does **not** automatically
match Shopify. If you change a price in Shopify, **also update it here**, or the two won't agree.
The same goes for the program's **link**: paste the correct Shopify product (or cart) URL into the link
box for each program.

## Photos

- Upload from the program/coach/gallery/hero editors — drag a file in, or paste an image URL.
- Use clear, well-lit photos. The site automatically shrinks and optimizes large photos on upload, so
  you don't need to resize them first — but very large files (over ~8MB) will be rejected, so a normal
  phone photo is fine.
- Add a short description ("alt text") when asked — it helps Google and accessibility.

## Passwords

- **Forgot an editor's password?** As Admin, go to **Users**, pick the person, and set a new one. Tell
  them the new password.
- **Forgot your own Admin password?** There's no self-serve reset by design — contact your developer to
  reset it.

## Don't touch (important)

- **The domain's email settings.** Your website and your `@jstarztraining.com` email share the same
  domain. The website address can be changed safely, but the **email (MX) records must be left alone** —
  changing them will break your email. Any domain changes should go through your developer.

## Getting help

For anything outside this dashboard — design changes, new features, domain/email, or bugs — contact your
developer. New capabilities (e.g. a contact-message inbox, photo albums, a blog) are available as
add-ons beyond the original build.
