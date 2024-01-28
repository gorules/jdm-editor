import { CloseOutlined, CloudDownloadOutlined, CloudUploadOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Tooltip, Typography } from 'antd';
import React, { useState } from 'react';

import { useDecisionGraphState } from '../context/dg-store.context';
import { GraphComponents } from './graph-components';

export const GraphAside = () => {
  const { decisionGraph, activeTab, disabled } = useDecisionGraphState(({ decisionGraph, activeTab, disabled }) => ({
    decisionGraph,
    activeTab,
    disabled,
  }));
  const inputNodes = (decisionGraph?.nodes || []).filter((node) => node.type === 'inputNode');
  const [menu, setMenu] = useState<string | undefined>('components');
  //
  // const onPaste = useCallback(async () => {
  //   try {
  //     await graphClipboard.pasteNodes();
  //   } catch (e) {
  //     message.error(e?.message);
  //   }
  // }, [graphClipboard]);

  return (
    <div className={'grl-dg__aside'}>
      <div className={'grl-dg__aside__side-bar'}>
        <Tooltip placement='right' title={<span style={{ fontSize: 12 }}>Components</span>}>
          <Button type={'primary'} icon={<PlusCircleOutlined />} onClick={() => setMenu('components')} />
        </Tooltip>
        <Tooltip placement='right' title={<span style={{ fontSize: 12 }}>Upload JSON</span>}>
          <Button type={'text'} icon={<CloudUploadOutlined />} onClick={() => {}} />
        </Tooltip>
        <Tooltip placement='right' title={<span style={{ fontSize: 12 }}>Download JSON</span>}>
          <Button type={'text'} icon={<CloudDownloadOutlined />} onClick={() => {}} />
        </Tooltip>
      </div>
      {menu && (
        <div className={'grl-dg__aside__menu'}>
          {menu === 'components' && (
            <>
              <div className={'grl-dg__aside__menu__heading'}>
                <div className={'grl-dg__aside__menu__heading__text'}>
                  <Typography.Text strong style={{ marginBottom: 0 }}>
                    Components
                  </Typography.Text>
                </div>
                <Button type={'text'} size='small' icon={<CloseOutlined />} onClick={() => setMenu(undefined)}></Button>
              </div>
              <div className={'grl-dg__aside__menu__content'}>
                <div className={'grl-dg__aside__menu__content__inner'}>
                  <GraphComponents
                    inputDisabled={inputNodes.length > 0}
                    onClose={() => setMenu(undefined)}
                    disabled={activeTab !== 'graph' || disabled}
                    onPaste={() => {
                      // TODO
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
