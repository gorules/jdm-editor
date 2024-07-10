import http from 'http';
import zen from 'zen';

export const handler = async (input) => {
  const a = zen.evaluate();
  return input;
};
