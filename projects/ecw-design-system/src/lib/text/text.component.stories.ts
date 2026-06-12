import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EcwTextComponent } from './text.component';

const meta: Meta<EcwTextComponent> = {
  title: 'Primitives/Text',
  component: EcwTextComponent,
  // Docs page is authored in text.mdx (usage + guidelines).
  decorators: [moduleMetadata({ imports: [EcwTextComponent] })],
  argTypes: {
    size: { control: 'inline-radio', options: [12, 14, 16] },
    weight: {
      control: 'select',
      options: ['regular', 'medium', 'semi-bold', 'bold'],
    },
    color: {
      control: 'inline-radio',
      options: [undefined, 'default', 'muted', 'brand', 'error'],
    },
    align: { control: 'inline-radio', options: ['left', 'center', 'right'] },
    truncate: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The typography primitive. Renders projected text with token-driven ' +
          'font-size (12 | 14 | 16), line-height (derived from size), font-weight ' +
          '(regular | medium | semi-bold | bold), color and alignment. `truncate` ' +
          'clips to a single line with an ellipsis. Color and align are omitted ' +
          'when left unset.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<EcwTextComponent>;

/** Interactive playground driven by controls. */
export const Playground: Story = {
  args: {
    size: 14,
    weight: 'regular',
    color: 'default',
    align: 'left',
    truncate: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ecw-text
        [size]="size"
        [weight]="weight"
        [color]="color"
        [align]="align"
        [truncate]="truncate"
      >The quick brown fox jumps over the lazy dog</ecw-text>
    `,
  }),
};

/** The tokenized size scale. */
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:8px;">
        <ecw-text [size]="16">Size 16 — line-height 20</ecw-text>
        <ecw-text [size]="14">Size 14 — line-height 20</ecw-text>
        <ecw-text [size]="12">Size 12 — line-height 16</ecw-text>
      </div>
    `,
  }),
};

/** The four weight tokens. */
export const Weights: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:8px;">
        <ecw-text weight="regular">Regular (400)</ecw-text>
        <ecw-text weight="medium">Medium (500)</ecw-text>
        <ecw-text weight="semi-bold">Semi Bold (600)</ecw-text>
        <ecw-text weight="bold">Bold (700)</ecw-text>
      </div>
    `,
  }),
};

/** Color and alignment are opt-in. */
export const ColorAndAlign: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:8px; width:240px;">
        <ecw-text color="default">Default text</ecw-text>
        <ecw-text color="muted">Muted text</ecw-text>
        <ecw-text color="brand">Brand text</ecw-text>
        <ecw-text color="error" weight="semi-bold">Error, semi-bold</ecw-text>
        <ecw-text align="center">Centered</ecw-text>
        <ecw-text align="right">Right aligned</ecw-text>
      </div>
    `,
  }),
};

/** Single-line ellipsis truncation. */
export const Truncate: Story = {
  render: () => ({
    template: `
      <div style="width:160px;">
        <ecw-text truncate>This is a long line of text that will be clipped with an ellipsis</ecw-text>
      </div>
    `,
  }),
};
