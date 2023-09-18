import type { Ref } from 'react';
type OptionalRef<T> = Ref<T> | undefined;
export declare function composeRefs<T>(...refs: [OptionalRef<T>, OptionalRef<T>, ...Array<OptionalRef<T>>]): Ref<T>;
export {};
//# sourceMappingURL=compose-refs.d.ts.map