import { PlusOutlined, SwapOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Modal, Radio, Select, Steps, Tag } from 'antd';
import React, { Fragment, useEffect, useMemo, useState } from 'react';

import type { ParsedExcelData, RuleData } from '../../../helpers/excel';
import type { NodeKind } from '../../../helpers/schema';
import type { HitPolicy } from '../../decision-table/context/dt-store.context';

type ItemValue = {
  id: string;
  label: string;
  value?: string;
  type: string;
  field?: string;
  name?: string;
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
  passThorough?: boolean;
  executionMode?: 'single' | 'loop';
};

type GraphExcelDialogProps = {
  excelData?: ParsedExcelData[] | null;
  handleSuccess: (items: MergedDataItem[]) => void;
  handleCancel: () => void;
};

export const GraphExcelDialog: React.FC<GraphExcelDialogProps> = ({ excelData, handleSuccess, handleCancel }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const steps = useMemo(() => excelData?.map((item) => ({ key: item.id, title: item.name })), [excelData]);

  const [items, setItems] = useState<ItemValue[]>([]);

  const [newItemName, setNewItemName] = useState<string>('');
  const [newItemType, setNewItemType] = useState<'input' | 'output'>('input');

  const [selectedItems, setSelectedItems] = useState<SelectedItems | null>(null);

  useEffect(() => {
    if (!excelData) {
      setSelectedItems(null);
      setNewItemType('input');
      setCurrentStep(0);

      return;
    }
    const existingTableHeaders = excelData[currentStep].existingTableData.headers.map((tableHeader) => ({
      ...tableHeader,
      value: tableHeader.field,
      label: tableHeader.name,
      type: tableHeader.type,
    }));

    setItems(existingTableHeaders);

    const excelHeaders = excelData[currentStep]?.headers || [];

    const matchingHeaders = existingTableHeaders.filter((tableHeader) => {
      return excelHeaders.some(
        (excelHeader) => excelHeader.id === tableHeader.id && excelHeader.value === tableHeader.value,
      );
    });

    const selectedItemsMap = matchingHeaders.reduce(
      (acc, tableHeader) => ({
        ...acc,
        [tableHeader.id]: {
          label: tableHeader.label,
          value: tableHeader.value,
          type: tableHeader.type,
        },
      }),
      {},
    );

    setSelectedItems((prevItems) => {
      const stepKey = `step${currentStep}`;
      const currentStepData = (prevItems || {})[stepKey] || {};

      return {
        ...(prevItems || {}),
        [stepKey]: {
          ...currentStepData,
          ...selectedItemsMap,
        },
      };
    });
  }, [excelData, currentStep]);

  return (
    <Modal
      title='Map Excel data'
      closable={{ 'aria-label': 'Custom Close Button' }}
      centered
      open={!!excelData}
      onCancel={handleCancel}
      destroyOnClose={true}
      width={800}
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
          gridTemplateColumns: '1fr auto 1fr',
          gap: '16px 24px',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        {excelData?.[currentStep]?.headers
          .filter((header) => header.value)
          .map((header, index) => (
            <Fragment key={index}>
              <div
                style={{
                  padding: '12px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '8px',
                  border: '1px solid #d9d9d9',
                }}
              >
                <p style={{ margin: 0, fontWeight: 500, color: '#262626' }}>{header.value}</p>
              </div>
              <SwapOutlined
                style={{
                  fontSize: '18px',
                  color: '#1890ff',
                  justifySelf: 'center',
                }}
              />
              <Select
                key={header.id}
                style={{ width: '100%' }}
                placeholder='select field'
                optionLabelProp='display'
                value={(() => {
                  if (selectedItems) {
                    return selectedItems[`step${currentStep}`]?.[header.id]?.value;
                  }
                })()}
                onSelect={(_, option) => {
                  const { id, label, value, type } = option;

                  setSelectedItems((prevItems) => {
                    const stepKey = `step${currentStep}`;
                    const currentStepData = (prevItems || {})[stepKey] || {};

                    return {
                      ...(prevItems || {}),
                      [stepKey]: {
                        ...currentStepData,
                        [header.id]: { id, label, value, type },
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
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Radio.Group
                          value={newItemType}
                          onChange={(e) => setNewItemType(e.target.value)}
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
                        <Input
                          placeholder='Enter field name'
                          value={newItemName}
                          onChange={(e) => setNewItemName(e.target.value)}
                          onKeyDown={(e) => e.stopPropagation()}
                        />
                      </div>
                      <Button
                        type='text'
                        icon={<PlusOutlined />}
                        onClick={() => {
                          setItems([
                            ...items,
                            { value: newItemName, label: newItemName, type: newItemType, id: crypto.randomUUID() },
                          ]);
                          setNewItemName('');
                        }}
                      >
                        Add item
                      </Button>
                    </div>
                  </Fragment>
                )}
                optionRender={(option) => {
                  return (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>{option.data.label}</span>
                      {option.data.type === 'input' && <Tag color='blue'>Input</Tag>}
                      {option.data.type === 'output' && <Tag color='green'>Output</Tag>}
                    </div>
                  );
                }}
                options={items.map((item) => ({
                  id: item.id,
                  label: item.label,
                  value: item.value,
                  type: item.type,
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
                      {item.type === 'input' && <Tag color='blue'>Input</Tag>}
                      {item.type === 'output' && <Tag color='green'>Output</Tag>}
                    </div>
                  ),
                }))}
              />
            </Fragment>
          ))}
      </div>
      <div style={{ marginTop: 24 }}>
        {currentStep < (excelData || []).length - 1 && (
          <Button
            type='primary'
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
            onClick={() => {
              if (selectedItems && excelData) {
                const selectedItemsArray = Object.keys(selectedItems).map((key) =>
                  Object.keys(selectedItems[key]).map((stepKey) => ({
                    ...selectedItems[key][stepKey],
                    id: stepKey,
                  })),
                );

                const mergedData = selectedItemsArray.map((items, index) => ({
                  items: items,
                  rules: excelData[index].rules || [],
                  id: excelData[index].id,
                  name: excelData[index].name,
                  type: excelData[index].type,
                  position: excelData[index].position,
                  hitPolicy: excelData[index].existingTableData.hitPolicy,
                  inputField: excelData[index].existingTableData.inputField,
                  outputPath: excelData[index].existingTableData.outputPath,
                  passThorough: excelData[index].existingTableData.passThorough,
                  executionMode: excelData[index].existingTableData.executionMode,
                }));

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
