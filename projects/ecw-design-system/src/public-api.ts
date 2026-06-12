/*
 * Public API Surface of @ecw/design-system
 *
 * Production components are added here one Jira at a time. The design-token
 * CSS layers (foundations/tokens/tokens.css) are consumed via CSS imports,
 * not through this TypeScript entry point.
 */

export { DESIGN_SYSTEM_VERSION } from './lib/version';

/* Icon system (PE-315893) */
export { EcwIconComponent } from './lib/icon/icon.component';
export { EcwIconRegistry } from './lib/icon/icon-registry';
