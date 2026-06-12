import { Component } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';

// ---------------------------------------------------------------------------
// DOC-ONLY component — defined inline in this story file. NOT exported from
// public-api.ts and NOT part of the library's production API.
//
// GAP-DOCUMENTATION PAGE (Jira PE-315882):
// There are currently NO shadow/elevation design tokens in the Figma source.
// The exported local variables contain no --ecw-shadow-* entries. The ramp
// shown below is a CONCEPTUAL PROPOSAL only — box-shadow values are hard-coded
// literals for illustration and are intentionally NOT declared as --ecw-*
// custom properties anywhere.
// ---------------------------------------------------------------------------

interface ShadowStep {
  label: string;
  proposedName: string;
  boxShadow: string;
  use: string;
}

@Component({
  selector: 'ecw-shadows-foundation',
  standalone: true,
  template: `
    <div class="sh-root">
      <div class="sh-callout">
        <span class="sh-callout__icon">⚠</span>
        <div class="sh-callout__body">
          <strong class="sh-callout__title">Not yet tokenized</strong>
          <p class="sh-callout__text">
            There are currently <strong>no shadow / elevation tokens</strong> in the
            <code>&#64;ecw/design-system</code> Figma source. The values on this page are a
            <strong>conceptual proposal</strong> pending design-team confirmation — they are
            <strong>not implemented</strong> and must not be used in production.
          </p>
          <p class="sh-callout__rec">
            <strong>Recommendation:</strong> raise a dedicated Jira (child of PE-315882) to
            define and tokenize an elevation/shadow scale in Figma, designed together with the
            z-index <em>Layering</em> scale so elevation and stacking order stay consistent.
          </p>
        </div>
      </div>

      <header class="sh-header">
        <h1 class="sh-title">Shadows &amp; Elevation</h1>
        <p class="sh-subtitle">
          Shadows communicate elevation — how far a surface sits above the page. A small,
          purposeful set of elevation steps keeps depth consistent and avoids ad-hoc shadows.
        </p>
      </header>

      <section class="sh-section">
        <h2 class="sh-section-title">
          Conceptual elevation ramp
          <span class="sh-badge">PROPOSAL — not implemented</span>
        </h2>
        <p class="sh-section-desc">
          A possible five-step elevation ramp. Each card uses the proposed
          <code>--ecw-shadow-&lt;step&gt;</code> name following the existing primitive naming
          convention.
        </p>
        <div class="sh-grid">
          @for (s of steps; track s.proposedName) {
            <div class="sh-cell">
              <div class="sh-card" [style.box-shadow]="s.boxShadow"></div>
              <div class="sh-meta">
                <span class="sh-label">{{ s.label }}</span>
                <code class="sh-token">{{ s.proposedName }}</code>
                <span class="sh-proposed">proposed — not implemented</span>
                <span class="sh-use">{{ s.use }}</span>
              </div>
            </div>
          }
        </div>
      </section>

      <section class="sh-section">
        <h2 class="sh-section-title">Relationship to other foundations</h2>
        <ul class="sh-list">
          <li><strong>Layering (z-index):</strong> shadow conveys elevation visually while
            z-index controls stacking order. Both are untokenized today — design them together.</li>
          <li><strong>Radius:</strong> elevated surfaces (cards, popovers, modals) typically pair
            a shadow step with a radius token (<code>--ecw-radius-medium</code> / <code>-large</code>).</li>
        </ul>
      </section>
    </div>
  `,
  styles: [`
    .sh-root { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 900px; margin: 0 auto; padding: 2rem; color: #1a1a2e; }
    .sh-callout { display: flex; gap: 1rem; border-radius: 8px; padding: 1.25rem 1.5rem; margin-bottom: 2rem; background: #fff8e1; border: 2px solid #f59e0b; }
    .sh-callout__icon { font-size: 1.5rem; line-height: 1; flex-shrink: 0; }
    .sh-callout__body { display: flex; flex-direction: column; gap: 0.5rem; }
    .sh-callout__title { font-size: 1rem; color: #92400e; }
    .sh-callout__text { font-size: 0.9rem; color: #78350f; line-height: 1.6; margin: 0; }
    .sh-callout__rec { font-size: 0.875rem; color: #78350f; background: #fef3c7; border-left: 3px solid #f59e0b; padding: 0.6rem 0.8rem; border-radius: 0 4px 4px 0; margin: 0; line-height: 1.6; }
    .sh-header { margin-bottom: 2rem; }
    .sh-title { font-size: 1.75rem; font-weight: 700; margin: 0 0 0.5rem; }
    .sh-subtitle { font-size: 1rem; color: #4a4a6a; line-height: 1.6; margin: 0; }
    .sh-section { margin-bottom: 2.5rem; }
    .sh-section-title { font-size: 1.1rem; font-weight: 700; margin: 0 0 0.75rem; display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
    .sh-section-desc { font-size: 0.9rem; color: #4a4a6a; line-height: 1.6; margin: 0 0 1.5rem; }
    .sh-badge { font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; background: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; padding: 0.2rem 0.5rem; border-radius: 4px; white-space: nowrap; }
    .sh-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 2rem 1.5rem; background: #f7f7f9; padding: 2rem; border-radius: 8px; }
    .sh-cell { display: flex; flex-direction: column; gap: 0.75rem; }
    .sh-card { width: 100%; aspect-ratio: 3 / 2; background: #fff; border-radius: 8px; }
    .sh-meta { display: flex; flex-direction: column; gap: 0.2rem; }
    .sh-label { font-size: 0.85rem; font-weight: 600; }
    .sh-token { font-family: 'SFMono-Regular', Consolas, Menlo, monospace; font-size: 0.72rem; background: #eeeef8; padding: 0.15rem 0.4rem; border-radius: 4px; color: #2a2a5a; word-break: break-all; }
    .sh-proposed { font-size: 0.65rem; font-style: italic; color: #991b1b; }
    .sh-use { font-size: 0.75rem; color: #7a7a9a; }
    .sh-list { padding-left: 1.25rem; margin: 0; display: flex; flex-direction: column; gap: 0.6rem; }
    .sh-list li { font-size: 0.9rem; color: #3a3a5a; line-height: 1.6; }
    code { font-family: 'SFMono-Regular', Consolas, Menlo, monospace; font-size: 0.9em; background: #eeeef8; padding: 0.1em 0.3em; border-radius: 3px; }
  `],
})
export class ShadowsFoundationComponent {
  readonly steps: ShadowStep[] = [
    { label: 'None', proposedName: '--ecw-shadow-none', boxShadow: 'none', use: 'Flush surfaces' },
    { label: 'Small', proposedName: '--ecw-shadow-sm', boxShadow: '0 1px 2px rgba(16,24,40,0.06), 0 1px 3px rgba(16,24,40,0.10)', use: 'Cards, inputs' },
    { label: 'Medium', proposedName: '--ecw-shadow-md', boxShadow: '0 2px 4px rgba(16,24,40,0.06), 0 4px 8px rgba(16,24,40,0.10)', use: 'Dropdowns, popovers' },
    { label: 'Large', proposedName: '--ecw-shadow-lg', boxShadow: '0 4px 8px rgba(16,24,40,0.08), 0 12px 16px rgba(16,24,40,0.12)', use: 'Modals, drawers' },
    { label: 'X-Large', proposedName: '--ecw-shadow-xl', boxShadow: '0 8px 16px rgba(16,24,40,0.10), 0 20px 28px rgba(16,24,40,0.16)', use: 'Toasts, peak overlays' },
  ];
}

const meta: Meta<ShadowsFoundationComponent> = {
  title: 'Foundations/Shadows',
  component: ShadowsFoundationComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '**GAP-DOCUMENTATION PAGE — Jira PE-315882.**\n\n' +
          'There are currently **no shadow / elevation tokens** in the `@ecw/design-system` ' +
          'Figma source. This page documents the gap, gives guidance, and presents a **conceptual ' +
          'proposal**. All proposed names (e.g. `--ecw-shadow-md`) are illustrative only — **not ' +
          'implemented**. **Next step:** raise a dedicated Jira to define the elevation scale, ' +
          'designed together with the z-index Layering scale.',
      },
    },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<ShadowsFoundationComponent>;

export const Overview: Story = {};
