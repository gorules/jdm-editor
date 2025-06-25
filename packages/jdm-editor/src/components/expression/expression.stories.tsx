import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';

import type { ExpressionEntry } from './context/expression-store.context';
import { Expression } from './expression';

const expressionDefault: ExpressionEntry[] = [
  { id: '1', key: 'customer.fullName', value: 'customer.firstName + " " + customer.lastName' },
  { id: '2', key: 'customer.isPremium', value: 'contains(customer.tags, "premium")' },
  { id: '3', key: 'customer.purchaseTotals', value: 'sum(map(customer.purchases, #.amount))' },
];

const meta: Meta<typeof Expression> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Expression',
  component: Expression,
  args: {
    disabled: false,
    defaultValue: expressionDefault,
    onChange: fn(),
    permission: 'edit:full',
  },
  argTypes: {
    permission: {
      control: 'select',
      options: ['edit:full', 'edit:values', 'view'],
    },
    manager: { table: { disable: true } },
    value: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof Expression>;

const StoryWrapper: React.FC<React.PropsWithChildren<any>> = ({ children }) => (
  <div style={{ maxWidth: 900 }}>{children}</div>
);

export const Uncontrolled: Story = {
  render: (args) => {
    return (
      <StoryWrapper>
        <Expression {...args} />
      </StoryWrapper>
    );
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState(expressionDefault);

    return (
      <StoryWrapper>
        <Expression value={value} onChange={setValue} {...args} />
      </StoryWrapper>
    );
  },
};
