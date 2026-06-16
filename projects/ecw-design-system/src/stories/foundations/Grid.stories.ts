import { Component } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';

// ---------------------------------------------------------------------------
// DOC-ONLY component — defined inline in this story file. NOT exported from
// public-api.ts and NOT part of the library's production API.
//
// GAP-DOCUMENTATION PAGE (Jira PE-315882):
// There are currently NO grid / layout tokens (columns, gutters, breakpoints,
// container widths) in the Figma source. The grid and breakpoints shown below
// are a CONCEPTUAL PROPOSAL only — values are hard-coded literals and are
// intentionally NOT declared as --ecw-* custom properties anywhere.
// ---------------------------------------------------------------------------

interface Breakpoint {
  label: string;
  proposedName: string;
  min: string;
}

@Component({
  selector: 'ecw-grid-foundation',
  standalone: true,
  template: `
    <div class="gr-root">
      <div class="gr-callout">
        <span class="gr-callout__icon">⚠</span>
        <div class="gr-callout__body">
          <strong class="gr-callout__title">Not yet tokenized</strong>
          <p class="gr-callout__text">
            There are currently <strong>no grid / layout tokens</strong> (columns, gutters,
            breakpoints, container widths) in the <code>&#64;ecw/design-system</code> Figma source.
            The grid below is a <strong>conceptual proposal</strong> pending design-team confirmation —
            <strong>not implemented</strong> and not for production use.
          </p>
          <p class="gr-callout__rec">
            <strong>Recommendation:</strong> raise a dedicated Jira (child of PE-315882) to define and
            tokenize a responsive grid and breakpoint system in Figma. Gutter values should be derived
            from the existing spacing scale (which <em>is</em> tokenized).
          </p>
        </div>
      </div>

      <header class="gr-header">
        <h1 class="gr-title">Grid &amp; Layout</h1>
        <p class="gr-subtitle">
          A shared column grid and breakpoint scale keep page layouts consistent and responsive
          across the application.
        </p>
      </header>

      <section class="gr-section">
        <h2 class="gr-section-title">
          Conceptual 12-column grid
          <span class="gr-badge">PROPOSAL — not implemented</span>
        </h2>
        <p class="gr-section-desc">
          A 12-column grid with a gutter aligned to the spacing scale (proposed
          <code>--ecw-grid-columns: 12</code>, <code>--ecw-grid-gutter</code> ≈ <code>--ecw-space-16</code>).
        </p>
        <div class="gr-grid">
          @for (c of columns; track c) {
            <div class="gr-col"><span>{{ c }}</span></div>
          }
        </div>
      </section>

      <section class="gr-section">
        <h2 class="gr-section-title">
          Conceptual breakpoints
          <span class="gr-badge">PROPOSAL — not implemented</span>
        </h2>
        <table class="gr-table">
          <thead>
            <tr><th>Name</th><th>Proposed token</th><th>Min width</th></tr>
          </thead>
          <tbody>
            @for (b of breakpoints; track b.proposedName) {
              <tr>
                <td>{{ b.label }}</td>
                <td><code>{{ b.proposedName }}</code> <span class="gr-proposed">proposed</span></td>
                <td>{{ b.min }}</td>
              </tr>
            }
          </tbody>
        </table>
      </section>

      <section class="gr-section">
        <h2 class="gr-section-title">Relationship to other foundations</h2>
        <ul class="gr-list">
          <li><strong>Spacing:</strong> gutters and margins should reference the tokenized spacing
            scale (<code>--ecw-space-*</code>) rather than introduce new raw values.</li>
        </ul>
      </section>
    </div>
  `,
  styles: [`
    .gr-root { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 900px; margin: 0 auto; padding: 2rem; color: #1a1a2e; }
    .gr-callout { display: flex; gap: 1rem; border-radius: 8px; padding: 1.25rem 1.5rem; margin-bottom: 2rem; background: #fff8e1; border: 2px solid #f59e0b; }
    .gr-callout__icon { font-size: 1.5rem; line-height: 1; flex-shrink: 0; }
    .gr-callout__body { display: flex; flex-direction: column; gap: 0.5rem; }
    .gr-callout__title { font-size: 1rem; color: #92400e; }
    .gr-callout__text { font-size: 0.9rem; color: #78350f; line-height: 1.6; margin: 0; }
    .gr-callout__rec { font-size: 0.875rem; color: #78350f; background: #fef3c7; border-left: 3px solid #f59e0b; padding: 0.6rem 0.8rem; border-radius: 0 4px 4px 0; margin: 0; line-height: 1.6; }
    .gr-header { margin-bottom: 2rem; }
    .gr-title { font-size: 1.75rem; font-weight: 700; margin: 0 0 0.5rem; }
    .gr-subtitle { font-size: 1rem; color: #4a4a6a; line-height: 1.6; margin: 0; }
    .gr-section { margin-bottom: 2.5rem; }
    .gr-section-title { font-size: 1.1rem; font-weight: 700; margin: 0 0 0.75rem; display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
    .gr-section-desc { font-size: 0.9rem; color: #4a4a6a; line-height: 1.6; margin: 0 0 1.25rem; }
    .gr-badge { font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; background: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; padding: 0.2rem 0.5rem; border-radius: 4px; white-space: nowrap; }
    .gr-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 16px; background: #f7f7f9; padding: 1rem; border-radius: 8px; }
    .gr-col { background: #d7e5e3; border: 1px solid #53cbbd; border-radius: 4px; min-height: 56px; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; color: #02506f; font-weight: 600; }
    .gr-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
    .gr-table th, .gr-table td { text-align: left; padding: 0.5rem 0.75rem; border-bottom: 1px solid #ebebeb; }
    .gr-table th { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.04em; color: #717171; }
    .gr-proposed { font-size: 0.62rem; font-style: italic; color: #991b1b; }
    .gr-list { padding-left: 1.25rem; margin: 0; display: flex; flex-direction: column; gap: 0.6rem; }
    .gr-list li { font-size: 0.9rem; color: #3a3a5a; line-height: 1.6; }
    code { font-family: 'SFMono-Regular', Consolas, Menlo, monospace; font-size: 0.9em; background: #eeeef8; padding: 0.1em 0.3em; border-radius: 3px; }
  `],
})
export class GridFoundationComponent {
  readonly columns = Array.from({ length: 12 }, (_, i) => i + 1);
  readonly breakpoints: Breakpoint[] = [
    { label: 'Small', proposedName: '--ecw-breakpoint-sm', min: '640px' },
    { label: 'Medium', proposedName: '--ecw-breakpoint-md', min: '768px' },
    { label: 'Large', proposedName: '--ecw-breakpoint-lg', min: '1024px' },
    { label: 'X-Large', proposedName: '--ecw-breakpoint-xl', min: '1280px' },
  ];
}

const meta: Meta<GridFoundationComponent> = {
  title: 'Foundations/Grid',
  component: GridFoundationComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '**GAP-DOCUMENTATION PAGE — Jira PE-315882.**\n\n' +
          'There are currently **no grid / layout tokens** (columns, gutters, breakpoints, ' +
          'container widths) in the `@ecw/design-system` Figma source. This page documents the gap ' +
          'and presents a **conceptual proposal**. All proposed names (e.g. `--ecw-breakpoint-md`) ' +
          'are illustrative only — **not implemented**. **Next step:** raise a dedicated Jira to ' +
          'define the grid/breakpoint system, with gutters derived from the tokenized spacing scale.',
      },
    },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<GridFoundationComponent>;

export const Overview: Story = {};
