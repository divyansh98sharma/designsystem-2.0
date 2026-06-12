import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  booleanAttribute,
  input,
} from '@angular/core';
import { EcwIconComponent } from '../icon/icon.component';

export type EcwButtonVariant =
  | 'primary'
  | 'secondary'
  | 'white'
  | 'error'
  | 'warning';

/**
 * `<ecw-button>` — the design-system button (Jira PE-256839).
 *
 * Token-driven from the Figma `button` component tokens
 * (`--ecw-button-*`). Anatomy: a main action button plus optional
 * leading/trailing icons, a counter pill, an alert-indicator dot, and an
 * optional split ("divider") action segment.
 *
 * Variants: primary | secondary | white | error | warning. Disabled uses the
 * dedicated disabled tokens. The element wraps native `<button>` element(s) so
 * keyboard, focus and `disabled` behaviour are native.
 *
 * Documented assumptions (Figma render not directly inspected — see PR):
 * - Single size (24px tall) — only `size/small` is tokenized.
 * - Icons are 16px and sit before/after the label; `iconOnly` renders a square
 *   icon button (requires `ariaLabel`).
 * - The split/divider action is modelled as a second native button separated by
 *   a hairline divider; its dropdown/menu behaviour is left to the consumer via
 *   `(splitClick)`.
 * - Focus-visible ring is an accessibility addition (no focus token in Figma).
 */
@Component({
  selector: 'ecw-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EcwIconComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  host: {
    '[class]': "'ecw-button ecw-button--' + variant()",
    '[class.ecw-button--split]': 'split()',
    '[class.ecw-button--icon-only]': 'iconOnly()',
    '[class.ecw-button--disabled]': 'disabled()',
  },
})
export class EcwButtonComponent {
  /** Visual variant. */
  readonly variant = input<EcwButtonVariant>('primary');

  /** Native button `type`. */
  readonly type = input<'button' | 'submit' | 'reset'>('button');

  /** Disables the button (and the split action). */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** Leading icon (Material Symbols name or registered custom name). */
  readonly leadingIcon = input<string>();

  /** Trailing icon (Material Symbols name or registered custom name). */
  readonly trailingIcon = input<string>();

  /** Whether icons render filled (Material Symbols FILL axis). */
  readonly iconFilled = input(false, { transform: booleanAttribute });

  /** Icon-only square button. Requires `ariaLabel`. */
  readonly iconOnly = input(false, { transform: booleanAttribute });

  /** Accessible label, used when `iconOnly` (no visible text). */
  readonly ariaLabel = input<string>();

  /** Optional counter-pill value. */
  readonly counter = input<number | string>();

  /** Show the alert-indicator dot. */
  readonly alert = input(false, { transform: booleanAttribute });

  /** Render the split ("divider") action segment. */
  readonly split = input(false, { transform: booleanAttribute });

  /** Icon for the split action (default: a dropdown caret). */
  readonly splitIcon = input<string>('arrow_drop_down');

  /** Accessible label for the split action. */
  readonly splitAriaLabel = input<string>('More actions');

  /** Emitted on the main action click. */
  @Output() readonly ecwClick = new EventEmitter<MouseEvent>();

  /** Emitted on the split action click. */
  @Output() readonly splitClick = new EventEmitter<MouseEvent>();
}
