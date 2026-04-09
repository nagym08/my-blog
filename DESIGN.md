# Design System Specification: Luminous Depth

## 1. Overview & Creative North Star
**The Creative North Star: "The Neon Observatory"**

This design system is built for elite digital environments where code, craft, and creativity intersect. It rejects the sterility of standard flat design in favor of "Luminous Depth"—a visual language where information sits on deep, charcoal-toned layers, illuminated by internal glows rather than external light sources. 

We break the traditional "template" look through **intentional tonal layering** and **asymmetric focal points**. Instead of a rigid grid of boxes, we treat the interface as a dark canvas where elements emerge through glass-like transparency (Glassmorphism) and subtle, vibrant blurs. The goal is an editorial experience that feels premium, atmospheric, and highly intentional.

---

## 2. Colors
Our palette is anchored in a deep, nocturnal base (`#0e0e10`), accented by high-energy electric violets and deep-sea blues.

### The Palette (Material Design Tokens)
*   **Core Background:** `background: #0e0e10` | `surface: #0e0e10`
*   **Vibrant Accents:** `primary: #a3a6ff` | `secondary: #c180ff` | `tertiary: #699cff`
*   **The Container Hierarchy:**
    *   `surface_container_low`: `#131315` (Deepest sections)
    *   `surface_container`: `#19191c` (Standard cards)
    *   `surface_container_highest`: `#262528` (Interactive elements/Hovers)

### Design Directives
*   **The "No-Line" Rule:** 1px solid borders for sectioning are strictly prohibited. Define boundaries through color shifts (e.g., a `surface_container` card on a `surface` background).
*   **The Glass & Gradient Rule:** High-end CTAs and hero elements must utilize linear gradients (e.g., `primary` to `primary_dim`) to add "soul" to the interface.
*   **Signature Textures:** Use semi-transparent surface colors with `backdrop-filter: blur(12px)` for navigation bars and floating modals to create the "frosted glass" effect seen in the reference material.

---

## 3. Typography
The system uses a dual-font strategy to balance editorial authority with technical precision.

*   **Display & Headlines (Manrope):** A geometric sans-serif that provides a modern, high-end feel. Use `display-lg` (3.5rem) for hero statements to command attention.
*   **Body & Labels (Inter):** A hyper-legible sans-serif designed for UI. Used for all functional text, ensuring clarity against dark backgrounds.

### Typographic Hierarchy
*   **Display (Manrope):** Bold, assertive. Use for high-impact editorial moments.
*   **Headline (Manrope):** Clean and structured. For primary section titles.
*   **Title (Inter):** Medium-weight, used for card headings and navigation.
*   **Body (Inter):** Regular weight. Optimized for long-form reading with generous line height (1.5x - 1.6x).
*   **Label (Inter):** Small, uppercase, or high-tracking styles for metadata (e.g., Tags).

---

## 4. Elevation & Depth
In this system, elevation is conveyed through **Tonal Layering** and **Ambient Glows** rather than traditional drop shadows.

*   **The Layering Principle:** Depth is achieved by stacking tiers. An active card uses `surface_container_highest` to sit "above" a section using `surface_container`.
*   **Ambient Shadows:** For floating elements, shadows must be ultra-diffused. Use a 40px-60px blur at 8% opacity, using a tinted color (derived from `primary` or `secondary`) instead of pure black.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use `outline_variant` at 15% opacity. Never use 100% opaque borders.
*   **Inner Glows:** To replicate the "Sign In" button aesthetic, use an `inner-shadow` or a subtle `linear-gradient` border that mimics a light-catching edge.

---

## 5. Components

### Buttons
*   **Primary (The Signature):** A deep gradient of `primary` to `primary_dim`. It features a subtle outer glow using the same hue. Roundedness: `full`.
*   **Secondary/Ghost:** No background fill. Uses a `Ghost Border` with `primary` text.
*   **Interaction:** On hover, the internal glow should intensify (increase brightness of the gradient).

### Cards & Lists
*   **The Card Rule:** Forbid divider lines. Use vertical white space (`1.5rem` to `2rem`) to separate content.
*   **Card Styling:** Use `surface_container` with a `DEFAULT` (1rem) corner radius. Elements inside the card should feel "integrated" rather than boxed in.

### Chips (Tags)
*   Used for categorization (e.g., "TypeScript", "Backend").
*   Style: `surface_variant` background with `on_surface_variant` text.
*   Shape: `md` (1.5rem) roundedness for a pill-like, friendly appearance.

### Input Fields
*   **Container:** `surface_container_highest`. 
*   **Indicator:** Instead of a full border, use a 2px bottom accent in `tertiary` when focused.
*   **Typography:** Labels use `label-md` in `on_surface_variant`.

---

## 6. Do's and Don'ts

### Do:
*   **DO** use varying shades of dark charcoal to create hierarchy.
*   **DO** use "vibrant purples and blues" sparingly for "glow" moments—think of them as light sources in a dark room.
*   **DO** allow for generous negative space. High-end design breathes.
*   **DO** ensure all text passes WCAG AA contrast ratios against the dark surfaces.

### Don't:
*   **DON'T** use pure black (`#000000`) for surfaces; it kills the depth and looks "flat."
*   **DON'T** use 1px solid white or grey borders to separate sections. It creates visual noise.
*   **DON'T** use standard, high-opacity drop shadows. They feel dated in a glass-morphic system.
*   **DON'T** crowd the UI. If in doubt, add more padding.