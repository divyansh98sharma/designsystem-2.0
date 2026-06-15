import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { EcwIconLoader } from './icon-loader';
import { EcwIconSource } from './icon-registry';

export type { EcwIconSource } from './icon-registry';

/**
 * `<ecw-icon>` — the design-system icon primitive.
 *
 * Renders an inline **SVG** (no webfont/glyph) resolved by `name` from one of
 * three sources via `source`: Material Symbols (Outlined, weight 300),
 * Healthicons (outline), or a locally-registered custom SVG. All icons are the
 * outline variant.
 *
 * SVGs are fetched live from the jsDelivr CDN and cached (see
 * {@link EcwIconLoader}), so new/updated icons are picked up automatically. For
 * offline / air-gapped use, pre-register SVGs with {@link EcwIconRegistry} —
 * overrides win and need no network. Resolution is therefore **async**: nothing
 * renders until the SVG is available.
 *
 * Color: inherits `currentColor`, so set the color via a semantic icon token,
 * e.g. `color: var(--ecw-icon-interactive-primary-default)`.
 *
 * Accessibility:
 * - Decorative by default → `aria-hidden="true"` (no `label`).
 * - Provide `label` for a meaningful icon → `role="img"` + `aria-label`.
 */
@Component({
  selector: 'ecw-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  host: {
    class: 'ecw-icon',
    '[style.width.px]': 'size()',
    '[style.height.px]': 'size()',
    '[attr.role]': 'label() ? "img" : null',
    '[attr.aria-label]': 'label() ?? null',
    '[attr.aria-hidden]': 'label() ? null : "true"',
  },
})
export class EcwIconComponent {
  private readonly loader = inject(EcwIconLoader);

  /** Icon name: a Material Symbols / Healthicons name, or a registered custom name. */
  readonly name = input.required<string>();

  /** Which icon set to resolve `name` from. */
  readonly source = input<EcwIconSource>('material');

  /** Rendered size in px (applied to both width and height). */
  readonly size = input<number>(24);

  /**
   * Accessible label. When set, the icon is announced (`role="img"`); when
   * omitted, the icon is treated as decorative (`aria-hidden="true"`).
   */
  readonly label = input<string>();

  /** The resolved inline SVG, or `null` while loading / when not found. */
  readonly svg = signal<SafeHtml | null>(null);

  constructor() {
    effect(() => {
      const name = this.name();
      const source = this.source();
      // Reset while the (async) load is in flight.
      this.svg.set(null);
      this.loader.load(source, name).then((resolved) => {
        // Ignore a stale result if the inputs changed mid-flight.
        if (this.name() === name && this.source() === source) {
          this.svg.set(resolved);
        }
      });
    });
  }
}
