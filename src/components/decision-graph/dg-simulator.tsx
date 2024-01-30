import { ClearOutlined, CloseOutlined, FormatPainterOutlined } from '@ant-design/icons';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-json5';
import 'ace-builds/src-noconflict/theme-chrome';
import 'ace-builds/src-noconflict/theme-github_dark';
import { Button, Spin, Tooltip, Typography, notification } from 'antd';
import clsx from 'clsx';
import json5 from 'json5';
import React, { useMemo, useState } from 'react';
import ReactAce from 'react-ace';

import type { DecisionNode } from './context/dg-store.context';

export type GraphSimulatorProps = {
  onRun?: (val: unknown) => void;
  onClose?: () => void;
  onClear?: () => void;
  open?: boolean;

  nodes: DecisionNode[];

  loading?: boolean;
  simulate?: any;
};

export const GraphSimulator: React.FC<GraphSimulatorProps> = ({
  onRun,
  onClose,
  onClear,
  nodes,
  simulate,
  loading = false,
}) => {
  const [requestValue, setRequestValue] = useState('');
  const [selectedNode, setSelectedNode] = useState<string>('graph');

  const theme = useMemo(() => {
    // return 'github_dark';
    return 'chrome';
  }, []);

  const output = useMemo(() => {
    if (selectedNode) {
      return simulate?.result?.trace?.[selectedNode];
    }
    return simulate?.result?.result;
  }, [simulate?.result, selectedNode]);

  console.log(selectedNode);

  const mappedNodes = useMemo(() => {
    return [
      {
        key: 'graph',
        type: 'graph',
        label: 'Graph',
        meta: {
          performance: '20ms',
        },
      },
      {
        key: '12345',
        type: 'decisionTableNode',
        label: 'Decision Table 1',
        meta: {
          performance: '20ms',
        },
      },
      {
        key: '12346',
        type: 'functionNode',
        label: 'Function Node 1',
        meta: {
          performance: '20ms',
        },
      },
    ];
  }, [simulate?.result]);

  return (
    <div className={'grl-dg__simulator'}>
      <div className={'grl-dg__simulator__sidebar'}></div>
      <div className={'grl-dg__simulator__section grl-dg__simulator__request'}>
        <div className={'grl-dg__simulator__section__bar grl-dg__simulator__section__bar--request'}>
          <Typography.Text>Request (json5)</Typography.Text>
          <div className={'grl-dg__simulator__section__bar__actions'}>
            <Tooltip title={'Format json'}>
              <Button
                size={'small'}
                type={'text'}
                icon={<FormatPainterOutlined />}
                onClick={() => {
                  if ((requestValue || '').trim()?.length === 0) return;
                  try {
                    setRequestValue(json5.stringify(json5.parse(requestValue), null, 2));
                  } catch (e) {
                    notification.error({
                      message: 'Invalid format',
                      description: 'Unable to format request, invalid JSON format',
                      placement: 'top',
                    });
                  }
                }}
              />
            </Tooltip>
            <Button
              size={'small'}
              type={'primary'}
              loading={loading}
              onClick={async () => {
                let context;
                try {
                  if (requestValue?.trim?.()?.length > 0) {
                    context = json5.parse(requestValue);
                  }
                  onRun?.(context);
                } catch (e) {
                  notification.error({
                    message: 'Simulation failed',
                    description: (e as any)?.message,
                    placement: 'top',
                  });
                }
              }}
            >
              Run
            </Button>
          </div>
        </div>
        <div className={'grl-dg__simulator__section__content'}>
          <ReactAce
            value={requestValue}
            onChange={(e) => {
              setRequestValue(e);
            }}
            mode='json5'
            theme={theme}
            width='100%'
            height='100%'
            tabSize={2}
            setOptions={{
              useWorker: false,
            }}
          />
        </div>
      </div>
      <div className={'grl-dg__simulator__section grl-dg__simulator__nodes'}>
        <div className={'grl-dg__simulator__section__bar grl-dg__simulator__section__bar--nodes'}>
          <Typography.Text>Nodes</Typography.Text>
          <div className={'grl-dg__simulator__section__bar__actions'}>
            <Tooltip title={'Clear'}>
              <Button
                size={'small'}
                type={'text'}
                icon={<ClearOutlined />}
                onClick={() => {
                  onClear?.();
                }}
              />
            </Tooltip>
          </div>
        </div>
        <div className={'grl-dg__simulator__section__content'}>
          <Spin spinning={loading}>
            <div className={'grl-dg__simulator__nodes-list'}>
              {mappedNodes.map((node) => (
                <div
                  key={node?.key}
                  className={clsx(
                    'grl-dg__simulator__nodes-list__node',
                    node?.key && node?.key === selectedNode && 'active',
                  )}
                  onClick={() => setSelectedNode(node?.key)}
                >
                  <Typography.Text>{node?.label}</Typography.Text>
                  <Typography.Text type={'secondary'}>{node?.meta?.performance}</Typography.Text>
                </div>
              ))}
            </div>
          </Spin>
        </div>
      </div>
      <div className={'grl-dg__simulator__section grl-dg__simulator__response'}>
        <div className={'grl-dg__simulator__section__bar grl-dg__simulator__section__bar--response'}>
          <Typography.Text>Response</Typography.Text>
          <div className={'grl-dg__simulator__section__bar__actions'}>
            <Tooltip title={'Close panel'}>
              <Button
                size={'small'}
                type={'text'}
                icon={<CloseOutlined />}
                onClick={() => {
                  onClose?.();
                }}
              />
            </Tooltip>
          </div>
        </div>
        <div className={'grl-dg__simulator__section__content'}>
          <ReactAce
            value={output}
            readOnly
            mode='json5'
            theme={theme}
            width='100%'
            height='100%'
            tabSize={2}
            setOptions={{
              useWorker: false,
            }}
          />
        </div>
      </div>
    </div>
  );
};
