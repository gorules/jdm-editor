import { FormatPainterOutlined } from '@ant-design/icons';
import { Button, Tabs, Tooltip } from 'antd';
import type { editor } from 'monaco-editor';
import React, { useState } from 'react';
import { match } from 'ts-pattern';

import type { SimulationTrace, SimulationTraceDataFunction } from '../decision-graph/simulator/simulation.types';
import { FunctionDebuggerLog } from './function-debugger-log';
import { FunctionLibraryItem } from './function-library-item';
import { type FunctionLibrary } from './helpers/libs';

enum TabKey {
  Console = 'Console',
  Libraries = 'Libraries',
}

export type FunctionDebuggerProps = {
  trace?: SimulationTrace<SimulationTraceDataFunction>;
  editor?: editor.IStandaloneCodeEditor;
  editorValue?: string;
  libraries: FunctionLibrary[];
};

export const FunctionDebugger: React.FC<FunctionDebuggerProps> = ({ trace, editor, libraries = [], editorValue }) => {
  const traceLog = trace?.traceData?.log || [];
  const [activeTab, setActiveTab] = useState<TabKey>(TabKey.Console);

  return (
    <div className='grl-function__debugger'>
      <div className='grl-function__debugger__panel'>
        <div className='grl-function__debugger__header'>
          <Tabs
            rootClassName='grl-inline-tabs'
            size='small'
            style={{ width: '100%' }}
            items={Object.values(TabKey).map((t) => ({ key: t, label: t }))}
            activeKey={activeTab}
            onChange={(t) => setActiveTab(t as TabKey)}
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
          {match(activeTab)
            .with(TabKey.Console, () => (
              <>
                {traceLog.length === 0 && (
                  <FunctionDebuggerLog
                    lines={['"Info: Use console.log and run simulation to debug your code."']}
                    msSinceRun={null}
                  />
                )}

                {traceLog.map((log, i) => (
                  <FunctionDebuggerLog key={i} lines={log.lines} msSinceRun={log.msSinceRun} />
                ))}
              </>
            ))
            .with(TabKey.Libraries, () => (
              <div className='grl-function__libraries'>
                {libraries.map((lib) => (
                  <FunctionLibraryItem
                    key={lib.name}
                    lib={lib}
                    editorValue={editorValue}
                    onImport={() => {
                      if (!editor) {
                        return;
                      }

                      const importStatement = `import ${lib.importName ?? lib.name} from '${lib.name}';`;
                      editor.setValue(importStatement + '\n' + editor.getValue());
                    }}
                  />
                ))}
              </div>
            ))
            .exhaustive()}
        </div>
      </div>
    </div>
  );
};
