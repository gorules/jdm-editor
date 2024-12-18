import { Editor } from '@monaco-editor/react';
import { Spin, message, theme } from 'antd';
import json5 from 'json5';
import React from 'react';

import { copyToClipboard } from '../../../helpers/utility';

type SimulatorEditorProps = {
  value?: string;
  onChange?: (value: string | undefined) => void;
  readOnly?: boolean;
};

export const SimulatorEditor: React.FC<SimulatorEditorProps> = ({ value, onChange, readOnly }) => {
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
        readOnly: readOnly,
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
  );
};
