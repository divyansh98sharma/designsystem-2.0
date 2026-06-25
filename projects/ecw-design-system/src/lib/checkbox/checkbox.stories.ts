import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EcwCheckboxComponent } from './checkbox.component';

const meta: Meta<EcwCheckboxComponent> = {
  title: 'Components/Checkbox',
  component: EcwCheckboxComponent,
  decorators: [moduleMetadata({ imports: [EcwCheckboxComponent] })],
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
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
          'The design-system checkbox (PE-256841), token-driven from the Figma `checkbox` ' +
          'component tokens. Wraps a visually-hidden native `<input type="checkbox">` for full ' +
          'keyboard/focus/form behaviour. States: unchecked, checked, indeterminate — each with ' +
          'default/hover/disabled treatments. Single size (16px) per the tokens.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<EcwCheckboxComponent>;

/** Interactive playground driven by controls. */
export const Playground: Story = {
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ecw-checkbox
        [checked]="checked"
        [indeterminate]="indeterminate"
        [disabled]="disabled"
        [required]="required"
        [ariaLabel]="ariaLabel"
      >Label</ecw-checkbox>
    `,
  }),
};

/** The three selection states. */
export const States: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:12px; align-items:flex-start;">
        <ecw-checkbox>Unchecked</ecw-checkbox>
        <ecw-checkbox [checked]="true">Checked</ecw-checkbox>
        <ecw-checkbox [indeterminate]="true">Indeterminate</ecw-checkbox>
      </div>
    `,
  }),
};

/** Disabled across all three states. */
export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:12px; align-items:flex-start;">
        <ecw-checkbox disabled>Unchecked</ecw-checkbox>
        <ecw-checkbox disabled [checked]="true">Checked</ecw-checkbox>
        <ecw-checkbox disabled [indeterminate]="true">Indeterminate</ecw-checkbox>
      </div>
    `,
  }),
};

/** A checkbox with no projected label needs an ariaLabel for screen readers. */
export const NoLabel: Story = {
  render: () => ({
    template: `<ecw-checkbox ariaLabel="Select row"></ecw-checkbox>`,
  }),
};
