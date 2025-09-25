import { PlusOutlined, SwapOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Modal, Radio, Select, Tag } from 'antd';
import React, { Fragment, useEffect, useMemo, useState } from 'react';

import type { ParsedExcelData, RuleData } from '../../../helpers/excel';

// double-check this type
type ItemValue = {
  id: string;
  label: string;
  value?: string;
  type: string;
};

type SelectedItems = {
  [headerId: string]: ItemValue;
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

export const DtExcelDialog: React.FC<DtExcelDialogProps> = ({ excelData, handleSuccess, handleCancel }) => {
  const spreadSheetData = useMemo(() => excelData?.[0], [excelData]);

  const [items, setItems] = useState<ItemValue[]>([]);

  const [newItemName, setNewItemName] = useState<string>('');
  const [newItemType, setNewItemType] = useState<'input' | 'output'>('input');

  const [selectedItems, setSelectedItems] = useState<SelectedItems | null>(null);

  useEffect(() => {
    if (!spreadSheetData) {
      setSelectedItems(null);
      return;
    }

    const existingTableHeaders = spreadSheetData.existingTableData.headers.map((tableHeader) => ({
      ...tableHeader,
      value: tableHeader.field,
      label: tableHeader.name,
      type: tableHeader.type,
    }));

    setItems(existingTableHeaders);

    const excelHeaderIds = spreadSheetData?.headers?.map((header) => header.id) || [];

    const matchingHeaders = existingTableHeaders.filter((tableHeader) => excelHeaderIds.includes(tableHeader.id));

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

    setSelectedItems(selectedItemsMap);
  }, [spreadSheetData]);

  return (
    <Modal
      title='Map Excel data'
      closable={{ 'aria-label': 'Custom Close Button' }}
      centered
      open={!!spreadSheetData}
      onOk={() => {
        if (selectedItems && spreadSheetData) {
          handleSuccess({
            items: Object.keys(selectedItems).map((key) => ({
              ...selectedItems[key],
              id: key,
            })),
            rules: spreadSheetData.rules,
          });
        }
      }}
      onCancel={handleCancel}
      destroyOnClose={true}
      width={800}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: '16px 24px',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        {spreadSheetData?.headers
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
                defaultValue={(() => items.find((item) => item.id === header.id)?.value)()}
                onSelect={(_, option) => {
                  const { id, label, value, type } = option;

                  setSelectedItems((selectedItems) => ({ ...selectedItems, [header.id]: { id, label, value, type } }));
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
                          onChange={(event) => setNewItemName(event.target.value)}
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
                options={items.map((item) => {
                  return {
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
                  };
                })}
              />
            </Fragment>
          ))}
      </div>
    </Modal>
  );
};
