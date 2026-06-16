import { Component } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';

// ---------------------------------------------------------------------------
// DOC-ONLY component — defined inline in this story file.
// It is NOT exported from public-api.ts and is NOT part of the library's
// production API. It exists solely to document the LAYERING (z-index / stacking
// order) foundation gap in Storybook and produce a Chromatic snapshot for
// the CI smoke test.
//
// GAP-DOCUMENTATION PAGE (Jira PE-315919):
// There are currently NO z-index / layering design tokens in the Figma source.
// The exported local variables contain no --ecw-z-index-* entries. The stacking
// scale shown below is a CONCEPTUAL PROPOSAL only — values are hard-coded
// literal integers for illustration purposes and are intentionally NOT declared
// as --ecw-* CSS custom properties anywhere in this file.
//
// Styles below are documentation chrome only — they are intentionally NOT
// product tokens. Do NOT copy these inline values into component stylesheets.
// ---------------------------------------------------------------------------

interface LayerStep {
  name: string;
  proposedName: string;
  zValue: number;
  description: string;
  examples: string;
}

@Component({
  selector: 'ecw-layering-foundation',
  standalone: true,
  template: `
    <div class="lyr-root">

      <!-- ── Gap callout ─────────────────────────────────────────────── -->
      <div class="lyr-callout lyr-callout--warn">
        <span class="lyr-callout__icon">⚠</span>
        <div class="lyr-callout__body">
          <strong class="lyr-callout__title">Not yet tokenized</strong>
          <p class="lyr-callout__text">
            There are currently <strong>no z-index / layering tokens</strong> in the
            <code>&#64;ecw/design-system</code> Figma source. The Figma local-variables
            export contains no stacking-order collection or primitives.
            The values shown on this page are a <strong>conceptual proposal</strong>
            pending design-team confirmation — they are <strong>not implemented</strong>
            and must not be used in production.
          </p>
          <p class="lyr-callout__recommendation">
            <strong>Recommendation:</strong> Create a dedicated Jira (child of PE-315919)
            to define and tokenize the z-index / layering scale in Figma as a system-wide
            foundation. Once approved, add the primitives to the Figma "Primitives"
            collection and export them as <code>--ecw-z-index-*</code> custom properties
            following the existing three-layer token architecture. This work should be
            coordinated with the Elevation / Shadows token work (PE-315882) since shadows
            and z-index communicate elevation together.
          </p>
        </div>
      </div>

      <!-- ── Header ──────────────────────────────────────────────────── -->
      <header class="lyr-header">
        <h1 class="lyr-title">Layering (Z-Index / Stacking Order)</h1>
        <p class="lyr-subtitle">
          A shared, named stacking-order scale ensures that overlapping UI elements
          always appear in the correct order — prevents ad-hoc <code>z-index</code>
          collisions and "arms races" where teams keep incrementing values to win
          the stacking contest.
        </p>
      </header>

      <!-- ── Guidance ────────────────────────────────────────────────── -->
      <section class="lyr-section">
        <h2 class="lyr-section-title">Usage guidance</h2>
        <ul class="lyr-guidance-list">
          <li>
            <strong>Always use named tokens:</strong> Components must never hard-code a
            raw integer <code>z-index</code> value. Consuming the token by name
            (e.g. <code>z-index: var(--ecw-z-index-modal)</code>) makes stacking
            intent explicit and lets the scale be adjusted in one place.
          </li>
          <li>
            <strong>Overlay layers must exceed sticky/dropdown:</strong> Modals, popovers,
            toasts, and tooltips must all sit above sticky headers and dropdown menus.
            The proposed scale leaves a gap of 100 between major layers so additional
            values can be inserted without breaking existing ordering.
          </li>
          <li>
            <strong>Negative z-index:</strong> Avoid negative stacking contexts unless
            intentionally creating a "behind the page" effect. If needed, define an
            explicit <code>--ecw-z-index-below</code> token rather than scattering
            <code>z-index: -1</code> across components.
          </li>
          <li>
            <strong>Stacking contexts:</strong> Applying <code>transform</code>,
            <code>opacity &lt; 1</code>, <code>filter</code>, or <code>will-change</code>
            creates a new stacking context and can trap child z-indexes. Document
            stacking-context creation in component-level comments.
          </li>
        </ul>
      </section>

      <!-- ── Relationship to elevation / shadows ─────────────────────── -->
      <section class="lyr-section">
        <h2 class="lyr-section-title">Relationship to elevation and shadows (PE-315882)</h2>
        <p class="lyr-section-desc">
          Z-index controls <em>stacking order</em> — which element is painted on top.
          Shadows convey <em>perceived elevation</em> — how far above the surface an
          element visually floats. These two dimensions are complementary:
        </p>
        <ul class="lyr-guidance-list">
          <li>
            A raised card uses a shadow (elevation token) but does <strong>not</strong>
            need a z-index unless it overlaps other interactive content.
          </li>
          <li>
            A dropdown uses a z-index (layering token) <strong>and</strong> a shadow
            (elevation token) together — z-index guarantees it paints above the trigger,
            shadow communicates that it is floating.
          </li>
          <li>
            The layering and elevation scales should be designed in the same Jira sprint
            so shadow depths are calibrated to each stacking tier.
          </li>
        </ul>
      </section>

      <!-- ── Conceptual scale ────────────────────────────────────────── -->
      <section class="lyr-section">
        <h2 class="lyr-section-title">
          Conceptual stacking-order scale
          <span class="lyr-proposal-badge">PROPOSAL — not implemented</span>
        </h2>
        <p class="lyr-section-desc">
          The diagram below illustrates how eight stacking tiers might be ordered.
          Panels are offset so overlapping is visible. Each tier is labelled with
          its proposed token name — these names are <strong>not implemented</strong>
          and are shown for discussion purposes only.
        </p>

        <!-- Stacked diagram -->
        <div class="lyr-diagram-wrap">
          <div class="lyr-diagram">
            @for (step of steps; track step.proposedName; let i = $index) {
              <div
                class="lyr-panel"
                [style.bottom.px]="i * 28"
                [style.left.px]="i * 28"
                [style.zIndex]="i + 1"
                [attr.data-tier]="i % 8"
              >
                <span class="lyr-panel-name">{{ step.name }}</span>
                <span class="lyr-panel-z">z = {{ step.zValue }}</span>
              </div>
            }
          </div>
        </div>

        <!-- Detail table -->
        <div class="lyr-table-wrap">
          <table class="lyr-table">
            <thead>
              <tr>
                <th>Tier</th>
                <th>Proposed token name</th>
                <th>Proposed value</th>
                <th>Description</th>
                <th>Example surfaces</th>
              </tr>
            </thead>
            <tbody>
              @for (step of steps; track step.proposedName) {
                <tr>
                  <td><strong>{{ step.name }}</strong></td>
                  <td>
                    <code class="lyr-token-name">{{ step.proposedName }}</code>
                    <span class="lyr-proposed-tag">proposed</span>
                  </td>
                  <td class="lyr-z-val">{{ step.zValue }}</td>
                  <td>{{ step.description }}</td>
                  <td class="lyr-examples">{{ step.examples }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>

    </div>
  `,
  // Doc-only styles — literal values here are documentation chrome only.
  // Production components must use --ecw-* custom properties, not hard-coded values.
  styles: [`
    .lyr-root {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 960px;
      margin: 0 auto;
      padding: 2rem;
      color: #1a1a2e;
    }

    /* ── Callout ─────────────────────────────────────────────────────── */
    .lyr-callout {
      display: flex;
      gap: 1rem;
      border-radius: 8px;
      padding: 1.25rem 1.5rem;
      margin-bottom: 2rem;
    }

    .lyr-callout--warn {
      background: #fff8e1;
      border: 2px solid #f59e0b;
    }

    .lyr-callout__icon {
      font-size: 1.5rem;
      line-height: 1;
      flex-shrink: 0;
    }

    .lyr-callout__body {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .lyr-callout__title {
      font-size: 1rem;
      color: #92400e;
    }

    .lyr-callout__text {
      font-size: 0.9rem;
      color: #78350f;
      line-height: 1.6;
      margin: 0;
    }

    .lyr-callout__recommendation {
      font-size: 0.875rem;
      color: #78350f;
      background: #fef3c7;
      border-left: 3px solid #f59e0b;
      padding: 0.6rem 0.8rem;
      border-radius: 0 4px 4px 0;
      margin: 0;
      line-height: 1.6;
    }

    /* ── Header ──────────────────────────────────────────────────────── */
    .lyr-header {
      margin-bottom: 2rem;
    }

    .lyr-title {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0 0 0.5rem;
    }

    .lyr-subtitle {
      font-size: 1rem;
      color: #4a4a6a;
      line-height: 1.6;
      margin: 0;
    }

    /* ── Sections ────────────────────────────────────────────────────── */
    .lyr-section {
      margin-bottom: 2.5rem;
    }

    .lyr-section-title {
      font-size: 1.1rem;
      font-weight: 700;
      margin: 0 0 0.75rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .lyr-section-desc {
      font-size: 0.9rem;
      color: #4a4a6a;
      line-height: 1.6;
      margin: 0 0 1rem;
    }

    .lyr-proposal-badge {
      font-size: 0.68rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      background: #fee2e2;
      color: #991b1b;
      border: 1px solid #fca5a5;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      white-space: nowrap;
    }

    .lyr-guidance-list {
      padding-left: 1.25rem;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }

    .lyr-guidance-list li {
      font-size: 0.9rem;
      color: #3a3a5a;
      line-height: 1.6;
    }

    /* ── Stacked diagram ─────────────────────────────────────────────── */
    .lyr-diagram-wrap {
      background: #f4f4f8;
      border-radius: 10px;
      padding: 1.5rem 1.5rem 1rem;
      margin-bottom: 1.5rem;
      overflow: hidden;
    }

    .lyr-diagram {
      position: relative;
      height: 260px;
      width: 100%;
    }

    .lyr-panel {
      position: absolute;
      width: 220px;
      height: 56px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
      font-size: 0.8rem;
      font-weight: 600;
      box-shadow: 0 2px 8px rgba(0,0,0,0.18);
    }

    .lyr-panel[data-tier="0"] { background: #e0e7ff; color: #1e3a8a; border: 1px solid #a5b4fc; }
    .lyr-panel[data-tier="1"] { background: #dbeafe; color: #1e40af; border: 1px solid #93c5fd; }
    .lyr-panel[data-tier="2"] { background: #d1fae5; color: #065f46; border: 1px solid #6ee7b7; }
    .lyr-panel[data-tier="3"] { background: #fef9c3; color: #713f12; border: 1px solid #fde047; }
    .lyr-panel[data-tier="4"] { background: #fee2e2; color: #7f1d1d; border: 1px solid #fca5a5; }
    .lyr-panel[data-tier="5"] { background: #fce7f3; color: #831843; border: 1px solid #f9a8d4; }
    .lyr-panel[data-tier="6"] { background: #ede9fe; color: #4c1d95; border: 1px solid #c4b5fd; }
    .lyr-panel[data-tier="7"] { background: #f0fdf4; color: #14532d; border: 1px solid #86efac; }

    .lyr-panel-name {
      white-space: nowrap;
    }

    .lyr-panel-z {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 0.75rem;
      opacity: 0.75;
    }

    /* ── Detail table ────────────────────────────────────────────────── */
    .lyr-table-wrap {
      overflow-x: auto;
    }

    .lyr-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }

    .lyr-table th,
    .lyr-table td {
      border: 1px solid #d8d8e8;
      padding: 0.6rem 0.75rem;
      text-align: left;
      vertical-align: top;
      line-height: 1.5;
    }

    .lyr-table th {
      background: #f4f4f8;
      font-weight: 700;
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #4a4a6a;
    }

    .lyr-table tr:nth-child(even) td {
      background: #fafafd;
    }

    .lyr-token-name {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 0.78rem;
      background: #eeeef8;
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
      color: #2a2a5a;
      display: block;
      margin-bottom: 0.25rem;
      word-break: break-all;
    }

    .lyr-proposed-tag {
      font-size: 0.65rem;
      font-style: italic;
      color: #991b1b;
      display: block;
    }

    .lyr-z-val {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      font-weight: 600;
      color: #1a1a2e;
    }

    .lyr-examples {
      color: #6a6a8a;
      font-size: 0.82rem;
    }

    code {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 0.9em;
      background: #eeeef8;
      padding: 0.1em 0.3em;
      border-radius: 3px;
    }
  `],
})
export class LayeringFoundationComponent {
  readonly steps: LayerStep[] = [
    {
      name: 'Base',
      proposedName: '--ecw-z-index-base',
      zValue: 0,
      description: 'Default document flow. No explicit stacking required.',
      examples: 'Cards, content blocks, form fields',
    },
    {
      name: 'Raised',
      proposedName: '--ecw-z-index-raised',
      zValue: 100,
      description: 'Slightly elevated elements that need to float above the base layer.',
      examples: 'Sticky table headers, floating action buttons',
    },
    {
      name: 'Sticky',
      proposedName: '--ecw-z-index-sticky',
      zValue: 200,
      description: 'Sticky navigation bars and headers that persist during scroll.',
      examples: 'App header, sticky sidebar nav, sticky column headers',
    },
    {
      name: 'Dropdown',
      proposedName: '--ecw-z-index-dropdown',
      zValue: 1000,
      description: 'Inline dropdown menus and select panels anchored to a trigger element.',
      examples: 'Select dropdowns, autocomplete panels, context menus',
    },
    {
      name: 'Overlay',
      proposedName: '--ecw-z-index-overlay',
      zValue: 1100,
      description: 'Backdrop / scrim layer rendered beneath modal and drawer chrome.',
      examples: 'Modal backdrop, drawer scrim, full-screen overlay',
    },
    {
      name: 'Modal',
      proposedName: '--ecw-z-index-modal',
      zValue: 1200,
      description: 'Modal dialogs and full-screen drawers that block interaction with the page.',
      examples: 'Dialog, bottom sheet, side drawer',
    },
    {
      name: 'Popover',
      proposedName: '--ecw-z-index-popover',
      zValue: 1300,
      description: 'Rich popover panels that may appear on top of modals.',
      examples: 'Date-picker panel, colour-picker, inline help panel',
    },
    {
      name: 'Toast',
      proposedName: '--ecw-z-index-toast',
      zValue: 1400,
      description: 'Transient notification toasts that must appear above all other surfaces.',
      examples: 'Success/error toast, snackbar',
    },
    {
      name: 'Tooltip',
      proposedName: '--ecw-z-index-tooltip',
      zValue: 1500,
      description: 'Tooltips are the topmost layer — they must never be obscured by any other surface.',
      examples: 'Hover tooltip, truncation tooltip, icon label',
    },
  ];
}

// ---------------------------------------------------------------------------
// Storybook meta
// ---------------------------------------------------------------------------

const meta: Meta<LayeringFoundationComponent> = {
  title: 'Foundations/Layering',
  component: LayeringFoundationComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '**GAP-DOCUMENTATION PAGE — Jira PE-315919.**\n\n' +
          'There are currently **no z-index / layering tokens** in the `@ecw/design-system` ' +
          'Figma source. The Figma local-variables export contains no stacking-order collection ' +
          'or primitives.\n\n' +
          'This page documents the gap, provides usage guidance, and presents a **conceptual ' +
          'proposal** for a nine-tier stacking-order scale. All proposed token names ' +
          '(e.g. `--ecw-z-index-modal`) are illustrative only — they are **not implemented** ' +
          'and must not be used in production code until the scale has been formally defined ' +
          'in Figma and exported through the standard token pipeline.\n\n' +
          'This foundation should be designed alongside the Elevation / Shadows scale ' +
          '(PE-315882), since shadows convey elevation visually while z-index controls ' +
          'stacking order — they are complementary dimensions of the same concept.\n\n' +
          '**Next step:** raise a dedicated Jira (child of PE-315919) to define the ' +
          'layering/z-index scale as tokens.',
      },
    },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<LayeringFoundationComponent>;

export const Overview: Story = {};
