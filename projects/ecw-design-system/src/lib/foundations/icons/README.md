# Icon System

Implemented in PE-315893. `<ecw-icon>` renders inline **SVGs** (no webfont /
glyph). Every icon is the **outline** variant, resolved by `name` from one of
three sources via the `source` input.

## Sources

| Source | `source` value | Origin | Delivery |
|---|---|---|---|
| **Material Symbols** | `'material'` (default) | `@material-symbols/svg-300` (Outlined, weight 300) | Fetched from jsDelivr CDN |
| **Healthicons** | `'healthicons'` | [healthicons.org](https://healthicons.org), outline (`healthicons@2`) | Fetched from jsDelivr CDN |
| **Custom** | `'custom'` | App-supplied SVG via `EcwIconRegistry` | Local only (no network) |

## Live updates & caching

Material and Healthicons SVGs are fetched from the jsDelivr CDN, **pinned to a
version range** (`@material-symbols/svg-300`, `healthicons@2`). New or updated
icons published within that range are picked up automatically — no rebuild, no
tracking of upstream release cadence.

- **Lazy**: only icons actually used are fetched, once, then cached for the
  session. A miss (unknown name / network error) is cached too, so it won't
  refetch on every change detection.
- **Async**: resolution is asynchronous — nothing renders until the SVG arrives.
- **Healthicons indexing**: Healthicons SVGs are nested by category, so a
  `name → path` index is fetched once from jsDelivr and cached, then used to
  build each SVG URL (so consumers reference icons by bare name).

## Offline / air-gapped

The library has a **hard runtime dependency on the jsDelivr CDN** for the
Material/Healthicons sources. Two implications:

- **CSP**: the host app must allow `connect-src https://cdn.jsdelivr.net
  https://data.jsdelivr.com`.
- **Offline**: pre-register SVGs with `EcwIconRegistry` — registered names
  **override** the CDN and need no network. This is also the only mechanism for
  `source: 'custom'`.

```ts
import { EcwIconComponent, EcwIconRegistry } from '@ecw/design-system';

const registry = inject(EcwIconRegistry);
// custom brand glyph
registry.register('brand-mark', '<svg viewBox="0 0 24 24">…</svg>', 'custom');
// offline override of a Material icon (skips the CDN)
registry.register('home', '<svg viewBox="0 0 24 24">…</svg>', 'material');
```

```html
<ecw-icon name="home" />                          <!-- Material (CDN) -->
<ecw-icon name="ambulance" source="healthicons" /><!-- Healthicons (CDN) -->
<ecw-icon name="brand-mark" source="custom" />    <!-- registered SVG -->
```

## Conventions

- **Color**: SVGs inherit `currentColor` — set color via a `--ecw-icon-*`
  semantic token. Registered SVGs must use `fill="currentColor"` /
  `stroke="currentColor"` and include a `viewBox` (no fixed width/height).
- **Sizing**: `size` (px) drives the box; the SVG scales to fill it.
- **Accessibility**: decorative by default (`aria-hidden="true"`); pass `label`
  for a meaningful icon (`role="img"` + `aria-label`).

## Security

Registered and fetched SVG markup is passed through Angular's `DomSanitizer`.
Only register SVG from trusted sources — never from untrusted user input.
