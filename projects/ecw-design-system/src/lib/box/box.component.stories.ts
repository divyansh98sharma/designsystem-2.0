import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EcwBoxComponent } from './box.component';

const meta: Meta<EcwBoxComponent> = {
  title: 'Primitives/Box',
  component: EcwBoxComponent,
  // Docs page is authored in box.mdx (usage + guidelines).
  decorators: [moduleMetadata({ imports: [EcwBoxComponent] })],
  argTypes: {
    padding: { control: 'select', options: [undefined, 2, 4, 8, 12, 16] },
    paddingX: { control: 'select', options: [undefined, 2, 4, 8, 12, 16] },
    paddingY: { control: 'select', options: [undefined, 2, 4, 8, 12, 16] },
    radius: { control: 'select', options: [undefined, 2, 4, 8, 999] },
    display: {
      control: 'inline-radio',
      options: ['block', 'inline-block', 'flex', 'inline-flex'],
    },
    background: {
      control: 'inline-radio',
      options: [undefined, 'surface', 'subtle', 'muted'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A generic layout primitive. Renders projected content inside a token-driven ' +
          'container with on-scale padding (`--ecw-space-*`), radius (`--ecw-radius-*`), ' +
          'background, and a configurable `display` mode. `padding` sets all sides; otherwise ' +
          '`paddingX`/`paddingY` compose a shorthand.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<EcwBoxComponent>;

/** Interactive playground driven by controls. */
export const Playground: Story = {
  args: {
    padding: 16,
    paddingX: undefined,
    paddingY: undefined,
    radius: 8,
    display: 'block',
    background: 'subtle',
  },
  render: (args) => ({
    props: args,
    template: `
      <ecw-box
        [padding]="padding"
        [paddingX]="paddingX"
        [paddingY]="paddingY"
        [radius]="radius"
        [display]="display"
        [background]="background"
      >Box content</ecw-box>
    `,
  }),
};

/** The padding scale (all sides), 2 → 16. */
export const Padding: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:flex-start;">
        <ecw-box [padding]="2" [radius]="4" background="subtle">2</ecw-box>
        <ecw-box [padding]="4" [radius]="4" background="subtle">4</ecw-box>
        <ecw-box [padding]="8" [radius]="4" background="subtle">8</ecw-box>
        <ecw-box [padding]="12" [radius]="4" background="subtle">12</ecw-box>
        <ecw-box [padding]="16" [radius]="4" background="subtle">16</ecw-box>
      </div>
    `,
  }),
};

/** Independent horizontal/vertical padding via paddingX / paddingY. */
export const AxisPadding: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:flex-start;">
        <ecw-box [paddingX]="16" [paddingY]="4" [radius]="4" background="muted">
          paddingX 16 / paddingY 4
        </ecw-box>
        <ecw-box [paddingY]="16" [radius]="4" background="muted">
          paddingY 16 only
        </ecw-box>
      </div>
    `,
  }),
};

/** The radius scale, 2 → 999 (pill). */
export const Radius: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
        <ecw-box [padding]="12" [radius]="2" background="muted">2</ecw-box>
        <ecw-box [padding]="12" [radius]="4" background="muted">4</ecw-box>
        <ecw-box [padding]="12" [radius]="8" background="muted">8</ecw-box>
        <ecw-box [padding]="12" [radius]="999" background="muted">999</ecw-box>
      </div>
    `,
  }),
};
