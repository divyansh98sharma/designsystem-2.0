import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EcwRadioComponent } from './radio.component';

const meta: Meta<EcwRadioComponent> = {
  title: 'Components/Radio',
  component: EcwRadioComponent,
  decorators: [moduleMetadata({ imports: [EcwRadioComponent] })],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    name: { control: 'text' },
    value: { control: 'text' },
    ariaLabel: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The design-system radio button (PE-256841), token-driven from the Figma `radio button` ' +
          'component tokens. Wraps a visually-hidden native `<input type="radio">`; radios sharing ' +
          'a `name` form a single-selection group with native arrow-key navigation. States: ' +
          'unchecked, checked — each with default/hover/disabled treatments. Single size (16px).',
      },
    },
  },
};
export default meta;

type Story = StoryObj<EcwRadioComponent>;

/** Interactive playground driven by controls. */
export const Playground: Story = {
  args: {
    checked: false,
    disabled: false,
    required: false,
    name: 'demo',
    value: 'a',
  },
  render: (args) => ({
    props: args,
    template: `
      <ecw-radio
        [checked]="checked"
        [disabled]="disabled"
        [required]="required"
        [name]="name"
        [value]="value"
        [ariaLabel]="ariaLabel"
      >Label</ecw-radio>
    `,
  }),
};

/** A single-selection group (same `name`). Try the keyboard arrow keys. */
export const Group: Story = {
  render: () => ({
    template: `
      <div role="radiogroup" aria-label="Plan" style="display:flex; flex-direction:column; gap:12px; align-items:flex-start;">
        <ecw-radio name="plan" value="free" [checked]="true">Free</ecw-radio>
        <ecw-radio name="plan" value="pro">Pro</ecw-radio>
        <ecw-radio name="plan" value="team">Team</ecw-radio>
      </div>
    `,
  }),
};

/** Default vs checked. */
export const States: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:12px; align-items:flex-start;">
        <ecw-radio name="states">Unchecked</ecw-radio>
        <ecw-radio name="states" [checked]="true">Checked</ecw-radio>
      </div>
    `,
  }),
};

/** Disabled in both states. */
export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:12px; align-items:flex-start;">
        <ecw-radio name="dis" disabled>Unchecked</ecw-radio>
        <ecw-radio name="dis" disabled [checked]="true">Checked</ecw-radio>
      </div>
    `,
  }),
};
