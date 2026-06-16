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

/* Icon system (PE-315893) */
export { EcwIconComponent } from './lib/icon/icon.component';
export { EcwIconRegistry } from './lib/icon/icon-registry';
export type { EcwIconSource } from './lib/icon/icon-registry';
export { EcwIconLoader } from './lib/icon/icon-loader';

/* Button (PE-256839) */
export { EcwButtonComponent } from './lib/button/button.component';
export type { EcwButtonVariant } from './lib/button/button.component';
