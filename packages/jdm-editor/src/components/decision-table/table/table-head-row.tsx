import type { HeaderGroup } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import clsx from 'clsx';
import React from 'react';
import { match } from 'ts-pattern';

export const TableHeadRow: React.FC<{ headerGroup: HeaderGroup<any> }> = ({ headerGroup }) => (
  <tr key={headerGroup.id}>
    <th colSpan={1} style={{ width: 72 }} />
    {headerGroup.headers.map((header) => {
      const context = header.getContext();
      const parent = context.header.column.parent?.id;

      const parentKind = match(parent)
        .with('inputs', () => 'input')
        .with('outputs', () => 'output')
        .otherwise(() => undefined);

      const selfKind = match(context.column.id)
        .with('inputs', () => 'input')
        .with('outputs', () => 'output')
        .with('_description', () => 'description')
        .otherwise(() => undefined);

      return (
        <th
          key={header.id}
          colSpan={header.colSpan}
          data-self={selfKind}
          data-parent={parentKind}
          style={
            selfKind !== 'description'
              ? {
                  width: header.getSize(),
                }
              : {
                  minWidth: header.getSize(),
                  width: '100%',
                }
          }
        >
          {!header.isPlaceholder && flexRender(header.column.columnDef.header, context)}
          {header.column.getCanResize() && (
            <div
              className={clsx(
                'resizer',
                selfKind === 'description' && 'resizer--last',
                header.column.getIsResizing() && 'isResizing',
              )}
              onMouseDown={header.getResizeHandler()}
              onTouchStart={header.getResizeHandler()}
            />
          )}
        </th>
      );
    })}
  </tr>
);
