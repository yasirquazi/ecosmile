# BLOCKS.md — Block Library Reference

The block components live under `src/components/blocks/<Block>/`. Each accepts only content props — no class or style overrides on the wrapper. Pick by matching the section shape in the content brief to the block below.

## Block inventory

| Block | File | Used on |
|---|---|---|
| `Hero` | `blocks/Hero/Hero.astro` | Home — Section 1 |
| `EditorialSection` | `blocks/EditorialSection/EditorialSection.astro` | Home — Sections 2 & 3; reusable for any large-body text section |
| `ServiceGrid` | `blocks/ServiceGrid/ServiceGrid.astro` | Home — Section 4 |
| `HowItWorks` | `blocks/HowItWorks/HowItWorks.astro` | Home — Section 5 |
| `TrustBlock` | `blocks/TrustBlock/TrustBlock.astro` | Home — Section 6 |
| `FAQAccordion` | `blocks/FAQAccordion/FAQAccordion.tsx` | Home — Section 7 (React, interactive) |
| `AudienceCTA` | `blocks/AudienceCTA/AudienceCTA.astro` | Home — Section 8 |

---

## Block-by-block

### `Hero`
- **Purpose:** Full-width opening section. Large headline, subheadline, primary CTA, risk minimiser text, trust bar.
- **Hydration:** none (static)
- **Props:**
  ```ts
  headline: string
  sub: string
  cta: { label: string; href: string }
  riskNote: string
  trustBar: string
  ```

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
- **Purpose:** Grid of service cards — 3 primary + 1 secondary at launch. Each card shows a badge, title, body, audience, and business model.
- **Hydration:** none
- **Props:**
  ```ts
  eyebrow?: string
  heading: string
  services: Array<{
    badge: 'PRIMARY' | 'SECONDARY'
    title: string
    body: string
    audience: string
    model: string
  }>
  ```

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
