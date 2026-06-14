# Design System — Eco Smile

> **The mood in one sentence:** Earthy and warm — built by people who care about Bangalore, not a global sustainability consultancy. Calm, honest, and locally grounded.

---

## Color

| Token | Hex | Role |
|---|---|---|
| `--color-canvas` | `#F9F6F1` | Page background — warm off-white. Never pure white. |
| `--color-surface` | `#FCFDFC` | Near-white surface — service cards and elevated panels |
| `--color-card` | `#EAF5EC` | Card / panel background — Chalk White from brand palette |
| `--color-forest` | `#2E6B3E` | Primary brand green — headlines, nav, eyebrows, borders |
| `--color-mid` | `#4A9B5F` | Clover Green — buttons, links, interactive hover states |
| `--color-ink` | `#1A2B1A` | Body text — deep forest-tinted near-black |
| `--color-ink-soft` | `#6B6B6B` | Warm Grey — secondary text, captions, labels |
| `--color-earth` | `#5C3D1E` | Espresso Brown — depth, used very sparingly |
| `--color-gold` | `#C8972B` | Antique Gold — **the ONE precious accent** |
| `--color-rule` | `#C5D9C5` | Section divider hairlines — muted sage |
| `--color-rule-soft` | `#DAEADA` | Hairlines inside cards |
| `--color-border` | `#CACFCA` | Neutral grey border — cards and nav pill (not green-tinted) |

### When to use `--color-surface` vs `--color-card`
- `--color-surface` (#FCFDFC): near-white, use for elevated cards that should feel lifted off the canvas (e.g. ServiceGrid cards)
- `--color-card` (#EAF5EC): light sage green, use for panels and sections that should feel part of the brand palette (e.g. SplitSection `background="card"`)

### When to use `--color-border` vs `--color-rule`
- `--color-border` (#CACFCA): neutral grey — card outlines, nav pill. No green tint.
- `--color-rule` / `--color-rule-soft`: sage green — section dividers, internal hairlines within brand-coloured panels.

### Rule on gold
Gold is precious. It appears only as: (a) a deliberate emphasis on a key stat or number, (b) an active/selected state where forest green isn't enough contrast, (c) one intentional detail per major section. **Never as a button fill. Never as a background block.**

### What this palette is NOT
- Not clinical white-and-green (avoid sterile 'clean tech' aesthetic)
- Not gradient-heavy (no green-to-teal gradients)
- Not high-contrast startup design (the palette is warm and composed, not sharp)

---

## Typography

**Stack**
- Display + headlines: **Fraunces** (variable serif, 300–900 weight, optical size axis)
- Body + UI: **DM Sans** (variable sans, 300–700 weight)
- Both loaded from Google Fonts

**Scale**

| Use | Family | Token / Size | Weight | Letter-spacing |
|---|---|---|---|---|
| Hero headline | Fraunces | `text-display-xl` — clamp(2.75rem → 5.5rem) | 500 | -0.02em |
| Section heading | Fraunces | `text-display-lg` — clamp(2rem → 3.5rem) | 500 | -0.018em |
| Sub-heading | Fraunces | `text-display-md` — clamp(1.5rem → 2.25rem) | 500 | -0.012em |
| Body | DM Sans | 1rem (16px) | 400 | 0 |
| Caption / label | DM Sans | 0.75rem (12px) | 400 | 0 |
| Eyebrow | DM Sans | 0.75rem (12px) | 600 | 0.08em uppercase |
| Nav links | DM Sans | 1rem (16px) | 500 | 0 |
| Pills | DM Sans | 0.75rem (12px) | 400 | 0 |

**Discipline**
- Headlines use negative letter-spacing (-0.01 to -0.02em). Body is neutral. Eyebrows use positive letter-spacing + uppercase — the only place text goes uppercase.
- Fraunces at large sizes benefits from the optical size axis — set `font-variation-settings: 'opsz' 72` on hero-size text.
- Italics: reserved for the brand tagline or pull-quotes only.
- **4px font grid:** All font sizes must be multiples of 4px. Minimum is 12px. Round any non-conforming value to the nearest multiple (e.g. 17px → 16px, 15px → 16px, 13px → 12px, 11px → 12px, 18px → 20px). Valid sizes in common use: 12, 16, 20, 24, 28, 32, 36, 40px and the clamp display tokens. Run `npm run check:type` to verify.
- **Headline line limit:** No headline (`h1`, `h2`, `h3`) may wrap to more than 3 lines at its intended viewport. If it wraps longer, either shorten the copy or reduce the font size to the next step down on the scale. Check at both mobile (375px) and desktop (1280px).

---

## Spacing

| Token | Value | Use |
|---|---|---|
| `--container-pad` | `clamp(1.25rem, 5vw, 2.5rem)` | Side gutters inside `.container-es` |
| `--section-pad-y` | `clamp(5rem, 10vw, 8rem)` | Top/bottom of each major section |
| `--radius` | `8px` | Small UI elements |
| `--radius-pill` | `9999px` | CTA buttons, nav pill, audience pills — fully rounded |

**Vertical rhythm:** sections are separated by `--section-pad-y`. Section dividers (1px `--color-rule` hairlines) are used sparingly — one rule per boundary maximum.

---

## Components

### Navigation — Floating Pill
The site nav is a **fixed floating pill** that hovers above all content at all times.

- Shape: `border-radius: var(--radius-pill)` — fully rounded
- Position: `fixed; top: 1.25rem` — centered with `max-width: 760px`
- Background: frosted glass via `backdrop-filter: blur(12px)` + canvas at 90% opacity (`color-mix`)
- Border: `1px solid var(--color-border)` — neutral grey, not the green rule tokens
- Always the same appearance — no scroll-triggered transparency transitions
- Mobile: pill stretches to viewport width with 1rem side margins; nav links hidden

### Buttons
- **Primary CTA (hero/section):** forest green fill (`--color-forest`), white text, `--radius-pill` (fully rounded), `padding: 1rem 2rem`. Hover: mid-green (`--color-mid`).
- **Nav CTA:** forest fill, white text, `--radius-pill`, `padding: 0.5rem 1.25rem`. Hover: mid-green.
- No shadow on any button. No secondary outlined button on current pages.

### Eyebrow labels
DM Sans, 0.75rem, uppercase, 0.08em letter-spacing, forest green. Always above a section heading. Optional — omit when the heading is self-explanatory.

### Service Cards (ServiceGrid)
- Background: `--color-surface` (#FCFDFC)
- Border: `1px solid var(--color-border)` (#CACFCA)
- Border radius: `24px` (outer card) / `20px` (inner image block)
- Image area: inset with `8px` padding on all sides so image doesn't touch card edges
- Image height: min 280px desktop, 180px mobile
- Fallback when no image: solid colour block — cycles forest → mid → earth → gold via `nth-child`
- Footer: "For" label (16px, ink-soft) + filled pills (`--color-forest` bg, white text, 12px, `--radius-pill`)
- Hover: subtle `box-shadow` lift, slightly darker border

### Audience Pills
Used in ServiceGrid card footers. Also reusable wherever a compact tag/label is needed.
- `background-color: var(--color-forest)` + `color: white`
- `border-radius: var(--radius-pill)`
- `font-size: 0.75rem` (12px)
- `padding: 0.25rem 0.5rem`

### Cards (general)
- Use `--color-card` (#EAF5EC) for brand-palette panels (e.g. SplitSection `background="card"`)
- Use `--color-surface` (#FCFDFC) for elevated/neutral cards (e.g. ServiceGrid)
- Internal hairlines: `1px solid var(--color-rule-soft)`
- Radius: `var(--radius)` (8px) for smaller panels, `24px` for large service cards

### Link arrows
DM Sans, 0.875rem, with trailing →. Hover: text + arrow turn forest green, arrow translates +2px right (180ms ease).

---

## Motion

- Standard: 150–180ms `ease`
- Slow reveal: 400ms `cubic-bezier(0.22, 1, 0.36, 1)`
- FAQ accordion: 250ms ease for height transition

**What doesn't animate:** No scroll-jacking. No parallax. No looping idle micro-interactions.

**Reduced motion:** Honor `prefers-reduced-motion: reduce` — all transitions collapse to `0ms`.

---

## Photography / Imagery

- Real photos of pickups, sorted items, composting, Bangalore streets over stock
- Earthy, warm palette — avoid sterile white/blue
- No pity-framing of beneficiaries — dignity over charity
- Hero image: generous negative space for headline overlay (content centred in viewport)
- Service card images: square-ish crops work best; `object-fit: cover` handles non-square sources
- Image files live in `/public/images/` and are referenced by path string in page data

---

## What this system is NOT

- Not a SaaS product design system (no sidebar navigation, no data tables, no metric dashboards)
- Not charity-poster design (no big sad photos, no urgent red CTAs)
- Not startup-generic (no gradients, no floating card shadows, no purple accents)
- Not maximalist — generous negative space is doing real work here
