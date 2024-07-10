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

export const functionDefinitions = {
  libs: {
    dayjs,
    'big.js': bigJs,
    zod,
    http,
    zen,
  },
  globals: {
    'global.d.ts': globalDts,
  },
};

export const defaultFunctionValue = defaultFn;
