import React from 'react'

import TableCommandBar from './table-command-bar'
import { TableDialogProvider } from './table-dialog.context'
import { TableDialogs } from './table-dialogs'
import TableContext, { TableContextProps } from './table.context'
import './table.scss'
import 'react-virtualized/styles.css';
import 'antd/dist/reset.css';

import TableMain from "./table-main";

export type TableProps = {
  name?: string
} & TableContextProps

export const Table: React.FC<TableProps> = (props) => {
  const { name, ...rest } = props
  return (
    <div className='grl-table'>
      <TableContext name={name} {...rest}>
        <TableDialogProvider>
          <TableCommandBar />
          <TableMain />
          <TableDialogs />
        </TableDialogProvider>
      </TableContext>
    </div>
  )
}
