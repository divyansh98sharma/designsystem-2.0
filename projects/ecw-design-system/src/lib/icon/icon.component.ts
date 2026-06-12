import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { EcwIconRegistry } from './icon-registry';

/**
 * `<ecw-icon>` — the design-system icon primitive.
 *
 * Renders a Material Symbols glyph by `name` (ligature), and falls back to a
 * registered custom SVG ({@link EcwIconRegistry}) when one exists for that name
 * — registered names take precedence, so custom SVGs can override Material too.
 *
 * Color: inherits `currentColor`, so set the color via a semantic icon token,
 * e.g. `color: var(--ecw-icon-interactive-primary-default)`.
 *
 * Accessibility:
 * - Decorative by default → `aria-hidden="true"` (no `label`).
 * - Provide `label` for a meaningful icon → `role="img"` + `aria-label`.
 *
 * The Material Symbols webfont is NOT bundled by the library; the consuming app
 * (and Storybook) must load it. Custom SVG icons have no font dependency.
 */
@Component({
  selector: 'ecw-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (svg(); as customSvg) {
      <span class="ecw-icon__svg" [innerHTML]="customSvg"></span>
    } @else {
      <span class="ecw-icon__glyph material-symbols-outlined">{{ name() }}</span>
    }
  `,
  host: {
    class: 'ecw-icon',
    '[style.width.px]': 'size()',
    '[style.height.px]': 'size()',
    '[style.font-size.px]': 'size()',
    '[style.font-variation-settings]': `'"FILL" ' + (filled() ? 1 : 0)`,
    '[attr.role]': 'label() ? "img" : null',
    '[attr.aria-label]': 'label() ?? null',
    '[attr.aria-hidden]': 'label() ? null : "true"',
  },
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        color: inherit;
        flex: 0 0 auto;
      }
      .ecw-icon__glyph {
        font-size: inherit;
        line-height: 1;
        /* Material Symbols variable-font axes (FILL is set on the host) */
        font-variation-settings: inherit;
        -webkit-font-smoothing: antialiased;
        user-select: none;
      }
      .ecw-icon__svg {
        display: inline-flex;
        width: 1em;
        height: 1em;
      }
      .ecw-icon__svg ::ng-deep svg {
        width: 100%;
        height: 100%;
        display: block;
        fill: currentColor;
      }
    `,
  ],
})
export class EcwIconComponent {
  private readonly registry = inject(EcwIconRegistry);

  /** Material Symbols name (ligature) or a registered custom-icon name. */
  readonly name = input.required<string>();

  /** Rendered size in px (applied to both width/height and glyph font-size). */
  readonly size = input<number>(24);

  /**
   * Accessible label. When set, the icon is announced (`role="img"`); when
   * omitted, the icon is treated as decorative (`aria-hidden="true"`).
   */
  readonly label = input<string>();

  /** Material Symbols `FILL` axis (filled vs outlined). Ignored by custom SVGs. */
  readonly filled = input<boolean>(false);

  /** Resolved custom SVG for `name`, or `undefined` to fall back to Material. */
  readonly svg = computed<SafeHtml | undefined>(() => this.registry.get(this.name()));
}
