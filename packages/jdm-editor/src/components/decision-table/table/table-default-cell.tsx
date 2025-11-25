import type { CellContext } from '@tanstack/react-table';
import React, { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { P, match } from 'ts-pattern';

import { columnIdSelector } from '../../../helpers/components';
import { isWasmAvailable } from '../../../helpers/wasm';
import type { DiffMetadata } from '../../decision-graph';
import { DiffAutosizeTextArea } from '../../shared';
import { DiffCodeEditor } from '../../shared/diff-ce';
import {
  type TableSchemaItem,
  useDecisionTableActions,
  useDecisionTableRaw,
  useDecisionTableState,
} from '../context/dt-store.context';
import { getReferenceMap } from '../util';

export type TableDefaultCellProps = {
  context: CellContext<Record<string, string>, string>;
} & React.HTMLAttributes<HTMLDivElement>;

export const TableDefaultCell = memo<TableDefaultCellProps>(({ context, ...props }) => {
  const {
    row: { index },
    column: { id },
    table,
  } = context;

  const tableActions = useDecisionTableActions();
  const { disabled, value, diff } = useDecisionTableState(({ decisionTable, disabled }) => ({
    value: decisionTable?.rules?.[index]?.[id],
    diff: (decisionTable?.rules?.[index] as any)?._diff?.fields?.[id],
    disabled,
  }));

  const column = useDecisionTableState(
    columnIdSelector(id),
    (a, b) => a?.id !== undefined && b?.id !== undefined && a?.id === b?.id,
  );

  const [inner, setInner] = useState(value);
  useLayoutEffect(() => {
    if (inner !== value) {
      setInner(value);
    }
  }, [value]);

  const commit = useCallback(
    (val: string) => {
      setInner(val);
      tableActions.commitData(val, { x: id, y: index });
    },
    [tableActions, setInner],
  );

  return (
    <div
      className='cell-wrapper'
      onFocus={() => tableActions.setCursor({ x: id, y: index })}
      onContextMenu={() => tableActions.setCursor({ x: id, y: index })}
      {...props}
    >
      {(table.options.meta as any)?.getCell?.({
        disabled,
        column,
        value: inner,
        diff,
        onChange: commit,
      }) || (
        <TableInputCell disabled={disabled} column={column} value={inner} onChange={commit} diff={diff} index={index} />
      )}
    </div>
  );
});

export type TableCellProps = {
  column?: { colType: string } & TableSchemaItem;
  value: string;
  diff?: DiffMetadata;
  onChange: (value: string) => void;
  disabled?: boolean;
  index: number;
};

enum LocalVariableKind {
  Root,
  Derived,
}

const TableInputCell: React.FC<TableCellProps> = ({ column, value, onChange, disabled, diff, index }) => {
  const id = useMemo(() => crypto.randomUUID(), []);
  const textareaRef = useRef<HTMLTextAreaElement | HTMLDivElement>(null);
  const raw = useDecisionTableRaw();

  const { inputVariableType, localVariableType } = useDecisionTableState(
    ({ inputVariableType, derivedVariableTypes }) => ({
      inputVariableType,
      localVariableType: match(column)
        .with({ colType: 'input', field: P.string }, (c) => ({
          type: LocalVariableKind.Derived,
          value: derivedVariableTypes[c.field] ?? null,
        }))
        .otherwise(() => ({ type: LocalVariableKind.Root, value: inputVariableType })),
    }),
  );

  useEffect(() => {
    if (!inputVariableType) {
      return;
    }

    if (!column?.field || localVariableType.type !== LocalVariableKind.Derived) {
      return;
    }

    const state = raw.stateStore.getState();

    const resultingType = inputVariableType.clone();
    const calculatedType = inputVariableType.calculateType(column.field);
    resultingType.set('$', calculatedType);

    raw.stateStore.setState({
      derivedVariableTypes: {
        ...state.derivedVariableTypes,
        [column.field]: resultingType,
      },
    });
  }, [inputVariableType, column]);

  useEffect(() => {
    if (!textareaRef.current) {
      return;
    }

    const parentContainer = textareaRef.current.closest('div.cell-wrapper')! as HTMLElement;
    const eventListener = (e: Event) => {
      if (e.target === textareaRef.current || !textareaRef.current) {
        return;
      }

      if ('selectionStart' in textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.selectionStart = textareaRef.current.value.length;
      } else {
        textareaRef.current.querySelector<HTMLDivElement>('.cm-editor')!.focus();
      }
    };

    parentContainer.style.cursor = 'text';
    parentContainer.addEventListener('click', eventListener);

    return () => {
      parentContainer.style.cursor = '';
      parentContainer.removeEventListener('click', eventListener);
    };
  }, []);

  if (!column) {
    return (
      <DiffAutosizeTextArea
        id={id}
        ref={textareaRef as any}
        className='grl-dt__cell__input'
        maxRows={3}
        value={value}
        disabled={disabled}
        displayDiff={diff?.status === 'modified'}
        previousValue={diff?.previousValue}
        spellCheck={false}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  return (
    <div className='grl-dt__cell__input__container'>
      {column.colType === 'input' && <TableInputCellStatus index={index} columnId={column.id} />}
      <DiffCodeEditor
        lazy
        ref={textareaRef as any}
        id={id}
        type={match(column)
          .with({ colType: 'input', field: P.string }, () => 'unary' as const)
          .otherwise(() => 'standard' as const)}
        className='grl-dt__cell__input'
        noStyle
        displayDiff={diff?.status === 'modified'}
        previousValue={diff?.previousValue}
        variableType={localVariableType.value}
        maxRows={3}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
};

const TableInputCellStatus: React.FC<{ columnId: string; index: number }> = React.memo(({ columnId, index }) => {
  const inputData = useDecisionTableState(({ calculatedInputData }) => calculatedInputData);
  const expressionContext = useDecisionTableState(({ debug, debugIndex }) => {
    if (!isWasmAvailable() || !debug) {
      return;
    }

    const { trace, snapshot } = debug;
    const referenceMap = getReferenceMap(trace, debugIndex);
    if (!referenceMap) {
      return null;
    }

    const columnDef = snapshot.inputs.find((i) => i.id === columnId);
    if (!columnDef) {
      return null;
    }

    if (!(index in snapshot.rules)) {
      return null;
    }

    const expression = snapshot.rules[index]?.[columnId]?.trim();
    if (!columnDef.field) {
      return { type: 'standard' as const, expression };
    }

    if (!(columnDef.field in referenceMap)) {
      return { type: 'skip' as const };
    }

    return { type: 'unary' as const, expression, $: referenceMap[columnDef.field] };
  });

  const status = useMemo<'hit' | 'no-hit' | 'skip' | null>(() => {
    if (!inputData || !expressionContext) {
      return null;
    }

    const { type, expression, $ } = expressionContext;
    if (type === 'skip') {
      return 'skip';
    }

    if (!expression) {
      return 'hit';
    }

    try {
      let isOk: boolean;
      if (type === 'unary') {
        const newInputData = inputData.cloneWith('$', $);
        isOk = newInputData.evaluateUnaryExpression(expression);
      } else {
        isOk = inputData.evaluateExpression(expression) === true;
      }

      return isOk ? 'hit' : 'no-hit';
    } catch {
      return 'no-hit';
    }
  }, [inputData, expressionContext]);

  if (!status) {
    return null;
  }

  switch (status) {
    case 'hit':
    case 'no-hit':
      return <div className='grl-dt__cell__input__status' color='var(--grl-color-success)' data-status={status} />;
    case 'skip':
      return null;
  }
});
