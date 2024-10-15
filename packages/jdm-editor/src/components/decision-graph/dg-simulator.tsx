import { ClearOutlined, FormatPainterOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { VariableType } from '@gorules/zen-engine-wasm';
import 'ace-builds/src-noconflict/ext-language_tools.js';
import 'ace-builds/src-noconflict/mode-json5.js';
import 'ace-builds/src-noconflict/theme-chrome.js';
import 'ace-builds/src-noconflict/theme-github_dark.js';
import { Button, Spin, Tooltip, Typography, notification, theme } from 'antd';
import clsx from 'clsx';
import json5 from 'json5';
import React, { useEffect, useMemo, useState } from 'react';
import ReactAce from 'react-ace';
import { P, match } from 'ts-pattern';

import { isWasmAvailable } from '../../helpers/wasm';
import {
  type DecisionGraphType,
  NodeTypeKind,
  useDecisionGraphRaw,
  useDecisionGraphState,
} from './context/dg-store.context';
import { NodeKind } from './nodes/specifications/specification-types';

type GraphSimulatorProps = {
  defaultRequest?: string;
  onChange?: (val: string) => void;
  onRun?: (payload: { graph: DecisionGraphType; context: unknown }) => void;
  onClear?: () => void;
  loading?: boolean;
};

export const GraphSimulator: React.FC<GraphSimulatorProps> = ({
  defaultRequest,
  onChange,
  onRun,
  onClear,
  loading = false,
}) => {
  const { token } = theme.useToken();
  const [requestValue, setRequestValue] = useState(defaultRequest);

  const { stateStore, actions } = useDecisionGraphRaw();
  const { nodeTypes, simulate } = useDecisionGraphState(({ decisionGraph, simulate }) => ({
    simulate,
    nodeTypes: (decisionGraph.nodes ?? []).reduce<Record<string, string | undefined>>(
      (acc, curr) => ({
        ...acc,
        [curr.id]: curr.type,
      }),
      {},
    ),
  }));

  const [selectedNode, setSelectedNode] = useState<string>('graph');

  const simulateResult = match(simulate)
    .with({ result: P._ }, ({ result }) => result)
    .otherwise(() => undefined);

  const codeEditorTheme = useMemo(() => {
    return match(token.mode)
      .with('dark', () => 'github_dark')
      .otherwise(() => 'chrome');
  }, [token.mode]);

  useEffect(() => {
    if (!isWasmAvailable()) {
      return;
    }

    const { decisionGraph } = stateStore.getState();
    const requestNode = decisionGraph.nodes.find((n) => n.type === 'inputNode');
    if (!requestNode) {
      return;
    }

    try {
      const value = requestValue ? json5.parse(requestValue) : 'Any';
      actions.setNodeType(requestNode.id, NodeTypeKind.Output, new VariableType(value));
    } catch {
      // Skip
    }
  }, [requestValue]);

  return (
    <div className={'grl-dg__simulator'}>
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
                  if ((requestValue || '').trim().length === 0) {
                    return;
                  }

                  try {
                    const formatted = json5.stringify(json5.parse(requestValue || ''), null, 2);

                    onChange?.(formatted);
                    setRequestValue(formatted);
                  } catch {
                    notification.error({
                      message: 'Invalid format',
                      description: 'Unable to format request, invalid JSON format',
                      placement: 'top',
                    });
                  }
                }}
              />
            </Tooltip>
            {onRun && (
              <Button
                size={'small'}
                type={'primary'}
                loading={loading}
                icon={<PlayCircleOutlined />}
                onClick={() => {
                  try {
                    const parsed = (requestValue || '').trim().length === 0 ? null : json5.parse(requestValue || '');
                    onRun?.({ graph: stateStore.getState().decisionGraph, context: parsed });
                  } catch {
                    notification.error({
                      message: 'Invalid format',
                      description: 'Unable to format request, invalid JSON format',
                      placement: 'top',
                    });
                  }
                }}
              >
                Run
              </Button>
            )}
          </div>
        </div>
        <div className={'grl-dg__simulator__section__content'}>
          <ReactAce
            value={requestValue}
            onChange={(e) => {
              setRequestValue(e);
              onChange?.(e);
            }}
            mode='json5'
            theme={codeEditorTheme}
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
            {onClear && (
              <Tooltip title={'Clear'}>
                <Button
                  size={'small'}
                  type={'text'}
                  icon={<ClearOutlined />}
                  onClick={() => {
                    onClear?.();
                    setSelectedNode('graph');
                  }}
                />
              </Tooltip>
            )}
          </div>
        </div>
        <div className={'grl-dg__simulator__section__content'}>
          <Spin spinning={loading}>
            <div className={'grl-dg__simulator__nodes-list'}>
              <div
                className={clsx('grl-dg__simulator__nodes-list__node', selectedNode === 'graph' && 'active')}
                onClick={() => setSelectedNode('graph')}
              >
                <Typography.Text>Graph</Typography.Text>
                <Typography.Text type={'secondary'}>
                  {match(simulate)
                    .with({ result: P._ }, ({ result }) => result?.performance)
                    .otherwise(() => undefined)}
                </Typography.Text>
              </div>
              {Object.entries(simulateResult?.trace ?? {})
                .filter(([, trace]) => ![NodeKind.Input, NodeKind.Output].includes(nodeTypes?.[trace?.id] as NodeKind))
                .map(([nodeId, trace]) => (
                  <div
                    key={nodeId}
                    className={clsx('grl-dg__simulator__nodes-list__node', nodeId === selectedNode && 'active')}
                    onClick={() => setSelectedNode(nodeId)}
                  >
                    <Typography.Text>{trace.name}</Typography.Text>
                    <Typography.Text type={'secondary'}>{trace.performance}</Typography.Text>
                  </div>
                ))}
            </div>
          </Spin>
        </div>
      </div>
      <div className={'grl-dg__simulator__section grl-dg__simulator__response'}>
        <div className={'grl-dg__simulator__section__bar grl-dg__simulator__section__bar--response'}>
          <Typography.Text>Response</Typography.Text>
        </div>
        <div className={'grl-dg__simulator__section__content'}>
          <ReactAce
            value={match(simulate)
              .with({ result: P._ }, ({ result }) =>
                match(selectedNode)
                  .with('graph', () => json5.stringify(result?.result ?? {}, undefined, 2))
                  .otherwise(() => {
                    const { input, output, traceData } = result?.trace[selectedNode] ?? {};
                    return json5.stringify({ input, output, traceData }, undefined, 2);
                  }),
              )
              .otherwise(() => '')}
            readOnly
            mode='json5'
            theme={codeEditorTheme}
            width='100%'
            height='100%'
            tabSize={2}
            setOptions={{ useWorker: false }}
          />
        </div>
      </div>
    </div>
  );
};
