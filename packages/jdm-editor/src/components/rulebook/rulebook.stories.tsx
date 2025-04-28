import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import RulebookProvider from './context/rb-store.context';
import type { RulebookType } from './rb-types';
import type { Block } from './rulebook';
import { Rulebook } from './rulebook';

const meta: Meta<typeof Rulebook> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Rulebook',
  component: Rulebook,
  args: {
    disabled: false,
    blocks: [],
  },
  argTypes: {
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Rulebook>;

export const Controlled: Story = {
  render: (args) => {
    const [rulebook, setRulebook] = useState<RulebookType>({
      blocks: [
        {
          id: 'block-1',
          type: 'markdown',
          name: 'Markdown goes here',
          content: {
            source:
              '# Loan Approval Rules\n\nThis rulebook defines the criteria for loan approval based on customer age, income, and credit score.',
          },
        },
        {
          id: 'block-2',
          type: 'decisionTable',
          name: 'Some cool table',
          content: {
            inputs: [],
            outputs: [],
            rules: [],
          },
        },
      ],
    });

    return (
      <div style={{ width: '100%', padding: '24px', overflowX: 'auto' }}>
        <Rulebook value={rulebook} onChange={setRulebook} />
      </div>
    );
  },
};
