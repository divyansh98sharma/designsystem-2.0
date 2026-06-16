# Foundations

This directory contains the foundational building blocks of the `@ecw/design-system` — the shared constraints (tokens, typography, icons) that every component is built on top of.

---

## Three-Layer Token Architecture

All design decisions in this system are expressed through CSS custom properties using a **three-layer token cascade**. Every token name is prefixed with `--ecw-` to scope it to this library and prevent collisions with host applications.

### Layer 1 — Primitive Tokens (`tokens/primitives.css`)

Primitive tokens are raw, context-free values: the full colour palette, the spacing scale, border-radius steps, and font-size steps. They are the **only layer that contains literal values** (hex codes, `rem` measurements, etc.).

Naming pattern: `--ecw-<category>-<scale>`

```css
/* Examples (not live — values supplied by design team in PE-315919/PE-315920) */
/* --ecw-color-blue-500:  #...; */
/* --ecw-space-4:         ...; */
/* --ecw-radius-md:       ...; */
/* --ecw-font-size-sm:    ...; */
```

### Layer 2 — Semantic Tokens (`tokens/semantics.css`)

Semantic tokens map primitive values to design **intent**. They describe _how_ a value is used rather than what it is. Semantic tokens must always reference primitive tokens via `var(--ecw-...)` — never literal values.

Naming pattern: `--ecw-<property>-<role>[-<variant>]`

```css
/* Examples (not live — populated in PE-315920) */
/* --ecw-color-bg-default:     var(--ecw-color-neutral-0);  */
/* --ecw-color-text-default:   var(--ecw-color-neutral-900);*/
/* --ecw-color-border-focus:   var(--ecw-color-blue-500);   */
/* --ecw-color-brand-primary:  var(--ecw-color-blue-500);   */
/* --ecw-radius-control:       var(--ecw-radius-md);        */
```

### Layer 3 — Component Tokens (`tokens/components.css`)

Component tokens are component-specific design decisions. They are added **alongside each component Jira**, not in advance. Component tokens should reference semantic tokens where possible, and primitive tokens only when no suitable semantic exists (with a comment explaining why).

Naming pattern: `--ecw-<component>-<property>[-<variant>]`

```css
/* Examples (not live — added per-component Jira) */
/* --ecw-button-bg-primary:      var(--ecw-color-brand-primary); */
/* --ecw-button-text-primary:    var(--ecw-color-text-on-brand); */
/* --ecw-button-border-radius:   var(--ecw-radius-control);      */
/* --ecw-button-padding-x:       var(--ecw-space-4);             */
```

---

## Public vs Internal Surface

The design system draws a deliberate line between what consumers may use directly and what is an internal implementation detail.

### Public (safe to use directly)

| Surface | Import / Usage |
|---|---|
| **Foundation tokens** — a *curated* subset of color, plus the space, radius, typography and border scales | `@import '@ecw/design-system/foundations/foundations.css';` |
| **Base element styles** — reset + native element defaults, built on the foundation tokens | `@import '@ecw/design-system/foundations/elements/base.css';` |
| **Components** — `EcwButtonComponent`, `EcwIconComponent`, … | imported from the package TS entry point |

`foundations.css` is the **public token contract** — a deliberately limited set. It exposes a small, hand-picked color palette (brand, surfaces, text, border, status) and the full space/radius/typography/border scales. The **full** primitive palette (every teal/neutral/error/warning step) is **not** public; it lives only in `tokens/primitives.css` for internal use.

### Internal (do not depend on directly)

The **semantic** (`--ecw-<intent>-*`) and **component** (`--ecw-<component>-*`) token layers are an implementation detail consumed by the components. They still live on `:root` (CSS custom properties are inherently global), but they are intentionally **not** part of the public contract and may change without notice. Consume them through components, not by referencing the variables yourself.

> Full token aggregation (`tokens/tokens.css` = primitives + semantics + components) remains available for the library's own Storybook/preview and for components — it is not the public foundation entry point.

---

## The `--ecw-` Prefix

Every CSS custom property in this system is namespaced with `--ecw-`. This prevents collisions with host-application variables, third-party libraries, and browser-provided custom properties.

---

## Cascade / Import Order

The single entry point is `tokens/tokens.css`. Import it once at the root of your application or Storybook preview — do **not** import the individual layer files directly from component stylesheets.

```css
@import '@ecw/design-system/foundations/tokens/tokens.css';
```

The internal import order is fixed and must not be changed:

```
primitives.css  →  semantics.css  →  components.css
```

This order ensures each layer's `var()` references are resolved against the layer(s) already loaded.

---

## How Components Consume Tokens

A component stylesheet should **consume component tokens first**. Component tokens reference semantic tokens, which in turn reference primitive tokens. This chain keeps component styles fully decoupled from raw values.

```
component style
  → component token  (--ecw-button-bg-primary)
    → semantic token (--ecw-color-brand-primary)
      → primitive    (--ecw-color-blue-500)
        → literal    (#...)
```

If a component token does not exist yet for a property, fall back to the appropriate semantic token — never to a primitive or a raw value.

---

## Missing-Token Policy

| Situation | Action |
|---|---|
| A component needs a token that doesn't exist yet | Document the gap in the PR description; add the token in the same PR if it is component-scoped. |
| The missing token is system-wide (affects multiple components) | Recommend opening a new Jira to add it to the appropriate layer. |
| No suitable token exists at all | **Never hardcode raw values** in component styles. Use a placeholder comment and open a tracking Jira. |

---

## Sub-Directories

| Directory | Status | Jira |
|---|---|---|
| `tokens/` | Scaffold complete (this Jira: PE-314767). Values arrive in PE-315920 / PE-315919. | PE-314767 |
| `typography/` | Planned — see `typography/README.md` | PE-315736 |
| `icons/` | Planned — see `icons/README.md` | PE-315893 |
