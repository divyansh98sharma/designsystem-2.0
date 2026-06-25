import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  input,
  model,
} from '@angular/core';

let nextId = 0;

/**
 * `<ecw-radio>` — the design-system radio button (Jira PE-256841).
 *
 * Token-driven from the Figma `radio button` component tokens
 * (`--ecw-radio-*`). Anatomy: a visually-hidden native `<input type="radio">`
 * (so keyboard arrow-key navigation, single-selection within a `name` group,
 * focus and form participation are all native) plus a styled 16×16 ring that
 * fills with a dot when selected, and an optional projected label.
 *
 * Group radios by giving them the same `name`; the browser then enforces
 * single-selection and roving focus for free. States (default / hover /
 * disabled) are driven entirely by CSS reacting to the native input.
 *
 * Two-way bind the selected state with `[(checked)]` (the `model()` exposes a
 * `checkedChange` output).
 */
@Component({
  selector: 'ecw-radio',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
})
export class EcwRadioComponent {
  /** Selected state. Two-way bindable: `[(checked)]`. */
  readonly checked = model(false);

  /** Disables the control (removes it from the tab order, native). */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** Native input `name` — radios sharing a name form a single-selection group. */
  readonly name = input<string>();

  /** Native input `value` (submitted when this radio is selected). */
  readonly value = input<string>();

  /** Marks the control as required for native form validation. */
  readonly required = input(false, { transform: booleanAttribute });

  /**
   * Accessible label when no visible (projected) label is provided. If you
   * project text into the component you do not need this.
   */
  readonly ariaLabel = input<string>();

  /** Stable id linking the native input and the projected label. */
  readonly inputId = input<string>(`ecw-radio-${nextId++}`);

  /**
   * Mirror the native change into the `checked` model. A native radio only ever
   * fires `change` when it becomes selected, so this sets `true`; the browser
   * unselects the previously-selected radio in the same group.
   */
  protected onChange(event: Event): void {
    this.checked.set((event.target as HTMLInputElement).checked);
  }
}
