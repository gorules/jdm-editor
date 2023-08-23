import { theme } from 'antd';
import React, { forwardRef } from 'react';

import { DecisionGraphContextProps, DecisionGraphProvider } from './context/dg-store.context';
import { DecisionGraphEmpty, DecisionGraphEmptyType } from './dg-empty';
import { DecisionGraphWrapper } from './dg-wrapper';
import './dg.scss';
import { GraphRef } from './graph/graph';

export type DecisionGraphProps = {
  manager?: any;
  components?: {
    type: string;
    icon?: React.ReactNode;
    form?: React.ReactNode;
  }[];
} & DecisionGraphContextProps &
  DecisionGraphEmptyType;

export const DecisionGraph = forwardRef<GraphRef, DecisionGraphProps>(({ manager: _, ...props }, ref) => {
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
        <DecisionGraphWrapper ref={ref} />
        <DecisionGraphEmpty {...props} />
      </DecisionGraphProvider>
    </div>
  );
});
