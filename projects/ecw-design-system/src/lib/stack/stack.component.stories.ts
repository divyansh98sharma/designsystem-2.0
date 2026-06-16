import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EcwStackComponent } from './stack.component';

const meta: Meta<EcwStackComponent> = {
  title: 'Primitives/Stack',
  component: EcwStackComponent,
  // Docs page is authored in stack.mdx (usage + guidelines).
  decorators: [moduleMetadata({ imports: [EcwStackComponent] })],
  argTypes: {
    direction: { control: 'inline-radio', options: ['row', 'column'] },
    gap: { control: 'select', options: [undefined, 2, 4, 8, 12, 16] },
    align: {
      control: 'inline-radio',
      options: [undefined, 'start', 'center', 'end', 'stretch'],
    },
    justify: {
      control: 'inline-radio',
      options: [undefined, 'start', 'center', 'end', 'between'],
    },
    wrap: { control: 'boolean' },
    inline: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A flexbox layout primitive. Arranges projected children in a `row` or ' +
          '`column` with a token-driven `gap` (spacing scale: 2, 4, 8, 12, 16). ' +
          '`align`/`justify` map to `align-items`/`justify-content` and are omitted ' +
          'when unset. Supports `wrap` (`flex-wrap: wrap`) and `inline` ' +
          '(`inline-flex`).',
      },
    },
  },
};
export default meta;

type Story = StoryObj<EcwStackComponent>;

/** Demo boxes so the layout is visible in the canvas. */
const boxes = `
  <div style="background:var(--ecw-color-teal-25); border:1px solid var(--ecw-color-teal-75); padding:8px 16px;">One</div>
  <div style="background:var(--ecw-color-teal-25); border:1px solid var(--ecw-color-teal-75); padding:8px 16px;">Two</div>
  <div style="background:var(--ecw-color-teal-25); border:1px solid var(--ecw-color-teal-75); padding:8px 16px;">Three</div>
`;

/** Interactive playground driven by controls. */
export const Playground: Story = {
  args: {
    direction: 'column',
    gap: 8,
    align: 'stretch',
    justify: 'start',
    wrap: false,
    inline: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ecw-stack
        [direction]="direction"
        [gap]="gap"
        [align]="align"
        [justify]="justify"
        [wrap]="wrap"
        [inline]="inline"
      >${boxes}</ecw-stack>
    `,
  }),
};

/** Column (default) vs row direction. */
export const Direction: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:32px; align-items:flex-start;">
        <ecw-stack [gap]="8">${boxes}</ecw-stack>
        <ecw-stack direction="row" [gap]="8">${boxes}</ecw-stack>
      </div>
    `,
  }),
};

/** Each step of the spacing scale, as a row gap. */
export const GapScale: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:16px;">
        <ecw-stack direction="row" [gap]="2">${boxes}</ecw-stack>
        <ecw-stack direction="row" [gap]="4">${boxes}</ecw-stack>
        <ecw-stack direction="row" [gap]="8">${boxes}</ecw-stack>
        <ecw-stack direction="row" [gap]="12">${boxes}</ecw-stack>
        <ecw-stack direction="row" [gap]="16">${boxes}</ecw-stack>
      </div>
    `,
  }),
};
