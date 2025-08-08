import { createContext, useContext } from 'react';

export const VisualDebugContext = createContext<{ enabled: boolean }>({ enabled: false });

export const useVisualDebug = () => {
  return useContext(VisualDebugContext).enabled;
};
