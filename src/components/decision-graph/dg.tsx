import { theme } from 'antd';
import type { DragDropManager } from 'dnd-core';
import React, { forwardRef } from 'react';

import type { DecisionGraphContextProps } from './context/dg-store.context';
import { DecisionGraphProvider } from './context/dg-store.context';
import type { DecisionGraphEmptyType } from './dg-empty';
import { DecisionGraphEmpty } from './dg-empty';
import type { DecisionGraphWrapperProps } from './dg-wrapper';
import { DecisionGraphWrapper } from './dg-wrapper';
import './dg.scss';
import type { GraphRef } from './graph/graph';

export type DecisionGraphProps = {
  manager?: DragDropManager;
} & DecisionGraphWrapperProps &
  DecisionGraphContextProps &
  DecisionGraphEmptyType;

export const DecisionGraph = forwardRef<GraphRef, DecisionGraphProps>(
  ({ manager: _, reactFlowProOptions, hideExportImport, ...props }, ref) => {
    const { token } = theme.useToken();

    return (
      <div
        className={'grl-dg'}
        style={
          {
            '--color-border': token.colorBorder,
            '--color-primary': token.colorPrimary,
            '--color-primary-bg': token.colorPrimaryBg,
            '--color-primary-border': token.colorPrimaryBorder,
            '--color-primary-border-hover': token.colorPrimaryBorderHover,
            '--color-bg-layout': token.colorBgLayout,
            '--color-bg-elevated': token.colorBgElevated,
            '--color-bg-container': token.colorBgContainer,
            '--color-bg-container-disabled': token.colorBgContainerDisabled,
            '--color-error-bg': token.colorErrorBg,
            '--color-error-border': token.colorErrorBorder,
            '--color-primary-hover': token.colorPrimaryHover,
            '--color-primary-active': token.colorPrimaryActive,
            '--color-text': token.colorText,
          } as any
        }
      >
        <DecisionGraphProvider>
          <DecisionGraphWrapper
            reactFlowProOptions={reactFlowProOptions}
            hideExportImport={hideExportImport}
            ref={ref}
          />
          <DecisionGraphEmpty {...props} />
        </DecisionGraphProvider>
      </div>
    );
  },
);
