import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
} from '@angular/core';
import { EcwSpaceScale } from '../scale';

/** Cross-axis alignment options → `align-items`. */
export type EcwStackAlign = 'start' | 'center' | 'end' | 'stretch';

/** Main-axis distribution options → `justify-content`. */
export type EcwStackJustify = 'start' | 'center' | 'end' | 'between';

const ALIGN_VALUE: Record<EcwStackAlign, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
};

const JUSTIFY_VALUE: Record<EcwStackJustify, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
};

/**
 * `<ecw-stack>` — a flexbox layout primitive.
 *
 * Arranges its projected children in a row or column with a token-driven gap.
 * Thin wrapper over CSS flexbox: every visual property maps to a single
 * inline style on the host, so the component carries no template chrome beyond
 * `<ng-content />`.
 *
 * Gap is restricted to the spacing scale (`--ecw-space-*`: 2, 4, 8, 12, 16) so
 * spacing stays token-driven; `align`/`justify` are pass-through strings mapped
 * to `align-items`/`justify-content` and are omitted when unset.
 */
@Component({
  selector: 'ecw-stack',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './stack.component.html',
  styleUrl: './stack.component.scss',
  host: {
    class: 'ecw-stack',
    '[style.display]': "inline() ? 'inline-flex' : 'flex'",
    '[style.flex-direction]': 'direction()',
    '[style.gap]': 'gapValue()',
    '[style.align-items]': 'alignValue()',
    '[style.justify-content]': 'justifyValue()',
    '[style.flex-wrap]': "wrap() ? 'wrap' : null",
  },
})
export class EcwStackComponent {
  /** Main axis: stack children in a `row` or `column`. */
  readonly direction = input<'row' | 'column'>('column');

  /**
   * Gap between children, in spacing-scale steps → `gap: var(--ecw-space-{n})`.
   * Omitted when unset.
   */
  readonly gap = input<EcwSpaceScale>();

  /** Cross-axis alignment (`start | center | end | stretch`). Omitted when unset. */
  readonly align = input<EcwStackAlign>();

  /** Main-axis distribution (`start | center | end | between`). Omitted when unset. */
  readonly justify = input<EcwStackJustify>();

  /** When true, wraps children onto new lines (`flex-wrap: wrap`). */
  readonly wrap = input(false, { transform: booleanAttribute });

  /** When true, renders `inline-flex`; otherwise `flex`. */
  readonly inline = input(false, { transform: booleanAttribute });

  /** Resolved `gap` value — a spacing token, or `null` when `gap` is unset. */
  readonly gapValue = computed(() => {
    const gap = this.gap();
    return gap != null ? `var(--ecw-space-${gap})` : null;
  });

  /** Resolved `align-items` value, or `null` when `align` is unset. */
  readonly alignValue = computed<string | null>(() => {
    const align = this.align();
    return align != null ? ALIGN_VALUE[align] : null;
  });

  /** Resolved `justify-content` value, or `null` when `justify` is unset. */
  readonly justifyValue = computed<string | null>(() => {
    const justify = this.justify();
    return justify != null ? JUSTIFY_VALUE[justify] : null;
  });
}
