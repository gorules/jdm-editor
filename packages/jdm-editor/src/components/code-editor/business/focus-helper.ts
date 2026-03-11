import type { CodeEditorBaseRef } from '../ce-base';

export type BuilderRef = { focus: () => void };

export const focusBuilderRoot = (el: HTMLElement | null) => {
  if (!el) return;
  const ceEl = el.querySelector<CodeEditorBaseRef>('.grl-ce');
  if (ceEl?.codeMirror) {
    const view = ceEl.codeMirror;
    view.focus();
    view.dispatch({ selection: { anchor: view.state.doc.length } });
    return;
  }
  const input = el.querySelector<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
  if (input) {
    input.focus();
    if ('selectionStart' in input) {
      input.selectionStart = input.selectionEnd = input.value.length;
    }
  }
};
