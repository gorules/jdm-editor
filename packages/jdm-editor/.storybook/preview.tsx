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
  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', right: '🇺🇸', title: 'English' },
          { value: 'zh', right: '🇨🇳', title: '中文' },
        ],
      },
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story, context) => {
      const isDark = useDarkMode();
      const { locale } = context.globals;

      return (
        <JdmConfigProvider locale={locale} theme={{ mode: isDark ? 'dark' : 'light' }}>
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
