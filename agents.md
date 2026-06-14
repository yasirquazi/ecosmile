# agents.md — How to build pages in this repo

You are Claude Code. The team behind this repo uses you to produce on-brand Astro pages from markdown content briefs, locked design tokens, and a block component library. **You are the codegen layer.** The `.md` content files are the brief; you write the page.

This is **not** a runtime CMS — there is no parser, no automatic dispatch. Each page is a fully self-contained `.astro` file that imports block components and hardcodes the content as props.

---

## When building a page

1. **Read the content brief.** Open `docs/content-source/<slug>.md`. All copy is final — use it verbatim. Notes in `[brackets]` are implementation instructions, not visible copy.
2. **Pick the blocks.** Open `BLOCKS.md` — it lists every block and what props it accepts. Match each section in the brief to a block by shape and role.
3. **Read an existing page** for pattern reference. Start with `src/pages/index.astro` once it's built.
4. **Write the page** at `src/pages/<route>.astro`:
   - Frontmatter (`---` fenced): import `Layout` + the blocks you need; declare a `const` per section with content as a plain JS object.
   - Template: `<Layout title="…">` wrapping each block called with `{...sectionConst}`.
5. **Verify.** Run `npm run build`. Fix any errors. Then `npm run dev` and check at `http://localhost:4321`.
6. **Don't commit unless asked.**

---

## What is locked — do not modify casually

| Surface | Rule | File(s) |
|---|---|---|
| **Color tokens** | All values live in `globals.css :root`. No hex values anywhere else. | `src/styles/globals.css`, `tailwind.config.js` |
| **Font stack** | Fraunces (display/headlines) + DM Sans (body/UI). No other fonts. | `globals.css` |
| **Block components** | Accept only content props. No `class` or `style` overrides on the wrapper. | `src/components/blocks/` |
| **UI primitives** | Reuse, don't duplicate. | `src/components/ui/` |
| **Layout** | SiteNav + Footer are global. Don't re-declare them in pages. | `src/layouts/Layout.astro` |

### The literal rule
**No hex values outside `globals.css :root`.** Use token-bound Tailwind utilities (`bg-canvas`, `text-forest`, `border-rule`) or CSS variables directly. To use a new color, add it to `globals.css` first, then surface in `tailwind.config.js`.

---

## When to add a new block

**Default: use an existing block.** Most sections fit one of the blocks in `BLOCKS.md`.

Add a new block only when the section shape genuinely doesn't fit any existing block. If you add one:
1. Build it at `src/components/blocks/<BlockName>/<BlockName>.tsx` + `index.ts`
2. Use only token-bound Tailwind utilities
3. Add an entry to `BLOCKS.md`
4. Use it in the page

---

## Content format

Each content brief (`docs/content-source/*.md`) is structured as sections. Copy is verbatim and final. Notes in `[brackets]` are instructions.

```markdown
## Section N — Name

### Field
\`\`\`
Copy goes here
\`\`\`

`[Implementation note in brackets]`
```

---

## What NOT to do

- Don't write a content parser or loader. Each page is hand-crafted.
- Don't add inline styles or per-page CSS overrides.
- Don't use hex values outside `globals.css`.
- Don't use fonts other than Fraunces and DM Sans.
- Don't invent copy. Use the content brief verbatim.
- Don't reference services or partnerships not in the Brand DNA document.

---

## File index

```
agents.md                        ← this file
BLOCKS.md                        ← block library reference
docs/
  DESIGN_SYSTEM.md               ← color, type, spacing tokens
  content-source/                ← one .md per page
    home.md
    about.md
    contact.md
src/
  styles/globals.css             ← all CSS tokens (single source of truth)
  components/
    ui/                          ← small primitives (EyebrowLabel, LinkArrow, Badge)
    blocks/<Block>/              ← page section components
  layouts/Layout.astro           ← global shell (nav + footer)
  pages/                         ← one .astro per route
tailwind.config.js               ← token → utility mapping
astro.config.mjs                 ← Astro + React + Tailwind
```
