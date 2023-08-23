// @ts-ignore
import React, { useEffect, useState } from 'react'
import { Preview } from '@storybook/react'
import { JdmConfigProvider } from '../src'
import { addons } from '@storybook/addons'
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode'

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
}

const channel = addons.getChannel()

const preview: Preview = {
  decorators: [
    (Story) => {
      const [isDark, setDark] = useState(true)

      useEffect(() => {
        channel.on(DARK_MODE_EVENT_NAME, setDark)
        return () => channel.off(DARK_MODE_EVENT_NAME, setDark)
      }, [channel, setDark])

      return (
        <JdmConfigProvider theme={{ mode: isDark ? 'dark' : 'light' }}>
          <style
            dangerouslySetInnerHTML={{
              __html: `html { background-color: ${
                isDark ? '#1f1f1f' : 'white'
              } }
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
      )
    },
  ],
}

export default preview
