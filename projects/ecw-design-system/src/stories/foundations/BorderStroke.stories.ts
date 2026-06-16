import { Component, OnInit } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';

// ---------------------------------------------------------------------------
// DOC-ONLY component — defined inline in this story file.
// It is NOT exported from public-api.ts and is NOT part of the library's
// production API. It exists solely to render the border & stroke token
// catalogue in Storybook and produce a Chromatic snapshot.
//
// --ecw-* tokens are loaded globally via the Storybook `styles` build option
// (PE-315920). Resolved values are read at runtime via getComputedStyle so
// the displayed hex values always reflect the actual loaded token sheet.
//
// Note: radius and shadow tokens are documented separately (PE-315882).
// ---------------------------------------------------------------------------

interface StrokeWidthToken {
  token: string;
  primitiveNote: string;
}

interface BorderColorToken {
  token: string;
}

@Component({
  selector: 'ecw-border-stroke-foundation',
  standalone: true,
  template: `
    <div class="bs-root">

      <!-- ── Header ─────────────────────────────────────────────────────── -->
      <header class="bs-header">
        <h1 class="bs-title">Border &amp; Stroke</h1>
        <p class="bs-subtitle">
          All border and stroke decisions in <code>&#64;ecw/design-system</code> use
          <code>--ecw-*</code> CSS custom properties. Stroke-width tokens follow the
          three-layer architecture: a primitive (<code>--ecw-stroke-full</code> = 1 px)
          is referenced by a semantic (<code>--ecw-stroke-width-1</code>), which is then
          used in component styles. Border-color tokens map design intent (interactive
          state, role, and variant) to resolved colour values from the primitives layer.
          Radius and shadow tokens are documented separately in PE-315882.
        </p>
      </header>

      <!-- ── Section 1: Stroke width ────────────────────────────────────── -->
      <section class="bs-section">
        <h2 class="bs-section-title">Stroke width</h2>
        <p class="bs-section-note">
          The primitive <code>--ecw-stroke-full</code> holds the literal value
          <strong>1 px</strong>. The semantic token <code>--ecw-stroke-width-1</code>
          references it via <code>var(--ecw-stroke-full)</code>. Component styles should
          always reference the semantic token, never the primitive directly.
        </p>

        <div class="bs-stroke-list">
          @for (item of strokeWidthTokens; track item.token) {
            <div class="bs-stroke-row">
              <div
                class="bs-stroke-demo"
                [style.borderBottom]="'var(' + item.token + ') solid #4B4B4B'"
              ></div>
              <div class="bs-stroke-meta">
                <code class="bs-token-name">{{ item.token }}</code>
                <span class="bs-token-value">{{ resolved[item.token] || '—' }}</span>
                <span class="bs-stroke-primitive">primitive: <code>{{ item.primitiveNote }}</code></span>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- ── Section 2: Border colors ───────────────────────────────────── -->
      <section class="bs-section">
        <h2 class="bs-section-title">Border colors</h2>
        <p class="bs-section-note">
          Each swatch below renders a box whose border uses <code>1px solid var(&lt;token&gt;)</code>
          so the colour is clearly visible against a white fill. The resolved hex value is read
          at runtime from the loaded token sheet. Tokens cover interactive container and control
          states across primary, secondary, white, error, warning, and disabled roles.
        </p>

        <div class="bs-color-grid">
          @for (item of borderColorTokens; track item.token) {
            <div class="bs-color-card">
              <div
                class="bs-color-swatch"
                [style.border]="'1px solid var(' + item.token + ')'"
              ></div>
              <div class="bs-color-meta">
                <code class="bs-token-name">{{ item.token }}</code>
                <span class="bs-token-value">{{ resolved[item.token] || '—' }}</span>
              </div>
            </div>
          }
        </div>
      </section>

    </div>
  `,
  // Doc-only styles — literal values here are documentation chrome only.
  // Production components must use --ecw-* custom properties, not hard-coded values.
  styles: [`
    .bs-root {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 960px;
      margin: 0 auto;
      padding: 2rem;
      color: #1a1a2e;
    }

    /* Header */
    .bs-header {
      margin-bottom: 2.5rem;
    }

    .bs-title {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0 0 0.5rem;
    }

    .bs-subtitle {
      font-size: 1rem;
      color: #4a4a6a;
      line-height: 1.6;
      margin: 0;
    }

    /* Sections */
    .bs-section {
      margin-bottom: 3rem;
    }

    .bs-section-title {
      font-size: 1.2rem;
      font-weight: 700;
      margin: 0 0 0.5rem;
      padding-bottom: 0.4rem;
      border-bottom: 1px solid #d8d8e8;
    }

    .bs-section-note {
      font-size: 0.875rem;
      color: #4a4a6a;
      line-height: 1.6;
      margin: 0 0 1.25rem;
    }

    /* Stroke width list */
    .bs-stroke-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .bs-stroke-row {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      background: #fafafd;
      border: 1px solid #e8e8f4;
      border-radius: 8px;
      padding: 1rem 1.25rem;
    }

    .bs-stroke-demo {
      width: 120px;
      height: 32px;
      flex-shrink: 0;
      background: transparent;
    }

    .bs-stroke-meta {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .bs-stroke-primitive {
      font-size: 0.78rem;
      color: #7a7a9a;
    }

    /* Border color grid */
    .bs-color-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 1rem;
    }

    .bs-color-card {
      border: 1px solid #e8e8f4;
      border-radius: 8px;
      overflow: hidden;
      background: #ffffff;
    }

    .bs-color-swatch {
      height: 56px;
      background: #ffffff;
      margin: 0.75rem;
      border-radius: 4px;
    }

    .bs-color-meta {
      padding: 0 0.75rem 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    /* Shared token typography */
    .bs-token-name {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 0.78rem;
      background: #eeeef8;
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
      color: #2a2a5a;
      word-break: break-all;
    }

    .bs-token-value {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 0.78rem;
      color: #4a4a6a;
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
export class BorderStrokeFoundationComponent implements OnInit {

  readonly strokeWidthTokens: StrokeWidthToken[] = [
    { token: '--ecw-stroke-width-1', primitiveNote: '--ecw-stroke-full' },
  ];

  readonly borderColorTokens: BorderColorToken[] = [
    { token: '--ecw-border-interactive-container-primary-default' },
    { token: '--ecw-border-interactive-container-primary-hover' },
    { token: '--ecw-border-interactive-container-secondary-default' },
    { token: '--ecw-border-interactive-container-secondary-hover' },
    { token: '--ecw-border-interactive-container-white-default' },
    { token: '--ecw-border-interactive-container-white-hover' },
    { token: '--ecw-border-interactive-container-error-default' },
    { token: '--ecw-border-interactive-container-error-hover' },
    { token: '--ecw-border-interactive-container-warning-default' },
    { token: '--ecw-border-interactive-container-warning-hover' },
    { token: '--ecw-border-interactive-container-disabled-default' },
    { token: '--ecw-border-interactive-control-unchecked-default' },
    { token: '--ecw-border-interactive-control-unchecked-hover' },
    { token: '--ecw-border-interactive-control-checked-default' },
    { token: '--ecw-border-interactive-control-checked-hover' },
    { token: '--ecw-border-interactive-control-disabled-default' },
    { token: '--ecw-border-interactive-control-indeterminate-default' },
    { token: '--ecw-border-interactive-control-indeterminate-hover' },
  ];

  resolved: Record<string, string> = {};

  ngOnInit(): void {
    const style = getComputedStyle(document.documentElement);
    const allTokens: string[] = [
      ...this.strokeWidthTokens.map(t => t.token),
      ...this.borderColorTokens.map(t => t.token),
    ];
    for (const token of allTokens) {
      this.resolved[token] = style.getPropertyValue(token).trim();
    }
  }
}

// ---------------------------------------------------------------------------
// Storybook meta
// ---------------------------------------------------------------------------

const meta: Meta<BorderStrokeFoundationComponent> = {
  title: 'Foundations/Border & Stroke',
  component: BorderStrokeFoundationComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Documents the **Border & Stroke** foundation tokens in `@ecw/design-system`. ' +
          'Token values are resolved at runtime from the globally loaded `--ecw-*` CSS custom ' +
          'properties (PE-315920) so the catalogue always reflects the live token sheet. ' +
          '**Stroke width** — the primitive `--ecw-stroke-full` (1 px) is referenced by the ' +
          'semantic `--ecw-stroke-width-1`; component styles should reference the semantic. ' +
          '**Border colors** — 18 semantic tokens covering interactive container and control ' +
          'states (primary, secondary, white, error, warning, disabled, unchecked, checked, ' +
          'indeterminate) across default and hover variants. ' +
          'Radius and shadow tokens are documented separately (PE-315882).',
      },
    },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<BorderStrokeFoundationComponent>;

export const Overview: Story = {};
