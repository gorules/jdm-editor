import React, { useEffect, useState } from 'react';

import { useDecisionGraphRaw } from '../decision-graph';
import type { CodeEditorRef } from './ce';
import { CodeEditor, type CodeEditorProps } from './ce';

type LocalCodeEditorProps = Omit<CodeEditorProps, 'extension'>;

export const LocalCodeEditor = React.forwardRef<CodeEditorRef, LocalCodeEditorProps>((props, ref) => {
  const raw = useDecisionGraphRaw();
  const [extension, setExtension] = useState<CodeEditorProps['extension']>(() => {
    if (raw?.listenerStore) {
      return raw.listenerStore.getState().onCodeExtension;
    }

    return undefined;
  });

  useEffect(() => {
    if (!raw?.stateStore) {
      return;
    }

    return raw.listenerStore.subscribe((s) => setExtension(() => s.onCodeExtension));
  }, [raw]);

  return <CodeEditor ref={ref} {...props} extension={extension} />;
});
