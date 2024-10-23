import { ClearOutlined, CopyOutlined, FormatPainterOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { VariableType } from '@gorules/zen-engine-wasm';
import { Editor } from '@monaco-editor/react';
import { Button, Spin, Tooltip, Typography, message, notification, theme } from 'antd';
import clsx from 'clsx';
import json5 from 'json5';
import React, { useEffect, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { P, match } from 'ts-pattern';

import '../../helpers/monaco';
import { copyToClipboard } from '../../helpers/utility';
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
      actions.setNodeType(requestNode.id, NodeTypeKind.InferredOutput, new VariableType(value));
    } catch {
      // Skip
    }
  }, [requestValue]);

  return (
    <PanelGroup className='grl-dg__simulator' direction='horizontal' autoSaveId='jdm-editor:simulator:layout'>
      <Panel minSize={20} defaultSize={30} className='grl-dg__simulator__section grl-dg__simulator__request'>
        <div className={'grl-dg__simulator__section__bar grl-dg__simulator__section__bar--request'}>
          <Typography.Text>Request (json5)</Typography.Text>
          <div className={'grl-dg__simulator__section__bar__actions'}>
            <Tooltip title='Copy JSON to Clipboard'>
              <Button
                type={'text'}
                size={'small'}
                icon={<CopyOutlined />}
                onClick={async () => {
                  try {
                    await copyToClipboard(JSON.stringify(json5.parse(requestValue ?? '')));
                    message.success('Copied to clipboard!');
                  } catch {
                    message.error('Failed to copy to clipboard.');
                  }
                }}
              />
            </Tooltip>
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
          <SimulatorEditor
            value={requestValue}
            onChange={(text) => {
              setRequestValue(text);
              onChange?.(text ?? '');
            }}
          />
        </div>
      </Panel>
      <PanelResizeHandle />
      <Panel minSize={20} maxSize={20} className={'grl-dg__simulator__section grl-dg__simulator__nodes'}>
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
      </Panel>
      <PanelResizeHandle />
      <Panel minSize={30} defaultSize={50} className={'grl-dg__simulator__section grl-dg__simulator__response'}>
        <div className={'grl-dg__simulator__section__bar grl-dg__simulator__section__bar--response'}>
          <Typography.Text>Response</Typography.Text>
        </div>
        <div className={'grl-dg__simulator__section__content'}>
          <SimulatorEditor
            readOnly
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
          />
        </div>
      </Panel>
    </PanelGroup>
  );
};

type SimulatorEditorProps = {
  value?: string;
  onChange?: (value: string | undefined) => void;
  readOnly?: boolean;
};

const SimulatorEditor: React.FC<SimulatorEditorProps> = ({ value, onChange, readOnly }) => {
  const { token } = theme.useToken();

  return (
    <Editor
      loading={<Spin size='large' />}
      language='javascript'
      value={value}
      onChange={onChange}
      theme={token.mode === 'dark' ? 'vs-dark' : 'light'}
      height='100%'
      onMount={(editor, monaco) => {
        monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
          noSyntaxValidation: true,
        });

        monaco.languages.typescript.javascriptDefaults.setModeConfiguration({
          codeActions: false,
          inlayHints: false,
        });
      }}
      options={{
        readOnly: readOnly,
        automaticLayout: true,
        contextmenu: false,
        minimap: { enabled: false },
        fontSize: 12,
        fontFamily: 'var(--mono-font-family)',
        tabSize: 2,
        lineDecorationsWidth: 2,
        find: {
          addExtraSpaceOnTop: false,
          seedSearchStringFromSelection: 'never',
        },
        scrollbar: {
          verticalSliderSize: 4,
          verticalScrollbarSize: 4,
          horizontalScrollbarSize: 4,
          horizontalSliderSize: 4,
        },
        lineNumbersMinChars: 3,
      }}
    />
  );
};
