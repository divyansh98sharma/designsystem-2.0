import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EcwTooltipComponent } from './tooltip.component';

const POSITIONS = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
  'left-top',
  'left-center',
  'left-bottom',
  'right-top',
  'right-center',
  'right-bottom',
] as const;

const meta: Meta<EcwTooltipComponent> = {
  title: 'Components/Tooltip',
  component: EcwTooltipComponent,
  decorators: [moduleMetadata({ imports: [EcwTooltipComponent] })],
  argTypes: {
    position: { control: 'select', options: POSITIONS },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The design-system tooltip bubble (PE-256840), token-driven from the Figma `tooltip` ' +
          'component. A presentational popup with a directional notch — the consumer positions it ' +
          'next to a trigger and toggles visibility. 12 notch positions; single size per the tokens. ' +
          'Dark mode flips the surface via `data-theme="dark"`.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<EcwTooltipComponent>;

/** Interactive playground driven by controls. */
export const Playground: Story = {
  args: {
    position: 'top-left',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding:48px;">
        <ecw-tooltip [position]="position">A simple text popup tip.</ecw-tooltip>
      </div>
    `,
  }),
};

/** All 12 notch positions, laid out with room around each bubble for the notch. */
export const Positions: Story = {
  render: () => ({
    props: { positions: POSITIONS },
    template: `
      <div style="display:grid; grid-template-columns:repeat(3, max-content); gap:48px; padding:48px;">
        @for (p of positions; track p) {
          <div style="display:flex; flex-direction:column; gap:8px; align-items:flex-start;">
            <ecw-tooltip [position]="p">A simple text popup tip.</ecw-tooltip>
            <small style="color:#717171; font:12px/16px Inter, sans-serif;">{{ p }}</small>
          </div>
        }
      </div>
    `,
  }),
};

/**
 * Dark mode. Opt in by setting `data-theme="dark"` on any ancestor — the surface
 * token flips from the dark slate bubble to a white bubble with black text (the
 * notch follows the surface). No component API change.
 */
export const DarkMode: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => ({
    props: { positions: POSITIONS },
    template: `
      <div data-theme="dark" style="display:grid; grid-template-columns:repeat(3, max-content); gap:48px; padding:48px; background:#0f172a; border-radius:8px;">
        @for (p of positions; track p) {
          <ecw-tooltip [position]="p">A simple text popup tip.</ecw-tooltip>
        }
      </div>
    `,
  }),
};
