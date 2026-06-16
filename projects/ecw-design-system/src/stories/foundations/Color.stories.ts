import { Component, OnInit } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';

// ---------------------------------------------------------------------------
// DOC-ONLY component — defined inline in this story file.
// It is NOT exported from public-api.ts and is NOT part of the library's
// production API. It exists solely to render the color foundation gallery
// in Storybook and produce a Chromatic snapshot for the CI smoke test.
//
// Design tokens (--ecw-* CSS custom properties) are loaded globally in
// Storybook via the `styles` build option. Token values are resolved at
// runtime via getComputedStyle so this gallery always reflects the live
// token values rather than hard-coded strings.
//
// PE-315919
// ---------------------------------------------------------------------------

interface ColorGroup {
  title: string;
  subtitle?: string;
  tokens: string[];
}

@Component({
  selector: 'ecw-color-foundation',
  standalone: true,
  template: `
    <div class="cf-root">
      <header class="cf-header">
        <h1 class="cf-title">Color</h1>
        <p class="cf-subtitle">
          Every color decision in <code>&#64;ecw/design-system</code> is expressed as a
          <code>--ecw-*</code> CSS custom property. Primitive tokens hold literal hex
          values; semantic tokens reference primitives via <code>var()</code>. Always
          prefer semantic tokens in component styles — primitives are reserved for
          the token layer itself.
        </p>
      </header>

      @for (group of groups; track group.title) {
        <section class="cf-section">
          <div class="cf-section-head">
            <h2 class="cf-section-title">{{ group.title }}</h2>
            @if (group.subtitle) {
              <p class="cf-section-subtitle">{{ group.subtitle }}</p>
            }
          </div>
          <div class="cf-grid">
            @for (t of group.tokens; track t) {
              <div class="cf-card">
                <div
                  class="cf-chip"
                  [style.background]="'var(' + t + ')'"
                ></div>
                <div class="cf-meta">
                  <span class="cf-token-name">{{ t }}</span>
                  <span class="cf-token-value">{{ resolved[t] || '—' }}</span>
                </div>
              </div>
            }
          </div>
        </section>
      }
    </div>
  `,
  // Doc-only styles — literal values here are documentation chrome only.
  // Production components must use --ecw-* custom properties, not hard-coded values.
  styles: [`
    .cf-root {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 1100px;
      margin: 0 auto;
      padding: 2rem;
      color: #1a1a2e;
    }

    .cf-header {
      margin-bottom: 2.5rem;
    }

    .cf-title {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0 0 0.5rem;
    }

    .cf-subtitle {
      font-size: 1rem;
      color: #4a4a6a;
      line-height: 1.6;
      margin: 0;
    }

    .cf-section {
      margin-bottom: 2.5rem;
    }

    .cf-section-head {
      margin-bottom: 1rem;
    }

    .cf-section-title {
      font-size: 1.2rem;
      font-weight: 700;
      margin: 0 0 0.25rem;
      color: #1a1a2e;
    }

    .cf-section-subtitle {
      font-size: 0.875rem;
      color: #6a6a8a;
      margin: 0;
    }

    .cf-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }

    .cf-card {
      border: 1px solid #e8e8f0;
      border-radius: 8px;
      overflow: hidden;
      background: #ffffff;
      display: flex;
      flex-direction: column;
    }

    .cf-chip {
      height: 72px;
      width: 100%;
      border-bottom: 1px solid #E1E1E1;
    }

    .cf-meta {
      padding: 0.6rem 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .cf-token-name {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 0.72rem;
      color: #2a2a5a;
      word-break: break-all;
      line-height: 1.4;
    }

    .cf-token-value {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 0.75rem;
      color: #7a7a9a;
      line-height: 1.4;
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
export class ColorFoundationComponent implements OnInit {
  readonly groups: ColorGroup[] = [
    // -----------------------------------------------------------------------
    // Section A — Primitive palette
    // -----------------------------------------------------------------------
    {
      title: 'Primitive palette — Teal',
      subtitle: 'Raw teal scale. Use these only when authoring semantic tokens.',
      tokens: [
        '--ecw-color-teal-25',
        '--ecw-color-teal-75',
        '--ecw-color-teal-300',
        '--ecw-color-teal-400',
        '--ecw-color-teal-500',
        '--ecw-color-teal-700',
        '--ecw-color-teal-900',
      ],
    },
    {
      title: 'Primitive palette — Neutral',
      subtitle: 'Raw neutral (grey) scale. Use these only when authoring semantic tokens.',
      tokens: [
        '--ecw-color-neutral-0',
        '--ecw-color-neutral-25',
        '--ecw-color-neutral-50',
        '--ecw-color-neutral-200',
        '--ecw-color-neutral-250',
        '--ecw-color-neutral-300',
        '--ecw-color-neutral-400',
        '--ecw-color-neutral-550',
        '--ecw-color-neutral-600',
        '--ecw-color-neutral-650',
        '--ecw-color-neutral-1000',
      ],
    },
    {
      title: 'Primitive palette — Error',
      subtitle: 'Raw error (red) scale. Use these only when authoring semantic tokens.',
      tokens: [
        '--ecw-color-error-700',
        '--ecw-color-error-800',
        '--ecw-color-error-900',
        '--ecw-color-error-1000',
      ],
    },
    {
      title: 'Primitive palette — Warning',
      subtitle: 'Raw warning (amber) scale. Use these only when authoring semantic tokens.',
      tokens: [
        '--ecw-color-warning-300',
        '--ecw-color-warning-400',
        '--ecw-color-warning-800',
      ],
    },
    // -----------------------------------------------------------------------
    // Section B — Semantic: Background
    // -----------------------------------------------------------------------
    {
      title: 'Semantic — Background',
      subtitle: 'Design-intent background tokens for interactive containers, controls, and surfaces.',
      tokens: [
        '--ecw-background-interactive-container-primary-default',
        '--ecw-background-interactive-container-primary-hover',
        '--ecw-background-interactive-container-secondary-default',
        '--ecw-background-interactive-container-secondary-hover',
        '--ecw-background-interactive-container-white-default',
        '--ecw-background-interactive-container-white-hover',
        '--ecw-background-interactive-container-error-default',
        '--ecw-background-interactive-container-error-hover',
        '--ecw-background-interactive-container-warning-default',
        '--ecw-background-interactive-container-warning-hover',
        '--ecw-background-interactive-container-disabled-default',
        '--ecw-background-interactive-control-unchecked-default',
        '--ecw-background-interactive-control-unchecked-hover',
        '--ecw-background-interactive-control-disabled-default',
        '--ecw-background-interactive-control-checked-default',
        '--ecw-background-interactive-control-checked-hover',
        '--ecw-background-interactive-control-indeterminate-default',
        '--ecw-background-interactive-control-indeterminate-hover',
        '--ecw-background-surface-container-default',
      ],
    },
    // -----------------------------------------------------------------------
    // Section C — Semantic: Text
    // -----------------------------------------------------------------------
    {
      title: 'Semantic — Text',
      subtitle: 'Design-intent foreground tokens for text rendered inside interactive elements and content areas.',
      tokens: [
        '--ecw-text-interactive-primary-default',
        '--ecw-text-interactive-secondary-default',
        '--ecw-text-interactive-white-default',
        '--ecw-text-interactive-error-default',
        '--ecw-text-interactive-warning-default',
        '--ecw-text-interactive-disabled-default',
        '--ecw-text-interactive-control-default',
        '--ecw-text-interactive-control-disabled',
        '--ecw-text-content-default',
        '--ecw-text-content-inverse-default',
      ],
    },
    // -----------------------------------------------------------------------
    // Section D — Semantic: Icon
    // -----------------------------------------------------------------------
    {
      title: 'Semantic — Icon',
      subtitle: 'Design-intent fill tokens for icons rendered inside interactive elements.',
      tokens: [
        '--ecw-icon-interactive-primary-default',
        '--ecw-icon-interactive-secondary-default',
        '--ecw-icon-interactive-white-default',
        '--ecw-icon-interactive-error-default',
        '--ecw-icon-interactive-warning-default',
        '--ecw-icon-interactive-disabled-default',
        '--ecw-icon-interactive-control-checkmark-default',
      ],
    },
    // -----------------------------------------------------------------------
    // Section E — Semantic: Indicator
    // -----------------------------------------------------------------------
    {
      title: 'Semantic — Indicator',
      subtitle: 'Design-intent stroke/fill tokens for control indicator rings and outlines.',
      tokens: [
        '--ecw-indicator-interactive-control-unchecked-default',
        '--ecw-indicator-interactive-control-unchecked-hover',
        '--ecw-indicator-interactive-control-unchecked-disabled',
        '--ecw-indicator-interactive-control-checked-default',
        '--ecw-indicator-interactive-control-checked-hover',
        '--ecw-indicator-interactive-control-checked-disabled',
        '--ecw-indicator-interactive-control-indeterminate-default',
        '--ecw-indicator-interactive-control-indeterminate-hover',
      ],
    },
  ];

  resolved: Record<string, string> = {};

  ngOnInit(): void {
    const cs = getComputedStyle(document.documentElement);
    for (const g of this.groups) {
      for (const t of g.tokens) {
        this.resolved[t] = cs.getPropertyValue(t).trim();
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Storybook meta
// ---------------------------------------------------------------------------

const meta: Meta<ColorFoundationComponent> = {
  title: 'Foundations/Color',
  component: ColorFoundationComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Reference gallery for every `--ecw-color-*` primitive and color-related ' +
          'semantic token in `@ecw/design-system`. ' +
          'Token values are resolved live from `getComputedStyle(document.documentElement)` ' +
          'so this story always reflects the tokens currently loaded in the global Storybook stylesheet. ' +
          '\n\n' +
          '**Token layers shown:** ' +
          'Primitive palette (Teal, Neutral, Error, Warning) · ' +
          'Semantic Background · Semantic Text · Semantic Icon · Semantic Indicator. ' +
          'Border & Stroke tokens are documented separately in the Border & Stroke story. ' +
          '\n\n' +
          '**Accessibility note:** This page is a reference gallery only. ' +
          'Color combinations used in production components must satisfy WCAG 2.1 AA ' +
          'contrast requirements (4.5 : 1 for normal text, 3 : 1 for large text and UI components). ' +
          'Never rely on color alone to convey meaning.',
      },
    },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<ColorFoundationComponent>;

export const Overview: Story = {};
