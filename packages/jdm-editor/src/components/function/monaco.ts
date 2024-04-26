import type { Monaco } from '@monaco-editor/react';
import { loader } from '@monaco-editor/react';

declare global {
  interface Window {
    monaco?: Monaco;
  }
}

if (self.monaco) {
  loader.config({ monaco: self.monaco });
}
