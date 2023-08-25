import type { ThemeConfig as AntThemeConfig } from 'antd';
import { ConfigProvider, theme as antTheme } from 'antd';
import React, { useMemo } from 'react';

declare module 'antd/es/theme/interface/alias' {
  export interface AliasToken {
    mode: 'dark' | 'light';
  }
}

export type ThemeConfig = Omit<AntThemeConfig, 'algorithm'> & {
  mode?: 'light' | 'dark';
};

export type JdmConfigProviderProps = {
  theme?: ThemeConfig;
  prefixCls?: string;
  children?: React.ReactNode;
};

export const JdmConfigProvider: React.FC<JdmConfigProviderProps> = ({
  theme: { mode, ...theme } = {},
  prefixCls,
  children,
}) => {
  const algorithm = useMemo(() => {
    switch (mode) {
      case 'dark':
        return antTheme.darkAlgorithm;
      case 'light':
      default:
        return antTheme.defaultAlgorithm;
    }
  }, [mode]);

  return (
    <ConfigProvider prefixCls={prefixCls} theme={{ ...theme, algorithm, token: { mode } }}>
      {children}
    </ConfigProvider>
  );
};
