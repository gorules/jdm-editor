import { ExportOutlined, ImportOutlined } from '@ant-design/icons'
import { Button, Select } from 'antd'
import React from 'react'

import { Stack } from '../stack'
import { useDecisionTable } from './context/dt.context'

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
  } = useDecisionTable()

  return (
    <Stack
      horizontal
      horizontalAlign={'space-between'}
      verticalAlign={'center'}
      className={'grl-dt__command-bar'}
    >
      <Stack gap={8} horizontal className='full-width'>
        <Button
          type='default'
          size={'small'}
          color='secondary'
          icon={<ExportOutlined />}
          onClick={() => exportCsv({ name })}
        >
          Export CSV
        </Button>
        <Button
          type='default'
          size={'small'}
          color='secondary'
          disabled={disabled}
          icon={<ImportOutlined />}
          onClick={() => importCsv()}
        >
          Import CSV
        </Button>
      </Stack>
      <Select
        style={{ width: 140 }}
        size={'small'}
        disabled={disabled || !configurable || disableHitPolicy}
        value={value.hitPolicy}
        onSelect={updateHitPolicy}
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
      />
    </Stack>
  )
}
