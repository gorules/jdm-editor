import { Tooltip, theme } from 'antd';
import React from 'react';
import { JSONTree } from 'react-json-tree';

export type FunctionDebuggerLogProps = {
  lines: string[];
  msSinceRun: number;
};

type JsonTheme = {
  string: string;
  constants: string;
  number: string;
  type: string;
};

const themes: Record<'dark' | 'light', JsonTheme> = {
  dark: {
    string: '#CE9178',
    number: '#B5CEA8',
    constants: '#569CD6',
    type: '#3DC9B0',
  },
  light: {
    string: '#A31515',
    number: '#098658',
    constants: '#0000FF',
    type: '#008080',
  },
};

export const FunctionDebuggerLog: React.FC<FunctionDebuggerLogProps> = ({ lines, msSinceRun }) => {
  const { token } = theme.useToken();
  const jsonTheme = themes[token.mode];

  return (
    <div className='function-debugger-log'>
      <div className='function-debugger-log__values'>
        {lines.map((line, i) => {
          const data = JSON.parse(line);

          return (
            <JSONTree
              key={i}
              data={data}
              shouldExpandNodeInitially={() => false}
              labelRenderer={(keyPath: string[], nodeType) => {
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

                  console.log(data, paths);

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
      <div className='function-debugger-log__time'>
        <Tooltip title='Time since start of execution of script.'>{msSinceRun} ms</Tooltip>
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
        (acc, [key, value], currentIndex) => [
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
  (valueAsString: string, value: unknown): React.ReactNode => {
    if (typeof value === 'string') {
      return <span style={{ color: jsonTheme.string }}>{valueAsString}</span>;
    } else if (typeof value === 'boolean') {
      return <span style={{ color: jsonTheme.constants }}>{valueAsString}</span>;
    } else if (typeof value === 'number') {
      return <span style={{ color: jsonTheme.number }}>{valueAsString}</span>;
    }

    return valueAsString;
  };

const lens = (obj: any, path: string[]) => path.reduce((o, key) => (o && o[key] ? o[key] : null), obj);
