import equal from 'fast-deep-equal/es6/react';
import type React from 'react';
import { useEffect, useRef } from 'react';

import { useRulebookActions, useRulebookRaw, useRulebookState } from './context/rb-store.context';
import type { RulebookType } from './rb-types';

export type RulebookControllerProps = {
  configurable?: boolean;
  disabled?: boolean;
  defaultValue?: RulebookType;
  value?: RulebookType;
  onChange?: (value: RulebookType) => void;
};

export const RulebookController: React.FC<RulebookControllerProps> = ({
  value,
  onChange,
  defaultValue,
  configurable = true,
  disabled = false,
}) => {
  const mounted = useRef<boolean>(false);
  const { stateStore } = useRulebookRaw();
  const { rulebook } = useRulebookState(({ rulebook }) => ({
    rulebook,
  }));

  const { setRulebook } = useRulebookActions();

  useEffect(() => {
    stateStore.setState({
      configurable,
      disabled,
    });
  }, [configurable, disabled]);

  useEffect(() => {
    if (!onChange) {
      return;
    }

    return stateStore.subscribe((state, prevState) => {
      if (!equal(state.rulebook, prevState.rulebook)) {
        onChange?.(state.rulebook);
      }
    });
  }, [stateStore, onChange]);

  useEffect(() => {
    if (mounted.current && value && !equal(value, rulebook)) {
      setRulebook(value, {
        skipOnChangeEvent: true,
      });
    }
  }, [value]);

  useEffect(() => {
    if (value) {
      setRulebook(value, {
        skipOnChangeEvent: true,
      });
    } else if (defaultValue) {
      setRulebook(defaultValue, {
        skipOnChangeEvent: true,
      });
    }
    mounted.current = true;
  }, []);

  return null;
};
