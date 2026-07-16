# Design System Specification: Crisp Technical

## 1. Overview & Creative North Star

**The Creative North Star: "Quiet, Confident, Editorial."**

This is a personal blog by a software developer. Coding is the flagship topic, but
it also carries occasional personal writing (diabetes, sport, and how they connect).
The design has to stay credible for code-heavy articles *and* feel warm enough for
personal pieces — so it gets out of the way and lets the writing carry the
personality.

The visual language is **"Crisp Technical"**: a clean, modern, **light-by-default**
surface with a single restrained accent, **hairline borders**, flat surfaces, and
generous whitespace. Depth comes from tonal surfaces and one soft shadow — never
from glows, blur, or gradients. Think Linear / Vercel / Stripe-docs: precise,
legible, engineered.

A **light/dark toggle** lives in the header. Light is the default; dark is a
first-class, equally-designed counterpart. The look is **uniform across every
topic** — there is no per-topic theming or accent.

> This spec replaces the previous "Luminous Depth / Neon Observatory" dark-only
> system. Glassmorphism, ambient glows, and gradient CTAs are gone.

---

## 2. Colors

The system defines **one semantic token vocabulary**, declared under `:root`
(light) and overridden under `[data-theme="dark"]`. Components reference only these
semantic tokens — never raw hex. Values below are the source of truth
(`src/app/globals.css`); tune within these ranges but preserve the roles and keep
text/background pairs at **WCAG AA**.

### Light (`:root`)
| Token | Value | Role |
|---|---|---|
| `--surface-base` | `#FFFFFF` | Page background |
| `--surface-sunken` | `#F8F9FB` | Recessed sections / subtle bands |
| `--surface-raised` | `#FFFFFF` | Cards, article surface |
| `--surface-overlay` | `#FFFFFF` | Header, dropdowns, menus (opaque) |
| `--text-primary` | `#16181D` | Body + headings |
| `--text-secondary` | `#5B616E` | Meta, muted, captions |
| `--text-on-accent` | `#FFFFFF` | Text on accent fills |
| `--accent` | `#4F46E5` | Links, primary CTA, focus |
| `--accent-hover` | `#4338CA` | Accent hover |
| `--accent-subtle` | `#EEF0FE` | Tinted active/hover/tag backgrounds |
| `--border` | `#E6E8EC` | Hairline borders, dividers |
| `--border-strong` | `#D3D6DC` | Hover/focus borders |
| `--danger` | `#DC2626` | Destructive actions |
| `--danger-hover` | `#B91C1C` | Destructive hover |
| `--shadow-sm` | `0 1px 2px rgba(16,24,40,.06), 0 1px 3px rgba(16,24,40,.05)` | Cards |
| `--shadow-md` | `0 4px 12px rgba(16,24,40,.08)` | Overlays, hover |
| `--code-bg` | `#F6F7F9` | Code block surface |
| `color-scheme` | `light` | |

### Dark (`[data-theme="dark"]`)
| Token | Value |
|---|---|
| `--surface-base` | `#0E1116` |
| `--surface-sunken` | `#0B0D12` |
| `--surface-raised` | `#161A21` |
| `--surface-overlay` | `#161A21` |
| `--text-primary` | `#E6E8EC` |
| `--text-secondary` | `#97A0AE` |
| `--text-on-accent` | `#FFFFFF` |
| `--accent` | `#8C90FF` |
| `--accent-hover` | `#A5A8FF` |
| `--accent-subtle` | `#20233A` |
| `--border` | `#242A34` |
| `--border-strong` | `#2F3743` |
| `--danger` | `#F87171` |
| `--danger-hover` | `#FCA5A5` |
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,.4)` |
| `--shadow-md` | `0 6px 16px rgba(0,0,0,.45)` |
| `--code-bg` | `#12151B` |
| `color-scheme` | `dark` |

### Category tag colors
The `--tag-*` palette (typescript/backend/api/css-design/dev-growth/frontend/life/
default) tints tags for scannability. Backgrounds use a pale `color-mix` tint of
the hue; **tag text must use a dark-enough stop of the same hue to pass AA on the
light tint** (don't render the full-saturation hue as text on its own pale tint).

---

## 3. Typography

Dual-font strategy, unchanged from before — it already fits the new system.

- **Display & Headings — Manrope** (`--font-display`): geometric sans for hero
  statements and section/card titles. Clean and structured.
- **Body & UI — Inter** (`--font-sans`): hyper-legible for long-form reading and
  all functional text. Body line-height `1.6`.

Weights: regular for body, medium/semibold for titles and labels. Use size and
weight — not color tricks — to build hierarchy. Metadata (dates, tags) uses small,
higher-tracking labels in `--text-secondary`.

---

## 4. Elevation & Depth

Depth is **tonal + one soft shadow**. No glows, no blur, no gradients.

- **Tonal layering:** separate regions with `--surface-*` tiers and hairline
  `--border`, not with heavy shadows.
- **Shadows:** cards rest at `--shadow-sm`; floating elements (dropdowns, hover
  lift) use `--shadow-md`. Never stack multiple glow shadows.
- **Borders are welcome:** a `1px solid var(--border)` hairline is the primary way
  to define a boundary. (This reverses the old "No-Line Rule".)
- **Focus:** a visible focus ring in `--accent` (e.g. `box-shadow: 0 0 0 2px
  var(--accent-subtle), 0 0 0 3px var(--accent)` or `outline`), never removed.

---

## 5. Components

### Buttons
- **Primary:** solid `--accent` fill, `--text-on-accent` label; hover →
  `--accent-hover`. Radius `--radius-full` or `--radius-md` (consistent per app).
  No gradient, no glow.
- **Secondary / Ghost:** transparent fill, `1px solid var(--border)` (hover
  `--border-strong`), `--text-primary` label.
- **Destructive:** solid `--danger` → `--danger-hover`.

### Cards & Lists
- `--surface-raised` background, `1px solid var(--border)`, `--radius-lg` corners,
  `--shadow-sm`. Hover may lift to `--shadow-md` and `--border-strong`.
- Separate content with whitespace (`1.5rem`–`2rem`) and hairline dividers.

### Chips / Tags
- Pale `--accent-subtle` (or the category `--tag-*` tint) background with
  same-hue dark text. Pill shape (`--radius-full` / `md`).

### Input Fields
- `--surface-raised` (or `--surface-sunken`) background, `1px solid var(--border)`,
  `--radius-md`. On focus: `--border-strong` or `--accent` border + accent focus
  ring. Labels in `--text-secondary`.

### Header / Overlays
- Opaque `--surface-overlay`, `border-bottom: 1px solid var(--border)`. **No
  backdrop-filter / blur.**

### Code blocks
- `--code-bg` surface, hairline border, no glow. Syntax highlighting is
  dual-theme (Shiki `github-light` in light, `one-dark-pro` in dark), selected off
  the root `[data-theme]`.

---

## 6. Theming & the toggle

- **Mechanism:** `data-theme` attribute on `<html>`. Light is the attribute-less
  default (`:root`); dark is `[data-theme="dark"]`.
- **Persistence & no flash:** a small blocking inline script in `layout.tsx` sets
  `data-theme` from `localStorage.theme` (falling back to `prefers-color-scheme`)
  before first paint. `<html>` carries `suppressHydrationWarning`.
- **Control:** `ThemeToggle` (a `"use client"` component) in the header flips the
  attribute and persists the choice.

---

## 7. Do's and Don'ts

### Do
- **DO** design light and dark as equals — check contrast in both.
- **DO** use hairline `--border` and tonal `--surface-*` tiers to define structure.
- **DO** keep one accent; use it deliberately for links, primary actions, focus.
- **DO** give the UI room to breathe — when in doubt, add whitespace.
- **DO** reference semantic tokens only; never hardcode hex in component CSS.

### Don't
- **DON'T** use `backdrop-filter`/blur, ambient glow shadows, or gradient fills.
- **DON'T** stack multiple shadows to fake elevation.
- **DON'T** introduce per-topic accent colors — the look is uniform.
- **DON'T** ship text that fails WCAG AA on its surface (watch tag tints).

---

## 8. Adding a category (checklist)

Categories are single-source in `src/lib/content.schema.ts`; display metadata lives
in `src/lib/categories.ts`.

1. Add the slug to `CATEGORIES` in `src/lib/content.schema.ts`.
2. Add its entry to `CATEGORY_META` in `src/lib/categories.ts`
   (`navLabel`, `fullLabel`, `color`, optional `description`).
3. If it needs a new tag color: add `--tag-<name>` in `globals.css`, the union
   member in `Tag.tsx`, and the `.<name>` class in `Tag.module.css`.
4. Create `content/<slug>/` and add `.mdx` posts.

Navigation, search labels, the `/category/<slug>` route, and card tag colors all
update automatically from `CATEGORY_META`.
