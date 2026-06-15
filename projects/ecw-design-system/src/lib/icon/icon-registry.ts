import { Injectable, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * The icon source `<ecw-icon>` resolves a `name` from:
 * - `material`     — Material Symbols **Outlined**, weight 300 (SVG).
 * - `healthicons`  — the open-source Healthicons **outline** set (SVG).
 * - `custom`       — a brand/product SVG supplied locally (registry only).
 */
export type EcwIconSource = 'material' | 'healthicons' | 'custom';

/**
 * Local override store for `<ecw-icon>`. Icons are normally fetched live from
 * the jsDelivr CDN (see {@link EcwIconLoader}); anything registered here takes
 * precedence and is used instead — the offline / air-gapped escape hatch, and
 * the only mechanism for `source: 'custom'`.
 *
 * Register raw SVG markup once (typically at bootstrap); registered names then
 * render without any network request.
 *
 * SVG authoring guidance:
 * - Use `fill="currentColor"` (and/or `stroke="currentColor"`) so the icon
 *   inherits color from `--ecw-icon-*` / `color`.
 * - Include a `viewBox`; omit hard-coded width/height so it scales to `size`.
 *
 * Security: markup is passed through Angular's DomSanitizer. Only register SVG
 * from trusted sources — never from untrusted user input.
 */
@Injectable({ providedIn: 'root' })
export class EcwIconRegistry {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly overrides = new Map<string, SafeHtml>();

  private key(source: EcwIconSource, name: string): string {
    return `${source}:${name}`;
  }

  /** Register a local override SVG for `name` under `source` (default `custom`). */
  register(name: string, svg: string, source: EcwIconSource = 'custom'): void {
    this.overrides.set(
      this.key(source, name),
      this.sanitizer.bypassSecurityTrustHtml(svg),
    );
  }

  /** Register many overrides at once: `{ name: '<svg>…</svg>' }`. */
  registerAll(icons: Record<string, string>, source: EcwIconSource = 'custom'): void {
    for (const [name, svg] of Object.entries(icons)) {
      this.register(name, svg, source);
    }
  }

  /** Returns the sanitized override SVG for `source`/`name`, or `undefined`. */
  get(source: EcwIconSource, name: string): SafeHtml | undefined {
    return this.overrides.get(this.key(source, name));
  }

  /** Whether a local override is registered for `source`/`name`. */
  has(source: EcwIconSource, name: string): boolean {
    return this.overrides.has(this.key(source, name));
  }
}
