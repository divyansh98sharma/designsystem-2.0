import { Component } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';

// ---------------------------------------------------------------------------
// DOC-ONLY component — defined inline in this story file.
// It is NOT exported from public-api.ts and is NOT part of the library's
// production API. It exists solely to render the token architecture diagram
// in Storybook and produce a Chromatic snapshot for the CI smoke test.
//
// Styles below are documentation chrome — they do not use production tokens
// because primitive/semantic values are not yet populated (PE-315920 /
// PE-315919). Once the token system is live these illustrative hard-coded
// values would be replaced with the real --ecw-* custom properties in the
// actual product components.
// ---------------------------------------------------------------------------

interface TokenLayer {
  label: string;
  badge: string;
  description: string;
  rule: string;
  examples: string[];
  status: string;
}

@Component({
  selector: 'ecw-token-architecture-doc',
  standalone: true,
  template: `
    <div class="ta-root">
      <header class="ta-header">
        <h1 class="ta-title">Token Architecture</h1>
        <p class="ta-subtitle">
          All visual decisions in <code>&#64;ecw/design-system</code> flow through
          three layers of CSS custom properties, each building on the layer below it.
          Import <code>tokens.css</code> once at the application root — never import
          individual layers directly.
        </p>
        <pre class="ta-import">@import '@ecw/design-system/foundations/tokens/tokens.css';</pre>
      </header>

      <div class="ta-layers">
        @for (layer of layers; track layer.badge) {
          <div class="ta-card">
            <div class="ta-card-head">
              <span class="ta-badge">Layer {{ layer.badge }}</span>
              <h2 class="ta-card-title">{{ layer.label }}</h2>
            </div>
            <p class="ta-card-desc">{{ layer.description }}</p>
            <p class="ta-card-rule"><strong>Rule:</strong> {{ layer.rule }}</p>
            <div class="ta-examples">
              <span class="ta-examples-label">Example token names</span>
              <ul class="ta-example-list">
                @for (ex of layer.examples; track ex) {
                  <li><code class="ta-token">{{ ex }}</code></li>
                }
              </ul>
            </div>
            <div class="ta-status">{{ layer.status }}</div>
          </div>
        }
      </div>

      <section class="ta-flow">
        <h2 class="ta-flow-title">Cascade direction</h2>
        <div class="ta-flow-row">
          <div class="ta-flow-node ta-flow-node--p">Primitives</div>
          <div class="ta-flow-arrow">referenced by &rarr;</div>
          <div class="ta-flow-node ta-flow-node--s">Semantics</div>
          <div class="ta-flow-arrow">referenced by &rarr;</div>
          <div class="ta-flow-node ta-flow-node--c">Components</div>
        </div>
        <p class="ta-flow-note">
          Component styles reference only component tokens. Component tokens reference
          only semantic tokens. Semantic tokens reference only primitive tokens.
          Primitive tokens are the only layer that holds literal values.
        </p>
      </section>
    </div>
  `,
  // Doc-only styles — these literal values are documentation chrome only.
  // Production components must use --ecw-* custom properties, not hard-coded values.
  styles: [`
    .ta-root {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem;
      color: #1a1a2e;
    }

    .ta-header {
      margin-bottom: 2.5rem;
    }

    .ta-title {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0 0 0.5rem;
    }

    .ta-subtitle {
      font-size: 1rem;
      color: #4a4a6a;
      line-height: 1.6;
      margin: 0 0 1rem;
    }

    .ta-import {
      background: #f4f4f8;
      border: 1px solid #d8d8e8;
      border-radius: 6px;
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
      color: #2a2a4a;
      overflow-x: auto;
    }

    .ta-layers {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.25rem;
      margin-bottom: 2.5rem;
    }

    .ta-card {
      border: 1px solid #d8d8e8;
      border-radius: 10px;
      padding: 1.25rem;
      background: #fafafd;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .ta-card-head {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .ta-badge {
      background: #e8e8f4;
      color: #3a3a6a;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      white-space: nowrap;
    }

    .ta-card-title {
      font-size: 1.1rem;
      font-weight: 700;
      margin: 0;
    }

    .ta-card-desc {
      font-size: 0.9rem;
      color: #4a4a6a;
      line-height: 1.5;
      margin: 0;
    }

    .ta-card-rule {
      font-size: 0.85rem;
      color: #3a3a5a;
      margin: 0;
      line-height: 1.5;
    }

    .ta-examples {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .ta-examples-label {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #7a7a9a;
    }

    .ta-example-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }

    .ta-token {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 0.8rem;
      background: #eeeef8;
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
      color: #2a2a5a;
    }

    .ta-status {
      font-size: 0.78rem;
      color: #8a6a2a;
      background: #fef8e8;
      border: 1px solid #e8d888;
      border-radius: 4px;
      padding: 0.4rem 0.6rem;
      margin-top: auto;
    }

    .ta-flow {
      background: #f4f4f8;
      border-radius: 10px;
      padding: 1.5rem;
    }

    .ta-flow-title {
      font-size: 1rem;
      font-weight: 700;
      margin: 0 0 1rem;
    }

    .ta-flow-row {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
      margin-bottom: 1rem;
    }

    .ta-flow-node {
      padding: 0.5rem 1rem;
      border-radius: 6px;
      font-weight: 600;
      font-size: 0.875rem;
    }

    .ta-flow-node--p { background: #dde8ff; color: #1a3a7a; }
    .ta-flow-node--s { background: #ddf8e8; color: #1a5a3a; }
    .ta-flow-node--c { background: #f8e8dd; color: #7a3a1a; }

    .ta-flow-arrow {
      font-size: 0.8rem;
      color: #7a7a9a;
    }

    .ta-flow-note {
      font-size: 0.875rem;
      color: #4a4a6a;
      line-height: 1.6;
      margin: 0;
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
export class TokenArchitectureDocComponent {
  readonly layers: TokenLayer[] = [
    {
      label: 'Primitives',
      badge: '1',
      description:
        'Raw, context-free values — the complete palette of the design system. ' +
        'The only layer that contains literal values (hex codes, numbers, raw strings).',
      rule: 'May contain literal values. No references to other tokens.',
      examples: [
        '--ecw-color-blue-500',
        '--ecw-color-neutral-0',
        '--ecw-space-4',
        '--ecw-radius-md',
        '--ecw-font-size-sm',
      ],
      status: 'Values populated in PE-315920 / PE-315919 — supplied by the design team from Figma.',
    },
    {
      label: 'Semantics',
      badge: '2',
      description:
        'Design-intent mappings. Gives meaning to primitives by describing HOW a value ' +
        'is used, not what it is. Consumers should prefer semantic tokens over primitive tokens.',
      rule: 'Must reference primitives via var(--ecw-…). Never use literal values.',
      examples: [
        '--ecw-color-bg-default',
        '--ecw-color-text-muted',
        '--ecw-color-brand-primary',
        '--ecw-color-border-focus',
        '--ecw-color-feedback-error',
      ],
      status: 'Mappings defined in PE-315920 once primitive tokens are finalised.',
    },
    {
      label: 'Components',
      badge: '3',
      description:
        'Component-specific design decisions. Provides a dedicated override surface ' +
        'for each component without coupling component styles directly to semantic or primitive tokens.',
      rule: 'Should reference semantic tokens. Must not contain literal values.',
      examples: [
        '--ecw-button-bg-primary',
        '--ecw-button-text-primary',
        '--ecw-button-border-radius',
        '--ecw-input-border-default',
        '--ecw-input-border-focus',
      ],
      status: 'Tokens added alongside each component Jira. No components exist yet.',
    },
  ];
}

// ---------------------------------------------------------------------------
// Storybook meta
// ---------------------------------------------------------------------------

const meta: Meta<TokenArchitectureDocComponent> = {
  title: 'Foundations/Token Architecture',
  component: TokenArchitectureDocComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Documents the three-layer `--ecw-*` CSS custom-property architecture: ' +
          '**Primitives** (raw palette values) → **Semantics** (design-intent mappings) → ' +
          '**Components** (component-scoped overrides). ' +
          'Token values are populated by the design team from Figma (PE-315920 / PE-315919). ' +
          'This story also acts as the Storybook + Chromatic smoke test for the Angular render pipeline.',
      },
    },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<TokenArchitectureDocComponent>;

export const Overview: Story = {};
