import { Component, OnInit } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';

// ---------------------------------------------------------------------------
// DOC-ONLY component — defined inline in this story file.
// It is NOT exported from public-api.ts and is NOT part of the library's
// production API. It exists solely to render the spacing & radius token
// catalogue in Storybook and produce a Chromatic snapshot.
//
// --ecw-* tokens are loaded globally via the Storybook `styles` build option.
// Resolved values are read at runtime via getComputedStyle so the displayed
// values always reflect the actual loaded token sheet.
//
// Jira: PE-315882
// ---------------------------------------------------------------------------

interface SpacingToken {
  token: string;
}

interface RadiusToken {
  token: string;
}

@Component({
  selector: 'ecw-spacing-radius-foundation',
  standalone: true,
  template: `
    <div class="sr-root">

      <!-- ── Header ─────────────────────────────────────────────────────── -->
      <header class="sr-header">
        <h1 class="sr-title">Spacing &amp; Radius</h1>
        <p class="sr-subtitle">
          All spacing and radius decisions in <code>&#64;ecw/design-system</code> use
          <code>--ecw-*</code> CSS custom properties. Spacing follows a three-layer
          architecture: primitive scale tokens (<code>--ecw-space-*</code> numeric) are
          referenced by semantic spacing tokens (<code>--ecw-space-xx-small</code> …
          <code>--ecw-space-large</code>) and semantic padding tokens
          (<code>--ecw-padding-xx-small</code> … <code>--ecw-padding-large</code>).
          Radius tokens follow the same pattern — numeric primitives are aliased by
          semantic role tokens. Token values below are resolved at runtime from the
          globally loaded token sheet.
        </p>
      </header>

      <!-- ── Section 1: Spacing scale (primitives) ─────────────────────── -->
      <section class="sr-section">
        <h2 class="sr-section-title">Spacing scale (primitives)</h2>
        <p class="sr-section-note">
          Primitive spacing tokens hold the raw <strong>px</strong> values that form the
          design system's spacing scale. Semantic tokens reference these primitives;
          component styles should always reference the semantic layer, never the
          primitive directly.
        </p>

        <div class="sr-bar-list">
          @for (item of spacingPrimitiveTokens; track item.token) {
            <div class="sr-bar-row">
              <div class="sr-bar-track">
                <div
                  class="sr-bar-fill"
                  [style.width]="'var(' + item.token + ')'"
                ></div>
              </div>
              <div class="sr-bar-meta">
                <code class="sr-token-name">{{ item.token }}</code>
                <span class="sr-token-value">{{ resolved[item.token] || '—' }}</span>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- ── Section 2: Spacing (semantic) ─────────────────────────────── -->
      <section class="sr-section">
        <h2 class="sr-section-title">Spacing (semantic)</h2>
        <p class="sr-section-note">
          Semantic spacing tokens alias the primitive scale above. Use these in
          component styles and layout utilities to ensure changes to the primitive
          scale propagate consistently across the system.
        </p>

        <div class="sr-bar-list">
          @for (item of spacingSemanticTokens; track item.token) {
            <div class="sr-bar-row">
              <div class="sr-bar-track">
                <div
                  class="sr-bar-fill"
                  [style.width]="'var(' + item.token + ')'"
                ></div>
              </div>
              <div class="sr-bar-meta">
                <code class="sr-token-name">{{ item.token }}</code>
                <span class="sr-token-value">{{ resolved[item.token] || '—' }}</span>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- ── Section 3: Padding (semantic) ─────────────────────────────── -->
      <section class="sr-section">
        <h2 class="sr-section-title">Padding (semantic)</h2>
        <p class="sr-section-note">
          Padding tokens mirror the spacing scale and exist as a separate intent layer.
          They alias the same primitive values as the semantic spacing tokens but
          communicate padding-specific layout intent, making it clear in design and code
          whether a value is used for margin/gap or for internal component padding.
        </p>

        <div class="sr-bar-list">
          @for (item of paddingSemanticTokens; track item.token) {
            <div class="sr-bar-row">
              <div class="sr-bar-track">
                <div
                  class="sr-bar-fill"
                  [style.width]="'var(' + item.token + ')'"
                ></div>
              </div>
              <div class="sr-bar-meta">
                <code class="sr-token-name">{{ item.token }}</code>
                <span class="sr-token-value">{{ resolved[item.token] || '—' }}</span>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- ── Section 4: Radius (primitives) ────────────────────────────── -->
      <section class="sr-section">
        <h2 class="sr-section-title">Radius (primitives)</h2>
        <p class="sr-section-note">
          Primitive radius tokens hold the literal corner-radius values. Each swatch
          below applies <code>border-radius: var(&lt;token&gt;)</code> directly to show
          the resulting corner shape.
        </p>

        <div class="sr-radius-grid">
          @for (item of radiusPrimitiveTokens; track item.token) {
            <div class="sr-radius-card">
              <div
                class="sr-radius-swatch"
                [style.borderRadius]="'var(' + item.token + ')'"
              ></div>
              <div class="sr-radius-meta">
                <code class="sr-token-name">{{ item.token }}</code>
                <span class="sr-token-value">{{ resolved[item.token] || '—' }}</span>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- ── Section 5: Radius (semantic) ──────────────────────────────── -->
      <section class="sr-section">
        <h2 class="sr-section-title">Radius (semantic)</h2>
        <p class="sr-section-note">
          Semantic radius tokens alias the primitives above. <code>--ecw-radius-full</code>
          resolves to <code>--ecw-radius-999</code>, producing a pill / fully-rounded shape.
          Component styles should always reference semantic tokens rather than the numeric
          primitives.
        </p>

        <div class="sr-radius-grid">
          @for (item of radiusSemanticTokens; track item.token) {
            <div class="sr-radius-card">
              <div
                class="sr-radius-swatch"
                [style.borderRadius]="'var(' + item.token + ')'"
              ></div>
              <div class="sr-radius-meta">
                <code class="sr-token-name">{{ item.token }}</code>
                <span class="sr-token-value">{{ resolved[item.token] || '—' }}</span>
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
    .sr-root {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 960px;
      margin: 0 auto;
      padding: 2rem;
      color: #1a1a2e;
    }

    /* Header */
    .sr-header {
      margin-bottom: 2.5rem;
    }

    .sr-title {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0 0 0.5rem;
    }

    .sr-subtitle {
      font-size: 1rem;
      color: #4a4a6a;
      line-height: 1.6;
      margin: 0;
    }

    /* Sections */
    .sr-section {
      margin-bottom: 3rem;
    }

    .sr-section-title {
      font-size: 1.2rem;
      font-weight: 700;
      margin: 0 0 0.5rem;
      padding-bottom: 0.4rem;
      border-bottom: 1px solid #d8d8e8;
    }

    .sr-section-note {
      font-size: 0.875rem;
      color: #4a4a6a;
      line-height: 1.6;
      margin: 0 0 1.25rem;
    }

    /* Spacing bar list */
    .sr-bar-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .sr-bar-row {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      background: #fafafd;
      border: 1px solid #e8e8f4;
      border-radius: 8px;
      padding: 0.875rem 1.25rem;
    }

    .sr-bar-track {
      flex: 0 0 320px;
      height: 16px;
      background: #e8f8f6;
      border-radius: 3px;
      overflow: hidden;
    }

    .sr-bar-fill {
      height: 100%;
      background: #13B8A6;
      border-radius: 3px;
      min-width: 2px;
    }

    .sr-bar-meta {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    /* Radius grid */
    .sr-radius-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 1rem;
    }

    .sr-radius-card {
      border: 1px solid #e8e8f4;
      border-radius: 8px;
      overflow: hidden;
      background: #ffffff;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;
    }

    .sr-radius-swatch {
      width: 72px;
      height: 56px;
      background: #e8f8f6;
      border: 1px solid #53CBBD;
    }

    .sr-radius-meta {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    /* Shared token typography */
    .sr-token-name {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 0.78rem;
      background: #eeeef8;
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
      color: #2a2a5a;
      word-break: break-all;
    }

    .sr-token-value {
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
export class SpacingRadiusFoundationComponent implements OnInit {

  readonly spacingPrimitiveTokens: SpacingToken[] = [
    { token: '--ecw-space-2' },
    { token: '--ecw-space-4' },
    { token: '--ecw-space-8' },
    { token: '--ecw-space-12' },
    { token: '--ecw-space-16' },
  ];

  readonly spacingSemanticTokens: SpacingToken[] = [
    { token: '--ecw-space-xx-small' },
    { token: '--ecw-space-x-small' },
    { token: '--ecw-space-small' },
    { token: '--ecw-space-medium' },
    { token: '--ecw-space-large' },
  ];

  readonly paddingSemanticTokens: SpacingToken[] = [
    { token: '--ecw-padding-xx-small' },
    { token: '--ecw-padding-x-small' },
    { token: '--ecw-padding-small' },
    { token: '--ecw-padding-medium' },
    { token: '--ecw-padding-large' },
  ];

  readonly radiusPrimitiveTokens: RadiusToken[] = [
    { token: '--ecw-radius-2' },
    { token: '--ecw-radius-4' },
    { token: '--ecw-radius-8' },
    { token: '--ecw-radius-999' },
  ];

  readonly radiusSemanticTokens: RadiusToken[] = [
    { token: '--ecw-radius-small' },
    { token: '--ecw-radius-medium' },
    { token: '--ecw-radius-large' },
    { token: '--ecw-radius-full' },
  ];

  resolved: Record<string, string> = {};

  ngOnInit(): void {
    const style = getComputedStyle(document.documentElement);
    const allTokens: string[] = [
      ...this.spacingPrimitiveTokens.map(t => t.token),
      ...this.spacingSemanticTokens.map(t => t.token),
      ...this.paddingSemanticTokens.map(t => t.token),
      ...this.radiusPrimitiveTokens.map(t => t.token),
      ...this.radiusSemanticTokens.map(t => t.token),
    ];
    for (const token of allTokens) {
      this.resolved[token] = style.getPropertyValue(token).trim();
    }
  }
}

// ---------------------------------------------------------------------------
// Storybook meta
// ---------------------------------------------------------------------------

const meta: Meta<SpacingRadiusFoundationComponent> = {
  title: 'Foundations/Spacing & Radius',
  component: SpacingRadiusFoundationComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Documents the **Spacing & Radius** foundation tokens in `@ecw/design-system`. ' +
          'Token values are resolved at runtime from the globally loaded `--ecw-*` CSS custom ' +
          'properties so the catalogue always reflects the live token sheet. ' +
          '**Spacing scale (primitives)** — five numeric tokens (`--ecw-space-2` … `--ecw-space-16`) ' +
          'form the raw spacing scale. ' +
          '**Spacing (semantic)** — five tokens (`--ecw-space-xx-small` … `--ecw-space-large`) alias ' +
          'the primitives; component styles should reference these. ' +
          '**Padding (semantic)** — five tokens (`--ecw-padding-xx-small` … `--ecw-padding-large`) ' +
          'mirror the spacing scale as a separate intent layer for internal component padding. ' +
          '**Radius (primitives)** — four numeric tokens (`--ecw-radius-2`, `--ecw-radius-4`, ' +
          '`--ecw-radius-8`, `--ecw-radius-999`) holding literal corner-radius values. ' +
          '**Radius (semantic)** — four tokens (`--ecw-radius-small` … `--ecw-radius-full`) alias ' +
          'the primitives; `--ecw-radius-full` resolves to `--ecw-radius-999` producing a pill shape.',
      },
    },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<SpacingRadiusFoundationComponent>;

export const Overview: Story = {};
