import { syntaxTree } from '@codemirror/language';
import { Variable, generateAst, generateAstUnary } from '@gorules/zen-engine-wasm';
import type { SyntaxNodeRef } from '@lezer/common';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Typography, theme } from 'antd';
import React, { useMemo, useState } from 'react';
import { match } from 'ts-pattern';

import { CodeEditor, type CodeEditorProps } from './ce';
import { CodeEditorPreview } from './ce-preview';

const meta: Meta<typeof CodeEditor> = {
  title: 'CodeEditor',
  component: CodeEditor,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    value: { type: 'string' },
    maxRows: { type: 'number' },
    disabled: { type: 'boolean' },
    placeholder: { type: 'string' },
    type: { control: { type: 'radio' }, options: ['standard', 'unary', 'template'] },
    strict: { control: 'boolean' },
    variableType: { control: { type: 'object' } },
    expectedVariableType: { control: { type: 'object' } },
    noStyle: { control: 'boolean' },
    onChange: { table: { disable: true } },
    onBlur: { table: { disable: true } },
    onFocus: { table: { disable: true } },
  },
  args: {
    maxRows: 3,
    placeholder: 'Type expression...',
    type: 'standard',
    disabled: false,
    strict: false,
    onChange: fn(),
    onBlur: fn(),
    onFocus: fn(),
    variableType: {
      customer: {
        firstName: 'John',
        lastName: 'Doe',
        groups: ['admin'],
      },
      cart: {
        totals: 100,
        items: [
          { id: 1, qty: 2, price: 20 },
          { id: 2, qty: 1, price: 50 },
        ],
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CodeEditor>;

export const Uncontrolled: Story = {};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState('');

    return <CodeEditor {...args} value={value} onChange={setValue} />;
  },
};

export const FullHeight: Story = {
  args: {
    fullHeight: true,
  },
  decorators: [
    (Story) => (
      <div style={{ height: 200 }}>
        <Story />
      </div>
    ),
  ],
};

export const NoStyle: Story = {
  args: {
    noStyle: true,
  },
  decorators: [
    (Story) => (
      <>
        <p>Parent border</p>
        <div style={{ border: '1px solid blue' }}>
          <Story />
        </div>
      </>
    ),
  ],
};

export const Debug: StoryObj<CodeEditorProps & { showEditorState: boolean; showParserState: boolean }> = {
  args: {
    showParserState: true,
    showEditorState: false,
  },
  argTypes: {
    showParserState: {
      control: 'boolean',
      description: 'Toggle parser state visibility',
    },
    showEditorState: {
      control: 'boolean',
      description: 'Toggle editor state visibility',
    },
  },
  render: (args) => {
    const { token } = theme.useToken();
    const [editorState, setEditorState] = useState('');
    const [parserState, setParserState] = useState('');

    return (
      <>
        <CodeEditor
          {...args}
          onChange={(expression) => {
            const ast = match(args.type)
              .with('standard', () => generateAst(expression))
              .with('unary', () => generateAstUnary(expression))
              .otherwise(() => null);

            setParserState(ast ?? '');
          }}
          onStateChange={(state) => {
            const nodes: string[] = [];
            syntaxTree(state).iterate({
              enter(node: SyntaxNodeRef): boolean | void {
                nodes.push(
                  `${node.name}[${node.from}:${node.to}] = ${node.type.isError}, ${node.node.tree?.children.length}`,
                );
              },
            });

            setEditorState(JSON.stringify(nodes, undefined, 2));
          }}
        />
        {args.showParserState && (
          <div style={{ marginTop: token.marginMD }}>
            <Typography.Text>Parser state (ZEN)</Typography.Text>
            <div
              style={{
                background: token.colorBgLayout,
                border: `1px solid ${token.colorBorder}`,
                borderRadius: token.borderRadiusOuter,
                padding: token.paddingSM,
              }}
            >
              <Typography.Text style={{ whiteSpace: 'pre', fontFamily: 'monospace' }}>{parserState}</Typography.Text>
            </div>
          </div>
        )}

        {args.showEditorState && (
          <div style={{ marginTop: token.marginMD }}>
            <Typography.Text>Editor state (CodeMirror)</Typography.Text>
            <div
              style={{
                background: token.colorBgLayout,
                border: `1px solid ${token.colorBorder}`,
                borderRadius: token.borderRadiusOuter,
                padding: token.paddingSM,
              }}
            >
              <Typography.Text style={{ whiteSpace: 'pre', fontFamily: 'monospace' }}>{editorState}</Typography.Text>
            </div>
          </div>
        )}
      </>
    );
  },
};

export const LivePreview: StoryObj<
  CodeEditorProps & {
    noPreviewText: string;
    initialExpression: string;
    initialResult: unknown;
  }
> = {
  args: {
    noPreviewText: 'Run simulation to see the results',
    initialExpression: 'customer.firstName + " " + customer.lastName',
    initialResult: 'John Doe',
  },
  argTypes: {
    noPreviewText: { type: 'string' },
    initialExpression: { type: 'string' },
    initialResult: { control: { type: 'object' } },
  },
  render: ({ noPreviewText, initialResult, initialExpression, variableType, ...args }) => {
    const [expression, setExpression] = useState(initialExpression);

    const inputData = useMemo(() => {
      return new Variable(variableType);
    }, [variableType]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <CodeEditor {...args} variableType={variableType} onChange={setExpression} value={expression} />
        <CodeEditorPreview
          expression={expression}
          noPreviewText={noPreviewText}
          inputData={inputData}
          initial={{ expression: initialExpression, result: initialResult }}
        />
      </div>
    );
  },
};
