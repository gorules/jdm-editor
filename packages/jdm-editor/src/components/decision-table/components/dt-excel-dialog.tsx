import { DeleteOutlined, EditOutlined, HolderOutlined, LeftOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Modal, Popconfirm, Select, Switch, Tooltip, Typography } from 'antd';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { XYCoord } from 'react-dnd';
import { useDrag, useDrop } from 'react-dnd';

import type { ParsedExcelData, RuleData } from '../../../helpers/excel';
import type { ColumnFieldType, OutputFieldType } from '../../../helpers/schema';
import { useDecisionTableDialog } from '../context/dt-dialog.context';
import { useDecisionTableState } from '../context/dt-store.context';
import { InputFieldEdit } from './input-field-edit';
import { OutputFieldEdit } from './output-field-edit';

type ItemValue = {
  id: string;
  label: string;
  value?: string;
  type?: 'input' | 'output';
  field?: string;
  name?: string;
  wrapInQuotes?: boolean;
};

export type MappedExcelData = {
  items: ItemValue[];
  rules: RuleData[][];
};

type DtExcelDialogProps = {
  excelData?: ParsedExcelData[] | null;
  handleSuccess: (mappedExcelData: MappedExcelData) => void;
  handleCancel: () => void;
};

type ImportColumn = {
  id: string;
  name: string;
  field?: string;
  type: 'input' | 'output';
  excelHeaderId?: string;
  defaultValue?: string;
  fieldType?: ColumnFieldType;
  outputFieldType?: OutputFieldType;
};

type TableHeader = {
  id: string;
  label: string;
  value?: string;
  type?: 'input' | 'output';
};

const isHeaderMatch = (header1: TableHeader, header2: TableHeader) => {
  return (
    header1.id === header2.id ||
    header1.value?.toLowerCase() === header2.value?.toLowerCase() ||
    header1.label?.toLowerCase() === header2.label?.toLowerCase()
  );
};

const DRAG_TYPE = 'import-col';

interface DragItem {
  index: number;
  id: string;
  type: string;
  section: 'input' | 'output';
}

const ImportColumnRow: React.FC<{
  col: ImportColumn;
  index: number;
  section: 'input' | 'output';
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  excelHeaders: { id: string; name?: string; value?: string }[];
  disabled: boolean;
  wrapChecked: boolean;
  onToggle: (enabled: boolean) => void;
  onExcelHeaderChange: (excelHeaderId: string | undefined) => void;
  onWrapChange: (checked: boolean) => void;
  onFieldChange: (field: string, fieldType?: ColumnFieldType, outputFieldType?: OutputFieldType) => void;
  onRemove: () => void;
}> = ({
  col,
  index,
  section,
  moveCard,
  excelHeaders,
  disabled,
  wrapChecked,
  onToggle,
  onExcelHeaderChange,
  onWrapChange,
  onFieldChange,
  onRemove,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop<DragItem, void>({
    accept: DRAG_TYPE,
    hover(item: DragItem, monitor) {
      if (!ref.current) return;
      if (item.section !== section) return;

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: DRAG_TYPE,
    item: () => ({ id: col.id, index, type: DRAG_TYPE, section }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const excelOptions = excelHeaders.map((h) => ({
    label: h.name || h.value || h.id,
    value: h.id,
  }));

  const editTrigger = (
    <Tooltip title='Edit column'>
      <Button type='text' size='small' icon={<EditOutlined />} style={{ padding: 0 }} />
    </Tooltip>
  );

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: '24px 36px 1fr 12px 1fr 28px 28px 28px',
        gap: '8px',
        alignItems: 'center',
        padding: '6px 0',
        opacity: isDragging ? 0.3 : disabled ? 0.4 : 1,
      }}
    >
      <div style={{ cursor: 'grab', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <HolderOutlined style={{ color: 'var(--grl-color-text-tertiary)' }} />
      </div>

      <Switch size='small' checked={!disabled} onChange={onToggle} />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '4px 10px',
          backgroundColor: 'var(--grl-color-bg-layout)',
          borderRadius: '6px',
          border: '1px solid var(--grl-color-border)',
          minHeight: 36,
          justifyContent: 'center',
        }}
      >
        <Typography.Text style={{ fontSize: 13, lineHeight: '18px' }}>{col.name}</Typography.Text>
        {col.field && (
          <Typography.Text type='secondary' style={{ fontSize: 11, lineHeight: '14px' }}>
            {col.field}
          </Typography.Text>
        )}
      </div>

      <LeftOutlined style={{ fontSize: 12, color: 'var(--grl-color-primary)' }} />

      <Select
        allowClear
        style={{ width: '100%' }}
        placeholder='Select Excel column'
        value={col.excelHeaderId}
        disabled={disabled}
        onChange={(val) => onExcelHeaderChange(val ?? undefined)}
        options={excelOptions}
      />

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Tooltip title='Wrap values in quotes'>
          <Checkbox disabled={disabled} checked={wrapChecked} onChange={(e) => onWrapChange(e.target.checked)} />
        </Tooltip>
      </div>

      {section === 'input' ? (
        <InputFieldEdit
          mode='edit'
          value={col.field}
          fieldType={col.fieldType}
          onChange={(field, fieldType) => onFieldChange(field, fieldType)}
          onRemove={onRemove}
          trigger={editTrigger}
        />
      ) : (
        <OutputFieldEdit
          mode='edit'
          value={col.field}
          fieldType={col.outputFieldType}
          onChange={(field, outputFieldType) => onFieldChange(field, undefined, outputFieldType)}
          onRemove={onRemove}
          trigger={editTrigger}
        />
      )}

      <Popconfirm title='Remove this column?' okText='Remove' onConfirm={onRemove}>
        <Tooltip title='Remove column'>
          <Button type='text' size='small' danger icon={<DeleteOutlined />} style={{ padding: 0 }} />
        </Tooltip>
      </Popconfirm>
    </div>
  );
};

export const DtExcelDialog: React.FC<DtExcelDialogProps> = ({ excelData, handleSuccess, handleCancel }) => {
  const spreadSheetData = useMemo(() => excelData?.[0], [excelData]);
  const { getContainer } = useDecisionTableDialog();
  const { inputVariableType } = useDecisionTableState(({ inputVariableType }) => ({ inputVariableType }));

  const [columns, setColumns] = useState<ImportColumn[]>([]);
  const [disabledColumns, setDisabledColumns] = useState<Record<string, boolean>>({});
  const [wrapStates, setWrapStates] = useState<Record<string, boolean>>({});
  const [descriptionExcelId, setDescriptionExcelId] = useState<string | undefined>();
  const [descriptionEnabled, setDescriptionEnabled] = useState(true);

  useEffect(() => {
    if (!spreadSheetData) {
      setColumns([]);
      setDisabledColumns({});
      setWrapStates({});
      setDescriptionExcelId(undefined);
      setDescriptionEnabled(true);
      return;
    }

    const existingTableHeaders: TableHeader[] = spreadSheetData.existingTableData.headers
      .filter((h) => h.type !== undefined)
      .map((h) => ({
        id: h.id,
        label: h.name as string,
        value: h.field,
        type: h.type,
      }));

    const excelHeaders: TableHeader[] = (spreadSheetData.headers || [])
      .filter((h) => h.id !== '_description' && h.id !== '_id')
      .map((h) => ({
        id: h.id || crypto.randomUUID(),
        label: h.name as string,
        value: h.value,
        type: h._type as 'input' | 'output' | undefined,
      }));

    const existingSchemaItems = spreadSheetData.existingTableData.headers;

    const importColumns: ImportColumn[] = existingTableHeaders
      .filter((h) => h.type === 'input' || h.type === 'output')
      .map((tableHeader) => {
        const matchedExcel = excelHeaders.find((eh) => isHeaderMatch(eh, tableHeader));
        const schemaItem = existingSchemaItems.find((s) => s.id === tableHeader.id);
        return {
          id: tableHeader.id,
          name: tableHeader.label,
          field: tableHeader.value,
          type: tableHeader.type as 'input' | 'output',
          excelHeaderId: matchedExcel?.id,
          defaultValue: schemaItem?.defaultValue,
          fieldType: schemaItem?.fieldType,
          outputFieldType: schemaItem?.outputFieldType,
        };
      });

    // If no outputs exist, make the last input an output
    if (!importColumns.some((c) => c.type === 'output')) {
      const lastInput = [...importColumns].reverse().find((c) => c.type === 'input');
      if (lastInput) {
        lastInput.type = 'output';
      }
    }

    setColumns(importColumns);

    // Auto-match _description
    const descHeader = spreadSheetData.headers.find((h) => h.id === '_description');
    setDescriptionExcelId(descHeader?.id);
    setDescriptionEnabled(!!descHeader);
  }, [spreadSheetData]);

  const excelHeaders = useMemo(() => {
    if (!spreadSheetData) return [];
    return spreadSheetData.headers.filter((h) => h.id !== '_description' && h.id !== '_id');
  }, [spreadSheetData]);

  const inputColumns = useMemo(() => columns.filter((c) => c.type === 'input'), [columns]);
  const outputColumns = useMemo(() => columns.filter((c) => c.type === 'output'), [columns]);

  const moveInputCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setColumns((prev) => {
      const inputs = prev.filter((c) => c.type === 'input');
      const outputs = prev.filter((c) => c.type === 'output');
      const element = inputs.splice(dragIndex, 1)[0];
      inputs.splice(hoverIndex, 0, element);
      return [...inputs, ...outputs];
    });
  }, []);

  const moveOutputCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setColumns((prev) => {
      const inputs = prev.filter((c) => c.type === 'input');
      const outputs = prev.filter((c) => c.type === 'output');
      const element = outputs.splice(dragIndex, 1)[0];
      outputs.splice(hoverIndex, 0, element);
      return [...inputs, ...outputs];
    });
  }, []);

  const enabledColumns = useMemo(() => columns.filter((c) => !disabledColumns[c.id]), [columns, disabledColumns]);
  const hasEnabledOutput = useMemo(() => enabledColumns.some((c) => c.type === 'output'), [enabledColumns]);
  const isOkDisabled = enabledColumns.length === 0 || !hasEnabledOutput;

  const handleFieldChange = useCallback(
    (colId: string, field: string, fieldType?: ColumnFieldType, outputFieldType?: OutputFieldType) => {
      setColumns((prev) =>
        prev.map((c) => {
          if (c.id !== colId) return c;
          return {
            ...c,
            field: field || c.field,
            ...(fieldType !== undefined ? { fieldType } : {}),
            ...(outputFieldType !== undefined ? { outputFieldType } : {}),
          };
        }),
      );
    },
    [],
  );

  const handleRemoveColumn = useCallback((colId: string) => {
    setColumns((prev) => prev.filter((c) => c.id !== colId));
    setDisabledColumns((prev) => {
      const updated = { ...prev };
      delete updated[colId];
      return updated;
    });
    setWrapStates((prev) => {
      const updated = { ...prev };
      delete updated[colId];
      return updated;
    });
  }, []);

  const handleAddInput = useCallback(
    (name: string, field: string, fieldType?: ColumnFieldType) => {
      const newCol: ImportColumn = {
        id: crypto.randomUUID(),
        name,
        field,
        type: 'input',
        fieldType,
      };
      // Auto-match unmatched Excel header
      const usedExcelIds = new Set(columns.map((c) => c.excelHeaderId).filter(Boolean));
      const unmatchedExcel = excelHeaders.find((eh) => {
        if (usedExcelIds.has(eh.id)) return false;
        const ehLabel = (eh.name || eh.value || '').toLowerCase();
        return ehLabel === name.toLowerCase() || ehLabel === field.toLowerCase();
      });
      if (unmatchedExcel) {
        newCol.excelHeaderId = unmatchedExcel.id;
      }
      setColumns((prev) => [...prev, newCol]);
    },
    [columns, excelHeaders],
  );

  const handleAddOutput = useCallback(
    (name: string, field: string, outputFieldType?: OutputFieldType) => {
      const newCol: ImportColumn = {
        id: crypto.randomUUID(),
        name,
        field,
        type: 'output',
        outputFieldType,
      };
      // Auto-match unmatched Excel header
      const usedExcelIds = new Set(columns.map((c) => c.excelHeaderId).filter(Boolean));
      const unmatchedExcel = excelHeaders.find((eh) => {
        if (usedExcelIds.has(eh.id)) return false;
        const ehLabel = (eh.name || eh.value || '').toLowerCase();
        return ehLabel === name.toLowerCase() || ehLabel === field.toLowerCase();
      });
      if (unmatchedExcel) {
        newCol.excelHeaderId = unmatchedExcel.id;
      }
      setColumns((prev) => [...prev, newCol]);
    },
    [columns, excelHeaders],
  );

  const onOk = useCallback(() => {
    if (!spreadSheetData) return;

    const enabled = columns.filter((c) => !disabledColumns[c.id]);
    const inputItems = enabled
      .filter((c) => c.type === 'input')
      .map((c) => ({
        id: c.id,
        label: c.name,
        value: c.field || c.name,
        type: 'input' as const,
        wrapInQuotes: wrapStates[c.id] || false,
      }));
    const outputItems = enabled
      .filter((c) => c.type === 'output')
      .map((c) => ({
        id: c.id,
        label: c.name,
        value: c.field || c.name,
        type: 'output' as const,
        wrapInQuotes: wrapStates[c.id] || false,
      }));
    const items: ItemValue[] = [...inputItems, ...outputItems];

    if (descriptionEnabled && descriptionExcelId) {
      items.push({ id: '_description', label: 'Description', value: 'description' });
    }

    const wrapLookup = items.reduce(
      (acc, item) => {
        acc[item.id] = item.wrapInQuotes || false;
        return acc;
      },
      {} as Record<string, boolean>,
    );

    const rules = spreadSheetData.rules.map((ruleRow) => {
      const ruleData: RuleData[] = [];
      for (const col of enabled) {
        const excelRule = col.excelHeaderId ? ruleRow.find((r) => r.headerId === col.excelHeaderId) : undefined;
        const rawValue = excelRule?.value ?? col.defaultValue ?? '';
        const value =
          wrapLookup[col.id] && rawValue
            ? rawValue
                .split(',')
                .map((s) => `"${s.trim()}"`)
                .join(', ')
            : rawValue;
        ruleData.push({ headerId: col.id, value });
      }
      // Add _id
      const idRule = ruleRow.find((r) => r.headerId === '_id');
      if (idRule) ruleData.push(idRule);
      // Add description
      if (descriptionEnabled && descriptionExcelId) {
        const descRule = ruleRow.find((r) => r.headerId === descriptionExcelId);
        ruleData.push({ headerId: '_description', value: descRule?.value ?? '' });
      }
      return ruleData;
    });

    handleSuccess({ items, rules });
  }, [spreadSheetData, columns, disabledColumns, wrapStates, descriptionEnabled, descriptionExcelId, handleSuccess]);

  const addInputTrigger = (
    <Button type='text' size='small' icon={<PlusOutlined />}>
      Add Input
    </Button>
  );

  const addOutputTrigger = (
    <Button type='text' size='small' icon={<PlusOutlined />}>
      Add Output
    </Button>
  );

  return (
    <Modal
      title='Map Excel data'
      closable={{ 'aria-label': 'Custom Close Button' }}
      centered
      open={!!spreadSheetData}
      okButtonProps={{ disabled: isOkDisabled }}
      onOk={onOk}
      onCancel={handleCancel}
      destroyOnClose
      width={900}
      getContainer={getContainer}
    >
      <div style={{ padding: '8px 0' }}>
        {/* Inputs Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <Typography.Text strong style={{ fontSize: 13 }}>
            Inputs
          </Typography.Text>
          <InputFieldEdit
            mode='create'
            variableType={inputVariableType}
            onCreate={handleAddInput}
            trigger={addInputTrigger}
          />
        </div>
        <div
          style={{
            border: '1px solid var(--grl-color-border)',
            borderRadius: 8,
            padding: '4px 12px',
            marginBottom: 16,
            minHeight: 40,
          }}
        >
          {/* Column headers */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '24px 36px 1fr 12px 1fr 28px 28px 28px',
              gap: '8px',
              padding: '6px 0 2px',
            }}
          >
            <div />
            <div />
            <Typography.Text type='secondary' style={{ fontSize: 12, fontWeight: 600 }}>
              Table column
            </Typography.Text>
            <div />
            <Typography.Text type='secondary' style={{ fontSize: 12, fontWeight: 600 }}>
              Excel column
            </Typography.Text>
            <div />
            <div />
            <div />
          </div>
          {inputColumns.length === 0 && (
            <Typography.Text type='secondary' style={{ fontSize: 12, padding: '8px 0', display: 'block' }}>
              No input columns
            </Typography.Text>
          )}
          {inputColumns.map((col, index) => (
            <ImportColumnRow
              key={col.id}
              col={col}
              index={index}
              section='input'
              moveCard={moveInputCard}
              excelHeaders={excelHeaders}
              disabled={!!disabledColumns[col.id]}
              wrapChecked={wrapStates[col.id] || false}
              onToggle={(enabled) => {
                setDisabledColumns((prev) => {
                  const updated = { ...prev };
                  if (enabled) {
                    delete updated[col.id];
                  } else {
                    updated[col.id] = true;
                  }
                  return updated;
                });
              }}
              onExcelHeaderChange={(excelHeaderId) => {
                setColumns((prev) => prev.map((c) => (c.id === col.id ? { ...c, excelHeaderId } : c)));
              }}
              onWrapChange={(checked) => {
                setWrapStates((prev) => ({ ...prev, [col.id]: checked }));
              }}
              onFieldChange={(field, fieldType, outputFieldType) =>
                handleFieldChange(col.id, field, fieldType, outputFieldType)
              }
              onRemove={() => handleRemoveColumn(col.id)}
            />
          ))}
        </div>

        {/* Outputs Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <Typography.Text strong style={{ fontSize: 13 }}>
            Outputs
          </Typography.Text>
          <OutputFieldEdit mode='create' onCreate={handleAddOutput} trigger={addOutputTrigger} />
        </div>
        <div
          style={{
            border: '1px solid var(--grl-color-border)',
            borderRadius: 8,
            padding: '4px 12px',
            marginBottom: 16,
            minHeight: 40,
          }}
        >
          {outputColumns.length === 0 && (
            <Typography.Text type='secondary' style={{ fontSize: 12, padding: '8px 0', display: 'block' }}>
              No output columns
            </Typography.Text>
          )}
          {outputColumns.map((col, index) => (
            <ImportColumnRow
              key={col.id}
              col={col}
              index={index}
              section='output'
              moveCard={moveOutputCard}
              excelHeaders={excelHeaders}
              disabled={!!disabledColumns[col.id]}
              wrapChecked={wrapStates[col.id] || false}
              onToggle={(enabled) => {
                setDisabledColumns((prev) => {
                  const updated = { ...prev };
                  if (enabled) {
                    delete updated[col.id];
                  } else {
                    updated[col.id] = true;
                  }
                  return updated;
                });
              }}
              onExcelHeaderChange={(excelHeaderId) => {
                setColumns((prev) => prev.map((c) => (c.id === col.id ? { ...c, excelHeaderId } : c)));
              }}
              onWrapChange={(checked) => {
                setWrapStates((prev) => ({ ...prev, [col.id]: checked }));
              }}
              onFieldChange={(field, fieldType, outputFieldType) =>
                handleFieldChange(col.id, field, fieldType, outputFieldType)
              }
              onRemove={() => handleRemoveColumn(col.id)}
            />
          ))}
        </div>

        {/* Description Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <Typography.Text strong style={{ fontSize: 13 }}>
            Description
          </Typography.Text>
        </div>
        <div
          style={{
            border: '1px solid var(--grl-color-border)',
            borderRadius: 8,
            padding: '8px 12px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '36px 24px 1fr',
              gap: '8px',
              alignItems: 'center',
            }}
          >
            <Switch
              size='small'
              checked={descriptionEnabled}
              onChange={setDescriptionEnabled}
              style={{ minWidth: 28 }}
            />
            <LeftOutlined style={{ fontSize: 12, color: 'var(--grl-color-primary)' }} />
            <Select
              allowClear
              style={{ width: '100%' }}
              placeholder='Select Excel column for description'
              value={descriptionExcelId}
              disabled={!descriptionEnabled}
              onChange={(val) => setDescriptionExcelId(val ?? undefined)}
              options={excelHeaders.map((h) => ({
                label: h.name || h.value || h.id,
                value: h.id,
              }))}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
