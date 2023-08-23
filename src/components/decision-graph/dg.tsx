import { theme } from 'antd';
import React from 'react';

import { DecisionGraphContextProps, DecisionGraphProvider } from './context/dg-store.context';
import { DecisionGraphEmpty, DecisionGraphEmptyType } from './dg-empty';
import { DecisionGraphWrapper } from './dg-wrapper';
import './dg.scss';

export type DecisionGraphProps = {
  manager?: any;
  components?: {
    type: string;
    icon?: React.ReactNode;
    form?: React.ReactNode;
  }[];
} & DecisionGraphContextProps &
  DecisionGraphEmptyType;

export const DecisionGraph: React.FC<DecisionGraphProps> = ({ manager: _, ...props }) => {
  const { token } = theme.useToken();

  return (
    <div
      className={'grl-dg'}
      style={
        {
          '--border-color': token.colorBorder,
          '--primary-color': token.colorPrimary,
          '--primary-color-bg': token.colorPrimaryBg,
          '--color-bg-layout': token.colorBgLayout,
          '--color-bg-elevated': token.colorBgElevated,
          '--color-bg-container': token.colorBgContainer,
          'background': token.colorBgElevated,
        } as any
      }
    >
      <DecisionGraphProvider>
        <DecisionGraphWrapper />
        <DecisionGraphEmpty {...props} />
      </DecisionGraphProvider>
    </div>
  );
};
