import { type Variable } from '@gorules/zen-engine-wasm';
import { Button, Popover, Typography } from 'antd';
import clsx from 'clsx';
import { ChevronDownIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

import type { CodeEditorRef } from '../../code-editor';
import { CodeEditor } from '../../code-editor';
import { CodeEditorPreview } from '../../code-editor/ce-preview';
import { ConfirmAction } from '../../confirm-action';
import { Stack } from '../../stack';

type InputFieldEditProps = {
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onRemove?: () => void;
  variableType?: unknown;
  inputData?: Variable;
  referenceData?: { field: string; value: unknown };
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'>;

export const InputFieldEdit: React.FC<InputFieldEditProps> = ({
  value,
  onChange,
  onRemove,
  disabled,
  className,
  variableType,
  inputData,
  referenceData,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [innerValue, setInnerValue] = useState(value);
  const codeEditor = useRef<CodeEditorRef>(null);

  useEffect(() => {
    if (open) {
      setInnerValue(value);
      if (!codeEditor.current) {
        return;
      }

      setTimeout(() => {
        codeEditor.current!.codeMirror?.focus();
        const content = codeEditor.current!.querySelector('.cm-content');
        const selection = window.getSelection();
        if (content && selection) {
          selection.selectAllChildren(content);
        }
      });
    }
  }, [open]);

  return (
    <Popover
      placement='bottomLeft'
      trigger={['click']}
      destroyTooltipOnHide
      arrow={false}
      open={open}
      onOpenChange={(o) => setOpen(o)}
      content={
        <div
          style={{ width: 300 }}
          data-simulation='propagateWithTimeout'
          onKeyDownCapture={(e) => {
            const isSubmit = (e.ctrlKey || e.metaKey) && e.key === 'Enter';
            const isCancel = e.key === 'Escape';
            if (!isSubmit && !isCancel) {
              return;
            }

            e.preventDefault();
            e.stopPropagation();
            setOpen(false);
            if (!disabled && isSubmit) {
              onChange?.(innerValue ?? '');
            }
          }}
        >
          <Typography.Text style={{ fontSize: 12, display: 'block', marginBottom: 2 }}>Input Field</Typography.Text>
          <CodeEditor
            ref={codeEditor}
            value={innerValue}
            onChange={setInnerValue}
            variableType={variableType}
            disabled={disabled}
          />
          <div style={{ marginTop: 16 }}>
            <CodeEditorPreview
              expression={innerValue ?? ''}
              inputData={inputData}
              initial={referenceData ? { expression: referenceData.field, result: referenceData.value } : undefined}
            />
            <div className='grl-field-edit__footer'>
              <ConfirmAction iconOnly onConfirm={onRemove} disabled={disabled} />
              <Stack horizontal width='auto' verticalAlign='end'>
                <Button size='small' type='text' onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  size='small'
                  type='primary'
                  disabled={disabled}
                  onClick={() => {
                    onChange?.(innerValue ?? '');
                    setOpen(false);
                  }}
                >
                  Update
                </Button>
              </Stack>
            </div>
          </div>
        </div>
      }
    >
      <Typography.Text
        type={!value ? 'secondary' : undefined}
        className={clsx('grl-field-edit', className)}
        onClick={() => setOpen(!open)}
        {...props}
      >
        <span className='span-overflow'>{value || '-'}</span>
        <ChevronDownIcon size={12} style={{ marginLeft: 4 }} />
      </Typography.Text>
    </Popover>
  );
};
