import { ClearOutlined, CopyOutlined, FormatPainterOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { VariableType } from '@gorules/zen-engine-wasm';
import { Editor } from '@monaco-editor/react';
import { Button, Spin, Tooltip, Typography, message, notification, theme } from 'antd';
import clsx from 'clsx';
import json5 from 'json5';
import React, { useEffect, useMemo, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { P, match } from 'ts-pattern';

import '../../helpers/monaco';
import { usePersistentState } from '../../helpers/use-persistent-state';
import { copyToClipboard } from '../../helpers/utility';
import { isWasmAvailable } from '../../helpers/wasm';
import { NodeTypeKind, useDecisionGraphRaw, useDecisionGraphState } from './context/dg-store.context';
import { type DecisionGraphType } from './dg-types';
import { NodeKind } from './nodes/specifications/specification-types';
import type { SimulationTrace } from './types/simulation.types';

enum SimulationSegment {
  Output = 'Output',
  Input = 'Input',
  Trace = 'Trace',
}

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
  const [search, setSearch] = usePersistentState<string>('simulation.search', '');
  const [segment, setSegment] = usePersistentState<SimulationSegment>('simulation.segment', SimulationSegment.Output);

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

  const traces = useMemo<Array<SimulationTrace & { nodeId: string }>>(() => {
    if (!simulate) {
      return [];
    }

    if (!('result' in simulate)) {
      return [];
    }

    return Object.entries(simulate.result?.trace ?? {})
      .map(([key, data]) => ({ ...data, nodeId: key }))
      .filter((t) => ![NodeKind.Input, NodeKind.Output].includes(nodeTypes?.[t.nodeId] as NodeKind))
      .filter((t) => t.name.toLowerCase().includes(search?.toLowerCase() ?? ''))
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [simulate, search]);

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
          <input
            className='grl-dg__simulator__search'
            type='text'
            placeholder='Search nodes...'
            onChange={(e) => setSearch(e.target.value)}
          />
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
              {'graph'.includes(search?.toLowerCase() ?? '') && (
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
              )}
              {traces.map((trace) => (
                <div
                  key={trace.nodeId}
                  className={clsx('grl-dg__simulator__nodes-list__node', trace.nodeId === selectedNode && 'active')}
                  onClick={() => setSelectedNode(trace.nodeId)}
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
          <div>
            {Object.values(SimulationSegment).map((v) => (
              <Button
                className='grl-dg__simulator__segmentButton'
                key={v}
                size='small'
                type='text'
                data-active={segment === v}
                onClick={() => setSegment(v)}
              >
                {v}
              </Button>
            ))}
          </div>
        </div>
        <div className={'grl-dg__simulator__section__content'}>
          <SimulatorEditor
            readOnly
            value={match(simulate)
              .with({ result: P._ }, ({ result }) =>
                match(selectedNode)
                  .with('graph', () =>
                    displaySegment(
                      {
                        traceData: result?.trace,
                        output: result?.result,
                      },
                      segment ?? SimulationSegment.Output,
                    ),
                  )
                  .otherwise(() => displaySegment(result?.trace[selectedNode], segment ?? SimulationSegment.Output)),
              )
              .otherwise(() => '')}
          />
        </div>
      </Panel>
    </PanelGroup>
  );
};

const displaySegment = (data: unknown, segment: SimulationSegment) => {
  const jsonData = match([segment, data])
    .with([SimulationSegment.Output, { output: P._ }], ([, { output }]) => output)
    .with([SimulationSegment.Input, { input: P._ }], ([, { input }]) => input)
    .with([SimulationSegment.Trace, { trace: P._ }], ([, { trace }]) => trace)
    .with([SimulationSegment.Trace, { traceData: P._ }], ([, { traceData }]) => traceData)
    .otherwise(() => ({}));

  return json5.stringify(jsonData, undefined, 2);
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
