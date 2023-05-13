import { ExportOutlined, ImportOutlined, UndoOutlined } from '@ant-design/icons'
import { Button, Select, Space } from 'antd'
import React from 'react'

import { useTable } from './table.context'

const TableCommandBar: React.FC = () => {
  const {
    name,
    undo,
    redo,
    actionStack,
    value,
    updateHitPolicy,
    disabled,
    configurable,
    exportCsv,
    importCsv,
  } = useTable()

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        padding: '0.5rem',
        borderBottom: '1px solid #f0f2f5',
      }}
    >
      <Space size={0} className='full-width'>
        <Button
          type='link'
          icon={<UndoOutlined style={{ color: 'var(--ant-primary-color)' }} />}
          disabled={!actionStack.past.length}
          onClick={undo}
        >
          Undo
        </Button>
        <Button
          type='link'
          color='secondary'
          icon={<UndoOutlined style={{ color: 'var(--ant-primary-color)' }} />}
          disabled={!actionStack.future.length}
          onClick={redo}
        >
          Redo
        </Button>
        <Button
          type='link'
          color='secondary'
          icon={
            <ExportOutlined style={{ color: 'var(--ant-primary-color)' }} />
          }
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
          color='secondary'
          icon={
            <ImportOutlined style={{ color: 'var(--ant-primary-color)' }} />
          }
          onClick={() => importCsv()}
        >
          Upload CSV
        </Button>
      </Space>
      <Select
        style={{ width: 140 }}
        disabled={disabled || !configurable}
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
    </div>
  )
}

export default TableCommandBar
