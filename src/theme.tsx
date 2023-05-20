import {
  ConfigProvider,
  ThemeConfig as AntThemeConfig,
  theme as antTheme,
} from 'antd'
import React, { useMemo } from 'react'

export type ThemeConfig = Omit<AntThemeConfig, 'algorithm'> & {
  mode?: 'light' | 'dark'
}

export type JdmConfigProviderProps = {
  theme?: ThemeConfig
  children?: React.ReactNode
}

export const JdmConfigProvider: React.FC<JdmConfigProviderProps> = ({
  theme: { mode, ...theme } = {},
  children,
}) => {
  const algorithm = useMemo(() => {
    switch (mode) {
      case 'dark':
        return antTheme.darkAlgorithm
      case 'light':
      default:
        return antTheme.defaultAlgorithm
    }
  }, [mode])

  return (
    <ConfigProvider theme={{ ...theme, algorithm }}>{children}</ConfigProvider>
  )
}
