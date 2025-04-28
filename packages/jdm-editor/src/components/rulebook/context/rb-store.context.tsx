import type { Monaco } from '@monaco-editor/react';
import equal from 'fast-deep-equal/es6/react';
import type { WritableDraft } from 'immer';
import { produce } from 'immer';
import React, { useMemo } from 'react';
import type { StoreApi, UseBoundStore } from 'zustand';
import { create } from 'zustand';

import type { CodeEditorProps } from '../../code-editor';
import type { CustomNodeSpecification, NodeSpecification, Simulation } from '../../decision-graph';
import type { Block, RulebookType } from '../rb-types';

type DraftUpdateCallback<T> = (draft: WritableDraft<T>) => WritableDraft<T>;

export type SetRulebookOptions = {
  skipOnChangeEvent?: boolean;
};

export type RulebookStoreType = {
  state: {
    id?: string;
    components: NodeSpecification[];
    disabled?: boolean;
    configurable?: boolean;
    rulebook: RulebookType;

    name: string;

    customNodes: CustomNodeSpecification<object, any>[];

    simulate?: Simulation;

    compactMode?: boolean;
  };

  actions: {
    setRulebook: (val?: RulebookType, options?: SetRulebookOptions) => void;

    addBlock: (block: Block, index?: number) => void;
    updateBlock: (id: string, updater: DraftUpdateCallback<Block>) => void;
    removeBlock: (id: string) => void;
    duplicateBlock: (id: string) => void;
    moveBlock: (id: string, index: number) => void;

    swapBlocks: (sourceIndex: number, targetIndex: number) => void;

    goToBlock: (id: string) => void;
  };

  listeners: {
    onChange?: (val: RulebookType) => void;
    onCodeExtension?: CodeEditorProps['extension'];
    onFunctionReady?: (monaco: Monaco) => void;
  };
};

export type ExposedStore<T> = UseBoundStore<StoreApi<T>> & {
  setState: (partial: Partial<T>) => void;
};

export const RulebookStoreContext = React.createContext<{
  stateStore: ExposedStore<RulebookStoreType['state']>;
  listenerStore: ExposedStore<RulebookStoreType['listeners']>;
  actions: RulebookStoreType['actions'];
}>({} as any);

export type RulebookContextProps = {
  //
};

export const RulebookProvider: React.FC<React.PropsWithChildren<RulebookContextProps>> = (props) => {
  const { children } = props;

  const stateStore = useMemo(
    () =>
      create<RulebookStoreType['state']>()(() => ({
        id: undefined,
        simulate: undefined,
        rulebook: { blocks: [] },

        name: 'rulebook.json',
        disabled: false,
        configurable: true,
        components: [],
        customNodes: [],

        compactMode: localStorage.getItem('jdm-compact-mode') === 'true',
        nodeTypes: {},
        globalType: {},
      })),
    [],
  );

  const listenerStore = useMemo(
    () =>
      create<RulebookStoreType['listeners']>(() => ({
        onChange: undefined,
      })),
    [],
  );

  const actions = useMemo<RulebookStoreType['actions']>(
    () => ({
      setRulebook: (rb = { blocks: [] }, options = {}) => {
        const { rulebook } = stateStore.getState();
        const { skipOnChangeEvent = false } = options;

        const newRulebook = produce(rulebook, (draft) => {
          Object.assign(draft, rb);
        });

        stateStore.setState({ rulebook: newRulebook });
        if (!skipOnChangeEvent) {
          listenerStore.getState().onChange?.(newRulebook);
        }
      },
      addBlock: (block, index) => {
        const { rulebook } = stateStore.getState();
        const newRulebook = produce(rulebook, (draft) => {
          draft.blocks = draft.blocks || [];
          if (index !== undefined) {
            draft.blocks.splice(index, 0, block);
          } else {
            draft.blocks.push(block);
          }
        });
        stateStore.setState({ rulebook: newRulebook });
        listenerStore.getState().onChange?.(newRulebook);
      },
      removeBlock: (id) => {
        const { rulebook } = stateStore.getState();
        const newRulebook = produce(rulebook, (draft) => {
          const blocks = draft.blocks || [];
          draft.blocks = blocks.filter((b) => b.id !== id);
        });
        stateStore.setState({ rulebook: newRulebook });
        listenerStore.getState().onChange?.(newRulebook);
      },
      updateBlock: (id, updater) => {
        const { rulebook } = stateStore.getState();
        const newRulebook = produce(rulebook, (draft) => {
          const block = (draft.blocks ?? []).find((b) => b?.id === id);
          if (!block) {
            return;
          }

          updater(block);
        });

        stateStore.setState({ rulebook: newRulebook });
        listenerStore.getState().onChange?.(newRulebook);
      },
      duplicateBlock: (id) => {
        const { rulebook } = stateStore.getState();
        const newRulebook = produce(rulebook, (draft) => {
          const blocks = draft.blocks || [];
          const block = blocks.find((b) => b.id === id);
          if (block) {
            // Creating a new block with a new ID
            const newBlock = {
              ...block,
              id: crypto.randomUUID(),
            };

            // Find the index of the original block
            const blockIndex = blocks.findIndex((b) => b.id === id);

            // Insert the new block after the original block
            draft.blocks.splice(blockIndex + 1, 0, newBlock);
          }
        });
        stateStore.setState({ rulebook: newRulebook });
        listenerStore.getState().onChange?.(newRulebook);
      },
      moveBlock: (id, index) => {
        const { rulebook } = stateStore.getState();

        const newRulebook = produce(rulebook, (draft) => {
          // Find the block to move
          const blockIndex = (draft.blocks ?? []).findIndex((b) => b?.id === id);
          if (blockIndex === -1) {
            return; // Block not found
          }

          // Remove the block from its current position
          const [removedBlock] = draft.blocks.splice(blockIndex, 1);

          // Insert the block at the new index
          // If index is greater than array length, it will be added at the end
          draft.blocks.splice(index, 0, removedBlock);
        });

        stateStore.setState({ rulebook: newRulebook });
        listenerStore.getState().onChange?.(newRulebook);
      },
      swapBlocks: (sourceIndex, targetIndex) => {
        const { rulebook } = stateStore.getState();

        const newRulebook = produce(rulebook, (draft) => {
          const [input] = draft.blocks.splice(sourceIndex, 1);
          draft.blocks.splice(targetIndex, 0, input);
        });

        stateStore.setState({ rulebook: newRulebook });
        listenerStore.getState().onChange?.(newRulebook);
      },
      goToBlock: () => {},
      setCompactMode: (mode: boolean) => {
        const updatedState: Partial<RulebookStoreType['state']> = {
          compactMode: mode,
        };
        localStorage.setItem('jdm-compact-mode', `${mode}`);
        stateStore.setState(updatedState);
      },
      toggleCompactMode: () => {
        const { compactMode } = stateStore.getState();
        const mode = !compactMode;
        const updatedState: Partial<RulebookStoreType['state']> = {
          compactMode: mode,
        };
        localStorage.setItem('jdm-compact-mode', `${mode}`);
        stateStore.setState(updatedState);
      },
    }),
    [],
  );

  const value = useMemo(
    () => ({
      stateStore,
      listenerStore,
      actions,
    }),
    [stateStore, listenerStore, actions],
  );

  return <RulebookStoreContext.Provider value={value}>{children}</RulebookStoreContext.Provider>;
};

export function useRulebookState<T>(
  selector: (state: RulebookStoreType['state']) => T,
  equals: (a: any, b: any) => boolean = equal,
): T {
  return React.useContext(RulebookStoreContext).stateStore(selector, equals);
}

export function useRulebookListeners<T>(
  selector: (state: RulebookStoreType['listeners']) => T,
  equals: (a: any, b: any) => boolean = equal,
): T {
  return React.useContext(RulebookStoreContext).listenerStore(selector, equals);
}

export function useRulebookActions(): RulebookStoreType['actions'] {
  return React.useContext(RulebookStoreContext).actions;
}

export function useRulebookRaw() {
  return React.useContext(RulebookStoreContext);
}

export const useBlockDiff = (id: string) => {
  const { diff, contentDiff } = useRulebookState((s) => {
    const block = (s?.rulebook?.blocks ?? []).find((b) => b.id === id);

    return {
      diff: undefined,
      contentDiff: undefined,
    };

    // return {
    //   diff: block?._diff,
    //   contentDiff: block?.content?._diff,
    // };
  });
  return {
    diff,
    contentDiff,
  };
};

export default RulebookProvider;
