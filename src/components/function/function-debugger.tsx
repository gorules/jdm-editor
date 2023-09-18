import { DownOutlined } from '@ant-design/icons';
import { Typography, theme } from 'antd';
import React, { useState } from 'react';

import { FunctionDebuggerLog } from './function-debugger-log';
import type { FunctionDebuggerTrace } from './types';

export type FunctionDebuggerProps = {
  trace?: FunctionDebuggerTrace;
};

export const FunctionDebugger: React.FC<FunctionDebuggerProps> = ({ trace }) => {
  const { token } = theme.useToken();
  const [open, setOpen] = useState(false);
  const traceLog = trace?.traceData?.log || [];

  return (
    <div className='grl-function__debugger'>
      <div className='grl-function__debugger__panel'>
        <div
          className='function-debugger__panel-header'
          onClick={() => setOpen(!open)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1.25rem',
            position: 'sticky',
            top: 0,
            background: token.colorBgLayout,
            zIndex: 3,
            borderBottom: open ? `1px solid ${token.colorBorder}` : 'none',
            cursor: 'pointer',
          }}
        >
          <Typography.Text
            style={{
              fontWeight: 'bold',
            }}
          >
            Console
          </Typography.Text>
          <div>
            <DownOutlined style={{ transform: !open ? 'rotate(-180deg)' : undefined, transformOrigin: '50%' }} />
          </div>
        </div>
        {open && (
          <>
            {traceLog.length === 0 && (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <Typography.Text type='secondary'>
                  Use console.log and run simulation to debug your code.
                </Typography.Text>
              </div>
            )}

            {traceLog.map((log, i) => (
              <FunctionDebuggerLog key={i} lines={log.lines} msSinceRun={log.msSinceRun} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
