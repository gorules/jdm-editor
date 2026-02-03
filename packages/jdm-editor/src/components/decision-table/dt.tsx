import { theme } from 'antd';
import type { DragDropManager } from 'dnd-core';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { DecisionTableDialogProvider } from './context/dt-dialog.context';
import type { DecisionTableContextProps } from './context/dt-store.context';
import { DecisionTableProvider } from './context/dt-store.context';
import { DecisionTableDialogs } from './dialog/dt-dialogs';
import { DecisionTableCommandBar } from './dt-command-bar';
import type { DecisionTableEmptyType } from './dt-empty';
import { DecisionTableEmpty } from './dt-empty';
import './dt.scss';
import { Table } from './table/table';

export type DecisionTableProps = {
  id?: string;
  tableHeight: string | number;
  mountDialogsOnBody?: boolean;
  manager?: DragDropManager;
} & DecisionTableContextProps &
  DecisionTableEmptyType;

export const DecisionTable: React.FC<DecisionTableProps> = ({
  id,
  tableHeight,
  mountDialogsOnBody = false,
  manager,
  ...props
}) => {
  const { token } = theme.useToken();

  const [_, setMounted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getContainer = () => ref.current as HTMLElement;

  const dndProps = useMemo(() => {
    if (manager) {
      return {
        manager,
      };
    }

    return {
      backend: HTML5Backend,
      options: {
        rootElement: ref.current,
      },
    };
  }, [ref.current, manager]);

  return (
    <div ref={ref} className={'grl-dt'} style={{ background: token.colorBgElevated }}>
      {ref.current && (
        <DndProvider {...dndProps}>
          <DecisionTableProvider>
            <DecisionTableDialogProvider getContainer={mountDialogsOnBody ? undefined : getContainer}>
              <DecisionTableCommandBar globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
              <Table id={id} maxHeight={tableHeight} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
              <DecisionTableDialogs />
              <DecisionTableEmpty {...props} />
            </DecisionTableDialogProvider>
          </DecisionTableProvider>
        </DndProvider>
      )}
    </div>
  );
};
