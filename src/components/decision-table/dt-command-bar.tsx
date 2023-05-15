import { ExportOutlined, ImportOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Select, Space } from 'antd'
import React from 'react'

import { Stack } from '../stack'
import { useDecisionTable } from './dt.context'

export const DecisionTableCommandBar: React.FC = () => {
  const {
    name,
    value,
    updateHitPolicy,
    disableHitPolicy,
    disabled,
    configurable,
    exportCsv,
    importCsv,
    addRowBelow,
  } = useDecisionTable()

  return (
    <Stack
      horizontal
      horizontalAlign={'space-between'}
      verticalAlign={'center'}
      style={{
        padding: '0.5rem',
      }}
    >
      <Space size={0} className='full-width'>
        <Button
          type='link'
          size={'small'}
          icon={<PlusOutlined />}
          disabled={disabled}
          onClick={() => {
            addRowBelow(value.rules.length - 1)
          }}
        >
          Add rule
        </Button>
        <Button
          type='link'
          size={'small'}
          color='secondary'
          icon={<ExportOutlined />}
          onClick={() =>
            exportCsv({
              name: name as string,
            })
          }
        >
          Export CSV
        </Button>
        <Button
          type='link'
          size={'small'}
          color='secondary'
          icon={<ImportOutlined />}
          onClick={() => importCsv()}
        >
          Upload CSV
        </Button>
      </Space>
      <Select
        style={{ width: 140 }}
        size={'small'}
        disabled={disabled || !configurable || disableHitPolicy}
        value={value?.hitPolicy}
        options={[
          {
            key: 'first',
            label: 'First',
            value: 'first',
          },
          {
            key: 'collect',
            label: 'Collect',
            value: 'collect',
          },
        ]}
        onSelect={updateHitPolicy}
      />
    </Stack>
  )
}
