# BLOCKS.md — Block Library Reference

The block components live under `src/components/blocks/<Block>/`. Each accepts only content props — no class or style overrides on the wrapper. Pick by matching the section shape in the content brief to the block below.

## Block inventory

| Block | File | Used on |
|---|---|---|
| `Hero` | `blocks/Hero/Hero.astro` | Home — Section 1 |
| `SplitSection` | `blocks/SplitSection/SplitSection.astro` | Home — Section 2; reusable for any text + image split |
| `EditorialSection` | `blocks/EditorialSection/EditorialSection.astro` | Home — Sections 3; reusable for any large-body text section |
| `ServiceGrid` | `blocks/ServiceGrid/ServiceGrid.astro` | Home — Section 4 |
| `HowItWorks` | `blocks/HowItWorks/HowItWorks.astro` | Home — Section 5 |
| `TrustBlock` | `blocks/TrustBlock/TrustBlock.astro` | Home — Section 6 |
| `FAQAccordion` | `blocks/FAQAccordion/FAQAccordion.tsx` | Home — Section 7 (React, interactive) |
| `AudienceCTA` | `blocks/AudienceCTA/AudienceCTA.astro` | Home — Section 8 |

---

## Block-by-block

### `Hero`
- **Purpose:** Full-viewport opening section. Background image with dark gradient scrim; headline + sub + CTA centred at the bottom. Nav is transparent over this section and gains its canvas background on scroll (handled by IntersectionObserver in `Layout.astro`).
- **Hydration:** none (static)
- **Props:**
  ```ts
  headline: string   // supports <br> for forced line breaks, rendered via set:html
  sub: string
  cta: { label: string; href: string }
  ```
- **Background image:** swap `/public/images/hero-bg.png` — component always reads from that path.
- **Gradient scrim:** two-stop overlay (`--scrim-mid` → `--scrim-dark`) defined in `globals.css`. Adjust there to tune contrast.
- **Notes:** Uses `min-height: 100svh` (small viewport height unit — handles mobile browser chrome). Content sits at the bottom via `justify-content: flex-end` on the section flex container.

---

### `SplitSection`
- **Purpose:** Two-column section with text on the left (60%) and a square image on the right (40%). Use when a section needs a strong visual alongside its copy — problem statements, testimonials, feature callouts.
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
- **Notes:** Image is locked to `aspect-ratio: 1/1` and uses `object-fit: cover`. `imagePosition='left'` flips the grid — image column becomes 40%, text becomes 60%, using CSS `order: -1` so DOM order stays logical. On mobile (≤768px) the grid always stacks — text first, image below at `4/3` ratio regardless of `imagePosition`.

---

### `EditorialSection`
- **Purpose:** Long-form text section with a strong heading and one or two body paragraphs. Used for Problem (Section 2) and Solution (Section 3). Optionally right-aligned or centred.
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
- **Purpose:** 4-column card grid for services. Each card has a colour-block header (auto-assigned per nth-child), title, body, and a "For" pill row with a model line below.
- **Hydration:** none
- **Props:**
  ```ts
  eyebrow?: string
  heading: string
  services: Array<{
    title: string
    body: string
    audience: string[]   // each item becomes a pill under the "For" label
    model: string        // rendered as small soft text below the pills
  }>
  ```
- **Notes:** Card top colours cycle through `--color-forest → --color-mid → --color-earth → --color-gold` via nth-child — no colour prop needed. Grid collapses to 2 cols at ≤1023px and 1 col at ≤639px.

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

## UI Primitives (used inside blocks)

| Primitive | Purpose |
|---|---|
| `EyebrowLabel` | Small uppercase label above section headings. DM Sans, tracked, forest green. |
| `Badge` | Inline tag — PRIMARY (forest green) or SECONDARY (earth brown). |
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
