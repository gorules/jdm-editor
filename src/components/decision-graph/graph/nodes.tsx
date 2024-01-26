export const useNodeError = (id: string, simulate: any) => {
  if (simulate?.error?.data?.nodeId === id) {
    return simulate?.error?.data;
  }

  return null;
};
