import type { ThemeConfig as AntThemeConfig } from 'antd';
import { ConfigProvider, theme as antTheme, theme } from 'antd';
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
      <GlobalCssVariables />
      {children}
    </ConfigProvider>
  );
};

const GlobalCssVariables = () => {
  const { token } = theme.useToken();

  console.log(token);

  const exposedTokens = useMemo(
    () => ({
      '--grl-color-border': token.colorBorder,
      '--grl-color-primary': token.colorPrimary,
      '--grl-color-primary-bg': token.colorPrimaryBg,
      '--grl-color-primary-border': token.colorPrimaryBorder,
      '--grl-color-primary-border-hover': token.colorPrimaryBorderHover,
      '--grl-color-primary-text-hover': token.colorPrimaryTextHover,
      '--grl-color-bg-layout': token.colorBgLayout,
      '--grl-color-bg-elevated': token.colorBgElevated,
      '--grl-color-bg-container': token.colorBgContainer,
      '--grl-color-bg-container-disabled': token.colorBgContainerDisabled,
      '--grl-color-error-bg': token.colorErrorBg,
      '--grl-color-error-border': token.colorErrorBorder,
      '--grl-color-primary-hover': token.colorPrimaryHover,
      '--grl-color-primary-active': token.colorPrimaryActive,
      '--grl-color-text': token.colorText,
      '--grl-color-text-placeholder': token.colorTextPlaceholder,
      '--grl-color-text-base': token.colorTextBase,
      '--grl-color-text-disabled': token.colorTextDisabled,
      '--grl-color-text-secondary': token.colorTextSecondary,
      '--grl-control-outline': token.controlOutline,
      '--grl-primary-color': token.colorPrimary,
      '--grl-primary-color-bg': token.colorPrimaryBg,
      '--grl-font-family': token.fontFamily,
      '--grl-line-height': token.lineHeight,
      '--grl-border-radius': `${token.borderRadius}px`,
    }),
    [token],
  );

  const cssBlock = Object.entries(exposedTokens)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');

  return <style dangerouslySetInnerHTML={{ __html: `:root {\n${cssBlock}\n}` }} />;
};
