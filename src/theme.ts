import { ThemeConfig as AntThemeConfig } from 'antd'

export type ThemeConfig = Omit<AntThemeConfig, 'algorithm'>
