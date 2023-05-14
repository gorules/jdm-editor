import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import { DecisionTable } from '../../index'
import { DecisionTableProps } from './dt.context'

const meta: Meta<typeof DecisionTable> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Decision Table Final',
  component: DecisionTable,
}

export default meta

type Story = StoryObj<typeof DecisionTable>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */

const rules: any[] = []
for (let i = 0; i < 10000; i++) {
  rules.push({
    '_id': `${i}`,
    '124': `${i} Hello`,
    '333': `${i} Test Output`,
    '123': `${i} Tesst Input`,
    '_description': `${i} Some random description`,
  })
}
export const Uncontrolled: Story = {
  render: () => (
    <div
      style={{
        height: '500px',
      }}
    >
      <DecisionTable
        configurable
        disableHitPolicy
        onChange={(val) => {
          console.log(val)
        }}
        defaultValue={{
          hitPolicy: 'first',
          inputs: [
            {
              id: '123',
              name: 'Input',
              field: 'input',
              type: 'expression',
            },
            {
              id: '124',
              name: 'Input2',
              field: 'input2',
              type: 'expression',
            },
          ],
          outputs: [
            {
              id: '333',
              name: 'Output',
              field: 'output',
              type: 'expression',
            },
          ],
          rules,
        }}
      />
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<DecisionTableProps>({
      hitPolicy: 'first',
      inputs: [
        {
          id: '123',
          name: 'Input',
          field: 'input',
          type: 'expression',
        },
        {
          id: '124',
          name: 'Input2',
          field: 'input2',
          type: 'expression',
        },
      ],
      outputs: [
        {
          id: '333',
          name: 'Output',
          field: 'output',
          type: 'expression',
        },
      ],
      rules,
    })
    return (
      <div
        style={{
          height: '500px',
        }}
      >
        <DecisionTable
          configurable
          disableHitPolicy
          value={value}
          onChange={(val) => setValue(val)}
        />
      </div>
    )
  },
}

export const StressTest: Story = {
  render: () => (
    <div
      style={{
        height: '500px',
      }}
    >
      <DecisionTable
        configurable
        disableHitPolicy
        onChange={(val) => {
          console.log(val)
        }}
        defaultValue={{
          hitPolicy: 'first',
          inputs: [
            {
              id: '123',
              name: 'Input',
              field: 'input',
              type: 'expression',
            },
            {
              id: '124',
              name: 'Input2',
              field: 'input2',
              type: 'expression',
            },
          ],
          outputs: [
            {
              id: '333',
              name: 'Output',
              field: 'output',
              type: 'expression',
            },
          ],
          rules,
        }}
      />
    </div>
  ),
}
