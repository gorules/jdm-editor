import equal from 'fast-deep-equal/es6/react';
import type React from 'react';
import { useEffect, useRef } from 'react';

import type { ExpressionEntry } from './context/expression-store.context';
import { useExpressionStore, useExpressionStoreRaw } from './context/expression-store.context';

export type ExpressionControllerProps = {
  configurable?: boolean;
  disabled?: boolean;
  defaultValue?: ExpressionEntry[];
  value?: ExpressionEntry[];
  onChange?: (value: ExpressionEntry[]) => void;
};

export const ExpressionController: React.FC<ExpressionControllerProps> = ({
  value,
  onChange,
  defaultValue = [],
  configurable = true,
  disabled = false,
}) => {
  const mounted = useRef<boolean>(false);
  const store = useExpressionStoreRaw();
  const { setExpressions, expressions } = useExpressionStore(({ setExpressions, expressions }) => ({
    setExpressions,
    expressions,
  }));

  useEffect(() => {
    store.setState({
      configurable,
      disabled,
    });
  }, [configurable, disabled]);

  useEffect(() => {
    if (!onChange) {
      return;
    }

    return store.subscribe((state, prevState) => {
      if (!equal(state.expressions, prevState.expressions)) {
        onChange?.(state.expressions);
      }
    });
  }, [store, onChange]);

  useEffect(() => {
    if (mounted.current && value && !equal(value, expressions)) {
      setExpressions(value);
    }
  }, [value]);

  useEffect(() => {
    if (value) {
      setExpressions(value);
    } else if (defaultValue) {
      setExpressions(defaultValue);
    }
    mounted.current = true;
  }, []);

  return null;
};
