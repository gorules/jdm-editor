import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from 'antd'
import React, { useState } from 'react'

import { DecisionTable } from '../../index'
import { DecisionTableProps } from './dt.context'
import {
  inputSchemaDefault,
  shippingFeesDefault,
  stressRules,
} from './dt.stories-values'

const meta: Meta<typeof DecisionTable> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Decision Table',
  component: DecisionTable,
  argTypes: {
    configurable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    cellRenderer: {
      control: false,
    },
  },
  args: {
    inputsSchema: inputSchemaDefault,
    configurable: true,
    disabled: false,
  },
}

export default meta

type Story = StoryObj<typeof DecisionTable>

export const Uncontrolled: Story = {
  render: (args) => {
    return (
      <div>
        <DecisionTable
          defaultValue={shippingFeesDefault}
          {...args}
          tableHeight='500px'
        />
      </div>
    )
  },
}

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState<DecisionTableProps>(shippingFeesDefault)
    return (
      <div>
        <DecisionTable
          {...args}
          tableHeight='500px'
          value={value}
          onChange={(val) => setValue(val)}
        />
      </div>
    )
  },
}

export const Empty: Story = {
  render: (args) => (
    <div>
      <DecisionTable {...args} tableHeight='500px' />
    </div>
  ),
}

export const CustomRenderer: Story = {
  render: (args) => (
    <div>
      <DecisionTable
        {...args}
        tableHeight='500px'
        cellRenderer={(props) => {
          if (props?.column?.field === 'output') {
            return (
              <div
                style={{
                  paddingLeft: '1rem',
                }}
              >
                <Checkbox
                  checked={props.value === 'true'}
                  onChange={(e) => {
                    props.onChange(`${e?.target?.checked}`)
                  }}
                >
                  Enabled
                </Checkbox>
              </div>
            )
          }
          return null
        }}
      />
    </div>
  ),
}

export const StressTest: Story = {
  render: (args) => (
    <div>
      <DecisionTable
        {...args}
        tableHeight='500px'
        defaultValue={{
          ...shippingFeesDefault,
          rules: stressRules,
        }}
      />
    </div>
  ),
}
