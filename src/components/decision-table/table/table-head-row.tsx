import type { HeaderGroup } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import clsx from 'clsx';
import React from 'react';

export const TableHeadRow: React.FC<{ headerGroup: HeaderGroup<any> }> = ({ headerGroup }) => (
  <tr key={headerGroup.id}>
    <th colSpan={1} style={{ width: 72 }} />
    {headerGroup.headers.map((header) => {
      return (
        <th
          key={header.id}
          colSpan={header.colSpan}
          style={{
            width: header.getSize(),
          }}
        >
          {!header.isPlaceholder && flexRender(header.column.columnDef.header, header.getContext())}
          {header.column.getCanResize() && (
            <div
              className={clsx('resizer', header.column.getIsResizing() && 'isResizing')}
              onMouseDown={header.getResizeHandler()}
              onTouchStart={header.getResizeHandler()}
            />
          )}
        </th>
      );
    })}
  </tr>
);
