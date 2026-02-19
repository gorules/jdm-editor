import { type StandardExpressionData, parseStandardExpression } from '@gorules/zen-engine-wasm';
import { DatePicker, InputNumber, Select } from 'antd';
import dayjs from 'dayjs';
import {
  CalendarIcon,
  HashIcon,
  ListIcon,
  type LucideIcon,
  SquareFunctionIcon,
  ToggleLeftIcon,
  TypeIcon,
} from 'lucide-react';
import React, { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';

import type { ColumnEnum, OutputFieldType } from '../../../helpers/schema';
import { type DictionaryMap, useDictionaries } from '../../../theme';
import { AutosizeTextArea } from '../../autosize-text-area';
import { CodeEditorBase } from '../ce-base';
import { focusBuilderRoot } from './focus-helper';
import './standard-expression-builder.scss';

export type { OutputFieldType };

export type StandardExpressionBuilderProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  fieldType?: OutputFieldType;
  maxRows?: number;
};

const TYPE_ICONS: Record<Exclude<OutputFieldType['type'], 'auto'>, LucideIcon> = {
  'string': TypeIcon,
  'string-array': ListIcon,
  'number': HashIcon,
  'boolean': ToggleLeftIcon,
  'date': CalendarIcon,
};

const enumFilterOption = (input: string, option?: { label?: string; value?: string }) => {
  const search = input.toLowerCase();
  return (option?.label?.toLowerCase().includes(search) || option?.value?.toLowerCase().includes(search)) ?? false;
};

const formatDateValue = (date: string): string => `d('${date}')`;
const formatStringValue = (value: string): string => `"${value}"`;
const formatStringArrayValue = (values: string[]): string =>
  !values.length ? '[]' : `[${values.map((v) => `"${v.replace(/"/g, '\\"')}"`).join(', ')}]`;

const parseStringArrayValue = (value: string): string[] => {
  if (!value?.trim()) return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.map(String);
  } catch {}
  return [];
};

const isStringArrayValue = (value: string): boolean => {
  if (!value?.trim() || value.trim() === '[]') return true;
  try {
    return Array.isArray(JSON.parse(value));
  } catch {}
  return false;
};

const getEnumOptions = (
  ft?: OutputFieldType,
  dictionaries?: DictionaryMap,
): { values: { label: string; value: string }[]; loose: boolean } | null => {
  if (!ft) return null;
  if (ft.type !== 'string' && ft.type !== 'string-array') return null;
  const e: ColumnEnum | undefined = ft.enum;
  if (!e) return null;
  if (e.type === 'inline') {
    return e.values.length ? { values: e.values, loose: e.loose ?? false } : null;
  }
  const resolved = dictionaries?.[e.ref];
  return resolved?.length ? { values: resolved, loose: e.loose ?? false } : null;
};

export type StandardExpressionBuilderRef = {
  focus: () => void;
};

export const StandardExpressionBuilder = React.forwardRef<StandardExpressionBuilderRef, StandardExpressionBuilderProps>(
  ({ value, onChange, disabled = false, fieldType, maxRows = 3 }, ref) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const dictionaries = useDictionaries();
    const ftType = fieldType?.type ?? 'auto';
    const styleVars = { '--b-max-rows': maxRows } as React.CSSProperties;

    useImperativeHandle(ref, () => ({
      focus: () => focusBuilderRoot(rootRef.current),
    }));

    const parsed = useMemo<StandardExpressionData>(() => parseStandardExpression(value), [value]);
    const computeExprMode = () => {
      if (ftType === 'string-array') return !isStringArrayValue(value);
      if (parsed.kind === 'expression') return true;
      if (ftType === 'auto') return false;
      return parsed.kind !== ftType;
    };
    const [isExprMode, setIsExprMode] = useState(computeExprMode);

    useEffect(() => {
      setIsExprMode(computeExprMode());
    }, [ftType]);

    const forceExprMode =
      ftType !== 'auto' && ftType !== 'string-array' && parsed.kind !== 'expression' && parsed.kind !== ftType;

    const TypeIcon = ftType !== 'auto' ? TYPE_ICONS[ftType] : null;
    const enumOptions = getEnumOptions(fieldType, dictionaries);

    if (ftType === 'auto' || isExprMode || forceExprMode) {
      return (
        <div ref={rootRef} className='seb' style={styleVars}>
          {ftType !== 'auto' && (
            <button
              className='seb-mode-btn'
              onClick={() => {
                if (parsed.kind !== ftType) {
                  const t = ftType;
                  if (t === 'string') onChange(formatStringValue(''));
                  else if (t === 'number') onChange('0');
                  else if (t === 'boolean') onChange('true');
                  else if (t === 'date') onChange(formatDateValue(dayjs().format('YYYY-MM-DD')));
                }
                setIsExprMode(false);
              }}
              disabled={disabled}
              title='Currently: Expression. Click for value mode.'
            >
              <SquareFunctionIcon size={14} />
            </button>
          )}
          <CodeEditorBase
            className='seb-code'
            value={value}
            onChange={onChange}
            type='standard'
            disabled={disabled}
            noStyle
            maxRows={maxRows}
          />
        </div>
      );
    }

    return (
      <div ref={rootRef} className='seb' style={styleVars}>
        <button
          className='seb-mode-btn'
          onClick={() => setIsExprMode(true)}
          disabled={disabled}
          title='Currently: Value. Click for expression mode.'
        >
          {TypeIcon && <TypeIcon size={14} />}
        </button>
        {ftType === 'string' && !enumOptions && (
          <AutosizeTextArea
            className='seb-input'
            value={parsed.kind === 'string' ? parsed.value : ''}
            maxRows={maxRows}
            onChange={(e) => onChange(formatStringValue((e.target as unknown as { value: string }).value))}
            disabled={disabled}
          />
        )}
        {ftType === 'string' && enumOptions && (
          <Select
            className='seb-select'
            value={parsed.kind === 'string' ? parsed.value : undefined}
            onChange={(v) => onChange(formatStringValue(v))}
            disabled={disabled}
            variant='borderless'
            size='small'
            suffixIcon={null}
            showSearch
            filterOption={enumFilterOption}
            popupMatchSelectWidth={false}
            options={enumOptions.values.map((v) => ({ label: v.label, value: v.value }))}
          />
        )}
        {ftType === 'string-array' && (
          <Select
            className='seb-select-multi'
            mode={enumOptions && !enumOptions.loose ? 'multiple' : 'tags'}
            value={parseStringArrayValue(value)}
            onChange={(v: string[]) => onChange(formatStringArrayValue(v))}
            disabled={disabled}
            variant='borderless'
            size='small'
            suffixIcon={null}
            showSearch
            filterOption={enumFilterOption}
            popupMatchSelectWidth={false}
            options={enumOptions?.values.map((v) => ({ label: v.label, value: v.value }))}
          />
        )}
        {ftType === 'number' && (
          <InputNumber
            className='seb-number'
            value={parsed.kind === 'number' ? parsed.value : 0}
            onChange={(v) => onChange(String(v ?? 0))}
            disabled={disabled}
            variant='borderless'
            controls={false}
          />
        )}
        {ftType === 'boolean' && (
          <Select
            className='seb-select'
            value={parsed.kind === 'boolean' ? parsed.value : true}
            onChange={(v) => onChange(String(v))}
            disabled={disabled}
            variant='borderless'
            size='small'
            suffixIcon={null}
            popupMatchSelectWidth={80}
            options={[
              { value: true, label: 'true' },
              { value: false, label: 'false' },
            ]}
          />
        )}
        {ftType === 'date' && (
          <DatePicker
            className='seb-date'
            value={(() => {
              const dateStr = parsed.kind === 'date' ? parsed.value : null;
              return dateStr && dayjs(dateStr).isValid() ? dayjs(dateStr) : dayjs();
            })()}
            onChange={(d) => d && onChange(formatDateValue(d.format('YYYY-MM-DD')))}
            disabled={disabled}
            variant='borderless'
            size='small'
            allowClear={false}
          />
        )}
      </div>
    );
  },
);
