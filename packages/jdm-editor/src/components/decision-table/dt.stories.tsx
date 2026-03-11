import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Checkbox } from 'antd';
import { createDragDropManager } from 'dnd-core';
import React, { useEffect, useMemo, useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';

import type { DictionaryMap } from '../../theme';
import { JdmConfigProvider } from '../../theme';
import type { DecisionTableType } from './context/dt-store.context';
import { DecisionTable } from './dt';

const shippingFeesDefault = {
  hitPolicy: 'first',
  inputs: [
    {
      id: 'HVo_JpALi8',
      field: 'cart.weight',
      name: 'Cart Weight (Kg)',
    },
    {
      id: 'HW6mSVfLbs',
      field: 'customer.country',
      name: 'Customer Country',
    },
  ],
  outputs: [
    {
      field: 'shippingFee',
      id: '3EGDrV0ssV',
      name: 'Shipping Fee',
    },
  ],
  rules: [
    {
      '_id': 'qMpJEvcau6',
      '_description': 'If weight is above 40kg and country is US, fee is 40',
      'HVo_JpALi8': '> 40',
      'HW6mSVfLbs': '"US"',
      '3EGDrV0ssV': '40',
    },
    {
      '_id': 'KC6KqcWiOX',
      '_description': 'If weight is above 40kg and any other country, fee is 50',
      'HVo_JpALi8': '> 40',
      'HW6mSVfLbs': '',
      '3EGDrV0ssV': '50',
    },
    {
      '_id': 'k-zEFSTe7b',
      '_description': 'if weight is between 20 and 40kg and country US, fee is 30',
      'HVo_JpALi8': '[20..40]',
      'HW6mSVfLbs': '"US"',
      '3EGDrV0ssV': '30',
    },
    {
      '_id': 'c_8VkmGZ_C',
      '_description': 'if weight is between 20 and 40kg and any other country, fee is 32',
      'HVo_JpALi8': '[20..40]',
      'HW6mSVfLbs': '',
      '3EGDrV0ssV': '32',
    },
    {
      '_id': 'e_MyQeTS3V',
      '_description': 'if weight is bellow 20kg and country US, fee is 25',
      'HVo_JpALi8': '< 20',
      'HW6mSVfLbs': '"US"',
      '3EGDrV0ssV': '25',
    },
    {
      '_id': '_iU8FNLxHb',
      '_description': 'if weight is bellow 20kg, fee is 30',
      'HVo_JpALi8': '< 20',
      'HW6mSVfLbs': '',
      '3EGDrV0ssV': '30',
    },
  ],
};

const inputSchemaDefault = [
  {
    field: 'cart',
    name: 'Cart',
    items: [
      {
        field: 'cart.total',
        name: 'Total',
      },
      {
        field: 'cart.weight',
        name: 'Weight',
      },
    ],
  },
  {
    field: 'customer',
    name: 'Customer',
    items: [
      {
        field: 'customer.country',
        name: 'Country',
      },
    ],
  },
];

const stressRules = () => {
  const stressRules: any[] = [];

  for (let i = 10_000; i > 0; i--) {
    stressRules.push({
      '_id': `${i}`,
      '_description': `${i} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      'HVo_JpALi8': `> ${i}`,
      'HW6mSVfLbs': '"US"',
      '3EGDrV0ssV': `${i}`,
    });
  }

  return stressRules;
};

const meta: Meta<typeof DecisionTable> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Decision Table',
  component: DecisionTable,
  argTypes: {
    permission: {
      control: 'select',
      options: ['edit:full', 'edit:rules', 'edit:values'],
    },
    mode: {
      control: 'select',
      options: ['dev', 'business'],
    },
    disabled: { control: 'boolean' },
    cellRenderer: {
      control: false,
    },
  },
  args: {
    inputsSchema: inputSchemaDefault,
    permission: 'edit:full',
    mode: 'dev',
    disabled: false,
    onChange: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof DecisionTable>;

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState<any>(shippingFeesDefault);
    const manager = useMemo(() => {
      return createDragDropManager(HTML5Backend);
    }, []);

    useEffect(() => {
      if (args.value) {
        setValue(args.value);
      }
    }, [args.value]);

    return (
      <div
        style={{
          height: '100%',
        }}
      >
        <DecisionTable
          {...args}
          value={value}
          manager={manager}
          onChange={(val) => {
            console.log(val);
            setValue(val);
            args?.onChange?.(val);
          }}
          inputsSchema={inputSchemaDefault}
          tableHeight='100%'
        />
      </div>
    );
  },
};

export const Uncontrolled: Story = {
  render: (args) => {
    const manager = useMemo(() => {
      return createDragDropManager(HTML5Backend);
    }, []);
    return (
      <div
        style={{
          height: '100%',
        }}
      >
        <DecisionTable
          {...args}
          manager={manager}
          defaultValue={shippingFeesDefault}
          onChange={(val) => {
            console.log(val);
            args?.onChange?.(val);
          }}
          inputsSchema={inputSchemaDefault}
          tableHeight='100%'
        />
      </div>
    );
  },
};

export const CustomRenderer: Story = {
  render: (args) => {
    const [value, setValue] = useState<DecisionTableType>();
    return (
      <div>
        <DecisionTable
          {...args}
          tableHeight='100%'
          value={value}
          onChange={(val) => setValue(val)}
          cellRenderer={(props) => {
            if (props?.column?.field === 'output') {
              return (
                <div tabIndex={1} style={{ paddingLeft: '1rem' }}>
                  <Checkbox
                    disabled={props.disabled}
                    checked={props.value === 'true'}
                    onChange={(e) => {
                      props.onChange(`${e?.target?.checked}`);
                    }}
                  >
                    Enabled
                  </Checkbox>
                </div>
              );
            }
            return null;
          }}
        />
      </div>
    );
  },
};

export const StressTest: Story = {
  render: (args) => {
    const [value, setValue] = useState<DecisionTableType>({
      ...shippingFeesDefault,
      rules: stressRules(),
    });
    return (
      <div
        style={{
          height: '100%',
        }}
      >
        <DecisionTable {...args} value={value} onChange={setValue} tableHeight='100%' />
      </div>
    );
  },
};

export const BusinessMode: Story = {
  args: {
    mode: 'business',
  },
  render: (args) => {
    const [value, setValue] = useState<any>(shippingFeesDefault);
    const manager = useMemo(() => {
      return createDragDropManager(HTML5Backend);
    }, []);

    return (
      <div style={{ height: '100%' }}>
        <DecisionTable
          {...args}
          value={value}
          manager={manager}
          onChange={(val) => {
            console.log(val);
            setValue(val);
            args?.onChange?.(val);
          }}
          inputsSchema={inputSchemaDefault}
          tableHeight='100%'
        />
      </div>
    );
  },
};

const DICTIONARIES: DictionaryMap = {
  country: [
    { label: 'United States', value: 'US' },
    { label: 'Canada', value: 'CA' },
    { label: 'Mexico', value: 'MX' },
    { label: 'United Kingdom', value: 'UK' },
  ],
  orderStatus: [
    { label: 'Pending', value: 'pending' },
    { label: 'Processing', value: 'processing' },
    { label: 'Shipped', value: 'shipped' },
    { label: 'Delivered', value: 'delivered' },
    { label: 'Cancelled', value: 'cancelled' },
  ],
};

const shippingFeesWithDictionaries = {
  ...shippingFeesDefault,
  inputs: [
    {
      id: 'HVo_JpALi8',
      field: 'cart.weight',
      name: 'Cart Weight (Kg)',
      fieldType: { type: 'number' as const },
    },
    {
      id: 'HW6mSVfLbs',
      field: 'customer.country',
      name: 'Customer Country',
      fieldType: { type: 'string' as const, enum: { type: 'ref' as const, ref: 'country' } },
    },
  ],
};

export const BusinessModeDictionaries: Story = {
  args: {
    mode: 'business',
  },
  render: (args) => {
    const [value, setValue] = useState<any>(shippingFeesWithDictionaries);
    const manager = useMemo(() => {
      return createDragDropManager(HTML5Backend);
    }, []);

    return (
      <JdmConfigProvider dictionaries={DICTIONARIES}>
        <div style={{ height: '100%' }}>
          <DecisionTable
            {...args}
            value={value}
            manager={manager}
            onChange={(val) => {
              console.log(val);
              setValue(val);
              args?.onChange?.(val);
            }}
            inputsSchema={inputSchemaDefault}
            tableHeight='100%'
          />
        </div>
      </JdmConfigProvider>
    );
  },
};
