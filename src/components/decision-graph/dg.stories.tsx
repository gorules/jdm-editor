import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import { DecisionGraph } from './dg'

const meta: Meta<typeof DecisionGraph> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Decision Graph',
  component: DecisionGraph,
  argTypes: {
    // disabled: { control: 'boolean' },
    // cellRenderer: {
    //   control: false,
    // },
  },
  args: {
    // inputsSchema: inputSchemaDefault,
    // configurable: true,
    // disabled: false,
  },
}

export default meta

type Story = StoryObj<typeof DecisionGraph>

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState<any>()
    return (
      <div>
        <DecisionGraph {...args} value={value} onChange={(val) => setValue(val)} />
      </div>
    )
  },
}
