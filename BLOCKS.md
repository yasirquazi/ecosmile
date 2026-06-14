# BLOCKS.md — Block Library Reference

The block components live under `src/components/blocks/<Block>/`. Each accepts only content props — no class or style overrides on the wrapper. Pick by matching the section shape in the content brief to the block below.

## Block inventory

| Block | File | Used on |
|---|---|---|
| `Hero` | `blocks/Hero/Hero.astro` | Home — Section 1 |
| `SplitSection` | `blocks/SplitSection/SplitSection.astro` | Home — Sections 2 & 3; reusable for any text + image split |
| `EditorialSection` | `blocks/EditorialSection/EditorialSection.astro` | Available; reusable for any large-body text section |
| `ServiceGrid` | `blocks/ServiceGrid/ServiceGrid.astro` | Home — Section 4 |
| `HowItWorks` | `blocks/HowItWorks/HowItWorks.astro` | Home — Section 5 |
| `TrustBlock` | `blocks/TrustBlock/TrustBlock.astro` | Home — Section 6 |
| `FAQAccordion` | `blocks/FAQAccordion/FAQAccordion.tsx` | Home — Section 7 (React, interactive) |
| `AudienceCTA` | `blocks/AudienceCTA/AudienceCTA.astro` | Home — Section 8 |

---

## Block-by-block

### `Hero`
- **Purpose:** Full-viewport opening section. Full-bleed background image with a dark gradient scrim; headline + sub + CTA vertically and horizontally centred in the viewport.
- **Hydration:** none (static)
- **Props:**
  ```ts
  headline: string   // supports <br> for forced line breaks, rendered via set:html
  sub: string
  cta: { label: string; href: string }
  ```
- **Background image:** swap `/public/images/hero-bg.png` — component always reads from that path.
- **Gradient scrim:** two-stop overlay (`--scrim-mid` → `--scrim-dark`) defined in `globals.css`. Adjust there to tune contrast.
- **Notes:** Uses `min-height: 100svh` (small viewport height unit — handles mobile browser chrome). Content is centred via `justify-content: center` on the section flex container. The floating nav sits above the hero in fixed position — no transparency logic needed on the hero itself.

---

### `SplitSection`
- **Purpose:** Two-column section — text one side, square image the other. Use for problem/solution statements, testimonials, feature callouts.
- **Hydration:** none
- **Props:**
  ```ts
  eyebrow?: string
  heading: string
  headingColor?: 'ink' | 'forest'  // default: 'ink'
  body: string | string[]          // single string or array for multiple paragraphs
  imageSrc: string                 // path relative to /public, e.g. '/images/foo.png'
  imageAlt: string
  imagePosition?: 'left' | 'right' // default: 'right' (text left, image right)
  background?: 'canvas' | 'card'   // default: 'canvas'
  ```
- **Notes:** Image uses `border-radius: var(--radius-card)` (24px) — use this token on all future images and cards. Default layout: text 60% left, image 40% right (`3fr 2fr`). `imagePosition='left'` swaps to `2fr 3fr` and uses CSS `order: -1` so DOM order stays logical. Image locked to `aspect-ratio: 1/1` with `object-fit: cover`. On mobile (≤768px) the grid always stacks — text first, image below at `4/3` ratio regardless of `imagePosition`.

---

### `EditorialSection`
- **Purpose:** Long-form text section with a strong heading and one or two body paragraphs. Optionally right-aligned or centred.
- **Hydration:** none
- **Props:**
  ```ts
  eyebrow?: string
  heading: string
  body: string | string[]   // array = multiple paragraphs
  align?: 'left' | 'center' // default: 'left'
  ```

---

### `ServiceGrid`
- **Purpose:** 2×2 card grid showcasing services. Each card has an inset image (or colour block fallback) on top, title, body copy, and audience pills at the bottom.
- **Hydration:** none
- **Props:**
  ```ts
  eyebrow?: string
  heading: string
  services: Array<{
    title: string
    body: string
    audience: string[]  // each item becomes a pill under the "For" label
    imageSrc?: string   // optional — if omitted, colour block shows instead
  }>
  ```
- **Card anatomy:**
  - Outer card: `--color-surface` bg (#FCFDFC), `--color-border` border (#CACFCA), `border-radius: 24px`
  - Top area: `8px` inset padding wrapping the image or colour block; image/block has `border-radius: 20px`
  - Image: `object-fit: cover`, `min-height: 280px` at desktop, `180px` on mobile
  - Colour block fallback: cycles forest → mid → earth → gold via `nth-child` — no prop needed
  - Footer: "For" label (16px, ink-soft) + filled forest-green pills (12px, white text)
- **Grid:** 2 columns at ≥640px (2×2 with 4 cards), 1 column on mobile. Cards in the same row align to the tallest card via CSS grid stretch.
- **Adding images:** Pass `imageSrc: '/images/your-file.png'` on any service. Cards without `imageSrc` automatically show their nth-child colour block.

---

### `HowItWorks`
- **Purpose:** Numbered step sequence (4 steps). Includes an inline CTA + risk note at the bottom.
- **Hydration:** none
- **Props:**
  ```ts
  eyebrow?: string
  heading: string
  steps: Array<{
    number: string    // '01', '02', etc.
    title: string
    body: string
  }>
  cta: { label: string; href: string }
  riskNote: string
  ```

---

### `TrustBlock`
- **Purpose:** Credibility section. Large body text with specific partner names bolded. No cards, no icons — just honest prose.
- **Hydration:** none
- **Props:**
  ```ts
  eyebrow?: string
  heading: string
  body: string          // HTML allowed for <strong> on partner names
  ```

---

### `FAQAccordion`
- **Purpose:** Expandable question/answer list. React component for interactivity (open/close).
- **Hydration:** `client:visible` (only loads JS when scrolled into view)
- **Props:**
  ```ts
  eyebrow?: string
  heading: string
  items: Array<{
    question: string
    answer: string
  }>
  ```

---

### `AudienceCTA`
- **Purpose:** Final CTA section with three audience-specific blocks side by side. Each has an audience label, copy, button, and risk note. Closing line and contact info below.
- **Hydration:** none
- **Props:**
  ```ts
  heading: string
  blocks: Array<{
    audience: string
    copy: string
    cta: { label: string; href: string }
    riskNote: string
  }>
  closing: string
  contact: string
  ```

---

## Layout pattern — Floating Nav (`Layout.astro`)

The site nav is a **floating pill** rendered in `src/layouts/Layout.astro`. It is not a block component — it wraps every page automatically.

**Behaviour:**
- `position: fixed; top: 1.25rem` — floats 20px from the top of the viewport at all times
- `max-width: 760px; margin: 0 auto` — centered horizontally, never stretches full-width
- `border-radius: var(--radius-pill)` — fully rounded pill shape
- Frosted glass: `backdrop-filter: blur(12px)` + `color-mix(in srgb, var(--color-canvas) 90%, transparent)` background
- Border: `1px solid var(--color-border)` (#CACFCA — neutral grey, not the green rule tokens)
- No transparency states, no IntersectionObserver — the pill always looks the same regardless of scroll position

**Layout:** Wordmark left · Nav links centre · CTA button right

**Mobile (≤640px):** pill stretches `left: 1rem; right: 1rem` (full-bleed with margins); nav links hidden.

**To update nav links:** edit the `<ul class="nav-links">` list directly in `Layout.astro`. The CTA always points to the WhatsApp number defined inline — update `href` there.

---

## UI Primitives (used inside blocks)

| Primitive | Purpose |
|---|---|
| `EyebrowLabel` | Small uppercase label above section headings. DM Sans, tracked, forest green. |
| `LinkArrow` | Text link with trailing →. Hover: turns forest green, arrow moves right. |

---

## Token quick-reference

Common Tailwind utilities you'll use in block markup:

- Backgrounds: `bg-canvas`, `bg-card`, `bg-forest`
- Text: `text-ink`, `text-ink-soft`, `text-forest`, `text-gold`
- Borders: `border-rule`, `border-rule-soft`
- Type: `font-display` (Fraunces), `font-sans` (DM Sans)
- Size: `text-display-xl`, `text-display-lg`, `text-display-md`
- Layout: `container-es` (max-width 1240px + gutters), `py-section`

Full token list: `src/styles/globals.css`
