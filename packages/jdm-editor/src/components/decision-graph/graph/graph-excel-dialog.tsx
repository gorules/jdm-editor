import { InfoCircleOutlined, PlusOutlined, SwapOutlined } from '@ant-design/icons';
import { Button, Checkbox, Divider, Input, Modal, Radio, Select, Steps, Tag, Tooltip, Typography } from 'antd';
import { isEmpty } from 'lodash';
import React, { Fragment, useEffect, useMemo, useState } from 'react';

import type { ParsedExcelData, RuleData } from '../../../helpers/excel';
import type { NodeKind } from '../../../helpers/schema';
import type { HitPolicy } from '../../decision-table/context/dt-store.context';

type ItemValue = {
  id: string;
  label: string;
  value?: string;
  type?: 'input' | 'output';
  field?: string;
  name?: string;
  wrapInQuotes?: boolean;
};

type SelectedItems = {
  [stepKey: string]: {
    [headerId: string]: ItemValue;
  };
};

export type MergedDataItem = {
  items: ItemValue[];
  rules: RuleData[][];
  id: string;
  name: string;
  type: NodeKind;
  position: { x: number; y: number };
  hitPolicy: HitPolicy | string;
  inputField?: string | null;
  outputPath?: string | null;
  passThrough?: boolean;
  executionMode?: 'single' | 'loop';
};

type GraphExcelDialogProps = {
  excelData?: ParsedExcelData[] | null;
  handleSuccess: (items: MergedDataItem[]) => void;
  handleCancel: () => void;
};

type TableHeader = {
  id: string;
  label: string;
  value?: string;
  type?: 'input' | 'output';
};

const dataTypeConfig = {
  ['input']: { label: 'Input', color: '#acccec' },
  ['output']: { label: 'Output', color: '#c7e0ba' },
};

const isHeaderMatch = (header1: TableHeader, header2: TableHeader) => {
  return (
    header1.id === header2.id ||
    header1.value?.toLowerCase() === header2.value?.toLowerCase() ||
    header1.label?.toLowerCase() === header2.label?.toLowerCase()
  );
};

const mergeHeaders = (newHeader: TableHeader, existingHeader?: TableHeader) => {
  if (existingHeader) {
    return {
      id: newHeader.id,
      label: newHeader.label || existingHeader.label,
      value: newHeader.value || existingHeader.value,
      type: newHeader.type || existingHeader.type,
    };
  }

  return {
    ...newHeader,
    value: newHeader.value || newHeader.label,
  };
};

export const GraphExcelDialog: React.FC<GraphExcelDialogProps> = ({ excelData, handleSuccess, handleCancel }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const steps = useMemo(() => excelData?.map((item) => ({ key: item.id, title: item.name })), [excelData]);

  const [items, setItems] = useState<ItemValue[]>([]);
  const [newItemName, setNewItemName] = useState<string>('');

  const [headerWrapStates, setHeaderWrapStates] = useState<Record<string, Record<string, boolean>>>({});

  const [selectedItems, setSelectedItems] = useState<SelectedItems | null>(null);

  useEffect(() => {
    if (!excelData) {
      setSelectedItems(null);
      setCurrentStep(0);
      setNewItemName('');
      setHeaderWrapStates({});

      return;
    }
    const existingTableHeaders = excelData[currentStep].existingTableData.headers
      .map((tableHeader) => ({
        ...tableHeader,
        value: tableHeader.field,
        label: tableHeader.name as string,
        type: tableHeader.type,
      }))
      .filter((header) => header.value);

    const newTableHeaders = (excelData[currentStep]?.headers || []).map((header) => ({
      id: header.id || crypto.randomUUID(),
      value: header.id === '_description' ? 'description' : header.value,
      label: header.name as string,
      ...(header.id !== '_description' && { type: header._type as 'input' | 'output' | undefined }),
    }));

    const items = [
      ...newTableHeaders.map((newTableHeader) => {
        const existingHeader = existingTableHeaders.find((header) => isHeaderMatch(header, newTableHeader));

        return mergeHeaders(newTableHeader, existingHeader);
      }),
      ...existingTableHeaders.filter(
        (existingTableHeader) => !newTableHeaders.some((newHeader) => isHeaderMatch(newHeader, existingTableHeader)),
      ),
    ];

    if (!items.some((item) => item.id === '_description')) {
      items.push({
        id: '_description',
        label: 'DESCRIPTION',
        value: 'description',
      });
    }

    setItems(items);

    const matchingHeaders = items.filter((item) => {
      return newTableHeaders.some((excelHeader) => excelHeader.id === item.id);
    });

    if (matchingHeaders.length) {
      const selectedItemsMap = matchingHeaders.reduce((acc, tableHeader, index) => {
        const hasDescription = matchingHeaders.some((header) => header.value === 'description');
        const hasOutputAlready = matchingHeaders.slice(0, index).some((header) => header.type === 'output');

        let shouldBeOutput;

        if (hasDescription) {
          // If there's description, set second-to-last as output
          shouldBeOutput = index === matchingHeaders.length - 2 && !hasOutputAlready;
        } else {
          // If no description, set last as output (excluding if it IS description)
          shouldBeOutput =
            index === matchingHeaders.length - 1 && tableHeader.value !== 'description' && !hasOutputAlready;
        }

        return {
          ...acc,
          [tableHeader.id]: {
            id: tableHeader.id,
            label: tableHeader.label,
            value: tableHeader.value,
            type: shouldBeOutput ? 'output' : tableHeader.type,
          },
        };
      }, {});

      setSelectedItems((prevItems) => {
        const stepKey = `step${currentStep}`;
        const currentStepData = (prevItems || {})[stepKey];

        if (currentStepData) {
          return prevItems;
        }

        return {
          ...(prevItems || {}),
          [stepKey]: selectedItemsMap,
        };
      });
    }
  }, [excelData, currentStep]);

  return (
    <Modal
      title='Map Excel data'
      closable={{ 'aria-label': 'Custom Close Button' }}
      centered
      open={!!excelData}
      onCancel={handleCancel}
      destroyOnClose={true}
      width={1024}
      footer={[
        <Button key='cancel' onClick={handleCancel}>
          Cancel
        </Button>,
      ]}
    >
      <Steps current={currentStep} items={steps} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr auto 0.1fr',
          gap: '16px 24px',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        <Typography.Text
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--grl-color-text-secondary)',
            marginBottom: '-8px',
          }}
        >
          Excel columns
        </Typography.Text>
        {/*placeholder for grid*/}
        <div />
        <Typography.Text
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--grl-color-text-secondary)',
            marginBottom: '-8px',
          }}
        >
          Decision table columns
        </Typography.Text>
        <Typography.Text
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--grl-color-text-secondary)',
            marginBottom: '-8px',
          }}
        >
          Data type
        </Typography.Text>
        {/*placeholder for grid*/}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '-8px' }}>
          <Tooltip title='Wrap value in quotes'>
            <InfoCircleOutlined style={{ color: 'var(--grl-color-text-secondary)', cursor: 'pointer' }} />
          </Tooltip>
        </div>
        {excelData?.[currentStep]?.headers.map((header, index) => (
          <Fragment key={index}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '30px',
                padding: '0 12px',
                backgroundColor: 'var(--grl-color-bg-layout)',
                borderRadius: '8px',
                border: '1px solid var(--grl-color-border)',
              }}
            >
              <Typography.Text>{header.name || header.value}</Typography.Text>
            </div>

            <SwapOutlined
              style={{
                fontSize: '16px',
                color: 'var(--grl-color-primary)',
              }}
            />

            <Select
              key={header.id}
              style={{ width: '100%' }}
              placeholder='select field'
              optionLabelProp='display'
              value={selectedItems?.[`step${currentStep}`]?.[header.id]?.value}
              allowClear
              onClear={() => {
                setSelectedItems((prevItems) => {
                  const stepKey = `step${currentStep}`;
                  const currentStepData = { ...(prevItems || {})[stepKey] };
                  delete currentStepData[header.id];
                  return {
                    ...(prevItems || {}),
                    [stepKey]: currentStepData,
                  };
                });

                setHeaderWrapStates((prev) => {
                  const stepKey = `step${currentStep}`;
                  const updated = { ...prev[stepKey] };
                  delete updated[header.id];
                  return { ...prev, [stepKey]: updated };
                });
              }}
              onSelect={(_, option) => {
                const { id, label, value, type, wrapInQuotes } = option;

                setSelectedItems((prevItems) => {
                  const stepKey = `step${currentStep}`;
                  const currentStepData = { ...(prevItems || {})[stepKey] };
                  const clearedHeaderIds: string[] = [];

                  Object.keys(currentStepData).forEach((key) => {
                    if (
                      key !== header.id &&
                      (currentStepData[key].value === value || currentStepData[key].label === label)
                    ) {
                      clearedHeaderIds.push(key);
                      delete currentStepData[key];
                    }
                  });

                  if (clearedHeaderIds.length > 0) {
                    setHeaderWrapStates((prev) => {
                      const stepData = { ...(prev[stepKey] || {}) };
                      clearedHeaderIds.forEach((id) => delete stepData[id]);
                      return { ...prev, [stepKey]: stepData };
                    });
                  }

                  return {
                    ...(prevItems || {}),
                    [stepKey]: {
                      ...currentStepData,
                      [header.id]: { id, label, value, type, wrapInQuotes },
                    },
                  };
                });
              }}
              dropdownRender={(menu) => (
                <Fragment>
                  {menu}
                  <Divider style={{ margin: '8px 0' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '0 8px 4px' }}>
                    <div
                      style={{
                        flex: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Input
                        placeholder='Enter field name'
                        value={newItemName}
                        onChange={(event) => setNewItemName(event.target.value)}
                      />
                    </div>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                      <Button
                        type='text'
                        icon={<PlusOutlined />}
                        onClick={() => {
                          setItems([
                            ...items,
                            {
                              value: newItemName,
                              label: newItemName,
                              id: crypto.randomUUID(),
                            },
                          ]);
                          setNewItemName('');
                        }}
                      >
                        Add item
                      </Button>
                    </div>
                  </div>
                </Fragment>
              )}
              optionRender={(option) => {
                return (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{option.data.label}</span>
                    {option.data.type && (
                      <Tag style={{ background: dataTypeConfig[option.data.type].color }}>
                        {dataTypeConfig[option.data.type].label}
                      </Tag>
                    )}
                  </div>
                );
              }}
              options={items
                .filter((item) => item.value)
                .map((item) => {
                  return {
                    id: item.id,
                    label: item.label,
                    value: item.value,
                    type: item.type,
                    wrapInQuotes: item.wrapInQuotes,
                    display: (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          width: '100%',
                        }}
                      >
                        <span>{item.label}</span>
                      </div>
                    ),
                  };
                })}
            />
            {selectedItems && selectedItems?.[`step${currentStep}`]?.[header.id]?.value !== 'description' ? (
              <Radio.Group
                disabled={!selectedItems?.[`step${currentStep}`]?.[header.id]}
                value={selectedItems[`step${currentStep}`]?.[header.id]?.type ?? 'input'}
                onChange={(e) => {
                  setSelectedItems((prev) => {
                    const stepKey = `step${currentStep}`;
                    const currentStepData = (prev || {})[stepKey];
                    return {
                      ...(prev || {}),
                      [stepKey]: {
                        ...currentStepData,
                        [header.id]: {
                          ...currentStepData[header.id],
                          type: e.target.value,
                        },
                      },
                    };
                  });
                }}
                buttonStyle='solid'
                style={{ width: '100%', display: 'flex' }}
              >
                <Radio.Button value='input' style={{ flex: 1, textAlign: 'center' }}>
                  Input
                </Radio.Button>
                <Radio.Button value='output' style={{ flex: 1, textAlign: 'center' }}>
                  Output
                </Radio.Button>
              </Radio.Group>
            ) : (
              /** placeholder for grid */
              <div />
            )}
            {selectedItems?.[`step${currentStep}`]?.[header.id]?.value !== 'description' ? (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Checkbox
                  disabled={!selectedItems?.[`step${currentStep}`]?.[header.id]}
                  checked={headerWrapStates[`step${currentStep}`]?.[header.id] || false}
                  onChange={(e) => {
                    setHeaderWrapStates((prev) => {
                      const stepKey = `step${currentStep}`;
                      return {
                        ...prev,
                        [stepKey]: {
                          ...(prev[stepKey] || {}),
                          [header.id]: e.target.checked,
                        },
                      };
                    });
                  }}
                />
              </div>
            ) : (
              /** placeholder for grid */
              <div />
            )}
          </Fragment>
        ))}
      </div>
      <div style={{ marginTop: 24 }}>
        {currentStep < (excelData || []).length - 1 && (
          <Button
            type='primary'
            disabled={!selectedItems?.[`step${currentStep}`] || isEmpty(selectedItems[`step${currentStep}`])}
            onClick={() => {
              setCurrentStep(currentStep + 1);
            }}
          >
            Next
          </Button>
        )}
        {currentStep === (excelData || []).length - 1 && (
          <Button
            type='primary'
            disabled={!selectedItems?.[`step${currentStep}`] || isEmpty(selectedItems[`step${currentStep}`])}
            onClick={() => {
              if (selectedItems && excelData) {
                const mergedData = Object.keys(selectedItems).map((stepKey, index) => {
                  const stepItems = selectedItems[stepKey];
                  const stepWrapStates = headerWrapStates[stepKey] || {};

                  const items = Object.keys(stepItems).map((key) => ({
                    ...stepItems[key],
                    wrapInQuotes: stepWrapStates[key] || false,
                    ...(stepItems[key].value !== 'description' && {
                      type: stepItems[key].type ?? 'input',
                    }),
                  }));

                  const wrap = items.reduce(
                    (acc, item) => {
                      acc[item.id] = item.wrapInQuotes || false;
                      return acc;
                    },
                    {} as Record<string, boolean>,
                  );

                  const selectedHeaderIds = Object.keys(stepItems);

                  const rules = (excelData[index].rules || []).map((rulesData) => {
                    return rulesData
                      .filter((rule) => [...selectedHeaderIds, '_id'].includes(rule.headerId))
                      .map((rule) => ({
                        headerId: stepItems[rule.headerId]?.id ?? rule.headerId,
                        value: wrap[stepItems[rule.headerId]?.id ?? rule.headerId]
                          ? rule.value
                            ? rule.value
                                .split(',')
                                .map((s) => `"${s.trim()}"`)
                                .join(', ')
                            : ''
                          : rule.value,
                      }));
                  });

                  return {
                    items,
                    rules,
                    id: excelData[index].id,
                    name: excelData[index].name,
                    type: excelData[index].type,
                    position: excelData[index].position,
                    hitPolicy: excelData[index].existingTableData.hitPolicy,
                    inputField: excelData[index].existingTableData.inputField,
                    outputPath: excelData[index].existingTableData.outputPath,
                    passThrough: excelData[index].existingTableData.passThrough,
                    executionMode: excelData[index].existingTableData.executionMode,
                  };
                });

                handleSuccess(mergedData);
              }
            }}
          >
            Done
          </Button>
        )}
        {currentStep > 0 && (
          <Button
            style={{ margin: '0 8px' }}
            onClick={() => {
              setCurrentStep(currentStep - 1);
            }}
          >
            Previous
          </Button>
        )}
      </div>
    </Modal>
  );
};
