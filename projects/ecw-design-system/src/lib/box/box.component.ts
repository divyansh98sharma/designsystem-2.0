import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { EcwRadiusScale, EcwSpaceScale } from '../scale';

export type EcwBoxDisplay = 'block' | 'inline-block' | 'flex' | 'inline-flex';

/** Curated surface backgrounds → public color tokens. */
export type EcwBoxSurface = 'surface' | 'subtle' | 'muted';

const SURFACE_TOKEN: Record<EcwBoxSurface, string> = {
  surface: 'var(--ecw-color-neutral-0)',
  subtle: 'var(--ecw-color-neutral-50)',
  muted: 'var(--ecw-color-neutral-200)',
};

/** Build a `--ecw-space-{n}` reference for the spacing scale. */
function spaceVar(n: EcwSpaceScale): string {
  return `var(--ecw-space-${n})`;
}

/**
 * `<ecw-box>` — a generic layout primitive.
 *
 * Renders projected content inside a token-driven container. Padding, radius
 * and background all map onto the design-system primitive tokens
 * (`--ecw-space-*`, `--ecw-radius-*`), so consumers stay on-scale without
 * touching raw pixel values.
 *
 * Padding resolution: `padding` (all sides) wins; otherwise `paddingY`/
 * `paddingX` compose a `<y> <x>` shorthand (an unset side falls back to `0`).
 * When nothing is set no inline `padding` style is emitted.
 */
@Component({
  selector: 'ecw-box',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './box.component.html',
  styleUrl: './box.component.scss',
  host: {
    class: 'ecw-box',
    '[style.display]': 'display()',
    '[style.padding]': 'paddingValue()',
    '[style.border-radius]': 'radiusValue()',
    '[style.background]': 'backgroundValue()',
  },
})
export class EcwBoxComponent {
  /** Padding on all sides, in spacing-scale steps → `var(--ecw-space-{n})`. */
  readonly padding = input<EcwSpaceScale>();

  /** Horizontal padding (left + right), used when `padding` is not set. */
  readonly paddingX = input<EcwSpaceScale>();

  /** Vertical padding (top + bottom), used when `padding` is not set. */
  readonly paddingY = input<EcwSpaceScale>();

  /** Corner radius, in radius-scale steps → `var(--ecw-radius-{n})`. */
  readonly radius = input<EcwRadiusScale>();

  /** CSS `display` mode for the box. */
  readonly display = input<EcwBoxDisplay>('block');

  /**
   * Background surface — one of the curated public surfaces (`surface`,
   * `subtle`, `muted`). Omitted (no inline style) when unset.
   */
  readonly background = input<EcwBoxSurface>();

  /**
   * The resolved `padding` shorthand: the all-sides value when `padding` is
   * set, else a `<y> <x>` shorthand from `paddingY`/`paddingX` (`0` for an
   * unset side), else `null` so no inline style is emitted.
   */
  readonly paddingValue = computed<string | null>(() => {
    const all = this.padding();
    if (all != null) {
      return spaceVar(all);
    }

    const y = this.paddingY();
    const x = this.paddingX();
    if (y != null || x != null) {
      const yValue = y != null ? spaceVar(y) : '0';
      const xValue = x != null ? spaceVar(x) : '0';
      return `${yValue} ${xValue}`;
    }

    return null;
  });

  /** The resolved `border-radius`, or `null` when `radius` is unset. */
  readonly radiusValue = computed<string | null>(() => {
    const r = this.radius();
    return r != null ? `var(--ecw-radius-${r})` : null;
  });

  /** The resolved background token, or `null` when `background` is unset. */
  readonly backgroundValue = computed<string | null>(() => {
    const surface = this.background();
    return surface != null ? SURFACE_TOKEN[surface] : null;
  });
}
