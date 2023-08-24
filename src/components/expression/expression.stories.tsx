import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { ExpressionEntry } from './context/expression-store.context';
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
  argTypes: {
    configurable: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    configurable: true,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof Expression>;

const StoryWrapper: React.FC<React.PropsWithChildren<any>> = ({ children }) => (
  <div style={{ maxWidth: 800, padding: '1rem' }}>{children}</div>
);

export const Uncontrolled: Story = {
  render: ({ configurable, disabled }) => {
    return (
      <StoryWrapper>
        <Expression defaultValue={expressionDefault} configurable={configurable} disabled={disabled} />
      </StoryWrapper>
    );
  },
};

export const Controlled: Story = {
  render: ({ configurable, disabled }) => {
    const [value, setValue] = useState(expressionDefault);

    return (
      <StoryWrapper>
        <Expression value={value} onChange={setValue} configurable={configurable} disabled={disabled} />
      </StoryWrapper>
    );
  },
};