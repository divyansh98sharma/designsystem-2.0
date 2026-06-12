import { Injectable, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Registry for custom SVG icons used as a fallback when an icon is not part of
 * the Material Symbols set (or when a brand/product-specific glyph is needed).
 *
 * Register raw SVG markup once (typically at app bootstrap), then reference it
 * by name through `<ecw-icon name="...">`. Registered names take precedence
 * over Material Symbols, so a custom SVG can also override a Material glyph.
 *
 * SVG authoring guidance:
 * - Use `fill="currentColor"` (and/or `stroke="currentColor"`) so the icon
 *   inherits color from `--ecw-icon-*` / `color` like Material Symbols do.
 * - Include a `viewBox`; omit hard-coded width/height so it scales to `size`.
 *
 * Security: markup is passed through Angular's DomSanitizer. Only register SVG
 * from trusted sources — never from untrusted user input.
 */
@Injectable({ providedIn: 'root' })
export class EcwIconRegistry {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly icons = new Map<string, SafeHtml>();

  /** Register a single custom icon by name. */
  register(name: string, svg: string): void {
    this.icons.set(name, this.sanitizer.bypassSecurityTrustHtml(svg));
  }

  /** Register many custom icons at once: `{ name: '<svg>…</svg>' }`. */
  registerAll(icons: Record<string, string>): void {
    for (const [name, svg] of Object.entries(icons)) {
      this.register(name, svg);
    }
  }

  /** Returns the sanitized SVG for a registered name, or `undefined`. */
  get(name: string): SafeHtml | undefined {
    return this.icons.get(name);
  }

  /** Whether a custom icon is registered under `name`. */
  has(name: string): boolean {
    return this.icons.has(name);
  }
}
