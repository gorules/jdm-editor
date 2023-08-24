import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Function } from './function';
import { defaultFunctionValue } from './helpers/libs';
import { FunctionDebuggerTrace } from './types'


const exampleTrace = {
  performance: '2.820417ms',
  traceData: {
    log: [
      {
        lines: ['"string"'],
        msSinceRun: 1,
      },
      {
        lines: ['"numbers"', '1', '2', '3'],
        msSinceRun: 1,
      },
      {
        lines: ['["array","of",{"multiple":true},1,"items"]'],
        msSinceRun: 1,
      },
      {
        lines: ['{"1":true,"2":false,"3":5,"4":"object"}'],
        msSinceRun: 1,
      },
      {
        lines: ['{"deeply":{"nested":{"flat":"test","object":{"withSome":{"keys":"123"}}}}}'],
        msSinceRun: 1,
      },
    ],
  },
} satisfies FunctionDebuggerTrace;

const meta: Meta<typeof Function> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Function',
  component: Function,
  args: {
    disabled: false,
    defaultValue: defaultFunctionValue,
    trace: exampleTrace,
  },
  argTypes: {
    value: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof Function>;

export const Uncontrolled: Story = {
  render: (args) => {
    return <Function {...args} />;
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>(defaultFunctionValue);

    return <Function {...args} value={value} onChange={setValue} />;
  },
};