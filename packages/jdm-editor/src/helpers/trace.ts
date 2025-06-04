import { P, match } from 'ts-pattern';

export const getTrace = <T>(data: T | T[], n: number): T => {
  return match(data)
    .with(P.array(), (a) => {
      const arr = a as T[];
      const index = match(n)
        .with(P.number.between(0, arr.length - 1), (x) => x)
        .otherwise(() => 0);

      return arr[index];
    })
    .otherwise((d) => d);
};
