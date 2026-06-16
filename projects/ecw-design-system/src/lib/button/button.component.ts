import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  booleanAttribute,
  effect,
  input,
} from '@angular/core';
import { EcwIconComponent } from '../icon/icon.component';

declare const ngDevMode: boolean | undefined;

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
 *   a hairline divider. It advertises a popup (`aria-haspopup="menu"`) and
 *   reflects open state via `aria-expanded` (bind `splitExpanded`); the actual
 *   menu and its keyboard handling are owned by the consumer via `(splitClick)`.
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

  /** Icon-only square button. Requires `ariaLabel`. */
  readonly iconOnly = input(false, { transform: booleanAttribute });

  /** Accessible label, used when `iconOnly` (no visible text). */
  readonly ariaLabel = input<string>();

  /** Optional counter-pill value. */
  readonly counter = input<number | string>();

  /** Show the alert-indicator dot. */
  readonly alert = input(false, { transform: booleanAttribute });

  /**
   * Accessible text for the alert indicator. The dot itself is decorative
   * (`aria-hidden`); this is folded into the button's accessible name so the
   * alert state is announced. Set to `''` to suppress the announcement.
   */
  readonly alertLabel = input<string>('New notifications');

  /** Render the split ("divider") action segment. */
  readonly split = input(false, { transform: booleanAttribute });

  /** Icon for the split action (default: a dropdown caret). */
  readonly splitIcon = input<string>('arrow_drop_down');

  /** Accessible label for the split action. */
  readonly splitAriaLabel = input<string>('More actions');

  /**
   * Whether the split action's popup (menu) is currently open. Drives
   * `aria-expanded` on the split segment. The split button advertises a popup
   * via `aria-haspopup="menu"`; the consumer owns the actual menu and toggles
   * this input from their `(splitClick)` handler.
   */
  readonly splitExpanded = input(false, { transform: booleanAttribute });

  /** Emitted on the main action click. */
  @Output() readonly ecwClick = new EventEmitter<MouseEvent>();

  /** Emitted on the split action click. */
  @Output() readonly splitClick = new EventEmitter<MouseEvent>();

  constructor() {
    // Dev-only guard: an icon-only button has no visible text, so it MUST
    // carry an accessible name or it ships as an unlabeled "button".
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      effect(() => {
        if (this.iconOnly() && !this.ariaLabel()) {
          console.warn(
            '[ecw-button] `iconOnly` is set without `ariaLabel` — the button ' +
              'has no accessible name. Provide `ariaLabel` for screen readers.',
          );
        }
      });
    }
  }
}
