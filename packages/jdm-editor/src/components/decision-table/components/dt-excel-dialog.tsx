import { InfoCircleOutlined, PlusOutlined, SwapOutlined } from '@ant-design/icons';
import { Button, Checkbox, Divider, Input, Modal, Radio, Select, Tag, Tooltip, Typography } from 'antd';
import React, { Fragment, useEffect, useMemo, useState } from 'react';

import type { ParsedExcelData, RuleData } from '../../../helpers/excel';

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
  const [selectedItems, setSelectedItems] = useState<SelectedItems | null>(null);

  const [headerWrapStates, setHeaderWrapStates] = useState<Record<string, boolean>>({});
  const [headerTypeStates, setHeaderTypeStates] = useState<Record<string, 'input' | 'output' | undefined>>({});

  useEffect(() => {
    if (!spreadSheetData) {
      setSelectedItems(null);
      setNewItemName('');

      return;
    }

    const existingTableHeaders = spreadSheetData.existingTableData.headers
      .map((tableHeader) => ({
        ...tableHeader,
        value: tableHeader.field,
        label: tableHeader.name,
        type: tableHeader.type,
      }))
      .filter((header) => header.value);

    const excelHeaders = spreadSheetData?.headers || [];

    const newTableHeaders = excelHeaders.map((header) => ({
      id: header.id || crypto.randomUUID(),
      value: header.id === '_description' ? 'description' : header.value,
      label: (header.name || header.value) as string,
      ...(header.id !== '_description' && { type: header._type }),
    }));

    const items = [
      ...existingTableHeaders,
      ...newTableHeaders.filter(
        (newTableHeader) =>
          !existingTableHeaders.some(
            (existingHeader) =>
              existingHeader.id === newTableHeader.id ||
              existingHeader.value === newTableHeader.value ||
              existingHeader.label === newTableHeader.label,
          ),
      ),
    ];

    if (!items.some((item) => item.id === '_description')) {
      items.push({
        id: '_description',
        label: 'DESCRIPTION',
        value: 'description',
      });
    }

    // @ts-expect-error "input" | "output" | "unset"
    setItems(items);

    const matchingHeaders = items
      .filter((tableHeader) => {
        return excelHeaders.some(
          (excelHeader) =>
            excelHeader.id === tableHeader.id ||
            excelHeader.value === tableHeader.value ||
            excelHeader.value === tableHeader.label,
        );
      })
      .map((tableHeader) => {
        const matchingExcelHeader = excelHeaders.find(
          (excelHeader) =>
            excelHeader.id === tableHeader.id ||
            excelHeader.value === tableHeader.value ||
            excelHeader.value === tableHeader.label,
        );
        return {
          ...tableHeader,
          excelHeaderId: matchingExcelHeader?.id,
        };
      });

    if (matchingHeaders.length) {
      const selectedItemsMap = matchingHeaders.reduce((acc, tableHeader, index) => {
        const hasDescription = matchingHeaders.some((header) => header.value === 'description');
        const hasOutputAlready = matchingHeaders.slice(0, index).some((header) => header.type === 'output');

        let shouldBeOutput = false;

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
          [tableHeader.excelHeaderId as string]: {
            id: tableHeader.id,
            label: tableHeader.label,
            value: tableHeader.value,
            type: shouldBeOutput ? 'output' : tableHeader.type,
          },
        };
      }, {});

      setSelectedItems(selectedItemsMap);
    }
  }, [spreadSheetData]);

  useEffect(() => {
    console.log('selectedItemsHook');
    if (!selectedItems) return;

    const headerTypeStates = Object.keys(selectedItems).reduce(
      (acc, key) => {
        acc[key] = selectedItems[key].type;
        return acc;
      },
      {} as Record<string, 'input' | 'output' | undefined>,
    );

    setHeaderTypeStates(headerTypeStates);
  }, [selectedItems]);

  return (
    <Modal
      title='Map Excel data'
      closable={{ 'aria-label': 'Custom Close Button' }}
      centered
      open={!!spreadSheetData}
      okButtonProps={{
        disabled: !selectedItems || Object.keys(selectedItems).length === 0,
      }}
      onOk={() => {
        if (selectedItems && spreadSheetData) {
          const items = Object.keys(selectedItems).map((key) => ({
            ...selectedItems[key],
            wrapInQuotes: headerWrapStates[key] || false,
            ...(selectedItems[key].value !== 'description' && {
              type: headerTypeStates[key] ?? 'input',
            }),
          }));

          const wrap = items.reduce(
            (acc, item) => {
              acc[item.id] = item.wrapInQuotes || false;
              return acc;
            },
            {} as Record<string, boolean>,
          );

          const selectedHeaderIds = Object.keys(selectedItems);

          const rules = spreadSheetData.rules.map((rulesData) => {
            return rulesData
              .filter((rule) => [...selectedHeaderIds, '_id'].includes(rule.headerId))
              .map((rule) => ({
                headerId: selectedItems[rule.headerId]?.id ?? rule.headerId,
                value: wrap[selectedItems[rule.headerId]?.id ?? rule.headerId]
                  ? rule.value
                    ? rule.value
                        .split(',')
                        .map((s) => `"${s.trim()}"`)
                        .join(', ')
                    : ''
                  : rule.value,
              }));
          });

          handleSuccess({
            items,
            rules,
          });
        }
      }}
      onCancel={handleCancel}
      destroyOnClose={true}
      width={1024}
    >
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
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '-8px' }}>
          <Tooltip title='Wrap value in quotes'>
            <InfoCircleOutlined style={{ color: 'var(--grl-color-text-secondary)', cursor: 'pointer' }} />
          </Tooltip>
        </div>
        {spreadSheetData?.headers.map((header, index) => (
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
              <Typography.Text>{header.value || header.name}</Typography.Text>
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
              value={selectedItems?.[header.id]?.value}
              allowClear
              onClear={() => {
                setSelectedItems((selectedItems) => {
                  const updatedItems = { ...selectedItems };
                  delete updatedItems[header.id];
                  return updatedItems;
                });

                setHeaderTypeStates((prev) => {
                  const updated = { ...prev };
                  delete updated[header.id];
                  return updated;
                });

                setHeaderWrapStates((prev) => {
                  const updated = { ...prev };
                  delete updated[header.id];
                  return updated;
                });
              }}
              onSelect={(_, option) => {
                const { id, label, value, type, wrapInQuotes } = option;

                setSelectedItems((selectedItems) => {
                  const updatedItems = { ...selectedItems };
                  const clearedHeaderIds: string[] = [];

                  Object.keys(updatedItems).forEach((key) => {
                    if (key !== header.id && (updatedItems[key].value === value || updatedItems[key].label === label)) {
                      clearedHeaderIds.push(key);
                      delete updatedItems[key];
                    }
                  });

                  if (clearedHeaderIds.length > 0) {
                    setHeaderTypeStates((prev) => {
                      const updated = { ...prev };
                      clearedHeaderIds.forEach((id) => delete updated[id]);
                      return updated;
                    });

                    setHeaderWrapStates((prev) => {
                      const updated = { ...prev };
                      clearedHeaderIds.forEach((id) => delete updated[id]);
                      return updated;
                    });
                  }

                  return {
                    ...updatedItems,
                    [header.id]: { id, label, value, type, wrapInQuotes },
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
                    {option.data.type === 'input' && <Tag style={{ background: '#acccec' }}>Input</Tag>}
                    {option.data.type === 'output' && <Tag style={{ background: '#c7e0ba' }}>Output</Tag>}
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
            {selectedItems?.[header.id]?.value !== 'description' ? (
              <Radio.Group
                value={headerTypeStates[header.id] ?? 'input'}
                onChange={(e) => {
                  setHeaderTypeStates((prev) => ({
                    ...prev,
                    [header.id]: e.target.value,
                  }));
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
            {selectedItems?.[header.id]?.value !== 'description' ? (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Checkbox
                  checked={headerWrapStates[header.id] || false}
                  onChange={(e) => {
                    setHeaderWrapStates((prev) => ({
                      ...prev,
                      [header.id]: e.target.checked,
                    }));
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
    </Modal>
  );
};
