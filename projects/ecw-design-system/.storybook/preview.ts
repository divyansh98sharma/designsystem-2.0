import type { Preview } from '@storybook/angular'
import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";

// Global design-token layers (--ecw-* CSS variables: primitives -> semantics -> components)
// are injected via the `styles` option on the Storybook builder targets in angular.json,
// so they flow through Angular's CSS pipeline (which resolves the @import cascade).

setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;