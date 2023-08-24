import { DownOutlined } from '@ant-design/icons';
import { Button, Typography, theme } from 'antd';
import React, { useState } from 'react';

import { FunctionDebuggerLog } from './function-debugger-log';
import { FunctionDebuggerTrace } from './types';


export type FunctionDebuggerProps = {
  trace?: FunctionDebuggerTrace;
};

export const FunctionDebugger: React.FC<FunctionDebuggerProps> = ({ trace }) => {
  const { token } = theme.useToken();
  const [open, setOpen] = useState(false);
  const traceLog = trace?.traceData?.log || [];

  return (
    <div className='function-debugger'>
      <div className='function-debugger__panel'>
        <div
          className='function-debugger__panel-header'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1.25rem',
            position: 'sticky',
            top: 0,
            background: token.colorBgLayout,
            zIndex: 3,
            borderBottom: `1px solid ${token.colorBorder}`,
          }}
        >
          <Typography.Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            Console
          </Typography.Text>
          <Button
            type='text'
            style={{ paddingTop: 0, paddingBottom: 0 }}
            icon={<DownOutlined style={{ transform: open ? 'rotate(-180deg)' : undefined, transformOrigin: '50%' }} />}
            onClick={() => setOpen(!open)}
          />
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