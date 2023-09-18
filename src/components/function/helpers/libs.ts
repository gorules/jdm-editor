/* eslint-disable */
// @ts-ignore
// @ts-ignore
import bigJs from '@types/big.js/index.d.ts?raw';
import dayjs from 'dayjs/index.d.ts?raw';

// @ts-ignore
import defaultFn from './default-function.js?raw';

export const functionDefinitions = {
  dayjs,
  'big.js': bigJs,
};

export const defaultFunctionValue = defaultFn;
