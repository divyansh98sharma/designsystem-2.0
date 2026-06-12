import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EcwIconComponent } from '../icon/icon.component';
import { EcwButtonComponent } from './button.component';

const meta: Meta<EcwButtonComponent> = {
  title: 'Components/Button',
  component: EcwButtonComponent,
  // Docs page is authored in button.mdx (usage + guidelines), so the
  // auto-generated docs page is intentionally not enabled here.
  decorators: [moduleMetadata({ imports: [EcwButtonComponent, EcwIconComponent] })],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'white', 'error', 'warning'],
    },
    type: { control: 'inline-radio', options: ['button', 'submit', 'reset'] },
    disabled: { control: 'boolean' },
    leadingIcon: { control: 'text' },
    trailingIcon: { control: 'text' },
    iconFilled: { control: 'boolean' },
    iconOnly: { control: 'boolean' },
    ariaLabel: { control: 'text' },
    counter: { control: 'text' },
    alert: { control: 'boolean' },
    alertLabel: { control: 'text' },
    split: { control: 'boolean' },
    splitIcon: { control: 'text' },
    splitAriaLabel: { control: 'text' },
    splitExpanded: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The design-system button (PE-256839), token-driven from the Figma `button` ' +
          'component tokens. Variants: primary, secondary, white, error, warning. Supports ' +
          'leading/trailing icons, an icon-only mode, a counter pill, an alert-indicator dot, ' +
          'and an optional split ("divider") action. Wraps native `<button>` elements for full ' +
          'keyboard/focus/disabled behaviour. Single size (24px) per the tokens.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<EcwButtonComponent>;

/** Interactive playground driven by controls. */
export const Playground: Story = {
  args: {
    variant: 'primary',
    type: 'button',
    disabled: false,
    leadingIcon: '',
    trailingIcon: '',
    iconFilled: false,
    iconOnly: false,
    ariaLabel: '',
    counter: undefined,
    alert: false,
    alertLabel: 'New notifications',
    split: false,
    splitIcon: 'arrow_drop_down',
    splitAriaLabel: 'More actions',
    splitExpanded: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ecw-button
        [variant]="variant"
        [type]="type"
        [disabled]="disabled"
        [leadingIcon]="leadingIcon"
        [trailingIcon]="trailingIcon"
        [iconFilled]="iconFilled"
        [iconOnly]="iconOnly"
        [ariaLabel]="ariaLabel"
        [counter]="counter"
        [alert]="alert"
        [alertLabel]="alertLabel"
        [split]="split"
        [splitIcon]="splitIcon"
        [splitAriaLabel]="splitAriaLabel"
        [splitExpanded]="splitExpanded"
      >Button</ecw-button>
    `,
  }),
};

/** All five variants. */
export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
        <ecw-button variant="primary">Primary</ecw-button>
        <ecw-button variant="secondary">Secondary</ecw-button>
        <ecw-button variant="white">White</ecw-button>
        <ecw-button variant="error">Error</ecw-button>
        <ecw-button variant="warning">Warning</ecw-button>
      </div>
    `,
  }),
};

/** Default vs disabled (hover/active/focus-visible are interactive — try the canvas). */
export const States: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
        <ecw-button variant="primary">Default</ecw-button>
        <ecw-button variant="primary" disabled>Disabled</ecw-button>
      </div>
      <p style="font:12px Inter,system-ui; color:#717171; margin-top:12px;">
        Hover, active and focus-visible states are interactive. Tab to a button to see the focus ring.
      </p>
    `,
  }),
};

/** Leading icon, trailing icon, and icon-only (square). */
export const WithIcons: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
        <ecw-button variant="primary" leadingIcon="add">Add</ecw-button>
        <ecw-button variant="secondary" trailingIcon="arrow_forward">Next</ecw-button>
        <ecw-button variant="white" iconOnly leadingIcon="more_vert" ariaLabel="More options"></ecw-button>
      </div>
    `,
  }),
};

/** Counter pill and alert-indicator dot. */
export const CounterAndAlert: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:16px; flex-wrap:wrap; align-items:center;">
        <ecw-button variant="secondary" leadingIcon="filter_list" [counter]="3">Filters</ecw-button>
        <ecw-button variant="white" iconOnly leadingIcon="notifications" ariaLabel="Notifications" alert></ecw-button>
      </div>
    `,
  }),
};

/** Split / divider action (main + caret segment). */
export const Split: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:16px; flex-wrap:wrap; align-items:center;">
        <ecw-button variant="primary" split>Save</ecw-button>
        <ecw-button variant="secondary" leadingIcon="print" split splitAriaLabel="Print options">Print</ecw-button>
      </div>
    `,
  }),
};
