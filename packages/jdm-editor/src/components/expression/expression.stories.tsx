import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';

import { VisualDebugContext } from '../visual-debug.context';
import type { ExpressionEntry } from './context/expression-store.context';
import { Expression } from './expression';

const expressionDefault: ExpressionEntry[] = [
  { id: '1', key: 'customer.fullName', value: 'customer.firstName + " " + customer.lastName' },
  { id: '2', key: 'customer.isPremium', value: 'contains(customer.tags, "premium")' },
  { id: '3', key: 'customer.purchaseTotals', value: 'sum(map(customer.purchases, #.amount))' },
];

const meta: Meta<typeof Expression> = {
  title: 'Expression',
  component: Expression,
  args: {
    configurable: true,
    disabled: false,
    defaultValue: expressionDefault,
    onChange: fn(),
  },
  argTypes: {
    manager: { table: { disable: true } },
    value: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof Expression>;

export const Uncontrolled: Story = {};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState(expressionDefault);
    return <Expression value={value} onChange={setValue} {...args} />;
  },
};

export const VisualDebug: Story = {
  render: (args) => (
    <VisualDebugContext.Provider value={{ enabled: true }}>
      <Expression {...args} />
    </VisualDebugContext.Provider>
  ),
};
