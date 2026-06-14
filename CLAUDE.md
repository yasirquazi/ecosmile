# Eco Smile — Claude Code Project Rules

This file is read automatically by Claude Code at the start of every session.
These rules are **always active**. Do not ask the user to remind you of them.

---

## How this project works

Read `agents.md` before building anything. It explains the full methodology.
Read `BLOCKS.md` before choosing a component. The 7 blocks cover all current pages.
Read `docs/DESIGN_SYSTEM.md` for visual decisions.

---

## Hard rules — never break these

### 1. No hex values outside `globals.css`
All color values live in `src/styles/globals.css` as CSS custom properties.
Everywhere else, use the token-bound Tailwind utilities (`bg-canvas`, `text-forest`, `border-rule`)
or reference the variable directly (`var(--color-forest)`).

If you need a new color: add it to `globals.css` first, surface it in `tailwind.config.js`, then use it.

### 2. Font sizes must be multiples of 4px — minimum 12px

**Valid sizes:** 12, 16, 20, 24, 28, 32, 36, 40px (and the clamp display tokens in `tailwind.config.js`)

**In rem:** 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5rem

**Rounding rule:**
| You reach for | Use instead |
|---|---|
| 11px / 0.6875rem | 12px / 0.75rem |
| 13px / 0.8125rem | 12px / 0.75rem |
| 14px / 0.875rem  | 12px or 16px (context) |
| 15px / 0.9375rem | 16px / 1rem |
| 17px / 1.0625rem | 16px / 1rem |
| 18px / 1.125rem  | 20px / 1.25rem |
| 22px / 1.375rem  | 24px / 1.5rem |

**Context rule for 14px → 12 or 16px:**
- Footer text, captions, small meta labels → 12px
- Nav, buttons, body-adjacent text → 16px

Run `npm run check:type` to verify the whole codebase before committing.

### 3. Headlines must not exceed 3 lines

No `h1`, `h2`, or `h3` may wrap beyond 3 lines at its intended viewport.
Check at 375px (mobile) and 1280px (desktop).

If a heading wraps too long:
- First try: shorten the copy (preferred — copy is in `docs/content-source/`)
- Second try: reduce font size to the next step down on the 4px scale

Do not stretch the container width or reduce padding to fix a wrapping headline.

### 4. Fonts: Fraunces and DM Sans only

No third typeface. Fraunces for `h1/h2/h3` (display), DM Sans for everything else.

### 5. Blocks take content props only

No `class` or `style` overrides on block component wrappers.
If a design need can't be met with existing props, add a prop to the block — don't override from the page.

### 6. One source of truth per piece of content

All copy comes from `docs/content-source/<page>.md`. Do not invent copy. Do not paraphrase.
If copy needs to change, change it in the `.md` file first, then update the page.

---

## What to do when building a new page

1. Check `docs/content-source/` for the content brief
2. Check `BLOCKS.md` for which blocks to use
3. Follow the assembly pattern in `src/pages/index.astro`
4. Run `npm run build` — must pass with zero warnings
5. Run `npm run check:type` — must pass with zero violations
6. Check headlines at 375px and 1280px

## What NOT to do

- No hex values outside `globals.css`
- No font sizes that aren't on the 4px grid
- No inline `style` attributes unless absolutely unavoidable (FAQAccordion React component is the one exception)
- No new fonts
- No modifying block internals from a page file
- No inventing copy
