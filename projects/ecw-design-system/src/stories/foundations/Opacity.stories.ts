import { Component } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';

// ---------------------------------------------------------------------------
// DOC-ONLY component — defined inline in this story file.
// It is NOT exported from public-api.ts and is NOT part of the library's
// production API. It exists solely to document the OPACITY foundation gap
// in Storybook and produce a Chromatic snapshot for the CI smoke test.
//
// GAP-DOCUMENTATION PAGE (Jira PE-315919):
// There are currently NO opacity design tokens in the Figma source. The
// exported local variables contain no --ecw-opacity-* entries. The opacity
// scale shown below is a CONCEPTUAL PROPOSAL only — values are hard-coded
// literal percentages for illustration purposes and are intentionally NOT
// declared as --ecw-* CSS custom properties anywhere in this file.
//
// Styles below are documentation chrome only — they are intentionally NOT
// product tokens. Do NOT copy these inline values into component stylesheets.
// ---------------------------------------------------------------------------

interface OpacityStep {
  label: string;
  proposedName: string;
  value: number;
}

@Component({
  selector: 'ecw-opacity-foundation',
  standalone: true,
  template: `
    <div class="op-root">

      <!-- ── Gap callout ─────────────────────────────────────────────── -->
      <div class="op-callout op-callout--warn">
        <span class="op-callout__icon">⚠</span>
        <div class="op-callout__body">
          <strong class="op-callout__title">Not yet tokenized</strong>
          <p class="op-callout__text">
            There are currently <strong>no opacity tokens</strong> in the
            <code>&#64;ecw/design-system</code> Figma source. The Figma local-variables
            export contains no <code>opacity</code> collection or primitives.
            The values shown on this page are a <strong>conceptual proposal</strong>
            pending design-team confirmation — they are <strong>not implemented</strong>
            and must not be used in production.
          </p>
          <p class="op-callout__recommendation">
            <strong>Recommendation:</strong> Create a dedicated Jira (child of
            PE-315919) to define and tokenize an opacity scale in Figma as a
            system-wide foundation. Once approved, add the primitives to the
            Figma "Primitives" collection and export them as <code>--ecw-opacity-*</code>
            custom properties following the existing three-layer token architecture.
          </p>
        </div>
      </div>

      <!-- ── Header ──────────────────────────────────────────────────── -->
      <header class="op-header">
        <h1 class="op-title">Opacity</h1>
        <p class="op-subtitle">
          Opacity controls how transparent an element appears against its background.
          A shared, named opacity scale ensures that transparency is applied consistently
          across the system — particularly for disabled states, overlays, and scrims.
        </p>
      </header>

      <!-- ── Guidance ────────────────────────────────────────────────── -->
      <section class="op-section">
        <h2 class="op-section-title">Usage guidance</h2>
        <ul class="op-guidance-list">
          <li>
            <strong>Disabled states:</strong> Use a reduced-opacity token on the entire
            element rather than creating separate disabled colour tokens for every
            component variant.
          </li>
          <li>
            <strong>Overlay/scrim:</strong> Modal backdrops and drawer scrims should use
            a dedicated opacity step so the scrim density is consistent across the application.
          </li>
          <li>
            <strong>Text contrast:</strong> Prefer dedicated colour tokens (e.g.
            <code>--ecw-text-interactive-primary-disabled</code>) over reducing text
            opacity directly. Lowering text opacity can push contrast below WCAG AA
            thresholds, especially on non-white backgrounds.
          </li>
          <li>
            <strong>Backgrounds and borders:</strong> Semi-transparent fills are acceptable
            for layered-surface effects, but verify contrast ratios programmatically for
            any text rendered on top.
          </li>
        </ul>
      </section>

      <!-- ── Conceptual scale ────────────────────────────────────────── -->
      <section class="op-section">
        <h2 class="op-section-title">
          Conceptual opacity scale
          <span class="op-proposal-badge">PROPOSAL — not implemented</span>
        </h2>
        <p class="op-section-desc">
          The swatches below illustrate what a seven-step opacity ramp might look like.
          Each box is rendered over a checkerboard pattern so transparency is clearly
          visible. The proposed token names follow the existing
          <code>--ecw-&lt;category&gt;-&lt;value&gt;</code> primitive naming convention.
        </p>

        <div class="op-scale">
          @for (step of steps; track step.proposedName) {
            <div class="op-step">
              <div class="op-swatch-wrap">
                <div class="op-checkerboard"></div>
                <div
                  class="op-swatch"
                  [style.opacity]="step.value / 100"
                ></div>
              </div>
              <div class="op-step-meta">
                <span class="op-step-label">{{ step.label }}</span>
                <code class="op-token-name">{{ step.proposedName }}</code>
                <span class="op-proposed-tag">proposed — not implemented</span>
                <span class="op-value">{{ step.value }}%</span>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- ── Relationship to other foundations ───────────────────────── -->
      <section class="op-section">
        <h2 class="op-section-title">Relationship to other foundations</h2>
        <ul class="op-guidance-list">
          <li>
            <strong>Colour tokens:</strong> Opacity and colour are complementary. Semantic
            colour tokens (e.g. <code>--ecw-text-interactive-primary-disabled</code>) may
            encode the final perceived colour directly, making a separate opacity token
            unnecessary for those specific cases. Decide per token whether to encode
            transparency in the colour value or expose a separate opacity token.
          </li>
          <li>
            <strong>Elevation / Shadows (PE-315882):</strong> Overlay scrims sit above
            the regular content layer and below modal chrome. Their opacity value should
            be defined alongside the z-index/layering scale (see the Layering foundation
            page) so both dimensions are designed together.
          </li>
        </ul>
      </section>

    </div>
  `,
  // Doc-only styles — literal values here are documentation chrome only.
  // Production components must use --ecw-* custom properties, not hard-coded values.
  styles: [`
    .op-root {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem;
      color: #1a1a2e;
    }

    /* ── Callout ─────────────────────────────────────────────────────── */
    .op-callout {
      display: flex;
      gap: 1rem;
      border-radius: 8px;
      padding: 1.25rem 1.5rem;
      margin-bottom: 2rem;
    }

    .op-callout--warn {
      background: #fff8e1;
      border: 2px solid #f59e0b;
    }

    .op-callout__icon {
      font-size: 1.5rem;
      line-height: 1;
      flex-shrink: 0;
    }

    .op-callout__body {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .op-callout__title {
      font-size: 1rem;
      color: #92400e;
    }

    .op-callout__text {
      font-size: 0.9rem;
      color: #78350f;
      line-height: 1.6;
      margin: 0;
    }

    .op-callout__recommendation {
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
    .op-header {
      margin-bottom: 2rem;
    }

    .op-title {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0 0 0.5rem;
    }

    .op-subtitle {
      font-size: 1rem;
      color: #4a4a6a;
      line-height: 1.6;
      margin: 0;
    }

    /* ── Sections ────────────────────────────────────────────────────── */
    .op-section {
      margin-bottom: 2.5rem;
    }

    .op-section-title {
      font-size: 1.1rem;
      font-weight: 700;
      margin: 0 0 0.75rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .op-section-desc {
      font-size: 0.9rem;
      color: #4a4a6a;
      line-height: 1.6;
      margin: 0 0 1.25rem;
    }

    .op-proposal-badge {
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

    .op-guidance-list {
      padding-left: 1.25rem;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }

    .op-guidance-list li {
      font-size: 0.9rem;
      color: #3a3a5a;
      line-height: 1.6;
    }

    /* ── Opacity scale ───────────────────────────────────────────────── */
    .op-scale {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 1rem;
    }

    .op-step {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .op-swatch-wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 1;
      border-radius: 6px;
      overflow: hidden;
      border: 1px solid #d8d8e8;
    }

    /* Checkerboard background to reveal transparency */
    .op-checkerboard {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(45deg, #ccc 25%, transparent 25%),
        linear-gradient(-45deg, #ccc 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, #ccc 75%),
        linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 12px 12px;
      background-position: 0 0, 0 6px, 6px -6px, -6px 0;
      background-color: #fff;
    }

    .op-swatch {
      position: absolute;
      inset: 0;
      background: #3b5bdb;
    }

    .op-step-meta {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .op-step-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #1a1a2e;
    }

    .op-token-name {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 0.72rem;
      background: #eeeef8;
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
      color: #2a2a5a;
      word-break: break-all;
    }

    .op-proposed-tag {
      font-size: 0.65rem;
      font-style: italic;
      color: #991b1b;
    }

    .op-value {
      font-size: 0.78rem;
      color: #7a7a9a;
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
export class OpacityFoundationComponent {
  readonly steps: OpacityStep[] = [
    { label: 'Full',     proposedName: '--ecw-opacity-100', value: 100 },
    { label: 'High',     proposedName: '--ecw-opacity-80',  value: 80  },
    { label: 'Medium',   proposedName: '--ecw-opacity-64',  value: 64  },
    { label: 'Moderate', proposedName: '--ecw-opacity-48',  value: 48  },
    { label: 'Low',      proposedName: '--ecw-opacity-32',  value: 32  },
    { label: 'Subtle',   proposedName: '--ecw-opacity-16',  value: 16  },
    { label: 'Ghost',    proposedName: '--ecw-opacity-8',   value: 8   },
  ];
}

// ---------------------------------------------------------------------------
// Storybook meta
// ---------------------------------------------------------------------------

const meta: Meta<OpacityFoundationComponent> = {
  title: 'Foundations/Opacity',
  component: OpacityFoundationComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '**GAP-DOCUMENTATION PAGE — Jira PE-315919.**\n\n' +
          'There are currently **no opacity tokens** in the `@ecw/design-system` Figma source. ' +
          'The Figma local-variables export contains no opacity collection or primitives.\n\n' +
          'This page documents the gap, provides usage guidance, and presents a **conceptual ' +
          'proposal** for an opacity scale the design team could adopt. All proposed token names ' +
          '(e.g. `--ecw-opacity-100`) are illustrative only — they are **not implemented** and ' +
          'must not be used in production code until the scale has been formally defined in Figma ' +
          'and exported through the standard token pipeline.\n\n' +
          '**Next step:** raise a dedicated Jira (child of PE-315919) to define the opacity scale.',
      },
    },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<OpacityFoundationComponent>;

export const Overview: Story = {};
