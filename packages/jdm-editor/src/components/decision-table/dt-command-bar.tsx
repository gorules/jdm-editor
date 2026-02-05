import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CloseOutlined,
  DeleteOutlined,
  ExportOutlined,
  ImportOutlined,
} from '@ant-design/icons';
import { Button, Divider, Popconfirm, Select, Tooltip, Typography, message } from 'antd';
import React, { useMemo, useRef, useState } from 'react';
import { P, match } from 'ts-pattern';
import { useTranslation } from 'react-i18next';

import type { ParsedExcelData } from '../../helpers/excel';
import { exportDecisionTable, getExcelData } from '../../helpers/excel';
import { Stack } from '../stack';
import type { MappedExcelData } from './components/dt-excel-dialog';
import { DtExcelDialog } from './components/dt-excel-dialog';
import {
  parseDecisionTable,
  useDecisionTableActions,
  useDecisionTableRaw,
  useDecisionTableState,
} from './context/dt-store.context';

export const DecisionTableCommandBar: React.FC = () => {
  // translation
  const { t } = useTranslation();
  const [excelData, setExcelData] = useState<ParsedExcelData[] | null>();

  const handleDataMapping = (mappedExcelData: MappedExcelData) => {
    const items = mappedExcelData.items;
    const rules = mappedExcelData.rules;

    const inputs = items
      .filter((item) => item.type === 'input')
      .map((item) => ({
        id: item.id,
        name: item.label,
        field: item.value
          ?.replace(/[^a-zA-Z0-9\s._]/g, '')
          .trim()
          .replace(/\s+/g, '.')
          .toLowerCase(),
      }));

    const outputs = items
      .filter((item) => item.type === 'output')
      .map((item) => ({
        id: item.id,
        name: item.label,
        field: item.value
          ?.replace(/[^a-zA-Z0-9\s._]/g, '')
          .trim()
          .split(/\s+/)
          .map((word, index) =>
            index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join(''),
      }));

    const reducedRules = rules.map((rule) =>
      rule.reduce(
        (acc: Record<string, any> & { _id: string }, item) => {
          acc[item.headerId] = item.value;
          return acc;
        },
        {
          _id: crypto.randomUUID(),
        },
      ),
    );

    const newTable = parseDecisionTable({
      executionMode: 'single',
      hitPolicy: 'first',
      inputs,
      outputs,
      rules: reducedRules,
      passThrough: false,
    });

    tableActions.setDecisionTable(newTable);
    listenerStore.getState().onChange?.(newTable);

    setExcelData(null);
  };

  const handleCancel = () => {
    setExcelData(null);
  };
  const tableActions = useDecisionTableActions();
  const { disabled, debugIndex, traceCount, cursor } = useDecisionTableState(
    ({ disableHitPolicy, disabled, permission, decisionTable, cursor, debugIndex, debug }) => ({
      disableHitPolicy,
      disabled,
      permission,
      cursor,
      debugIndex,
      hitPolicy: decisionTable.hitPolicy,
      diffHitPolicy: decisionTable?._diff?.fields?.hitPolicy,
      traceCount: match(debug?.trace?.traceData)
        .with(P.array(), (some) => some.length)
        .otherwise(() => null),
    }),
  );

  const { listenerStore, stateStore } = useDecisionTableRaw();
  const fileInput = useRef<HTMLInputElement>(null);

  const table = stateStore.getState().decisionTable;

  const exportExcel = async () => {
    try {
      const { decisionTable, name } = stateStore.getState();
      await exportDecisionTable(name ?? 'table', [
        { ...decisionTable, name: 'decision table', id: crypto.randomUUID() },
      ]);
      message.success(t('decisionTable.dtCommandBar.exportSuccess'));
    } catch (e) {
      console.error(t('decisionTable.dtCommandBar.exportError'), e);
      message.error(t('decisionTable.dtCommandBar.exportError'));
    }
  };

  const importExcel = () => {
    fileInput?.current?.click?.();
  };

  const readExcelFile = async (event: any) => {
    const file = event?.target?.files[0];
    const reader = new FileReader();

    try {
      reader.readAsArrayBuffer(file);
      reader.onload = async () => {
        const buffer = reader.result as ArrayBuffer;

        if (!buffer) return;

        const excelData = await getExcelData(buffer, table);

        if (excelData.length === 1) {
          setExcelData(excelData);
          message.success(t('decisionTable.dtCommandBar.importSuccess'));
        } else {
          message.error(t('decisionTable.dtCommandBar.importErrorFormat'));
        }
      };
    } catch {
      message.error(t('decisionTable.dtCommandBar.importError'));
    }
  };

  const traceIndexOptions = useMemo(() => {
    if (!traceCount) {
      return null;
    }

    return Array.from({ length: traceCount }).map((_, i) => ({
      label: String(i),
      value: i,
    }));
  }, [debugIndex, traceCount]);

  return (
    <>
      <Stack horizontal horizontalAlign={'space-between'} verticalAlign={'center'} className={'grl-dt__command-bar'}>
        <Stack gap={8} horizontal className='full-width'>
          <Button type='text' size={'small'} icon={<ExportOutlined />} onClick={exportExcel}>
            {t('decisionTable.dtCommandBar.exportExcel')}
          </Button>
          <Button
            type='text'
            size={'small'}
            disabled={disabled}
            icon={<ImportOutlined />}
            onClick={() => importExcel()}
          >
            {t('decisionTable.dtCommandBar.importExcel')}
          </Button>
          {cursor && !disabled && (
            <>
              <Divider
                type={'vertical'}
                style={{
                  height: 24,
                }}
              />
              <Tooltip title={t('decisionTable.dtCommandBar.addRowBelow')}>
                <Button
                  type='text'
                  size={'small'}
                  icon={<ArrowDownOutlined />}
                  onClick={() => tableActions.addRowBelow(cursor?.y)}
                />
              </Tooltip>
              <Tooltip title={t('decisionTable.dtCommandBar.addRowAbove')}>
                <Button
                  type='text'
                  size={'small'}
                  icon={<ArrowUpOutlined />}
                  onClick={() => tableActions.addRowAbove(cursor?.y)}
                />
              </Tooltip>
              <Tooltip>
                <Popconfirm title={t('decisionTable.dtCommandBar.removeRowTip')} okText={t('decisionTable.dtCommandBar.okText')} onConfirm={() => tableActions.removeRow(cursor?.y)}>
                  <Button type='text' danger size={'small'} icon={<DeleteOutlined />} />
                </Popconfirm>
              </Tooltip>
              <Button type='text' size={'small'} icon={<CloseOutlined />} onClick={() => tableActions.setCursor(null)}>
                {t('decisionTable.dtCommandBar.Deselect')}
              </Button>
            </>
          )}
        </Stack>
        {traceIndexOptions && (
          <Stack horizontal verticalAlign='center' horizontalAlign='end'>
            <Typography.Text style={{ fontSize: 12 }}>Simulation index:</Typography.Text>
            <Select
              size='small'
              style={{ fontSize: 12, minWidth: 60 }}
              options={traceIndexOptions}
              onChange={(debugIndex: number) => stateStore.setState({ debugIndex })}
              value={traceIndexOptions.some((t) => t.value === debugIndex) ? debugIndex : 0}
            />
            <Divider type='vertical' />
          </Stack>
        )}
      </Stack>
      <input
        multiple
        hidden
        accept='.xlsx'
        type='file'
        ref={fileInput}
        onChange={readExcelFile}
        onClick={(event) => {
          (event.target as any).value = null;
        }}
      />
      <DtExcelDialog excelData={excelData} handleSuccess={handleDataMapping} handleCancel={handleCancel} />
    </>
  );
};
