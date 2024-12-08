import { FormatPainterOutlined } from '@ant-design/icons';
import { Button, Tabs, Tooltip } from 'antd';
import type { editor } from 'monaco-editor';
import React from 'react';

import type { SimulationTrace, SimulationTraceDataFunction } from '../decision-graph/types/simulation.types';
import { FunctionDebuggerLog } from './function-debugger-log';

export type FunctionDebuggerProps = {
  trace?: SimulationTrace<SimulationTraceDataFunction>;
  editor?: editor.IStandaloneCodeEditor;
};

export const FunctionDebugger: React.FC<FunctionDebuggerProps> = ({ trace, editor }) => {
  const traceLog = trace?.traceData?.log || [];

  return (
    <div className='grl-function__debugger'>
      <div className='grl-function__debugger__panel'>
        <div className='grl-function__debugger__header'>
          <Tabs
            rootClassName='grl-inline-tabs'
            size='small'
            style={{ width: '100%' }}
            items={[{ key: 'console', label: 'Console' }]}
            tabBarExtraContent={
              <div style={{ marginRight: 8 }}>
                <Tooltip title='Format code' placement='bottomLeft'>
                  <Button
                    size='small'
                    type='text'
                    icon={<FormatPainterOutlined />}
                    onClick={() => editor?.getAction?.('editor.action.formatDocument')?.run?.()}
                  />
                </Tooltip>
              </div>
            }
          />
        </div>
        <div className='grl-function__debugger__body'>
          {traceLog.length === 0 && (
            <FunctionDebuggerLog
              lines={['"Info: Use console.log and run simulation to debug your code."']}
              msSinceRun={null}
            />
          )}

          {traceLog.map((log, i) => (
            <FunctionDebuggerLog key={i} lines={log.lines} msSinceRun={log.msSinceRun} />
          ))}
        </div>
      </div>
    </div>
  );
};
