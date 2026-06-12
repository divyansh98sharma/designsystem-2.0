import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
} from '@angular/core';

export type EcwTextSize = 12 | 14 | 16;
export type EcwTextWeight = 'regular' | 'medium' | 'semi-bold' | 'bold';

/** Curated text colors → public color tokens. */
export type EcwTextColor = 'default' | 'muted' | 'brand' | 'error';

const TEXT_COLOR_TOKEN: Record<EcwTextColor, string> = {
  default: 'var(--ecw-color-neutral-650)',
  muted: 'var(--ecw-color-neutral-600)',
  brand: 'var(--ecw-color-teal-700)',
  error: 'var(--ecw-color-error-700)',
};

/**
 * `<ecw-text>` — the design-system typography primitive.
 *
 * Renders projected text with token-driven `font-size`, `line-height`,
 * `font-weight`, `color` and `text-align`. All visual values resolve to
 * `--ecw-typography-*` / consumer-supplied CSS tokens, so text stays in sync
 * with the type scale.
 *
 * Sizes are limited to the tokenized scale (12 | 14 | 16). Line-height is
 * derived from size: 12 → 16px, 14 / 16 → 20px. `color` and `align` are opt-in
 * and omitted (no inline style) when left unset. `truncate` clips to a single
 * line with an ellipsis.
 */
@Component({
  selector: 'ecw-text',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss',
  host: {
    class: 'ecw-text',
    '[class.ecw-text--truncate]': 'truncate()',
    '[style.font-size]': 'fontSize()',
    '[style.line-height]': 'lineHeight()',
    '[style.font-weight]': 'fontWeight()',
    '[style.color]': 'colorValue()',
    '[style.text-align]': 'align() ?? null',
  },
})
export class EcwTextComponent {
  /** Font size, from the tokenized type scale (12 | 14 | 16). */
  readonly size = input<EcwTextSize>(14);

  /** Font weight token (regular | medium | semi-bold | bold). */
  readonly weight = input<EcwTextWeight>('regular');

  /** Text color — one of the curated roles (`default | muted | brand | error`). Omitted when unset. */
  readonly color = input<EcwTextColor>();

  /** Horizontal text alignment. Omitted when unset. */
  readonly align = input<'left' | 'center' | 'right'>();

  /** Clip to a single line with a trailing ellipsis. */
  readonly truncate = input(false, { transform: booleanAttribute });

  /** Resolved `font-size` token for the current size. */
  readonly fontSize = computed(
    () => `var(--ecw-typography-font-size-${this.size()})`,
  );

  /** Resolved `line-height` token (12 → 16px, 14 / 16 → 20px). */
  readonly lineHeight = computed(() =>
    this.size() === 12
      ? 'var(--ecw-typography-line-height-16)'
      : 'var(--ecw-typography-line-height-20)',
  );

  /** Resolved `font-weight` token for the current weight. */
  readonly fontWeight = computed(
    () => `var(--ecw-typography-font-weight-${this.weight()})`,
  );

  /** Resolved text color token, or `null` when `color` is unset. */
  readonly colorValue = computed<string | null>(() => {
    const color = this.color();
    return color != null ? TEXT_COLOR_TOKEN[color] : null;
  });
}
