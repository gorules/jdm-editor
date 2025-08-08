import { PlusOutlined, SwapOutlined } from '@ant-design/icons';
import { Button, Tooltip, Typography } from 'antd';
import clsx from 'clsx';
import React from 'react';

import { DiffIcon } from '../../diff-icon';
import { Stack } from '../../stack';
import { TextEdit } from '../../text-edit';
import { InputFieldEdit } from '../components/input-field-edit';
import { OutputFieldEdit } from '../components/output-field-edit';
import { useDecisionTableDialog } from '../context/dt-dialog.context';
import type { DecisionTablePermission } from '../context/dt-store.context';
import { type TableSchemaItem, useDecisionTableActions, useDecisionTableState } from '../context/dt-store.context';
import { getReferenceMap } from '../util';

export type TableHeadCellProps = {
  permission?: DecisionTablePermission;
  disabled?: boolean;
};

export type TableHeadCellFieldProps = {
  permission?: DecisionTablePermission;
  disabled?: boolean;
  schema: TableSchemaItem;
};

export const TableHeadCellInput: React.FC<TableHeadCellProps> = ({ permission, disabled }) => {
  const inputs = useDecisionTableState((store) => store.decisionTable?.inputs);
  const tableActions = useDecisionTableActions();
  const { setDialog } = useDecisionTableDialog();

  return (
    <div className={'head-cell'}>
      <Stack horizontal horizontalAlign='space-between' verticalAlign='center'>
        <Stack gap={0} className={'text-wrapper'} verticalAlign={'center'}>
          <Typography.Text className={'span-overflow grl-dt-text-primary'}>Inputs</Typography.Text>
        </Stack>
        {(permission === 'edit:full' || permission === 'edit:rules') && (
          <div className={'cta-wrapper'}>
            {inputs?.length > 1 && (
              <Tooltip title='Reorder fields'>
                <Button
                  className='grl-dt-text-secondary'
                  icon={<SwapOutlined />}
                  size={'small'}
                  type={'text'}
                  disabled={disabled}
                  onClick={() => {
                    setDialog({
                      type: 'reorder',
                      columnType: 'inputs',
                      item: null,
                    });
                  }}
                />
              </Tooltip>
            )}
            <Tooltip title='Add input'>
              <Button
                className='grl-dt-text-secondary'
                size={'small'}
                type={'text'}
                icon={<PlusOutlined />}
                disabled={disabled}
                onClick={() => {
                  tableActions.addColumn('inputs', {
                    id: crypto.randomUUID(),
                    name: 'New field',
                  });
                }}
              />
            </Tooltip>
          </div>
        )}
      </Stack>
    </div>
  );
};

export const TableHeadCellOutput: React.FC<TableHeadCellProps> = ({ permission, disabled }) => {
  const outputs = useDecisionTableState((store) => store.decisionTable?.outputs);
  const tableActions = useDecisionTableActions();
  const { setDialog } = useDecisionTableDialog();

  return (
    <div className={'head-cell'}>
      <Stack horizontal horizontalAlign={'space-between'} verticalAlign={'center'}>
        <Stack gap={0} className={'text-wrapper'} verticalAlign={'center'}>
          <Typography.Text className={'span-overflow grl-dt-text-primary'}>Outputs</Typography.Text>
        </Stack>
        {permission === 'edit:full' && (
          <div className={'cta-wrapper'}>
            {outputs?.length > 1 && (
              <Tooltip title='Reorder fields'>
                <Button
                  className='grl-dt-text-secondary'
                  icon={<SwapOutlined />}
                  size={'small'}
                  type={'text'}
                  disabled={disabled}
                  onClick={() => {
                    setDialog({
                      type: 'reorder',
                      columnType: 'outputs',
                      item: null,
                    });
                  }}
                />
              </Tooltip>
            )}
            <Tooltip title='Add output'>
              <Button
                className='grl-dt-text-secondary'
                size={'small'}
                type={'text'}
                icon={<PlusOutlined />}
                disabled={disabled}
                onClick={() => {
                  tableActions.addColumn('outputs', { id: crypto.randomUUID(), name: 'Output', field: 'output' });
                }}
              />
            </Tooltip>
          </div>
        )}
      </Stack>
    </div>
  );
};

export const TableHeadCellInputField: React.FC<TableHeadCellFieldProps> = ({ permission, disabled, schema }) => {
  const tableActions = useDecisionTableActions();
  const { inputData, inputVariableType } = useDecisionTableState(({ calculatedInputData, inputVariableType }) => ({
    inputData: calculatedInputData,
    inputVariableType,
  }));

  const referenceData = useDecisionTableState(({ debug, debugIndex }) => {
    if (!debug) {
      return undefined;
    }

    const { trace, snapshot } = debug;
    const snapshotField = snapshot.inputs.find((i) => i.id === schema.id);
    if (!snapshotField?.field) {
      return undefined;
    }

    const referenceMap = getReferenceMap(trace, debugIndex);
    return {
      field: snapshotField.field,
      value: referenceMap?.[snapshotField.field],
    };
  });

  return (
    <div className={clsx(['head-cell'])}>
      <Stack horizontal horizontalAlign={'space-between'} verticalAlign={'center'}>
        <Stack gap={0} className={'text-wrapper'}>
          {schema?._diff?.fields?.name?.status === 'modified' && (
            <Typography.Text className={clsx(['span-overflow', 'grl-dt-text-primary', 'text-removed'])}>
              {schema?._diff?.fields?.name?.previousValue}
            </Typography.Text>
          )}
          <TextEdit
            className={clsx(['span-overflow', 'grl-dt-text-primary'])}
            value={schema.name}
            onChange={(name) => {
              tableActions.updateColumn('inputs', schema.id, { ...schema, name });
            }}
          />
          {schema?._diff?.fields?.field?.status && (
            <Typography.Text
              className={clsx(['span-overflow', 'grl-dt-text-secondary', 'text-removed'])}
              type='secondary'
              style={{ fontSize: 12 }}
            >
              {schema?._diff?.fields?.field?.previousValue}
            </Typography.Text>
          )}
          <InputFieldEdit
            value={schema.field}
            variableType={inputVariableType}
            inputData={inputData}
            referenceData={referenceData}
            disabled={disabled || (permission !== 'edit:full' && permission !== 'edit:rules')}
            onRemove={() => {
              tableActions.removeColumn('inputs', schema.id);
            }}
            onChange={(field) => {
              tableActions.updateColumn('inputs', schema.id, { ...schema, field });
            }}
          />
        </Stack>
        <Stack horizontal gap={2} verticalAlign={'center'} style={{ width: 'auto' }}>
          <DiffIcon status={schema?._diff?.status} style={{ fontSize: 16 }} />
        </Stack>
      </Stack>
    </div>
  );
};

export const TableHeadCellOutputField: React.FC<TableHeadCellFieldProps> = ({ permission, disabled, schema }) => {
  const tableActions = useDecisionTableActions();

  return (
    <div className={clsx(['head-cell'])}>
      <Stack horizontal horizontalAlign='space-between' verticalAlign={'center'}>
        <Stack gap={0} className={'text-wrapper'} verticalAlign={'center'}>
          {schema?._diff?.fields?.name?.status === 'modified' && (
            <Typography.Text className={clsx(['span-overflow', 'grl-dt-text-primary', 'text-removed'])}>
              {schema?._diff?.fields?.name?.previousValue}
            </Typography.Text>
          )}
          <TextEdit
            className={clsx(['span-overflow', 'grl-dt-text-primary'])}
            value={schema.name}
            onChange={(name) => {
              tableActions.updateColumn('outputs', schema.id, { ...schema, name });
            }}
          />
          {schema?._diff?.fields?.field?.status === 'modified' && (
            <Typography.Text
              className={clsx(['span-overflow', 'grl-dt-text-secondary', 'text-removed'])}
              type='secondary'
              style={{ fontSize: 12 }}
            >
              {schema?._diff?.fields?.field?.previousValue}
            </Typography.Text>
          )}
          <OutputFieldEdit
            value={schema.field}
            disabled={disabled || permission !== 'edit:full'}
            onRemove={() => {
              tableActions.removeColumn('outputs', schema.id);
            }}
            onChange={(field) => {
              tableActions.updateColumn('outputs', schema.id, { ...schema, field });
            }}
          />
        </Stack>
        <Stack
          horizontal
          gap={2}
          verticalAlign={'center'}
          style={{
            width: 'auto',
          }}
        >
          <DiffIcon
            status={schema?._diff?.status}
            style={{
              fontSize: 16,
            }}
          />
        </Stack>
      </Stack>
    </div>
  );
};
