/**
 * Public scale types — the limited, on-system option sets that the element
 * primitives accept. Consumers can only pick values that exist in the token
 * scale, keeping usage constrained to the design system.
 */

/** Spacing-scale steps → `var(--ecw-space-{n})`. */
export type EcwSpaceScale = 2 | 4 | 8 | 12 | 16;

/** Border-radius steps → `var(--ecw-radius-{n})`. */
export type EcwRadiusScale = 2 | 4 | 8 | 999;
