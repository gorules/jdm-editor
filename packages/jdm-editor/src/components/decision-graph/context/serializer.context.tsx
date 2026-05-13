import React, { createContext, useContext, useEffect, useMemo, useRef } from 'react';

export type Slice<T = unknown> = {
  serialize: () => T;
  restore: (state: T) => void;
};

export type TabSnapshot = Record<string, unknown>;

export type DecisionGraphSnapshot = {
  graph?: Record<string, unknown>;
  tabs?: Record<string, TabSnapshot>;
};

type Registry = {
  registerGraph: (key: string, slice: Slice) => () => void;
  registerTab: (tabId: string, key: string, slice: Slice) => () => void;
  serialize: () => DecisionGraphSnapshot;
  restore: (snapshot: DecisionGraphSnapshot) => void;
};

const SerializerContext = createContext<Registry | null>(null);

export const SerializerProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const graphSlices = useRef(new Map<string, Slice>());
  const tabSlices = useRef(new Map<string, Map<string, Slice>>());
  const pendingGraph = useRef(new Map<string, unknown>());
  const pendingTabs = useRef(new Map<string, Map<string, unknown>>());

  const registry = useMemo<Registry>(() => {
    const tryRestore = (slice: Slice, value: unknown, label: string) => {
      try {
        slice.restore(value);
      } catch (err) {
        console.warn(`Failed to restore "${label}"`, err);
      }
    };

    return {
      registerGraph: (key, slice) => {
        graphSlices.current.set(key, slice);
        if (pendingGraph.current.has(key)) {
          const pending = pendingGraph.current.get(key);
          pendingGraph.current.delete(key);
          tryRestore(slice, pending, `graph.${key}`);
        }
        return () => {
          if (graphSlices.current.get(key) === slice) graphSlices.current.delete(key);
        };
      },
      registerTab: (tabId, key, slice) => {
        if (!tabSlices.current.has(tabId)) tabSlices.current.set(tabId, new Map());
        tabSlices.current.get(tabId)!.set(key, slice);

        const pendingForTab = pendingTabs.current.get(tabId);
        if (pendingForTab?.has(key)) {
          const pending = pendingForTab.get(key);
          pendingForTab.delete(key);
          if (pendingForTab.size === 0) pendingTabs.current.delete(tabId);
          tryRestore(slice, pending, `tabs.${tabId}.${key}`);
        }
        return () => {
          const bag = tabSlices.current.get(tabId);
          if (bag?.get(key) === slice) {
            bag.delete(key);
            if (bag.size === 0) tabSlices.current.delete(tabId);
          }
        };
      },
      serialize: () => {
        const snapshot: DecisionGraphSnapshot = {};
        const graph: Record<string, unknown> = {};
        for (const [key, slice] of graphSlices.current) {
          try {
            const value = slice.serialize();
            if (value !== undefined) graph[key] = value;
          } catch (err) {
            console.warn(`Failed to serialize graph.${key}`, err);
          }
        }
        if (Object.keys(graph).length > 0) snapshot.graph = graph;

        const tabs: Record<string, TabSnapshot> = {};
        for (const [tabId, bag] of tabSlices.current) {
          const tabBag: TabSnapshot = {};
          for (const [key, slice] of bag) {
            try {
              const value = slice.serialize();
              if (value !== undefined) tabBag[key] = value;
            } catch (err) {
              console.warn(`Failed to serialize tabs.${tabId}.${key}`, err);
            }
          }
          if (Object.keys(tabBag).length > 0) tabs[tabId] = tabBag;
        }
        if (Object.keys(tabs).length > 0) snapshot.tabs = tabs;

        return snapshot;
      },
      restore: (snapshot) => {
        pendingGraph.current.clear();
        pendingTabs.current.clear();

        for (const [key, value] of Object.entries(snapshot?.graph ?? {})) {
          const slice = graphSlices.current.get(key);
          if (slice) tryRestore(slice, value, `graph.${key}`);
          else pendingGraph.current.set(key, value);
        }

        for (const [tabId, bag] of Object.entries(snapshot?.tabs ?? {})) {
          for (const [key, value] of Object.entries(bag ?? {})) {
            const slice = tabSlices.current.get(tabId)?.get(key);
            if (slice) {
              tryRestore(slice, value, `tabs.${tabId}.${key}`);
            } else {
              if (!pendingTabs.current.has(tabId)) pendingTabs.current.set(tabId, new Map());
              pendingTabs.current.get(tabId)!.set(key, value);
            }
          }
        }
      },
    };
  }, []);

  return <SerializerContext.Provider value={registry}>{children}</SerializerContext.Provider>;
};

export const useSerializerRegistry = (): Registry | null => useContext(SerializerContext);

function useSlice<T>(
  registerFn: ((slice: Slice) => () => void) | null,
  slice: Slice<T>,
  deps: React.DependencyList,
): void {
  const sliceRef = useRef(slice);
  sliceRef.current = slice;

  useEffect(() => {
    if (!registerFn) return;
    return registerFn({
      serialize: () => sliceRef.current.serialize(),
      restore: (state) => sliceRef.current.restore(state as T),
    });
  }, deps);
}

export function useGraphSerializer<T = unknown>(
  key: string | null | undefined,
  slice: Slice<T>,
  deps: React.DependencyList = [],
): void {
  const registry = useContext(SerializerContext);
  const registerFn = registry && key ? (s: Slice) => registry.registerGraph(key, s) : null;
  useSlice(registerFn, slice, [registry, key, ...deps]);
}

export function useTabSerializer<T = unknown>(
  tabId: string | null | undefined,
  key: string | null | undefined,
  slice: Slice<T>,
  deps: React.DependencyList = [],
): void {
  const registry = useContext(SerializerContext);
  const registerFn = registry && tabId && key ? (s: Slice) => registry.registerTab(tabId, key, s) : null;
  useSlice(registerFn, slice, [registry, tabId, key, ...deps]);
}
