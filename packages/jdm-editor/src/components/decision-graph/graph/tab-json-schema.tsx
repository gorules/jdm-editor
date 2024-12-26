import { FormatPainterOutlined, ImportOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { DiffEditor, Editor } from '@monaco-editor/react';
import { Button, Space, Spin, Tabs, Tooltip, theme } from 'antd';
import type { DragDropManager } from 'dnd-core';
import { type editor } from 'monaco-editor';
import React, { useEffect, useMemo, useState } from 'react';
import { PanelGroup } from 'react-resizable-panels';
import { match } from 'ts-pattern';
import { useThrottledCallback } from 'use-debounce';

import { useDecisionGraphActions, useDecisionGraphState, useNodeDiff } from '../context/dg-store.context';
import { JsonToJsonSchemaDialog } from './json-to-json-schema-dialog';

const schemaTooltip = 'Provide JSON Schema format. If no JSON Schema is provided, validation will be skipped.';

const monacoOptions: editor.IStandaloneEditorConstructionOptions = {
  automaticLayout: true,
  contextmenu: false,
  fontSize: 13,
  fontFamily: 'var(--mono-font-family)',
  tabSize: 2,
  minimap: { enabled: false },
  overviewRulerBorder: false,
  scrollbar: {
    verticalSliderSize: 4,
    verticalScrollbarSize: 4,
    horizontalScrollbarSize: 4,
    horizontalSliderSize: 4,
  },
};

enum TabKey {
  Schema = 'Schema',
}

export type TabJsonSchemaProps = {
  id: string;
  manager?: DragDropManager;
  type?: 'input' | 'output';
};

export const TabJsonSchema: React.FC<TabJsonSchemaProps> = ({ id, type = 'input' }) => {
  const graphActions = useDecisionGraphActions();

  const language = 'json';

  const { token } = theme.useToken();

  const [jsonToJsonSchemaOpen, setJsonToJsonSchemaOpen] = useState(false);

  const [activeTab, setActiveTab] = useState(TabKey.Schema);

  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor>();
  const [diffEditor, setDiffEditor] = useState<editor.IStandaloneDiffEditor>();
  const resizeEditor = useThrottledCallback(() => editor?.layout(), 100, { trailing: true });
  const resizeDiffEditor = useThrottledCallback(() => diffEditor?.layout(), 100, { trailing: true });

  const { disabled, content } = useDecisionGraphState(({ simulate, disabled, configurable, decisionGraph }) => ({
    nodeError: match(simulate)
      .with({ error: { data: { nodeId: id } } }, ({ error }) => error)
      .otherwise(() => null),
    disabled,
    configurable,
    content: (decisionGraph?.nodes ?? []).find((node) => node.id === id)?.content,
  }));

  const { contentDiff } = useNodeDiff(id);

  const previousValue = useMemo(() => {
    return contentDiff?.fields?.schema?.previousValue;
  }, [contentDiff]);

  useEffect(() => {
    window.addEventListener('resize', resizeEditor);
    return () => window.removeEventListener('resize', resizeEditor);
  }, [resizeEditor, editor]);

  useEffect(() => {
    window.addEventListener('resize', resizeDiffEditor);
    return () => window.removeEventListener('resize', resizeDiffEditor);
  }, [resizeDiffEditor, diffEditor]);

  return (
    <div
      className='grl-node-content'
      data-theme={token.mode}
      style={
        {
          'height': '100%',
          '--color-text': token.colorTextBase,
          '--color-background-elevated': token.colorBgElevated,
          '--color-border': token.colorBorder,
          '--line-height': token.lineHeight,
        } as any
      }
    >
      <PanelGroup
        className='grl-node-content-main'
        direction='horizontal'
        autoSaveId={`jdm-editor:${type}:schema:layout`}
      >
        <div className='grl-node-content-side'>
          <div className='grl-node-content-side__panel'>
            <div className='grl-node-content-side__header'>
              <Tabs
                rootClassName='grl-inline-tabs'
                size='small'
                style={{ width: '100%' }}
                items={Object.values(TabKey).map((t) => ({
                  key: t,
                  label: (
                    <span>
                      {t}{' '}
                      <Tooltip title={schemaTooltip}>
                        <InfoCircleOutlined
                          style={{ fontSize: 10, marginLeft: 4, opacity: 0.5, verticalAlign: 'text-top' }}
                        />
                      </Tooltip>
                    </span>
                  ),
                }))}
                activeKey={activeTab}
                onChange={(t) => setActiveTab(t as TabKey)}
                tabBarExtraContent={
                  <Space style={{ marginRight: 8 }} size={'small'}>
                    <Tooltip title='Format code' placement='bottomRight'>
                      <Button
                        size='small'
                        type='text'
                        disabled={disabled}
                        icon={<FormatPainterOutlined />}
                        onClick={() => editor?.getAction?.('editor.action.formatDocument')?.run?.()}
                      />
                    </Tooltip>
                    <Tooltip title='Import from JSON' placement='bottomRight'>
                      <Button
                        type='text'
                        size={'small'}
                        disabled={disabled}
                        icon={<ImportOutlined />}
                        onClick={() => {
                          setJsonToJsonSchemaOpen(true);
                        }}
                      />
                    </Tooltip>
                  </Space>
                }
              />
            </div>
            <div className='grl-node-content-side__body'>
              {match(activeTab)
                .with(TabKey.Schema, () =>
                  previousValue !== undefined ? (
                    <DiffEditor
                      loading={<Spin size='large' />}
                      language={language}
                      original={previousValue}
                      modified={content?.schema}
                      onMount={(editor) => setDiffEditor(editor)}
                      theme={token.mode === 'dark' ? 'vs-dark' : 'light'}
                      height='100%'
                      options={{
                        ...monacoOptions,
                        readOnly: true,
                      }}
                    />
                  ) : (
                    <Editor
                      loading={<Spin size='large' />}
                      language={language}
                      value={content?.schema || ''}
                      onMount={(editor) => setEditor(editor)}
                      onChange={(value) => {
                        graphActions.updateNode(id, (draft) => {
                          draft.content = { schema: value };
                          return draft;
                        });
                      }}
                      theme={token.mode === 'dark' ? 'vs-dark' : 'light'}
                      height='100%'
                      options={{
                        ...monacoOptions,
                        readOnly: disabled,
                      }}
                    />
                  ),
                )
                .exhaustive()}
            </div>
            <JsonToJsonSchemaDialog
              isOpen={jsonToJsonSchemaOpen}
              onDismiss={() => setJsonToJsonSchemaOpen(false)}
              onSuccess={({ schema, model }) => {
                localStorage.setItem(`${id}-model`, model);
                graphActions.updateNode(id, (draft) => {
                  draft.content = { schema };
                  return draft;
                });
                setJsonToJsonSchemaOpen(false);
              }}
              model={localStorage.getItem(`${id}-model`) || undefined}
            />
          </div>
        </div>
      </PanelGroup>
    </div>
  );
};
