// ---------------------------------------------------------------------------
// Foundations / Icons (PE-315893)
//
// Documents the icon system: the <ecw-icon> component (Material Symbols by
// default) with a custom-SVG fallback via EcwIconRegistry. The Material Symbols
// webfont is loaded for the preview in .storybook/preview-head.html.
// ---------------------------------------------------------------------------
import { Component, inject } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EcwIconComponent } from './icon.component';
import { EcwIconRegistry } from './icon-registry';

// Custom SVG icons (fill/stroke = currentColor; viewBox, no fixed width/height).
const CUSTOM_ICONS: Record<string, string> = {
  pulse:
    '<svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M2 12h4l2-6 4 12 2-6h8"/></svg>',
  'brand-mark':
    '<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="6" fill="currentColor"/><path d="M8 12.5l2.5 2.5L16 9" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};

const MATERIAL_NAMES = [
  'home', 'search', 'settings', 'favorite', 'delete', 'edit',
  'check_circle', 'warning', 'info', 'close', 'menu', 'arrow_forward',
  'calendar_month', 'person', 'notifications', 'download',
];

const COLOR_TOKENS = [
  { label: 'primary', token: '--ecw-icon-interactive-primary-default' },
  { label: 'secondary', token: '--ecw-icon-interactive-secondary-default' },
  { label: 'error', token: '--ecw-icon-interactive-error-default' },
  { label: 'warning', token: '--ecw-icon-interactive-warning-default' },
  { label: 'disabled', token: '--ecw-icon-interactive-disabled-default' },
];

@Component({
  selector: 'ecw-icons-foundation',
  standalone: true,
  imports: [EcwIconComponent],
  template: `
    <div class="ic-root">
      <section class="ic-section">
        <h3 class="ic-h">Material Symbols (default)</h3>
        <p class="ic-desc">Pass a Material Symbols name to <code>&lt;ecw-icon&gt;</code>. Decorative by default.</p>
        <div class="ic-grid">
          @for (n of materialNames; track n) {
            <div class="ic-cell">
              <ecw-icon [name]="n"></ecw-icon>
              <code class="ic-name">{{ n }}</code>
            </div>
          }
        </div>
      </section>

      <section class="ic-section">
        <h3 class="ic-h">Sizes</h3>
        <div class="ic-row">
          @for (s of sizes; track s) {
            <div class="ic-cell">
              <ecw-icon name="settings" [size]="s"></ecw-icon>
              <code class="ic-name">{{ s }}px</code>
            </div>
          }
        </div>
      </section>

      <section class="ic-section">
        <h3 class="ic-h">Color (semantic icon tokens)</h3>
        <p class="ic-desc">Icons inherit <code>currentColor</code> — set color via a <code>--ecw-icon-*</code> token.</p>
        <div class="ic-row">
          @for (c of colorTokens; track c.token) {
            <div class="ic-cell">
              <ecw-icon name="favorite" [size]="32" [style.color]="'var(' + c.token + ')'"></ecw-icon>
              <code class="ic-name">{{ c.label }}</code>
            </div>
          }
        </div>
      </section>

      <section class="ic-section">
        <h3 class="ic-h">Fill axis</h3>
        <div class="ic-row">
          <div class="ic-cell">
            <ecw-icon name="favorite" [size]="32" [filled]="false"></ecw-icon>
            <code class="ic-name">outlined</code>
          </div>
          <div class="ic-cell">
            <ecw-icon name="favorite" [size]="32" [filled]="true"></ecw-icon>
            <code class="ic-name">filled</code>
          </div>
        </div>
      </section>

      <section class="ic-section">
        <h3 class="ic-h">Custom SVG fallback</h3>
        <p class="ic-desc">
          Names registered with <code>EcwIconRegistry</code> render their SVG instead of a
          Material glyph (registered names take precedence). SVGs use <code>currentColor</code>.
        </p>
        <div class="ic-row">
          @for (n of customNames; track n) {
            <div class="ic-cell">
              <ecw-icon [name]="n" [size]="32" [style.color]="'var(--ecw-icon-interactive-primary-default)'"></ecw-icon>
              <code class="ic-name">{{ n }}</code>
            </div>
          }
        </div>
      </section>

      <section class="ic-section">
        <h3 class="ic-h">Accessibility</h3>
        <div class="ic-a11y">
          <div class="ic-cell">
            <ecw-icon name="info" [size]="24"></ecw-icon>
            <span class="ic-a11y-note">Decorative → <code>aria-hidden="true"</code> (no label)</span>
          </div>
          <div class="ic-cell">
            <ecw-icon name="delete" [size]="24" label="Delete item"></ecw-icon>
            <span class="ic-a11y-note">Meaningful → <code>role="img"</code> + <code>aria-label</code></span>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .ic-root { font-family: 'Inter', system-ui, sans-serif; color: #1a1a1a; max-width: 960px; }
    .ic-section { padding: 8px 0 24px; border-bottom: 1px solid #ebebeb; }
    .ic-section:last-child { border-bottom: 0; }
    .ic-h { font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: #717171; margin: 0 0 4px; }
    .ic-desc { font-size: 13px; color: #4b4b4b; margin: 0 0 16px; max-width: 64ch; }
    .ic-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(96px, 1fr)); gap: 12px; }
    .ic-row { display: flex; flex-wrap: wrap; gap: 20px; align-items: flex-end; }
    .ic-cell { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; border: 1px solid #f0f0f0; border-radius: 8px; min-width: 72px; color: #1a1a1a; }
    .ic-name { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px; color: #007b95; text-align: center; word-break: break-word; }
    .ic-a11y { display: flex; flex-wrap: wrap; gap: 16px; }
    .ic-a11y .ic-cell { flex-direction: row; align-items: center; gap: 10px; }
    .ic-a11y-note { font-size: 12px; color: #4b4b4b; }
    code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
  `],
})
class IconsFoundationComponent {
  readonly materialNames = MATERIAL_NAMES;
  readonly customNames = Object.keys(CUSTOM_ICONS);
  readonly sizes = [16, 20, 24, 32, 48];
  readonly colorTokens = COLOR_TOKENS;

  constructor() {
    inject(EcwIconRegistry).registerAll(CUSTOM_ICONS);
  }
}

const meta: Meta<IconsFoundationComponent> = {
  title: 'Foundations/Icons',
  component: IconsFoundationComponent,
  // Docs page is authored in icon.mdx (usage + guidelines + a11y).
  decorators: [
    moduleMetadata({ imports: [EcwIconComponent] }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'The icon system (PE-315893): the `<ecw-icon>` component renders **Material Symbols** ' +
          'by name and falls back to **custom SVGs** registered with `EcwIconRegistry` ' +
          '(registered names take precedence). Icons inherit `currentColor` — set color with a ' +
          '`--ecw-icon-*` token. Decorative by default (`aria-hidden`); pass `label` for ' +
          'meaningful icons. The Material Symbols and Inter webfonts are loaded for this preview ' +
          'only — the library references them but does not bundle fonts.',
      },
    },
  },
};
export default meta;

type GalleryStory = StoryObj<IconsFoundationComponent>;
export const Overview: GalleryStory = {};

// Interactive single-icon playground driven by Storybook controls.
type PlaygroundStory = StoryObj<EcwIconComponent>;
export const Playground: PlaygroundStory = {
  render: (args) => ({
    props: args,
    template: `<ecw-icon [name]="name" [size]="size" [filled]="filled" [label]="label"></ecw-icon>`,
    moduleMetadata: { imports: [EcwIconComponent] },
  }),
  args: { name: 'home', size: 48, filled: false, label: '' },
  argTypes: {
    name: { control: 'text', description: 'Material Symbols name or registered custom name' },
    size: { control: { type: 'number', min: 12, max: 96, step: 2 } },
    filled: { control: 'boolean' },
    label: { control: 'text', description: 'Accessible label; omit for decorative icons' },
  },
  parameters: {
    docs: { description: { story: 'Tweak the controls to preview a single Material Symbols icon.' } },
  },
};
