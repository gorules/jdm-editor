import * as ZenEngineWasm from '@gorules/zen-engine-wasm';
import type { Preview } from '@storybook/react';
import * as React from 'react';
import { useDarkMode } from 'storybook-dark-mode';

import { JdmConfigProvider } from '../src';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
await ZenEngineWasm.default();

(window as any).VariableType = ZenEngineWasm.VariableType;
(window as any).Variable = ZenEngineWasm.Variable;

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
  parameters: {
    layout: 'fullscreen',
  },
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
