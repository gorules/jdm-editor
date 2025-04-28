import { Placeholder } from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';
import { Markdown } from 'tiptap-markdown';

import { useRulebookActions, useRulebookState } from '../context/rb-store.context';

export type BlockMarkdownProps = {
  id: string;
};

export const BlockMarkdown: React.FC<BlockMarkdownProps> = ({ id }) => {
  const blockActions = useRulebookActions();

  const { disabled, configurable, content } = useRulebookState(({ disabled, configurable, rulebook }) => ({
    disabled,
    configurable,
    content: (rulebook?.blocks ?? []).find((b) => b.id === id)?.content,
  }));

  const editor = useEditor({
    content: content?.text || undefined,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2] },
      }),
      Placeholder.configure({
        placeholder: 'Write something...',
      }),
      Markdown,
    ],
    editable: !disabled,
    onUpdate: ({ editor }) => {
      const markdown = editor.storage.markdown.getMarkdown();
      blockActions.updateBlock(id, (draft) => {
        draft.content.source = markdown;
        return draft;
      });
    },
  });

  return <EditorContent editor={editor} placeholder='blabla' height='100%' onKeyDown={(e) => e.stopPropagation()} />;
};
