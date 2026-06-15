/*
 * Public API Surface of @ecw/design-system
 *
 * Production components are added here one Jira at a time. The PUBLIC design
 * tokens (foundations/foundations.css) and base element styles
 * (foundations/elements/base.css) are consumed via CSS imports, not through
 * this TypeScript entry point. The semantic/component token layers are
 * internal and intentionally not exported.
 */

export { DESIGN_SYSTEM_VERSION } from './lib/version';

/* Element primitives — public building blocks (limited, on-system options) */
export type { EcwSpaceScale, EcwRadiusScale } from './lib/scale';
export { EcwBoxComponent } from './lib/box/box.component';
export type { EcwBoxDisplay, EcwBoxSurface } from './lib/box/box.component';
export { EcwStackComponent } from './lib/stack/stack.component';
export type {
  EcwStackAlign,
  EcwStackJustify,
} from './lib/stack/stack.component';
export { EcwTextComponent } from './lib/text/text.component';
export type {
  EcwTextSize,
  EcwTextWeight,
  EcwTextColor,
} from './lib/text/text.component';

/* Icon system (PE-315893) */
export { EcwIconComponent } from './lib/icon/icon.component';
export { EcwIconRegistry } from './lib/icon/icon-registry';
export type { EcwIconSource } from './lib/icon/icon-registry';
export { EcwIconLoader } from './lib/icon/icon-loader';

/* Button (PE-256839) */
export { EcwButtonComponent } from './lib/button/button.component';
export type { EcwButtonVariant } from './lib/button/button.component';
