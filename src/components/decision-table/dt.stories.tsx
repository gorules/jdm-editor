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
      <div
        style={{
          height: '500px',
        }}
      >
        <DecisionTable defaultValue={shippingFeesDefault} {...args} />
      </div>
    )
  },
}

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState<DecisionTableProps>(shippingFeesDefault)
    return (
      <div
        style={{
          height: '500px',
        }}
      >
        <DecisionTable
          {...args}
          value={value}
          onChange={(val) => setValue(val)}
        />
      </div>
    )
  },
}

export const Empty: Story = {
  render: (args) => (
    <div
      style={{
        height: '500px',
      }}
    >
      <DecisionTable {...args} />
    </div>
  ),
}

export const CustomRenderer: Story = {
  render: (args) => (
    <div
      style={{
        height: '500px',
      }}
    >
      <DecisionTable
        {...args}
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
    <div
      style={{
        height: '500px',
      }}
    >
      <DecisionTable
        {...args}
        defaultValue={{
          ...shippingFeesDefault,
          rules: stressRules,
        }}
      />
    </div>
  ),
}
