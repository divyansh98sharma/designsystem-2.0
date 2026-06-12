import { Component } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';

// ---------------------------------------------------------------------------
// DOC-ONLY component — defined inline in this story file.
// Not exported from public-api.ts. Not part of the library's production API.
// Purpose: confirm that the Angular standalone component render pipeline
// works end-to-end inside Storybook and produces a valid Chromatic snapshot.
//
// Styles below are documentation chrome only — literal values are used here
// because production --ecw-* tokens are not yet populated (PE-315920 / PE-315919).
// ---------------------------------------------------------------------------

@Component({
  selector: 'ecw-welcome-doc',
  standalone: true,
  template: `
    <div class="wl-root">
      <div class="wl-panel">
        <div class="wl-logo-mark" aria-hidden="true">eCW</div>
        <h1 class="wl-heading">&#64;ecw/design-system</h1>
        <p class="wl-tagline">
          A token-driven, accessibility-first Angular component library.<br />
          Built from Figma. Built for eCW.
        </p>
        <ul class="wl-facts">
          <li>Angular 21 &bull; Storybook 10 &bull; Chromatic</li>
          <li>Three-layer <code>--ecw-*</code> design tokens</li>
          <li>No PrimeNG &bull; First-party components only</li>
          <li>WCAG 2.1 AA accessibility target</li>
        </ul>
        <div class="wl-badge">Render pipeline: OK</div>
      </div>
    </div>
  `,
  // Doc-only styles — literal values used here as the token system is not yet
  // populated. Production components must use --ecw-* custom properties.
  styles: [`
    .wl-root {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f4f4f8;
      padding: 2rem;
      box-sizing: border-box;
    }

    .wl-panel {
      background: #ffffff;
      border: 1px solid #d8d8e8;
      border-radius: 12px;
      padding: 3rem 2.5rem;
      max-width: 480px;
      width: 100%;
      text-align: center;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
    }

    .wl-logo-mark {
      display: inline-block;
      background: #1a3a7a;
      color: #ffffff;
      font-size: 1.1rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
    }

    .wl-heading {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1a1a2e;
      margin: 0 0 0.75rem;
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
    }

    .wl-tagline {
      font-size: 0.95rem;
      color: #4a4a6a;
      line-height: 1.6;
      margin: 0 0 1.5rem;
    }

    .wl-facts {
      list-style: none;
      margin: 0 0 2rem;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      font-size: 0.875rem;
      color: #5a5a7a;
    }

    code {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 0.85em;
      background: #eeeef8;
      padding: 0.1em 0.35em;
      border-radius: 3px;
      color: #2a2a5a;
    }

    .wl-badge {
      display: inline-block;
      background: #e8f8ee;
      border: 1px solid #88d8aa;
      color: #1a5a3a;
      font-size: 0.8rem;
      font-weight: 600;
      padding: 0.35rem 0.85rem;
      border-radius: 999px;
    }
  `],
})
export class WelcomeDocComponent {}

// ---------------------------------------------------------------------------
// Storybook meta
// ---------------------------------------------------------------------------

const meta: Meta<WelcomeDocComponent> = {
  title: 'Foundations/Welcome',
  component: WelcomeDocComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Minimal smoke story that confirms Angular standalone components render correctly ' +
          'inside Storybook and produce a Chromatic snapshot. ' +
          'This story has no library dependencies — it renders a branded welcome panel inline.',
      },
    },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<WelcomeDocComponent>;

export const Default: Story = {};
