/* eslint-disable */
// @ts-ignore
import bigJs from '@types/big.js/index.d.ts?raw';
// @ts-ignore
import dayjs from 'dayjs/index.d.ts?raw';

// @ts-ignore
import defaultFn from './default-function.js?raw';
// @ts-ignore
import globalDts from './global.d.ts?raw';
// @ts-ignore
import http from './http.d.ts?raw';
// @ts-ignore
import zen from './zen.d.ts?raw';
// @ts-ignore
import zod from './zod.d.ts?raw';

export type FunctionLibrary = {
  name: string;
  tagline: string;
  typeDef: string;
  importName?: string;
  documentationUrl?: string;
};

export const functionLibraries: FunctionLibrary[] = [
  {
    name: 'big.js',
    tagline: 'Arbitrary-precision decimal arithmetic',
    importName: 'Big',
    typeDef: bigJs,
    documentationUrl: 'https://mikemcl.github.io/big.js/',
  },
  {
    name: 'dayjs',
    tagline: 'Date utilities',
    typeDef: dayjs,
    documentationUrl: 'https://day.js.org/docs/en/parse/parse',
  },
  {
    name: 'http',
    tagline: 'Promise based HTTP client',
    typeDef: http,
    documentationUrl: 'https://docs.gorules.io/reference/http',
  },
  {
    name: 'zen',
    tagline: 'Rules engine utilities',
    typeDef: zen,
    documentationUrl: 'https://docs.gorules.io/reference/zen',
  },
  {
    name: 'zod',
    tagline: 'Schema validation',
    importName: 'z',
    typeDef: zod,
    documentationUrl: 'https://zod.dev/',
  },
];

export const functionDefinitions = {
  globals: {
    'global.d.ts': globalDts,
  },
};

export const defaultFunctionValue = defaultFn;
