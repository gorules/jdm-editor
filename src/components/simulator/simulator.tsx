import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-json5';
import { Button, Typography, message } from 'antd';
import json5 from 'json5';
import React, { useEffect, useState } from 'react';
import ReactAce from 'react-ace';

import { type DecisionNode } from '../decision-graph/context/dg-store.context';
import { Stack } from '../stack';

export type SimulatorProps = {
  //
  onSimulate?: (val: unknown) => void;
  onDismiss?: () => void;
  nodes: DecisionNode[];
  loading?: boolean;
  simulate?: any;
};
export const Simulator: React.FC<SimulatorProps> = ({ nodes, simulate, onSimulate, onDismiss, loading }) => {
  const outputNode = (nodes || []).find((node) => node?.type === 'outputNode');

  const [requestValue, setRequestValue] = useState('');
  const [responseValue, setResponseValue] = useState('');

  useEffect(() => {
    if (simulate) {
      let temp;
      if (simulate?.result) {
        temp = { ...simulate?.result };
      }
      setResponseValue(simulate?.result ? json5.stringify(temp, null, 2) : '');
    }
  }, [simulate?.result]);

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
      }}
    >
      <Stack horizontal gap={8} horizontalAlign='end' style={{ padding: 8 }}>
        <Button
          type={'text'}
          disabled={!simulate?.result}
          onClick={() => {
            simulate.reset();
          }}
        >
          Clear
        </Button>
        <Button
          type={'primary'}
          loading={simulate?.loading}
          disabled={!outputNode}
          onClick={() => {
            (async () => {
              let context;
              try {
                if (requestValue?.trim?.()?.length > 0) {
                  context = json5.parse(requestValue);
                }

                onSimulate?.(context);
              } catch (e) {
                //
              }
            })();
          }}
        >
          Simulate
        </Button>
      </Stack>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: 8,
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Typography.Text style={{ marginBottom: 4 }}>Request (JSON5)</Typography.Text>{' '}
          <Button
            type={'link'}
            onClick={() => {
              if ((requestValue || '').trim()?.length === 0) return;
              try {
                setRequestValue(json5.stringify(json5.parse(requestValue), null, 2));
              } catch (e) {
                message.error('Unable to format request, invalid JSON format');
              }
            }}
          >
            Format
          </Button>
        </div>
        <div
          style={{
            flex: 1,
          }}
        >
          <ReactAce
            value={requestValue}
            onChange={(e) => {
              setRequestValue(e);
            }}
            mode='json5'
            theme='chrome'
            width='100%'
            height='100%'
            tabSize={2}
            setOptions={{
              useWorker: false,
            }}
          />
        </div>
      </div>
      <div
        style={{
          flex: 1.5,
          display: 'flex',
          flexDirection: 'column',
          padding: 8,
        }}
      >
        <Stack horizontal gap={8} verticalAlign='center' horizontalAlign='space-between' style={{ marginBottom: 4 }}>
          <Typography.Text>Response</Typography.Text>
        </Stack>
        <div
          style={{
            flex: 1,
          }}
        >
          <ReactAce
            value={responseValue}
            onChange={(e) => {
              setResponseValue(e);
            }}
            readOnly
            mode='json5'
            theme='chrome'
            width='100%'
            height='100%'
            tabSize={2}
            setOptions={{
              useWorker: false,
            }}
          />
        </div>
      </div>
    </div>
  );
};
