import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import {
  EcwBreadcrumbsComponent,
  EcwBreadcrumbItem,
} from './breadcrumbs.component';

const trail = (n: number): EcwBreadcrumbItem[] =>
  Array.from({ length: n }, (_, i) => ({
    label: i === n - 1 ? 'Current page' : `Level ${i + 1}`,
    href: i === n - 1 ? undefined : '#',
  }));

const meta: Meta<EcwBreadcrumbsComponent> = {
  title: 'Components/Breadcrumbs',
  component: EcwBreadcrumbsComponent,
  decorators: [moduleMetadata({ imports: [EcwBreadcrumbsComponent] })],
  argTypes: {
    maxItems: { control: 'number' },
    itemsBeforeCollapse: { control: 'number' },
    itemsAfterCollapse: { control: 'number' },
    ariaLabel: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The design-system breadcrumb trail (PE-256838), token-driven from the Figma ' +
          '`breadcrumbs` component tokens. Renders a native `<nav><ol>` of links separated by ' +
          'chevrons; the last item is the current page (semibold, `aria-current="page"`). ' +
          'Long trails collapse the middle items into a "…" trigger that opens a popover. ' +
          'Light/dark via `[data-theme="dark"]`.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<EcwBreadcrumbsComponent>;

/** Interactive playground driven by controls. */
export const Playground: Story = {
  args: {
    items: trail(5),
    maxItems: 4,
    itemsBeforeCollapse: 1,
    itemsAfterCollapse: 1,
    ariaLabel: 'Breadcrumb',
  },
  render: (args) => ({
    props: args,
    template: `
      <ecw-breadcrumbs
        [items]="items"
        [maxItems]="maxItems"
        [itemsBeforeCollapse]="itemsBeforeCollapse"
        [itemsAfterCollapse]="itemsAfterCollapse"
        [ariaLabel]="ariaLabel"
      ></ecw-breadcrumbs>
    `,
  }),
};

/** The Figma levels: 1, 2, 3 render every item. */
export const Levels: Story = {
  render: () => ({
    props: { l1: trail(1), l2: trail(2), l3: trail(3) },
    template: `
      <div style="display:flex; flex-direction:column; gap:16px; align-items:flex-start;">
        <ecw-breadcrumbs [items]="l1"></ecw-breadcrumbs>
        <ecw-breadcrumbs [items]="l2"></ecw-breadcrumbs>
        <ecw-breadcrumbs [items]="l3"></ecw-breadcrumbs>
      </div>
    `,
  }),
};

/** Level 4+ collapses the middle into a "…" (no popover until clicked). */
export const Collapsed: Story = {
  render: () => ({
    props: { items: trail(6) },
    template: `<ecw-breadcrumbs [items]="items"></ecw-breadcrumbs>`,
  }),
};

/** Click the "…" to open the popover listing the collapsed items. */
export const WithPopover: Story = {
  render: () => ({
    props: {
      items: [
        { label: 'Home', href: '#' },
        { label: 'Library', href: '#' },
        { label: 'Components', href: '#' },
        { label: 'Navigation', href: '#' },
        { label: 'Breadcrumbs' },
      ] as EcwBreadcrumbItem[],
    },
    template: `
      <div style="padding-bottom:80px;">
        <ecw-breadcrumbs [items]="items" [maxItems]="3"></ecw-breadcrumbs>
      </div>
    `,
  }),
};

/** Dark mode — opt in with `data-theme="dark"` on any ancestor. */
export const DarkMode: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => ({
    props: { l3: trail(3), l6: trail(6) },
    template: `
      <div data-theme="dark" style="display:flex; flex-direction:column; gap:16px; align-items:flex-start; padding:24px 24px 80px; background:#0f172a; border-radius:8px;">
        <ecw-breadcrumbs [items]="l3"></ecw-breadcrumbs>
        <ecw-breadcrumbs [items]="l6" [maxItems]="4"></ecw-breadcrumbs>
      </div>
    `,
  }),
};
