import { Dropdown, Tooltip, message, theme } from 'antd';
import React from 'react';
import { JSONTree } from 'react-json-tree';

import { copyToClipboard } from '../../helpers/utility';

export type FunctionDebuggerLogProps = {
  lines: string[];
  msSinceRun: number | null;
};

type JsonTheme = {
  string: string;
  constants: string;
  number: string;
  type: string;
  error: string;
  info: string;
};

const themes: Record<'dark' | 'light', JsonTheme> = {
  dark: {
    string: '#CE9178',
    number: '#B5CEA8',
    constants: '#569CD6',
    type: '#3DC9B0',
    error: '#E51400',
    info: 'rgba(0, 0, 0, 0.65)',
  },
  light: {
    string: '#A31515',
    number: '#098658',
    constants: '#0000FF',
    type: '#008080',
    error: '#E51400',
    info: 'rgba(0, 0, 0, 0.65)',
  },
};

export const FunctionDebuggerLog: React.FC<FunctionDebuggerLogProps> = ({ lines, msSinceRun }) => {
  const { token } = theme.useToken();
  const jsonTheme = themes[token.mode ?? 'light'];

  return (
    <div className='grl-function__debugger__log'>
      <Dropdown
        trigger={['contextMenu']}
        menu={{
          items: [
            {
              key: 'copy',
              label: 'Copy to clipboard',
              onClick: async () => {
                await copyToClipboard(lines.length === 1 ? lines[0] : `[${lines.join(', ')}]`);
                message.success('Copied to clipboard');
              },
            },
          ],
        }}
      >
        <div className='grl-function__debugger__log__values'>
          {lines.map((line, i) => {
            const data = safeParseJson(line);

            return (
              <JSONTree
                key={i}
                data={data}
                shouldExpandNodeInitially={() => false}
                labelRenderer={(keyPath: readonly (string | number)[], nodeType) => {
                  const parts: React.ReactNode[] = [];

                  const lastPart = keyPath?.[0];
                  if (lastPart !== 'root') {
                    parts.push(
                      <>
                        <span style={{ color: jsonTheme.constants }}>{lastPart}</span>
                        {': '}
                      </>,
                    );
                  }

                  if (keyPath.length >= 1) {
                    let paths = [...keyPath];
                    paths.pop();
                    paths = paths.reverse();

                    parts.push(objectRenderer(jsonTheme)(lens(data, paths), nodeType));
                  }

                  return <>{parts}</>;
                }}
                valueRenderer={valueRenderer(jsonTheme)}
                theme={{
                  base00: token.colorBgElevated,
                  base03: token.colorTextBase,
                  base0B: token.colorTextBase,
                  base0D: token.colorTextBase,
                }}
              />
            );
          })}
        </div>
      </Dropdown>
      <div className='grl-function__debugger__log__time'>
        {msSinceRun !== null && <Tooltip title='Time since start of execution of script.'>{msSinceRun}ms</Tooltip>}
      </div>
    </div>
  );
};

const objectRenderer =
  (jsonTheme: JsonTheme) =>
  (data: any, nodeType: string): React.ReactNode => {
    if (nodeType === 'Object') {
      const objectData = data as Record<string, any>;
      const objectEntries = Object.entries(objectData);
      const renders = objectEntries.reduce(
        (acc: React.ReactNode[], [key, value], currentIndex) => [
          ...acc,
          <span key={key}>
            {key}: {valueRenderer(jsonTheme)(stringifyJsonData(value), value)}
            {currentIndex !== objectEntries.length - 1 && <>{', '}</>}
          </span>,
        ],
        [] satisfies React.ReactNode[],
      );

      return (
        <>
          {' {'}
          {renders}
          {'}'}
        </>
      );
    } else if (nodeType === 'Array') {
      const arrayData = data as any[];
      const renders = arrayData.reduce(
        (acc, value, currentIndex) => [
          ...acc,
          <span key={currentIndex}>
            {valueRenderer(jsonTheme)(stringifyJsonData(value), value)}
            {currentIndex !== arrayData.length - 1 && <>{', '}</>}
          </span>,
        ],
        [] satisfies React.ReactNode[],
      );

      return (
        <>
          {arrayData.length > 2 ? `(${arrayData.length})` : ''} [{renders}]
        </>
      );
    } else {
      return null;
    }
  };

const stringifyJsonData = (value: unknown): string => {
  switch (true) {
    case Array.isArray(value):
      return `Array(${(value as unknown[]).length})`;
    case typeof value === 'object':
      return '{...}';
    default:
      return JSON.stringify(value);
  }
};

const valueRenderer =
  (jsonTheme: JsonTheme) =>
  (valueAsStr: unknown, value: unknown): React.ReactNode => {
    const valueAsString = valueAsStr as string;
    if (typeof value === 'string') {
      if (valueAsString.startsWith('"Error:')) {
        return <span style={{ color: jsonTheme.error }}>{valueAsString.slice(1, -1)}</span>;
      }

      if (valueAsString.startsWith('"Info:')) {
        return <span style={{ color: jsonTheme.info }}>{valueAsString.slice(1, -1)}</span>;
      }

      return <span style={{ color: jsonTheme.string }}>{valueAsString}</span>;
    } else if (typeof value === 'boolean') {
      return <span style={{ color: jsonTheme.constants }}>{valueAsString}</span>;
    } else if (typeof value === 'number') {
      return <span style={{ color: jsonTheme.number }}>{valueAsString}</span>;
    }

    return valueAsString;
  };

const lens = (obj: any, path: (string | number)[]) => path.reduce((o, key) => (o && o[key] ? o[key] : null), obj);

const safeParseJson = (data: string): unknown => {
  if (typeof data !== 'string') {
    return undefined;
  }

  data = data.trim();
  if (!data) {
    return undefined;
  }

  try {
    return JSON.parse(data);
  } catch {
    return `[UNSERIALIZED]: ${data}`;
  }
};
