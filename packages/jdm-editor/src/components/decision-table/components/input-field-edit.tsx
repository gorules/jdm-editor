import { evaluateExpression } from '@gorules/zen-engine-wasm';
import { Button, Popover, Typography } from 'antd';
import clsx from 'clsx';
import stringifyPretty from 'json-stringify-pretty-compact';
import { BugIcon, ChevronDownIcon } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { isWasmAvailable } from '../../../helpers/wasm';
import type { CodeEditorRef } from '../../code-editor';
import { CodeEditor } from '../../code-editor';
import { ConfirmAction } from '../../confirm-action';
import { Stack } from '../../stack';

type InputFieldEditProps = {
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onRemove?: () => void;
  variableType?: unknown;
  inputData?: unknown;
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

  const preview = useMemo(() => {
    if (!inputData) {
      return undefined;
    }

    if (!isWasmAvailable() || !inputData || innerValue === referenceData?.field) {
      return { type: 'initial' as const, value: stringifyPretty(referenceData?.value, { maxLength: 30 }) };
    }

    if (!innerValue) {
      return { type: 'none' as const, value: '-' };
    }

    try {
      const value = evaluateExpression(innerValue, inputData);
      return { type: 'success' as const, value: stringifyPretty(value, { maxLength: 30 }) };
    } catch (err) {
      return { type: 'error' as const, value: (err as any).toString() };
    }
  }, [inputData, innerValue, referenceData]);

  useEffect(() => {
    if (open) {
      setInnerValue(value);
      if (!codeEditor.current) {
        return;
      }

      setTimeout(() => {
        console.log(codeEditor.current);
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
            <Typography.Text style={{ fontSize: 12 }}>
              Live Preview <BugIcon size='1em' opacity={0.5} color='#077D16' />
            </Typography.Text>
            <Typography.Text style={{ fontSize: 12, display: 'block' }} type='secondary'>
              {preview?.type === 'initial' ? 'Based on simulation data' : 'Based on live calculation'}
            </Typography.Text>
            <div className='grl-field-edit__preview'>
              {(preview?.type === 'success' || preview?.type === 'initial') && (
                <CodeEditor value={preview.value} disabled noStyle maxRows={3} />
              )}
              {preview?.type === 'none' && <Typography.Text type='secondary'>{preview.value}</Typography.Text>}
              {preview?.type === 'error' && <Typography.Text type='danger'>{preview.value}</Typography.Text>}
              {!preview && <Typography.Text type='secondary'>Run simulation to see the results</Typography.Text>}
            </div>
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
