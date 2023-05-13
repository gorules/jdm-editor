import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Table } from './table'

const meta: Meta<typeof Table> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Table',
  component: Table,
}

export default meta

type Story = StoryObj<typeof Table>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => (
    <div
      style={{
        height: 400,
      }}
    >
      <Table
        configurable
        value={{
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
          rules: [
            {
              '_id': '111',
              '124': '1111',
              '333': 'Test Output',
              '123': 'Tesst Input',
              '_description': 'Some random description',
            },
            {
              '_id': '222',
              '124': '2222',
              '333': 'Test Output',
              '123': 'Tesst Input',
              '_description': 'Some random description',
            },
            {
              '_id': '333',
              '124': '3333',
              '333': 'Test Output',
              '123': 'Tesst Input',
              '_description': 'Some random description',
            },
          ],
        }}
      />
    </div>
  ),
}
