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
  theme: { mode = 'light' as const, token = {}, ...restTheme } = {},
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
    <ConfigProvider prefixCls={prefixCls} theme={{ ...restTheme, algorithm, token: { ...token, mode, motion: false } }}>
      <GlobalCssVariables mode={mode} />
      {children}
    </ConfigProvider>
  );
};

const GlobalCssVariables: React.FC<{ mode: 'light' | 'dark' }> = ({ mode }) => {
  const { token } = theme.useToken();

  const exposedTokens = useMemo(
    () => ({
      '--grl-color-border': token.colorBorder,
      '--grl-color-border-hover': mode === 'light' ? '#c3c3c3' : '#555555',
      '--grl-color-border-fade': mode === 'light' ? '#eef0f5' : '#333333',
      '--grl-color-primary': token.colorPrimary,
      '--grl-color-primary-bg': token.colorPrimaryBg,
      '--grl-color-primary-bg-fade': mode === 'light' ? '#f8fafc' : '#141414',
      '--grl-color-primary-bg-hover': token.colorPrimaryBgHover,
      '--grl-color-primary-border': token.colorPrimaryBorder,
      '--grl-color-primary-border-hover': token.colorPrimaryBorderHover,
      '--grl-color-primary-text-hover': token.colorPrimaryTextHover,
      '--grl-color-success': token.colorSuccess,
      '--grl-color-success-bg': token.colorSuccessBg,
      '--grl-color-success-border': token.colorSuccessBorder,
      '--grl-color-error': token.colorError,
      '--grl-color-error-bg': token.colorErrorBg,
      '--grl-color-error-border': token.colorErrorBorder,
      '--grl-color-warning': token.colorWarning,
      '--grl-color-warning-bg': token.colorWarningBg,
      '--grl-color-warning-border': token.colorWarningBorder,
      '--grl-color-warning-text': token.colorWarningText,
      '--grl-color-info': token.colorInfo,
      '--grl-color-info-bg': token.colorInfoBg,
      '--grl-color-info-border': token.colorInfoBorder,
      '--grl-color-info-text': token.colorInfoText,
      '--grl-color-bg-layout': token.colorBgLayout,
      '--grl-color-bg-mask': token.colorBgMask,
      '--grl-color-bg-elevated': token.colorBgElevated,
      '--grl-color-bg-container': token.colorBgContainer,
      '--grl-color-bg-container-disabled': token.colorBgContainerDisabled,
      '--grl-color-bg-text-hover': token.colorBgTextHover,
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

      '--grl-decision-table-output': mode === 'light' ? '#eaeaea' : '#091422',
      '--grl-decision-table-selected-row': mode === 'light' ? '#f4faff' : '#121720',

      '--node-color-blue': 'var(--grl-color-primary)',
      '--node-color-purple': '#7c4dff',
      '--node-color-orange': '#f76d40',
      '--node-color-green': '#10ac84',
    }),
    [token, mode],
  );

  const cssBlock = Object.entries(exposedTokens)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');

  return <style dangerouslySetInnerHTML={{ __html: `:root {\n${cssBlock}\n}` }} />;
};
