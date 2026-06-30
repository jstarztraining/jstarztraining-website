---
name: JStarz Training
description: Floodlit-navy, gold-charged identity system for a Halifax private soccer academy that out-classes every template competitor.
colors:
  brand-bright: "#1f7ae0"
  brand: "#1158c4"
  brand-deep: "#0a2a63"
  brand-crown: "#114089"
  navy: "#06183f"
  navy-floor: "#050f29"
  ink: "#0a1430"
  gold-soft: "#f4d889"
  gold: "#e6b945"
  gold-deep: "#b98a1f"
  mist: "#f4f6fb"
  cloud: "#eaeefa"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 8.5vw, 5.5rem)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.5vw, 3.25rem)"
    fontWeight: 900
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.2em"
rounded:
  field: "0.75rem"
  card: "1.5rem"
  pill: "999px"
spacing:
  section-y: "clamp(6rem, 12vw, 8rem)"
  container-px: "clamp(1.25rem, 5vw, 3rem)"
  stack: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.navy}"
    rounded: "{rounded.pill}"
    padding: "0 2rem"
    height: "3.5rem"
  button-primary-hover:
    backgroundColor: "{colors.gold-soft}"
    textColor: "{colors.navy}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "0 2rem"
    height: "3.5rem"
  button-ghost-dark:
    backgroundColor: "transparent"
    textColor: "{colors.navy}"
    rounded: "{rounded.pill}"
    padding: "0 1.5rem"
    height: "2.75rem"
  button-subtle:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "0 1.5rem"
    height: "2.75rem"
  card-program:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.card}"
    padding: "1.25rem"
  card-featured:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
    rounded: "{rounded.card}"
    padding: "2.25rem"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.field}"
    padding: "0.625rem 1rem"
---

# Design System: JStarz Training

## 1. Overview

**Creative North Star: "Crest & Floodlight"**

JStarz is a badge before it's a website. The circular crest — gold crown, stars, the player-and-ball silhouette on a blue gradient — is the hero of the identity, and every surface is the field that badge sits on. The system reads as **club-grade, not template-grade**: deep floodlit navy as the playing surface, royal blue as the brand's pulse, and gold as the warmth and energy that makes the whole thing feel alive. The mood is athletic and electric, but the gold is doing emotional work — it's the welcome, the "less like training, more like a family" that the brand promises. Confidence without ego; dynamic without chaos.

Density is generous and deliberate: one dominant idea per fold, long scroll, sections that breathe. Motion is a personality carried top to bottom — scroll-reveal rises, staggered cards, count-up stats, drifting glows, a gold underline that swipes under the accent word — never decoration bolted on, always GPU-light and fully `prefers-reduced-motion`-aware. The visual world alternates between two registers: **floodlit navy** (hero, page headers, featured cards — the stadium at night) and **clean daylight white** (content sections — the training ground in the morning). Gold bridges both.

This system explicitly rejects the template/Wix/Shopify-theme look it exists to beat, the generic SaaS navy-and-gold *corporate* read (we share the palette only because it's the existing crest — execution must feel athletic, not fintech), editorial-magazine affectation (display-serif + drop caps is the wrong register for a sports brand), and the AI-slop tells: a tiny tracked-uppercase eyebrow above *every* section, identical icon-card grids, gradient text, and decorative glassmorphism.

**Key Characteristics:**
- Floodlit navy and daylight white alternate as section worlds; gold bridges them.
- The crest is the identity anchor; the wordmark and gold descend from it.
- One structured athletic grotesque (Archivo) across a 900→500 weight range, against a humanist body (Hanken Grotesk).
- Motion is one continuous personality, not per-section reflex; always reduced-motion-safe.
- Pill-shaped CTAs, 24px-radius cards, full-bleed navy gradient heroes.
- A single deliberate brand kicker, never an eyebrow on every heading.

## 2. Colors

A floodlit palette: deep blues as the field, a three-step gold as the brand's warmth and energy, faintly blue-tinted neutrals for daylight sections — never warm-by-default.

### Primary
- **Royal Blue** (`#1158c4`): The brand's pulse. Prices, in-text links, focus rings on light surfaces, hover color shifts on dark cards, the active/hover state of light-mode ghost buttons. The voice of "this is a serious program."
- **Floodlight Blue** (`#1f7ae0`): The brightest blue, used as luminous glow — the drifting blurred orb behind heroes (`brand-bright/25`), the top of hero radial gradients (`#114089` neighbor). Energy and light, rarely a fill.
- **Crown Blue** (`#0a2a63`): The mid-depth of every navy gradient — the band between the bright crown and the navy floor.
- **Floodlight Crown** (`#114089`, token `brand-crown` / `--brand-crown`): The brightest stop at the very top of every floodlit navy gradient (hero, page-header, featured/fallback cards) — the lit edge of the stadium. Lives only in gradients; tokenized as the CSS var `--brand-crown` so all four gradients stay in sync.

### Secondary
- **Crest Gold** (`#e6b945`): The brand's energy and warmth, used freely and on purpose — primary CTA fills, the hero accent-word underline swipe, section kicker rules, active nav underlines, the "Featured" tag, hover-grown dividers, the scroll cue. Gold is how the brand smiles.
- **Floodlight Gold** (`#f4d889`): The lighter gold for hover lifts on gold buttons, gold text on dark backgrounds (`gold-soft` reads brighter on navy than base gold), and warm glow.
- **Deep Gold** (`#b98a1f`): The dark anchor of the underline gradient and for gold-on-light text where contrast demands a deeper tone.

### Neutral
- **Stadium Navy** (`#06183f`): The dominant dark surface — hero floor, page headers, featured cards, footer, mobile menu, the condensed nav background (`navy/85` + blur). The "floodlit" half of the system.
- **Stadium Floor** (`#050f29`, token `navy-floor` / `--navy-floor`): The deepest stop at the bottom of the hero and page-header gradients, a touch below navy. Gradient-only; tokenized as the CSS var `--navy-floor`.
- **Ink** (`#0a1430`): Default body text color on white. Near-black with a blue undertone, never a warm gray.
- **Mist** (`#f4f6fb`) & **Cloud** (`#eaeefa`): Faintly blue-tinted light surfaces for daylight sections and hover fills — the brand's own hue at low chroma, not a warm cream.
- **White** (`#ffffff`): The daylight section background and program-card surface.

### Named Rules
**The Two-Worlds Rule.** Every section lives in one of two worlds — floodlit navy or daylight white — and commits fully. No timid mid-grays between them. Gold is the only element allowed to cross from one world into the other.

**The Gold-as-Energy Rule.** Gold is the brand's warmth and may appear across CTAs, kickers, underlines, hovers, dividers, and active states — but it is always *charged*, never filler. On navy, prefer `gold-soft` (`#f4d889`) for text so it reads as light; reserve base `gold` (`#e6b945`) for fills and rules. Gold text on white must use the base or deep tone for ≥4.5:1.

**The Blue-Tint Rule.** Neutrals tint toward the brand blue (Mist/Cloud), never toward warm cream. A warm-neutral body background is a forbidden tell on this site.

## 3. Typography

**Display + Heading Font:** Archivo (with system-ui, sans-serif)
**Body Font:** Hanken Grotesk (with system-ui, sans-serif)

**Character:** A deliberate two-family pairing on a contrast axis: Archivo is a structured, slightly condensed athletic grotesque — it carries the team-sport, jersey-number energy at heavy weights (900/800). Hanken Grotesk is a warmer, rounder humanist sans that carries the "community / family" voice in running text. The contrast is grotesque-vs-humanist, not two-similar-sans, so the pairing reads intentional. Archivo runs a wide weight range (900 monumental → 500 utility); body copy stays Hanken at 400–600.

### Hierarchy
- **Display** (Archivo 900, `clamp(2.75rem, 8.5vw, 5.5rem)`, line-height 0.95, tracking −0.04em): Hero H1 only. The accent word is gold with the animated underline swipe.
- **Headline** (Archivo 900, `clamp(2rem, 4.5vw, 3.25rem)`, line-height 1.02, tracking −0.04em): Section H2s ("Why families choose JStarz."). Set in navy on white, white on navy.
- **Page-Header Title** (Archivo 900, `clamp(2.5rem, 7vw, 4.5rem)`): Interior page H1s in the navy PageHero, same accent-underline treatment as the home hero.
- **Title** (Archivo 800, ~1.25–2rem, line-height 1.25, tracking −0.01em): Card and subsection headings (program titles, feature titles).
- **Body** (Hanken Grotesk 400, 1.125rem, line-height 1.65): Running copy. Capped at `max-w-prose` (68ch). On navy, body is `white/75`; on white, `ink/70`.
- **Kicker / Label** (Hanken Grotesk 600, 0.875rem, uppercase, tracking 0.2em, color `gold-soft`): The single deliberate brand eyebrow — paired with a 10px gold rule. Used on the hero and page headers, **not** repeated above every section.

### Named Rules
**The One-Kicker Rule.** The uppercase gold-rule kicker is a brand signature reserved for hero and page-header contexts. It is forbidden as a per-section eyebrow. Interior section headings stand on weight and size alone.

**The Headline-Tightest Rule.** Display and headline type is set at the −0.04em tracking floor (`tracking-tightest`) and never tighter. Heavy Archivo at large sizes earns the squeeze; letters must still not touch.

**The Balance Rule.** `text-wrap: balance` on h1–h3, `text-wrap: pretty` on prose. Test every headline's copy at mobile width — heavy clamp + condensed grotesque overflows fastest there.

## 4. Elevation

Flat by default, lifted on intent. Surfaces sit flush at rest; depth is conveyed through the two-worlds color contrast and through soft, brand-tinted shadows that bloom on hover. Shadows are never neutral black — they're tinted with navy and brand blue so they read as part of the palette, not a drop-shadow afterthought. The hero's depth comes from layered radial gradients, drifting blurred glows, and a masked pitch-line grid, not from box-shadows.

### Shadow Vocabulary
- **Card rest** (`box-shadow: 0 1px 2px rgba(10,20,48,0.04), 0 12px 32px -12px rgba(10,42,99,0.18)`): The resting lift under program cards. Barely there.
- **Card hover** (`box-shadow: 0 2px 4px rgba(10,20,48,0.06), 0 28px 56px -20px rgba(17,88,196,0.32)`): A pronounced brand-blue bloom on hover, paired with a −4px translateY.
- **Gold glow** (`box-shadow: 0 0 0 1px rgba(230,185,69,0.4), 0 18px 50px -12px rgba(230,185,69,0.45)`): Reserved gold halo for moments that should feel electric.
- **Gold CTA lift** (`box-shadow: 0 10px 30px -10px rgba(230,185,69,0.7)` → hover `0 16px 40px -12px rgba(230,185,69,0.85)`): The primary button's own warm shadow, deepening on hover with a −2px lift.

### Named Rules
**The Tinted-Shadow Rule.** Shadows carry brand hue (navy, brand-blue, or gold), never neutral black. A gray drop-shadow on this site is a bug.

**The Lift-on-Intent Rule.** Cards and buttons are flat at rest and lift (translateY −2 to −4px) only in response to hover/focus. Resting elements do not float.

## 5. Components

### Buttons
- **Shape:** Full pill (`rounded-full`, 999px) on every variant. Archivo heading font, semibold, tight tracking. Two sizes: md (`h-11`, `px-6`, text-sm) and lg (`h-14`, `px-8`, text-base). Transitions `all 300ms` on the `ease-out-quint` curve.
- **Primary (gold pill):** `bg-gold` + `text-navy` with its own warm gold shadow. Hover → `bg-gold-soft`, deepened shadow, −2px lift; active returns to baseline. The arrow glyph slides +1 on hover (`group-hover/btn:translate-x-1`). The site's single loudest CTA.
- **Ghost (on dark):** `border-white/30` + `text-white` + `backdrop-blur-sm`. Hover → border and text shift to gold, faint `bg-white/5`. For navy/hero contexts beside the primary.
- **Ghost-dark (on light):** `border-navy/20` + `text-navy`. Hover → border and text shift to brand blue, faint `bg-brand/5`.
- **Subtle:** `bg-navy` + `text-white`, card shadow. Hover → `bg-brand-deep`, −2px lift. For secondary dark actions on light surfaces.

### Cards
- **Corner Style:** 24px radius (`rounded-[1.5rem]`) on program and featured cards.
- **Program card (daylight):** White surface, image-top (`aspect-[16/10]`), navy title, `ink/65` body. Footer row: brand-blue price + a "Choose options →" affordance that shifts to brand blue and grows its gap on hover. Whole card lifts −4px with the brand-blue hover bloom; image scales 1.05 inside `overflow-hidden`.
- **Featured card (floodlit):** Navy surface with full-bleed image + a `from-navy via-navy/55 to-navy/10` top gradient scrim for text legibility. Gold "Featured" pill, white title, `gold-soft` price. Same lift-and-bloom on hover.
- **Shadow Strategy:** Card-rest at rest, card-hover on hover (see Elevation). Never a flat gray shadow.
- **Border:** None on image cards. The FeaturesSection grid is the exception — a hairline `border-navy/10` enclosing a `gap-px` tonal-divider grid (no per-card borders, no side-stripes).

### Inputs / Fields
- **Style:** `rounded-xl` (12px), `border-navy/15`, white bg, navy text. Label is Hanken 600 navy above the field.
- **Focus:** Border shifts to brand blue + a `ring-2 ring-brand/25` glow. No layout shift.
- **Error:** Field message in `text-red-600`; form-level errors in a `bg-red-50` / `text-red-700` rounded bar with `role="alert"`. Success states use the emerald family in the same shape.

### Navigation
- **Style:** Fixed top header, full-width. **Transparent** over the home hero; on scroll past 24px (or on any interior page) it gains `bg-navy/85` + `backdrop-blur-xl` + a navy shadow, and the bar height condenses from `h-20` → `h-16`.
- **Links:** Hanken 500, `text-white/85` → white on hover, with a gold underline that grows from `w-0` to `w-full` on hover (full-width when active). A gold "Book Now" pill sits at the right.
- **Promo banner:** An opaque gold row above the nav (homepage only), navy text, optional link.
- **Mobile:** A bordered circular hamburger that morphs to an X; opens a full-screen `bg-navy/98` menu with large Archivo links that stagger in (translate-x + opacity, 45ms cascade) and a full-width gold CTA.

### Signature: The Floodlit Hero
The system's defining component. A `min-h-[100svh]` navy section layering: a base radial gradient (`#114089` crown → `#06183f` floor), two drifting blurred glows (brand-bright and gold, `animate-drift` at different delays), a masked faint pitch-line grid, and a floating soccer ball (`animate-float`, desktop only). Over it: the gold-rule kicker, a clamp-scaled Archivo-900 H1 whose last word is gold with the `accent-underline` swipe, subhead at `white/75`, a gold primary + ghost secondary CTA, a count-up stats strip on a `border-white/15` rule, and an animated scroll cue. Interior pages reuse a shorter version (`PageHero`).

## 6. Do's and Don'ts

### Do:
- **Do** commit every section to one of the two worlds — floodlit navy or daylight white — and let gold be the only thing that crosses between them.
- **Do** use gold freely as the brand's energy (CTAs, kickers, underlines, hovers, dividers, active states), but keep it charged: on navy use `gold-soft` for text, reserve base `gold` for fills.
- **Do** keep neutrals tinted toward the brand blue (`mist #f4f6fb`, `cloud #eaeefa`); the brand's warmth comes from gold + imagery, never from the body background.
- **Do** set display/headline type in Archivo 900 at the −0.04em tracking floor with `text-wrap: balance`, and test the actual copy at mobile width for overflow.
- **Do** tint every shadow with navy/brand/gold and keep surfaces flat at rest, lifting (−2 to −4px) only on hover/focus.
- **Do** ship a `prefers-reduced-motion` alternative for every animation (the reveal, the underline swipe, drift, float, count-up all collapse to static) — content is visible by default and motion is only armed when JS runs and motion is allowed.
- **Do** keep the gold-rule kicker to hero and page-header contexts as a single deliberate brand signature.
- **Do** ship real action/team/gallery photography; program and featured cards are built to be image-led (the navy-gradient `ImageFallback` is a placeholder, not the target).

### Don't:
- **Don't** let this read as a template/Wix/Shopify-theme site — that's the exact thing the brand exists to beat.
- **Don't** drift into the generic SaaS navy-and-gold *corporate* look; we share the palette only because it's the existing crest. Execution must feel athletic and alive, not fintech.
- **Don't** use editorial-magazine aesthetics — display serif, italic drop caps, broadsheet grid. Wrong register for a sports brand.
- **Don't** place a tiny tracked-uppercase eyebrow above every section heading. One deliberate kicker is the brand; an eyebrow on every heading is AI grammar.
- **Don't** ship identical icon-card grids, gradient text (`background-clip: text`), or decorative glassmorphism.
- **Don't** use a `border-left`/`border-right` colored side-stripe on cards, callouts, or alerts — full borders, tonal-divider grids, or background tints only.
- **Don't** use warm-cream or beige neutrals, or neutral-black drop shadows — both break the floodlit-blue palette.
- **Don't** gate content visibility on a scroll-reveal class; reveals enhance an already-visible default so headless/no-JS renders never ship blank.
