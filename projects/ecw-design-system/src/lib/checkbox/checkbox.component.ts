import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  input,
  model,
} from '@angular/core';

let nextId = 0;

/**
 * `<ecw-checkbox>` — the design-system checkbox (Jira PE-256841).
 *
 * Token-driven from the Figma `checkbox` component tokens
 * (`--ecw-checkbox-*`). Anatomy: a visually-hidden native
 * `<input type="checkbox">` (so keyboard, focus and form participation are
 * native) plus a styled 16×16 control that shows a checkmark (checked) or a
 * dash (indeterminate), and an optional projected label.
 *
 * States: unchecked | checked | indeterminate, each with default / hover /
 * disabled treatments driven entirely by CSS reacting to the native input
 * (`:checked`, `:indeterminate`, `:disabled`) — no state classes in JS.
 *
 * Two-way bind the checked state with `[(checked)]` (the `model()` exposes a
 * `checkedChange` output). `indeterminate` is a separate visual state (mutually
 * exclusive with the checkmark) and maps to the native `indeterminate` DOM
 * property.
 */
@Component({
  selector: 'ecw-checkbox',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class EcwCheckboxComponent {
  /** Checked state. Two-way bindable: `[(checked)]`. */
  readonly checked = model(false);

  /**
   * Indeterminate ("mixed") state. Visually shows a dash instead of a check and
   * maps to the native `indeterminate` DOM property so assistive tech announces
   * `mixed`. Independent of `checked`.
   */
  readonly indeterminate = input(false, { transform: booleanAttribute });

  /** Disables the control (removes it from the tab order, native). */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** Native input `name` (for form submission / grouping). */
  readonly name = input<string>();

  /** Native input `value` (submitted when checked). */
  readonly value = input<string>();

  /** Marks the control as required for native form validation. */
  readonly required = input(false, { transform: booleanAttribute });

  /**
   * Accessible label when no visible (projected) label is provided. If you
   * project text into the component you do not need this.
   */
  readonly ariaLabel = input<string>();

  /** Stable id linking the native input and the projected label. */
  readonly inputId = input<string>(`ecw-checkbox-${nextId++}`);

  /**
   * Mirror the native change into the `checked` model. Setting the model also
   * fires its auto-generated `checkedChange` output, so `[(checked)]` and
   * `(checkedChange)` both work.
   */
  protected onChange(event: Event): void {
    this.checked.set((event.target as HTMLInputElement).checked);
  }
}
