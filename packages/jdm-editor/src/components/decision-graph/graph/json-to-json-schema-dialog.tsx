import { Editor } from '@monaco-editor/react';
import { Modal, Spin, Typography, message, theme } from 'antd';
import json5 from 'json5';
import React, { useEffect, useState } from 'react';
import toJsonSchema from 'to-json-schema';

import { copyToClipboard } from '../../../helpers/utility';

export type JsonToJsonSchemaDialogProps = {
  id?: string;
  onSuccess?: (payload: { schema: string; model: string }) => void;
  onDismiss?: () => void;
  isOpen?: boolean;
  model?: string;
};

export const JsonToJsonSchemaDialog: React.FC<JsonToJsonSchemaDialogProps> = (props) => {
  const { isOpen, onDismiss, onSuccess, model } = props;

  const { token } = theme.useToken();

  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (isOpen && model) {
      setValue(model);
    }
  }, [isOpen]);

  return (
    <Modal
      title='Convert to JSON Schema'
      open={isOpen}
      destroyOnClose
      onCancel={onDismiss}
      width={540}
      okText='Convert'
      onOk={() => {
        try {
          onSuccess?.({
            schema: JSON.stringify(toJsonSchema(json5.parse(value)), null, 2),
            model: value,
          });
        } catch (e: any) {
          message.error(e?.message);
        }
      }}
    >
      <Typography.Text>Type or paste JSON or JSON5 model here and covert it to JSON Schema</Typography.Text>
      <Editor
        loading={<Spin size='large' />}
        language='javascript'
        theme={token.mode === 'dark' ? 'vs-dark' : 'light'}
        height='400px'
        onChange={(val) => setValue(val || '')}
        value={value || ''}
        onMount={(editor, monaco) => {
          monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
            noSyntaxValidation: true,
          });

          monaco.languages.typescript.javascriptDefaults.setModeConfiguration({
            codeActions: false,
            inlayHints: false,
          });

          editor.addAction({
            id: 'copy-json',
            label: 'Copy JSON',
            contextMenuGroupId: 'utils',
            run: async (editor) => {
              try {
                await copyToClipboard(JSON.stringify(json5.parse(editor.getValue())));
                message.success('Copied to clipboard!');
              } catch {
                message.error('Failed to copy to clipboard.');
              }
            },
          });

          editor.addAction({
            id: 'format',
            label: 'Format',
            contextMenuGroupId: 'utils',
            precondition: '!editorReadonly',
            run: (editor) => {
              const formatted = JSON.stringify(json5.parse(editor.getValue()), null, 2);
              editor.setValue(formatted);
            },
          });
        }}
        options={{
          automaticLayout: true,
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
    </Modal>
  );
};
