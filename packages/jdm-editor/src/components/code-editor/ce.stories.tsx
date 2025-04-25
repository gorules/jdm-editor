import { syntaxTree } from '@codemirror/language';
import { generateAst, generateAstUnary } from '@gorules/zen-engine-wasm';
import type { SyntaxNodeRef } from '@lezer/common';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Typography, theme } from 'antd';
import React, { useState } from 'react';
import { match } from 'ts-pattern';

import { CodeEditor, type CodeEditorProps } from './ce';

const meta: Meta<typeof CodeEditor> = {
  title: 'CodeEditor',
  component: CodeEditor,
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
        items: [{ id: 1, qty: 2, price: 20 }],
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CodeEditor>;

const StoryWrapper: React.FC<React.PropsWithChildren<any>> = ({ children }) => (
  <div style={{ maxWidth: 900, padding: 20 }}>{children}</div>
);

export const Uncontrolled: Story = {
  render: (args) => {
    return (
      <StoryWrapper>
        <CodeEditor {...args} />
      </StoryWrapper>
    );
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <StoryWrapper>
        <CodeEditor {...args} value={value} onChange={setValue} />
      </StoryWrapper>
    );
  },
};

export const FullHeight: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <StoryWrapper>
        <div
          style={{
            height: 200,
          }}
        >
          <CodeEditor fullHeight value={value} onChange={setValue} />
        </div>
      </StoryWrapper>
    );
  },
};

export const NoStyle: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <StoryWrapper>
        <p>Parent border</p>
        <div
          style={{
            border: '1px solid blue',
          }}
        >
          <CodeEditor noStyle value={value} onChange={setValue} />
        </div>
      </StoryWrapper>
    );
  },
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
      <StoryWrapper>
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
      </StoryWrapper>
    );
  },
};
