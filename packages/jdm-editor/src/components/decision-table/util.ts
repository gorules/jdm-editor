import { P, match } from 'ts-pattern';

export const getReferenceMap = (trace: unknown) => {
  return match(trace)
    .with({ traceData: { reference_map: P._ } }, (s) => s.traceData.reference_map as Record<string, unknown>)
    .with({ traceData: P.array() }, ({ traceData: arr }) => {
      return (arr[arr.length - 1] as any)?.reference_map as Record<string, unknown>;
    })
    .otherwise(() => undefined);
};
