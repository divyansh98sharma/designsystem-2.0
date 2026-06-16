// ---------------------------------------------------------------------------
// Foundations / Icons (PE-315893)
//
// The <ecw-icon> component renders inline SVGs (no webfont/glyph) from three
// sources, all the OUTLINE variant:
//   - material     → Material Symbols Outlined, weight 300 (@material-symbols/svg-300)
//   - healthicons  → Healthicons outline (healthicons@2)
//   - custom       → locally-registered SVG (EcwIconRegistry)
// The Overview is a live browser of EVERY icon in the selected source, fetched
// from the jsDelivr CDN. Icons lazy-load on scroll (@defer on viewport), so the
// full set can render without thousands of simultaneous requests.
// ---------------------------------------------------------------------------
import { Component, computed, effect, inject, signal } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EcwIconComponent } from './icon.component';
import { EcwIconLoader } from './icon-loader';
import { EcwIconRegistry, EcwIconSource } from './icon-registry';

// A custom SVG override (fill = currentColor; viewBox, no fixed width/height).
const CUSTOM_ICONS: Record<string, string> = {
  'brand-mark':
    '<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="6" fill="currentColor"/><path d="M8 12.5l2.5 2.5L16 9" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  pulse:
    '<svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M2 12h4l2-6 4 12 2-6h8"/></svg>',
};

const SOURCES: EcwIconSource[] = ['material', 'healthicons', 'custom'];

@Component({
  selector: 'ecw-icon-browser',
  standalone: true,
  imports: [EcwIconComponent],
  template: `
    <div class="ib-root">
      <div class="ib-controls">
        <div class="ib-tabs">
          @for (s of sources; track s) {
            <button
              type="button"
              class="ib-tab"
              [class.is-active]="source() === s"
              (click)="setSource(s)"
            >{{ s }}</button>
          }
        </div>
        <input
          class="ib-search"
          type="search"
          placeholder="Search {{ source() }} icons…"
          [value]="query()"
          (input)="onSearch($event)"
        />
      </div>

      @if (loading()) {
        <p class="ib-status">Loading {{ source() }} icons…</p>
      } @else {
        <p class="ib-status">
          {{ filtered().length }} of {{ total() }} {{ source() }} icons
          @if (query()) { matching “{{ query() }}” }
        </p>

        @if (filtered().length === 0) {
          <p class="ib-empty">No icons match “{{ query() }}”.</p>
        } @else {
          <div class="ib-grid">
            @for (n of filtered(); track n) {
              <div class="ib-cell" [title]="n">
                <span class="ib-icon">
                  @defer (on viewport) {
                    <ecw-icon [name]="n" [source]="source()" />
                  } @placeholder {
                    <span class="ib-ph"></span>
                  }
                </span>
                <code class="ib-name">{{ n }}</code>
              </div>
            }
          </div>
        }
      }
    </div>
  `,
  styles: [`
    .ib-root { font-family: 'Inter', system-ui, sans-serif; color: #1a1a1a; padding: 16px 24px 32px; }
    .ib-controls {
      position: sticky; top: 0; z-index: 1; background: #fff;
      display: flex; gap: 16px; align-items: center; flex-wrap: wrap;
      padding: 12px 0; border-bottom: 1px solid #ebebeb; margin-bottom: 16px;
    }
    .ib-tabs { display: inline-flex; gap: 4px; background: #f3f3f3; border-radius: 8px; padding: 3px; }
    .ib-tab {
      border: 0; background: transparent; cursor: pointer; text-transform: capitalize;
      font: inherit; font-size: 13px; color: #4b4b4b; padding: 6px 12px; border-radius: 6px;
    }
    .ib-tab.is-active { background: #fff; color: #007b95; font-weight: 600; box-shadow: 0 1px 2px rgba(0,0,0,0.08); }
    .ib-search {
      flex: 1 1 240px; min-width: 200px; font: inherit; font-size: 14px;
      padding: 8px 12px; border: 1px solid #e1e1e1; border-radius: 8px; color: #1a1a1a;
    }
    .ib-search:focus-visible { outline: 2px solid #007b95; outline-offset: 1px; border-color: #007b95; }
    .ib-status { font-size: 13px; color: #717171; margin: 0 0 16px; }
    .ib-empty { font-size: 14px; color: #4b4b4b; }
    .ib-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(104px, 1fr)); gap: 10px; }
    .ib-cell {
      display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center;
      padding: 16px 8px 12px; border: 1px solid #f0f0f0; border-radius: 10px; color: #1a1a1a;
      box-sizing: border-box; overflow: hidden; transition: border-color 0.12s, background 0.12s;
    }
    .ib-cell:hover { border-color: #d7e5e3; background: #f7fbfa; }
    .ib-icon { display: flex; align-items: center; justify-content: center; height: 24px; color: #1a1a1a; }
    .ib-ph { display: block; width: 16px; height: 16px; border-radius: 4px; background: #f0f0f0; }
    .ib-name {
      width: 100%; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px;
      color: #717171; line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
  `],
})
class IconBrowserComponent {
  private readonly loader = inject(EcwIconLoader);
  private readonly registry = inject(EcwIconRegistry);

  readonly sources = SOURCES;
  readonly source = signal<EcwIconSource>('material');
  readonly query = signal('');
  readonly loading = signal(true);
  private readonly names = signal<string[]>([]);

  readonly total = computed(() => this.names().length);
  readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    const list = this.names();
    return q ? list.filter((n) => n.includes(q)) : list;
  });

  constructor() {
    this.registry.registerAll(CUSTOM_ICONS, 'custom');

    // Load the full name list whenever the source changes.
    effect(() => {
      const src = this.source();
      this.loading.set(true);
      this.names.set([]);
      const load =
        src === 'custom'
          ? Promise.resolve(Object.keys(CUSTOM_ICONS).sort())
          : this.loader.listNames(src);
      load.then((names) => {
        if (this.source() === src) {
          this.names.set(names);
          this.loading.set(false);
        }
      });
    });
  }

  setSource(s: EcwIconSource): void {
    this.source.set(s);
    this.query.set('');
  }

  onSearch(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }
}

const meta: Meta<IconBrowserComponent> = {
  title: 'Foundations/Icons',
  component: IconBrowserComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EcwIconComponent] })],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The icon system (PE-315893): `<ecw-icon>` renders inline **SVGs** (no webfont) ' +
          'from three sources via the `source` input — **Material Symbols** (Outlined, weight ' +
          '300), **Healthicons** (outline), and **custom** registered SVGs. The Overview is a ' +
          'live browser of every icon in the selected source (search + tabs), fetched from the ' +
          'jsDelivr CDN; icons lazy-load on scroll. Icons inherit `currentColor` — set color ' +
          'with a `--ecw-icon-*` token. Decorative by default (`aria-hidden`); pass `label`.',
      },
    },
  },
};
export default meta;

type BrowserStory = StoryObj<IconBrowserComponent>;

/** Browse every icon in a source. Switch sources with the tabs; filter with search. */
export const Overview: BrowserStory = {};

// Interactive single-icon playground.
type PlaygroundStory = StoryObj<EcwIconComponent>;
export const Playground: PlaygroundStory = {
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [EcwIconComponent] },
    template: `<ecw-icon [name]="name" [source]="source" [label]="label"></ecw-icon>`,
  }),
  args: { name: 'home', source: 'material', label: '' },
  argTypes: {
    name: { control: 'text', description: 'Material Symbols / Healthicons name, or a registered custom name' },
    source: { control: 'inline-radio', options: ['material', 'healthicons', 'custom'], description: 'Icon set to resolve from' },
    label: { control: 'text', description: 'Accessible label; omit for decorative icons' },
  },
  parameters: {
    docs: { description: { story: 'Preview a single icon. Try `source: healthicons` with name `ambulance`.' } },
  },
};
