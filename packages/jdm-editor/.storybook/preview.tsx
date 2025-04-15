// @ts-ignore
import * as ZenEngineWasm from '@gorules/zen-engine-wasm';
import { Preview } from '@storybook/react';
import * as React from 'react';
import { useDarkMode } from 'storybook-dark-mode';

import { JdmConfigProvider } from '../src';

// @ts-ignore
await ZenEngineWasm.default();

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  parameters: {
    controls: { expanded: true },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const preview: Preview = {
  decorators: [
    (Story) => {
      const isDark = useDarkMode();

      return (
        <JdmConfigProvider theme={{ mode: isDark ? 'dark' : 'light' }}>
          <style
            dangerouslySetInnerHTML={{
              __html: `html { background-color: ${isDark ? '#1f1f1f' : 'white'} }
              body {
                height: 100vh;
                padding: 0 !important;
              }
              #storybook-root {
                height: 100%;
              }
              `,
            }}
          />
          <Story />
        </JdmConfigProvider>
      );
    },
  ],
};

export default preview;
