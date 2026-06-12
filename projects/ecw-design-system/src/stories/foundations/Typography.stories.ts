// ---------------------------------------------------------------------------
// Foundations / Typography (PE-315736)
//
// Documents the --ecw-typography-* token set: font family, type scale (sizes),
// line-heights, weights, letter-spacing, and the semantic type styles.
// Values are resolved live from the globally-loaded tokens via getComputedStyle.
//
// Styles in the `styles` array are documentation chrome only. The specimens
// themselves are driven by real --ecw-typography-* custom properties.
// The Inter webfont is loaded for the preview via .storybook/preview-head.html;
// the library only references the font family token (consumers load the font).
// ---------------------------------------------------------------------------
import type { Meta, StoryObj } from '@storybook/angular';
import { Component, OnInit } from '@angular/core';

const PANGRAM = 'The quick brown fox jumps over the lazy dog';

interface Specimen {
  /** Visible label */
  label: string;
  /** CSS custom property name driving the specimen */
  token: string;
  /** Which CSS property the token feeds, so the specimen renders it live */
  apply: 'font-size' | 'font-weight' | 'line-height' | 'letter-spacing' | 'font-family';
  /** Optional Figma-name note */
  note?: string;
}
interface Section {
  title: string;
  description?: string;
  specimens: Specimen[];
}

@Component({
  selector: 'ecw-typography-foundation',
  standalone: true,
  template: `
    <div class="ty-root">
      @for (s of sections; track s.title) {
        <section class="ty-section">
          <h3 class="ty-h">{{ s.title }}</h3>
          @if (s.description) {
            <p class="ty-desc">{{ s.description }}</p>
          }
          <div class="ty-list">
            @for (sp of s.specimens; track sp.token) {
              <div class="ty-row">
                <div
                  class="ty-specimen"
                  [style.font-family]="sp.apply === 'font-family' ? 'var(' + sp.token + ')' : 'var(--ecw-typography-font-family-inter)'"
                  [style.font-size]="sp.apply === 'font-size' ? 'var(' + sp.token + ')' : '16px'"
                  [style.font-weight]="sp.apply === 'font-weight' ? 'var(' + sp.token + ')' : '400'"
                  [style.line-height]="sp.apply === 'line-height' ? 'var(' + sp.token + ')' : 'normal'"
                  [style.letter-spacing]="sp.apply === 'letter-spacing' ? 'var(' + sp.token + ')' : 'normal'"
                >
                  {{ PANGRAM }}
                </div>
                <div class="ty-meta">
                  <span class="ty-label">{{ sp.label }}</span>
                  <code class="ty-token">{{ sp.token }}</code>
                  <span class="ty-value">{{ resolved[sp.token] }}{{ sp.note ? ' · ' + sp.note : '' }}</span>
                </div>
              </div>
            }
          </div>
        </section>
      }

      <!-- Semantic composite type style -->
      <section class="ty-section">
        <h3 class="ty-h">Semantic type styles</h3>
        <p class="ty-desc">
          Composite styles that bundle family, size, weight, line-height and
          letter-spacing for a named use. Only <code>label / small</code> is
          defined so far.
        </p>
        <div class="ty-style-card">
          <div
            class="ty-style-specimen"
            style="
              font-family: var(--ecw-typography-label-small-font-family);
              font-size: var(--ecw-typography-label-small-font-size);
              font-weight: var(--ecw-typography-label-small-font-weight);
              line-height: var(--ecw-typography-label-small-line-height);
              letter-spacing: var(--ecw-typography-label-small-letter-spacing);
            "
          >
            Label / Small — {{ PANGRAM }}
          </div>
          <ul class="ty-style-props">
            @for (p of labelSmallProps; track p) {
              <li><code>{{ p }}</code> <span class="ty-value">{{ resolved[p] }}</span></li>
            }
          </ul>
        </div>
      </section>

      <!-- Documented gap -->
      <section class="ty-section">
        <div class="ty-gap">
          <strong>⚠ Gap — limited semantic type styles.</strong>
          The Figma source currently defines a single semantic type style
          (<code>label / small</code>). A production design system typically needs
          a fuller set (e.g. body, heading levels, caption, button label sizes).
          <em>Recommendation:</em> expand the semantic typography styles in Figma
          and add them here — a candidate for a dedicated Jira.
        </div>
      </section>
    </div>
  `,
  styles: [
    `
    .ty-root { font-family: 'Inter', system-ui, sans-serif; color: #1a1a1a; max-width: 960px; }
    .ty-section { padding: 8px 0 24px; border-bottom: 1px solid #ebebeb; }
    .ty-section:last-child { border-bottom: 0; }
    .ty-h { font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: #717171; margin: 0 0 4px; }
    .ty-desc { font-size: 13px; color: #4b4b4b; margin: 0 0 16px; max-width: 60ch; }
    .ty-list { display: flex; flex-direction: column; gap: 18px; }
    .ty-row { display: flex; flex-direction: column; gap: 4px; }
    .ty-specimen { color: #1a1a1a; }
    .ty-meta { display: flex; flex-wrap: wrap; gap: 10px; align-items: baseline; }
    .ty-label { font-size: 12px; font-weight: 600; color: #1a1a1a; }
    .ty-token { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px; color: #007b95; background: #f7f7f7; padding: 1px 6px; border-radius: 4px; }
    .ty-value { font-size: 11px; color: #969696; }
    .ty-style-card { border: 1px solid #ebebeb; border-radius: 8px; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
    .ty-style-specimen { color: #1a1a1a; }
    .ty-style-props { margin: 0; padding: 0; list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 4px 16px; }
    .ty-style-props li { font-size: 11px; }
    .ty-style-props code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; color: #007b95; }
    .ty-gap { background: #fff8e6; border: 1px solid #ffd84b; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #4b4b4b; line-height: 1.5; }
    .ty-gap code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; }
    `,
  ],
})
class TypographyFoundationComponent implements OnInit {
  readonly PANGRAM = PANGRAM;

  readonly labelSmallProps = [
    '--ecw-typography-label-small-font-family',
    '--ecw-typography-label-small-font-size',
    '--ecw-typography-label-small-font-weight',
    '--ecw-typography-label-small-line-height',
    '--ecw-typography-label-small-letter-spacing',
  ];

  readonly sections: Section[] = [
    {
      title: 'Font family',
      description:
        'The single brand typeface. The library references the family token; ' +
        'consuming apps are responsible for loading the Inter webfont.',
      specimens: [
        { label: 'Inter', token: '--ecw-typography-font-family-inter', apply: 'font-family' },
      ],
    },
    {
      title: 'Type scale (font size)',
      specimens: [
        { label: '12', token: '--ecw-typography-font-size-12', apply: 'font-size' },
        { label: '14', token: '--ecw-typography-font-size-14', apply: 'font-size' },
        { label: '16', token: '--ecw-typography-font-size-16', apply: 'font-size' },
      ],
    },
    {
      title: 'Line height',
      description: 'Shown on the 14px specimen so the leading is visible.',
      specimens: [
        { label: '16', token: '--ecw-typography-line-height-16', apply: 'line-height' },
        { label: '20', token: '--ecw-typography-line-height-20', apply: 'line-height' },
      ],
    },
    {
      title: 'Font weight',
      specimens: [
        { label: 'Regular', token: '--ecw-typography-font-weight-regular', apply: 'font-weight', note: 'Figma: Regular' },
        { label: 'Medium', token: '--ecw-typography-font-weight-medium', apply: 'font-weight', note: 'Figma: Medium' },
        { label: 'Semi Bold', token: '--ecw-typography-font-weight-semi-bold', apply: 'font-weight', note: 'Figma: Semi Bold' },
        { label: 'Bold', token: '--ecw-typography-font-weight-bold', apply: 'font-weight', note: 'Figma: Bold' },
      ],
    },
    {
      title: 'Letter spacing',
      specimens: [
        { label: '0', token: '--ecw-typography-letter-spacing-0', apply: 'letter-spacing' },
      ],
    },
  ];

  resolved: Record<string, string> = {};

  ngOnInit(): void {
    const cs = getComputedStyle(document.documentElement);
    const names = [
      ...this.sections.flatMap((s) => s.specimens.map((sp) => sp.token)),
      ...this.labelSmallProps,
    ];
    for (const t of names) {
      this.resolved[t] = cs.getPropertyValue(t).trim();
    }
  }
}

const meta: Meta<TypographyFoundationComponent> = {
  title: 'Foundations/Typography',
  component: TypographyFoundationComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The `--ecw-typography-*` foundation: the Inter font family, a 12/14/16 ' +
          'type scale, 16/20 line-heights, four weights (Regular 400 → Bold 700), ' +
          'letter-spacing, and the `label / small` semantic type style. ' +
          'Values are resolved live from the tokens. Sourced from the Figma ' +
          '"Primitives" and "Semantics" collections (PE-315920).',
      },
    },
  },
};
export default meta;

type Story = StoryObj<TypographyFoundationComponent>;

export const Overview: Story = {};
