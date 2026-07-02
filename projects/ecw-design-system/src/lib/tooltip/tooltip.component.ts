import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * The 12 tip (notch) positions from the Figma `tooltip` component. The prefix
 * is the edge the trigger sits on relative to the bubble (i.e. the direction the
 * notch points), and the suffix is the notch's alignment along that edge:
 *
 *   - `top-*`    — notch on the **bottom** edge, pointing down (bubble above the trigger)
 *   - `bottom-*` — notch on the **top** edge, pointing up (bubble below the trigger)
 *   - `left-*`   — notch on the **right** edge, pointing right (bubble left of the trigger)
 *   - `right-*`  — notch on the **left** edge, pointing left (bubble right of the trigger)
 */
export type EcwTooltipPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'left-top'
  | 'left-center'
  | 'left-bottom'
  | 'right-top'
  | 'right-center'
  | 'right-bottom';

/**
 * `<ecw-tooltip>` — the design-system tooltip bubble (Jira PE-256840).
 *
 * A presentational popup bubble with a directional notch, token-driven from the
 * Figma `tooltip` component. It renders the bubble only; positioning it next to
 * a trigger and toggling visibility on hover/focus is the consumer's concern
 * (this mirrors how the other design-system components stay purely visual).
 *
 * The text is projected via content. Pick where the notch sits with `position`
 * (12 values — see {@link EcwTooltipPosition}). Dark mode is opt-in: set
 * `data-theme="dark"` on any ancestor and the surface flips from the dark slate
 * bubble with white text to a white bubble with black text (Figma "Dark?=Yes").
 *
 * The host carries `role="tooltip"`; give it an `id` and reference it from the
 * trigger with `aria-describedby` for an accessible association.
 */
@Component({
  selector: 'ecw-tooltip',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
  host: {
    role: 'tooltip',
    '[attr.data-position]': 'position()',
  },
})
export class EcwTooltipComponent {
  /** Where the notch sits (and thus which way the bubble points). */
  readonly position = input<EcwTooltipPosition>('top-left');
}
