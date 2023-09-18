import type { ThemeConfig as AntThemeConfig } from 'antd';
import React from 'react';
declare module 'antd/es/theme/interface/alias' {
    interface AliasToken {
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
export declare const JdmConfigProvider: React.FC<JdmConfigProviderProps>;
//# sourceMappingURL=theme.d.ts.map