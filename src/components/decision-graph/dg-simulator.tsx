import { ClearOutlined, CloseOutlined, FormatPainterOutlined, PlayCircleOutlined } from '@ant-design/icons';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-json5';
import 'ace-builds/src-noconflict/theme-chrome';
import 'ace-builds/src-noconflict/theme-github_dark';
import { Button, Spin, Tooltip, Typography, notification, theme } from 'antd';
import clsx from 'clsx';
import json5 from 'json5';
import React, { useMemo, useState } from 'react';
import ReactAce from 'react-ace';
import { P, match } from 'ts-pattern';

import {
  useDecisionGraphActions,
  useDecisionGraphListeners,
  useDecisionGraphRaw,
  useDecisionGraphState,
} from './context/dg-store.context';
import { NodeKind } from './nodes/specifications/specification-types';

export const GraphSimulator: React.FC = () => {
  const { token } = theme.useToken();
  const { stateStore } = useDecisionGraphRaw();
  const graphActions = useDecisionGraphActions();
  const { onSimulationRun } = useDecisionGraphListeners(({ onSimulationRun }) => ({ onSimulationRun }));
  const { simulate, simulatorOpen, simulatorRequest, simulatorLoading, nodeTypes } = useDecisionGraphState(
    ({ simulate, simulatorOpen, simulatorRequest, simulatorLoading, decisionGraph }) => ({
      simulate,
      simulatorOpen,
      simulatorRequest,
      simulatorLoading,
      nodeTypes: (decisionGraph.nodes ?? []).reduce<Record<string, string | undefined>>(
        (acc, curr) => ({
          ...acc,
          [curr.id]: curr.type,
        }),
        {},
      ),
    }),
  );

  const [selectedNode, setSelectedNode] = useState<string>('graph');

  const simulateResult = match(simulate)
    .with({ result: P._ }, ({ result }) => result)
    .otherwise(() => undefined);

  const codeEditorTheme = useMemo(() => {
    return match(token.mode)
      .with('dark', () => 'github_dark')
      .otherwise(() => 'chrome');
  }, [token.mode]);

  const runSimulation = async () => {
    try {
      const response = await graphActions.runSimulator();
      if (response && typeof response === 'object' && 'error' in response) {
        notification.error({
          message: response?.error?.title ?? 'Node error',
          placement: 'top',
          description: response?.error?.message,
        });
      }
    } catch (e) {
      const description = match(e)
        .with({ message: P._ }, ({ message }) => message?.toString())
        .otherwise(() => undefined);

      notification.error({
        message: 'Simulation failed',
        placement: 'top',
        description,
      });
    }
  };

  if (!simulatorOpen || !onSimulationRun) {
    return null;
  }

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
                  if ((simulatorRequest || '').trim().length === 0) {
                    return;
                  }

                  try {
                    stateStore.setState({
                      simulatorRequest: json5.stringify(json5.parse(simulatorRequest || ''), null, 2),
                    });
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
              loading={simulatorLoading}
              icon={<PlayCircleOutlined />}
              onClick={runSimulation}
            >
              Run
            </Button>
          </div>
        </div>
        <div className={'grl-dg__simulator__section__content'}>
          <ReactAce
            value={simulatorRequest}
            onChange={(e) => {
              graphActions.setSimulatorRequest(e);
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
            <Tooltip title={'Clear'}>
              <Button
                size={'small'}
                type={'text'}
                icon={<ClearOutlined />}
                onClick={() => {
                  stateStore.setState({ simulate: undefined });
                  setSelectedNode('graph');
                }}
              />
            </Tooltip>
          </div>
        </div>
        <div className={'grl-dg__simulator__section__content'}>
          <Spin spinning={simulatorLoading}>
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
          <div className={'grl-dg__simulator__section__bar__actions'}>
            <Tooltip title={'Close panel'}>
              <Button
                size={'small'}
                type={'text'}
                icon={<CloseOutlined />}
                onClick={() => graphActions.toggleSimulator()}
              />
            </Tooltip>
          </div>
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
