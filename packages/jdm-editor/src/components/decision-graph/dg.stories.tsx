import { ApartmentOutlined, ApiOutlined, LeftOutlined, PlayCircleOutlined, RightOutlined } from '@ant-design/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Select, Space, Typography } from 'antd';
import json5 from 'json5';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { P, match } from 'ts-pattern';

import type { DictionaryMap } from '../../theme';
import type { JdmUiMode } from '../decision-table/context/dt-store.context';
import type { DecisionGraphSnapshot } from './context/serializer.context';
import type { DecisionGraphRef } from './dg';
import { DecisionGraph } from './dg';
import type { DecisionGraphType } from './dg-types';
import {
  defaultGraph,
  defaultGraphCustomNode,
  defaultGraphInputsFormCustomNode,
  defaultGraphUnknownNode,
  diffGraph,
} from './dg.stories-values';
import { calculateDiffGraph } from './diff/utility';
import type { GraphRef } from './graph/graph';
import { createJdmNode } from './nodes/custom-node';
import { GraphNode } from './nodes/graph-node';
import type { NodeSpecification } from './nodes/specifications/specification-types';
import { GraphSimulator } from './simulator/dg-simulator';
import type { Simulation } from './simulator/simulation.types';

const meta: Meta<typeof DecisionGraph> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Decision Graph',
  component: DecisionGraph,
  argTypes: {},
  args: {
    //
  },
};

export default meta;

type Story = StoryObj<typeof DecisionGraph>;

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState<any>(defaultGraph);

    return (
      <div
        style={{
          height: '100%',
        }}
      >
        <DecisionGraph {...args} value={value} onChange={(val) => setValue?.(val)} />
      </div>
    );
  },
};

export const Uncontrolled: Story = {
  render: (args) => {
    return (
      <div
        style={{
          height: '100%',
        }}
      >
        <DecisionGraph
          {...args}
          defaultValue={defaultGraph}
          onChange={(val) => {
            args?.onChange?.(val);
          }}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState<any>(defaultGraph);
    return (
      <div
        style={{
          height: '100%',
        }}
      >
        <DecisionGraph
          {...args}
          value={value}
          onChange={(val) => {
            setValue?.(val);
          }}
          disabled
        />
      </div>
    );
  },
};

const components: NodeSpecification[] = [
  {
    type: 'decisionNode',
    displayName: 'Decision',
    shortDescription: 'Execute decisions',
    icon: <ApartmentOutlined />,
    generateNode: () => ({ name: 'myDecision' }),
    renderNode: ({ specification, id, selected, data }) => (
      <GraphNode id={id} specification={specification} name={data.name} isSelected={selected}>
        <Select placeholder='Select decision from list' />
      </GraphNode>
    ),
  },
];

export const Extended: Story = {
  render: (args) => {
    const ref = useRef<GraphRef>(null);
    const [value, setValue] = useState<any>();

    return (
      <div
        style={{
          height: '100%',
        }}
      >
        <DecisionGraph {...args} ref={ref} value={value} onChange={(val) => setValue(val)} components={components} />
      </div>
    );
  },
};

const customNodes = [
  createJdmNode({
    kind: 'pingNode',
    displayName: 'Ping',
    group: 'ping',
    shortDescription: 'Used for ping',
  }),
  createJdmNode({
    kind: 'pongNode',
    displayName: 'Pong',
    group: 'ping',
    shortDescription: 'Used for pong',
  }),
  createJdmNode({
    kind: 'rightHandleNode',
    group: 'integrations',
    displayName: 'Right Handle',
    icon: <RightOutlined />,
    handleLeft: false,
  }),
  createJdmNode({
    kind: 'leftHandleNode',
    group: 'integrations',
    displayName: 'Left Handle',
    icon: <LeftOutlined />,
    handleRight: false,
  }),
  createJdmNode({
    kind: 'inputsNode',
    group: 'inputs',
    displayName: 'Inputs Form',
    shortDescription: 'With inputs map form',
    icon: <ApiOutlined />,
    inputs: [
      {
        control: 'text',
        name: 'hello.nested.something',
        label: 'First',
      },
      {
        control: 'text',
        name: 'second',
        label: 'Second',
      },
      {
        control: 'bool',
        name: 'checkbox',
        label: 'Checkbox',
      },
    ],
  }),
];

export const CustomNode: Story = {
  render: (args) => {
    const ref = useRef<GraphRef>(null);
    const [value, setValue] = useState<any>(defaultGraphCustomNode);

    return (
      <div
        style={{
          height: '100%',
        }}
      >
        <DecisionGraph
          customNodes={customNodes}
          {...args}
          ref={ref}
          value={value}
          onChange={(val) => setValue(val)}
          components={components}
        />
      </div>
    );
  },
};

export const InputFormCustomNode: Story = {
  render: (args) => {
    const ref = useRef<GraphRef>(null);
    const [value, setValue] = useState<any>(defaultGraphInputsFormCustomNode);

    return (
      <div
        style={{
          height: '100%',
        }}
      >
        <DecisionGraph
          customNodes={customNodes}
          {...args}
          ref={ref}
          value={value}
          onChange={(val) => setValue(val)}
          components={components}
        />
      </div>
    );
  },
};

const unknownCustomNodes = [
  createJdmNode({
    kind: 'pingNode',
    displayName: 'Ping',
    group: 'ping',
    shortDescription: 'Used for ping',
  }),
];

export const UnknownCustomNode: Story = {
  render: (args) => {
    const ref = useRef<GraphRef>(null);
    const [value, setValue] = useState<any>(defaultGraphUnknownNode);

    return (
      <div
        style={{
          height: '100%',
        }}
      >
        <DecisionGraph
          customNodes={unknownCustomNodes}
          {...args}
          ref={ref}
          value={value}
          onChange={(val) => setValue(val)}
          components={components}
        />
      </div>
    );
  },
};

export const Simulator: Story = {
  render: () => <DecisionGraphWithSimulator />,
};

export const Diff: Story = {
  render: (args) => {
    const [value, setValue] = useState<any>(diffGraph);
    const ref = useRef<DecisionGraphRef>(null);

    const enableDiff = (args as any)?.enableDiff;

    const innerValue = useMemo(() => {
      if (enableDiff)
        return calculateDiffGraph(value, diffGraph, {
          customNodes,
          components,
        });
      return value;
    }, [value, enableDiff, customNodes, components]);

    return (
      <div
        style={{
          height: '100%',
        }}
      >
        <DecisionGraph
          ref={ref}
          value={innerValue}
          disabled={enableDiff}
          onChange={(val) => {
            if (!(args as any)?.enableDiff) {
              setValue(val);
            }
          }}
          customNodes={customNodes}
          components={components}
        />
      </div>
    );
  },
  argTypes: {
    enableDiff: {
      control: { type: 'boolean' },
    },
  } as any,
};

const safeParse = (val?: string) => {
  try {
    return JSON.parse(val ?? '');
  } catch {
    return val;
  }
};

const mapSimulateError = (graph: DecisionGraphType, error: unknown) =>
  match(error)
    .with(
      {
        data: {
          type: P.optional(P.string),
          source: P.optional(P.string),
          nodeId: P.optional(P.string),
          trace: P.optional(P._),
        },
      },
      ({ data }) => {
        const error = {
          title: data.type,
          message: safeParse(data.source),
          data: { nodeId: data.nodeId },
        };

        return {
          error,
          result: {
            trace: data.trace as any,
            result: { error },
            performance: '',
            snapshot: graph,
          },
        } satisfies Simulation;
      },
    )
    .otherwise(() => undefined);

const DecisionGraphWithSimulator: React.FC = () => {
  const [value, setValue] = useState<any>(defaultGraph);
  const [simulate, setSimulate] = useState<Simulation>();

  const panels = useMemo(
    () => [
      {
        id: 'simulator',
        title: 'Simulator',
        icon: <PlayCircleOutlined />,
        hideHeader: true,
        renderPanel: () => (
          <GraphSimulator
            defaultRequest={json5.stringify(
              {
                customer: { country: 'US' },
                cart: { weight: 50 },
              },
              null,
              2,
            )}
            onRun={async ({ graph, context }) => {
              try {
                const response = await fetch('https://editor.gorules.io/api/simulate', {
                  method: 'POST',
                  body: JSON.stringify({ content: graph, context }),
                  headers: { 'content-type': 'application/json' },
                });

                const responseJson = await response.json();
                setSimulate({ result: { ...responseJson, snapshot: graph } });
              } catch (err) {
                setSimulate(mapSimulateError(graph, err));
              }
            }}
            onClear={() => {}}
          />
        ),
      },
    ],
    [],
  );

  return (
    <div
      style={{
        height: '100%',
      }}
    >
      <DecisionGraph
        value={value}
        simulate={simulate}
        defaultActivePanel={'simulator'}
        panels={panels}
        onChange={(val) => {
          setValue?.(val);
        }}
      />
    </div>
  );
};

export const View: Story = {
  args: {
    viewConfig: {
      enabled: true,
      description: 'Configure business rules for your decision model',
      permissions: {
        '359173d8-0068-45f8-bb71-8240ad73201d': 'edit:values',
        'a750cebf-ca75-4acd-a272-7040626abd73': 'edit:values',
      },
    },
    viewConfigCta: 'Configure',
  },
  render: (args) => {
    const [value, setValue] = useState<any>(defaultGraph);

    return (
      <div
        style={{
          height: '100%',
        }}
      >
        <DecisionGraph {...args} value={value} onChange={(val) => setValue?.(val)} />
      </div>
    );
  },
};

const DICTIONARIES: DictionaryMap = {
  country: [
    { label: 'United States', value: 'US' },
    { label: 'Canada', value: 'CA' },
    { label: 'Mexico', value: 'MX' },
    { label: 'United Kingdom', value: 'UK' },
  ],
};

const businessModeGraph: DecisionGraphType = {
  nodes: [
    {
      id: 'input-1',
      type: 'inputNode',
      position: { x: 70, y: 250 },
      name: 'Start',
    },
    {
      id: 'output-1',
      type: 'outputNode',
      position: { x: 670, y: 250 },
      name: 'Response',
    },
    {
      id: 'dt-1',
      type: 'decisionTableNode',
      position: { x: 370, y: 250 },
      name: 'Shipping Fees',
      content: {
        hitPolicy: 'first',
        inputs: [
          {
            id: 'i1',
            field: 'cart.weight',
            name: 'Cart Weight (Kg)',
            fieldType: { type: 'number' },
          },
          {
            id: 'i2',
            field: 'customer.country',
            name: 'Customer Country',
            fieldType: { type: 'string', enum: { type: 'ref', ref: 'country' } },
          },
        ],
        outputs: [
          {
            id: 'o1',
            field: 'shippingFee',
            name: 'Shipping Fee',
            outputFieldType: { type: 'number' },
          },
        ],
        rules: [
          { _id: 'r1', _description: '', i1: '> 40', i2: '"US"', o1: '40' },
          { _id: 'r2', _description: '', i1: '> 40', i2: '', o1: '50' },
          { _id: 'r3', _description: '', i1: '[20..40]', i2: '"US"', o1: '30' },
          { _id: 'r4', _description: '', i1: '< 20', i2: '', o1: '25' },
        ],
      },
    },
  ],
  edges: [
    { id: 'e1', type: 'edge', sourceId: 'input-1', targetId: 'dt-1' },
    { id: 'e2', type: 'edge', sourceId: 'dt-1', targetId: 'output-1' },
  ],
};

const buildLargeSerializeGraph = (): DecisionGraphType => {
  const inputId = 'serialize-input';
  const outputId = 'serialize-output';
  const tableId = 'serialize-table';
  const expressionId = 'serialize-expression';
  const functionId = 'serialize-function';

  const tableInputs = [
    { id: 'in_weight', field: 'cart.weight', name: 'Cart Weight (Kg)' },
    { id: 'in_country', field: 'customer.country', name: 'Customer Country' },
    { id: 'in_tier', field: 'customer.tier', name: 'Customer Tier' },
  ];
  const tableOutputs = [{ id: 'out_fee', field: 'shippingFee', name: 'Shipping Fee' }];

  const rules = Array.from({ length: 100 }, (_, i) => ({
    _id: `rule-${i + 1}`,
    _description: `Rule ${i + 1}: shipping fee for tier ${i % 5}`,
    in_weight: `[${i * 2}..${i * 2 + 10}]`,
    in_country: i % 2 === 0 ? '"US"' : '"CA"',
    in_tier: `"tier${i % 5}"`,
    out_fee: `${10 + i}`,
  }));

  const expressions = Array.from({ length: 50 }, (_, i) => ({
    id: `expr-${i + 1}`,
    key: `field_${i + 1}`,
    value: `customer.score + ${i} * order.total / 100`,
  }));

  const functionSource = [
    "import zen from 'zen';",
    '',
    '/** @type {Handler} **/',
    'export const handler = async (input) => {',
    '  const lines = [];',
    ...Array.from({ length: 80 }, (_, i) => `  lines.push('line ${i + 1}: ' + JSON.stringify(input));`),
    '',
    '  const result = {',
    '    received: input,',
    '    processedAt: new Date().toISOString(),',
    '    lineCount: lines.length,',
    "    summary: lines.join('\\n'),",
    '  };',
    '',
    '  return result;',
    '};',
  ].join('\n');

  return {
    nodes: [
      { id: inputId, type: 'inputNode', position: { x: 80, y: 240 }, name: 'Request' },
      {
        id: tableId,
        type: 'decisionTableNode',
        position: { x: 360, y: 100 },
        name: 'Big Table',
        content: { hitPolicy: 'first', inputs: tableInputs, outputs: tableOutputs, rules },
      },
      {
        id: expressionId,
        type: 'expressionNode',
        position: { x: 360, y: 360 },
        name: 'Big Expression',
        content: { expressions, passThrough: true, executionMode: 'single' },
      },
      {
        id: functionId,
        type: 'functionNode',
        position: { x: 360, y: 600 },
        name: 'Big Function',
        content: { source: functionSource },
      },
      { id: outputId, type: 'outputNode', position: { x: 720, y: 360 }, name: 'Response' },
    ],
    edges: [
      { id: 'e-in-table', type: 'edge', sourceId: inputId, targetId: tableId },
      { id: 'e-in-expr', type: 'edge', sourceId: inputId, targetId: expressionId },
      { id: 'e-in-func', type: 'edge', sourceId: inputId, targetId: functionId },
      { id: 'e-table-out', type: 'edge', sourceId: tableId, targetId: outputId },
      { id: 'e-expr-out', type: 'edge', sourceId: expressionId, targetId: outputId },
      { id: 'e-func-out', type: 'edge', sourceId: functionId, targetId: outputId },
    ],
  };
};

export const Serialize: Story = {
  render: () => <DecisionGraphSerializeTest />,
};

const DecisionGraphSerializeTest: React.FC = () => {
  const ref = useRef<DecisionGraphRef>(null);
  const [value, setValue] = useState<DecisionGraphType>(() => buildLargeSerializeGraph());
  const [snapshot, setSnapshot] = useState<DecisionGraphSnapshot | null>(null);
  const [mountKey, setMountKey] = useState(0);
  const [showJson, setShowJson] = useState(true);
  const pendingRestoreRef = useRef<DecisionGraphSnapshot | null>(null);

  useEffect(() => {
    if (!pendingRestoreRef.current) return;
    const snap = pendingRestoreRef.current;
    pendingRestoreRef.current = null;
    requestAnimationFrame(() => ref.current?.restore(snap));
  }, [mountKey]);

  const handleSave = () => {
    const snap = ref.current?.serialize() ?? {};
    setSnapshot(snap);
  };

  const handleRestore = () => {
    if (snapshot) ref.current?.restore(snapshot);
  };

  const handleRemountAndRestore = () => {
    pendingRestoreRef.current = snapshot;
    setMountKey((k) => k + 1);
  };

  const handleClear = () => setSnapshot(null);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 8, borderBottom: '1px solid #eee' }}>
        <Space wrap>
          <Button size='small' type='primary' onClick={handleSave}>
            Serialize
          </Button>
          <Button size='small' disabled={!snapshot} onClick={handleRestore}>
            Restore (live)
          </Button>
          <Button size='small' disabled={!snapshot} onClick={handleRemountAndRestore}>
            Remount + Restore
          </Button>
          <Button size='small' disabled={!snapshot} onClick={handleClear}>
            Clear snapshot
          </Button>
          <Button size='small' onClick={() => setShowJson((v) => !v)}>
            {showJson ? 'Hide' : 'Show'} JSON
          </Button>
          <Typography.Text type='secondary' style={{ fontSize: 12 }}>
            {snapshot ? 'Snapshot saved' : 'No snapshot'}
          </Typography.Text>
        </Space>
      </div>
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <DecisionGraph
            key={mountKey}
            ref={ref}
            value={value}
            onChange={(val) => setValue(val)}
            components={components}
            customNodes={customNodes}
          />
        </div>
        {showJson && (
          <div
            style={{
              width: 360,
              borderLeft: '1px solid #eee',
              padding: 8,
              overflow: 'auto',
              fontFamily: 'var(--mono-font-family, monospace)',
              fontSize: 11,
              background: '#fafafa',
            }}
          >
            <Typography.Text strong style={{ display: 'block', marginBottom: 8 }}>
              Snapshot
            </Typography.Text>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
              {snapshot ? JSON.stringify(snapshot, null, 2) : '// click "Serialize" to capture'}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export const BusinessMode: Story = {
  render: () => {
    const [value, setValue] = useState<DecisionGraphType>(businessModeGraph);
    const [mode, setMode] = useState<JdmUiMode>('business');

    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 8, borderBottom: '1px solid #eee' }}>
          <Space>
            <span>Mode:</span>
            <Button size='small' type={mode === 'dev' ? 'primary' : 'default'} onClick={() => setMode('dev')}>
              Dev
            </Button>
            <Button size='small' type={mode === 'business' ? 'primary' : 'default'} onClick={() => setMode('business')}>
              Business
            </Button>
          </Space>
        </div>
        <div style={{ flex: 1 }}>
          <DecisionGraph value={value} onChange={(val) => setValue(val)} mode={mode} dictionaries={DICTIONARIES} />
        </div>
      </div>
    );
  },
};
