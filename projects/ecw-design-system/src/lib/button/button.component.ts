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
  template: `
    <button
      class="ecw-button__main"
      [type]="type()"
      [disabled]="disabled()"
      [attr.aria-label]="iconOnly() ? ariaLabel() : null"
      (click)="ecwClick.emit($event)"
    >
      @if (leadingIcon(); as li) {
        <ecw-icon [name]="li" [size]="16" [filled]="iconFilled()" />
      }
      @if (!iconOnly()) {
        <span class="ecw-button__label"><ng-content /></span>
      }
      @if (counter() !== undefined && counter() !== null) {
        <span class="ecw-button__counter">{{ counter() }}</span>
      }
      @if (trailingIcon(); as ti) {
        <ecw-icon [name]="ti" [size]="16" [filled]="iconFilled()" />
      }
    </button>

    @if (split()) {
      <button
        class="ecw-button__split"
        type="button"
        [disabled]="disabled()"
        [attr.aria-label]="splitAriaLabel()"
        (click)="splitClick.emit($event)"
      >
        <ecw-icon [name]="splitIcon()" [size]="16" />
      </button>
    }

    @if (alert()) {
      <span class="ecw-button__alert" aria-hidden="true"></span>
    }
  `,
  host: {
    '[class]': "'ecw-button ecw-button--' + variant()",
    '[class.ecw-button--split]': 'split()',
    '[class.ecw-button--icon-only]': 'iconOnly()',
    '[class.ecw-button--disabled]': 'disabled()',
  },
  styles: [
    `
      :host {
        position: relative;
        display: inline-flex;
        align-items: stretch;
        vertical-align: middle;
      }

      /* Per-variant aliases → the buttons consume generic --_* names. */
      :host(.ecw-button--primary) {
        --_bg: var(--ecw-button-container-background-primary-default);
        --_bg-hover: var(--ecw-button-container-background-primary-hover);
        --_bd: var(--ecw-button-container-border-primary-default);
        --_bd-hover: var(--ecw-button-container-border-primary-hover);
        --_fg: var(--ecw-button-label-text-primary-default);
      }
      :host(.ecw-button--secondary) {
        --_bg: var(--ecw-button-container-background-secondary-default);
        --_bg-hover: var(--ecw-button-container-background-secondary-hover);
        --_bd: var(--ecw-button-container-border-secondary-default);
        --_bd-hover: var(--ecw-button-container-border-secondary-hover);
        --_fg: var(--ecw-button-label-text-secondary-default);
      }
      :host(.ecw-button--white) {
        --_bg: var(--ecw-button-container-background-white-default);
        --_bg-hover: var(--ecw-button-container-background-white-hover);
        --_bd: var(--ecw-button-container-border-white-default);
        --_bd-hover: var(--ecw-button-container-border-white-hover);
        --_fg: var(--ecw-button-label-text-white-default);
      }
      :host(.ecw-button--error) {
        --_bg: var(--ecw-button-container-background-error-default);
        --_bg-hover: var(--ecw-button-container-background-error-hover);
        --_bd: var(--ecw-button-container-border-error-default);
        --_bd-hover: var(--ecw-button-container-border-error-hover);
        --_fg: var(--ecw-button-label-text-error-default);
      }
      :host(.ecw-button--warning) {
        --_bg: var(--ecw-button-container-background-warning-default);
        --_bg-hover: var(--ecw-button-container-background-warning-hover);
        --_bd: var(--ecw-button-container-border-warning-default);
        --_bd-hover: var(--ecw-button-container-border-warning-hover);
        --_fg: var(--ecw-button-label-text-warning-default);
      }

      .ecw-button__main,
      .ecw-button__split {
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--ecw-button-container-gap);
        min-height: var(--ecw-button-container-min-height);
        padding: var(--ecw-button-container-padding-y) var(--ecw-button-container-padding-x);
        border: var(--ecw-button-container-stroke-width) solid var(--_bd);
        background: var(--_bg);
        color: var(--_fg);
        font-family: var(--ecw-button-label-font-family);
        font-size: var(--ecw-button-label-font-size);
        font-weight: var(--ecw-button-label-font-weight);
        line-height: var(--ecw-button-label-line-height);
        letter-spacing: var(--ecw-button-label-letter-spacing);
        cursor: pointer;
        transition: background-color 120ms ease, border-color 120ms ease;
      }

      .ecw-button__main {
        border-radius: var(--ecw-button-container-radius);
        flex: 1 1 auto;
      }
      :host(.ecw-button--icon-only) .ecw-button__main {
        min-width: var(--ecw-button-container-min-width);
        padding-left: var(--ecw-button-container-padding-x);
        padding-right: var(--ecw-button-container-padding-x);
      }

      /* Split: main loses right radius, split loses left radius + shares divider */
      :host(.ecw-button--split) .ecw-button__main {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      .ecw-button__split {
        border-radius: var(--ecw-button-divider-container-radius);
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-left-width: 0;
        background: var(--_bg);
        border-color: var(--_bd);
        min-width: var(--ecw-button-container-min-height);
      }

      .ecw-button__main:hover:not(:disabled),
      .ecw-button__split:hover:not(:disabled) {
        background: var(--_bg-hover);
        border-color: var(--_bd-hover);
      }
      .ecw-button__main:active:not(:disabled),
      .ecw-button__split:active:not(:disabled) {
        background: var(--_bg-hover);
      }

      /* Accessibility addition: focus-visible ring (no focus token in Figma). */
      .ecw-button__main:focus-visible,
      .ecw-button__split:focus-visible {
        outline: 2px solid var(--ecw-color-teal-700);
        outline-offset: 1px;
        position: relative;
        z-index: 1;
      }

      .ecw-button__main:disabled,
      .ecw-button__split:disabled {
        background: var(--ecw-button-container-background-disabled-default);
        border-color: var(--ecw-button-container-border-disabled-default);
        color: var(--ecw-button-label-text-disabled-default);
        cursor: not-allowed;
      }

      .ecw-button__label {
        white-space: nowrap;
      }

      /* Counter pill */
      .ecw-button__counter {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 16px;
        padding: 0 var(--ecw-button-counter-container-padding-x);
        border-radius: var(--ecw-button-counter-container-radius);
        border: var(--ecw-button-counter-container-stroke-width) solid
          var(--ecw-button-counter-container-border-default);
        background: var(--ecw-button-counter-container-background-default);
        color: var(--ecw-button-counter-label-text-default);
        font-family: var(--ecw-button-counter-label-font-family);
        font-size: var(--ecw-button-counter-label-font-size);
        font-weight: var(--ecw-button-counter-label-font-weight);
        line-height: var(--ecw-button-counter-label-line-height);
      }

      /* Alert indicator dot */
      .ecw-button__alert {
        position: absolute;
        top: -3px;
        right: -3px;
        width: 8px;
        height: 8px;
        border-radius: var(--ecw-button-alert-indicator-container-radius);
        background: var(--ecw-button-alert-indicator-container-background-default);
        pointer-events: none;
      }
    `,
  ],
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
