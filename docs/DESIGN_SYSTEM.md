# Design System — Eco Smile

> **The mood in one sentence:** Earthy and warm — built by people who care about Bangalore, not a global sustainability consultancy. Calm, honest, and locally grounded.

---

## Color

| Token | Hex | Role |
|---|---|---|
| `--color-canvas` | `#F4F8F4` | Page background — pale sage-white. Never pure white. |
| `--color-card` | `#EAF5EC` | Card / panel background — Chalk White from brand palette |
| `--color-forest` | `#2E6B3E` | Primary brand green — headlines, nav, eyebrows, borders |
| `--color-mid` | `#4A9B5F` | Clover Green — buttons, links, interactive hover states |
| `--color-ink` | `#1A2B1A` | Body text — deep forest-tinted near-black |
| `--color-ink-soft` | `#6B6B6B` | Warm Grey — secondary text, captions, labels |
| `--color-earth` | `#5C3D1E` | Espresso Brown — depth, used very sparingly |
| `--color-gold` | `#C8972B` | Antique Gold — **the ONE precious accent** |
| `--color-rule` | `#C5D9C5` | Section divider hairlines — muted sage |
| `--color-rule-soft` | `#DAEADA` | Hairlines inside cards |

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
| Caption / label | DM Sans | 0.875rem (14px) | 400 | 0 |
| Eyebrow | DM Sans | 0.75rem (12px) | 600 | 0.08em uppercase |
| Nav | DM Sans | 0.875rem (14px) | 500 | 0.01em |

**Discipline**
- Headlines use negative letter-spacing (-0.01 to -0.02em). Body is neutral. Eyebrows use positive letter-spacing + uppercase — the only place text goes uppercase.
- Fraunces at large sizes benefits from the optical size axis — set `font-variation-settings: 'opsz' 72` on hero-size text.
- Italics: reserved for the brand tagline or pull-quotes only.

---

## Spacing

| Token | Value | Use |
|---|---|---|
| `--container-pad` | `clamp(1.25rem, 5vw, 2.5rem)` | Side gutters inside `.container-es` |
| `--section-pad-y` | `clamp(5rem, 10vw, 8rem)` | Top/bottom of each major section |
| `--radius` | `8px` | Buttons, cards |

**Vertical rhythm:** sections are separated by `--section-pad-y` and a 1px `--color-rule` hairline. Don't double up — one rule per boundary.

---

## Components

### Buttons
- **Primary:** forest green fill, canvas text, 8px radius. Hover: mid-green fill. No shadow.
- **Secondary:** 1px forest green outline, forest text, transparent fill. Hover: fills forest.
- **Nav CTA:** forest fill, canvas text, slightly smaller padding. Same hover rule.
- No third button style.

### Eyebrow labels
DM Sans, 0.75rem, uppercase, 0.08em letter-spacing, forest green. Always above a section heading.

### Badges
Inline tags for service cards. PRIMARY: forest green fill + canvas text. SECONDARY: earth brown fill + canvas text.

### Cards
Canvas-card background (`#EAF5EC`), 1px rule-soft border, 8px radius, 28–32px padding. Hover: border shifts to rule (slightly darker). No shadow.

### Link arrows
DM Sans, 0.875rem, with trailing →. Hover: text + arrow turn forest green, arrow translates +2px right (180ms ease).

---

## Motion

- Standard: 180ms `ease`
- Slow reveal: 400ms `cubic-bezier(0.22, 1, 0.36, 1)`
- FAQ accordion: 250ms ease for height transition

**What doesn't animate:** No scroll-jacking. No parallax. No looping idle micro-interactions.

**Reduced motion:** Honor `prefers-reduced-motion: reduce` — all transitions collapse to `0ms`.

---

## Photography / Imagery

- Real photos of pickups, sorted items, composting, Bangalore streets over stock
- Earthy, warm palette — avoid sterile white/blue
- No pity-framing of beneficiaries — dignity over charity
- Hero image: generous negative space for headline overlay
- Placeholder: labeled `bg-card` rectangles with aspect ratio maintained

---

## What this system is NOT

- Not a SaaS product design system (no sidebar navigation, no data tables, no metric dashboards)
- Not charity-poster design (no big sad photos, no urgent red CTAs)
- Not startup-generic (no gradients, no floating card shadows, no purple accents)
- Not maximalist — generous negative space is doing real work here
