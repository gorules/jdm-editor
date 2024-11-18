import { CloseOutlined } from '@ant-design/icons';
import { Button, Tooltip, Typography } from 'antd';
import React, { useMemo } from 'react';

import { useDecisionGraphActions, useDecisionGraphState } from './context/dg-store.context';

export const GraphPanel: React.FC = () => {
  const graphActions = useDecisionGraphActions();
  const { panels, activePanel: activePanelId } = useDecisionGraphState(({ panels, activePanel }) => ({
    panels,
    activePanel,
  }));

  const activePanel = useMemo(() => {
    return activePanelId === undefined ? undefined : (panels || []).find((panel) => panel.id === activePanelId);
  }, [activePanelId, panels]);

  if (!activePanel) return null;
  return (
    <div className={'grl-dg__panel'}>
      <div className={'grl-dg__panel__toolbar'}>
        <div className={'grl-dg__panel__toolbar__content'}>
          <Typography.Text>{activePanel.title}</Typography.Text>
        </div>
        <div className={'grl-dg__panel__toolbar__actions'}>
          <Tooltip placement='topLeft' title={'Close panel'}>
            <Button
              size={'small'}
              type={'text'}
              icon={<CloseOutlined />}
              onClick={() => graphActions.setActivePanel(undefined)}
            />
          </Tooltip>
        </div>
      </div>
      <div className={'grl-dg__panel__content'}>{activePanel?.renderPanel?.({})}</div>
    </div>
  );
};
