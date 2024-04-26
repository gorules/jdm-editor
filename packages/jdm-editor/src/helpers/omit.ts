export function omit<T, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> {
  const result = {} as Omit<T, K>;
  for (const key in obj) {
    if (!keys.includes(key as unknown as K)) {
      (result as any)[key] = obj[key];
    }
  }
  return result;
}
