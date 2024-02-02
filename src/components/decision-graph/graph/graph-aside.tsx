import {
  CloseOutlined,
  CloudDownloadOutlined,
  CloudUploadOutlined,
  PlayCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Tooltip, Typography, message } from 'antd';
import React, { useRef, useState } from 'react';

import {
  type DecisionEdge,
  type DecisionNode,
  useDecisionGraphActions,
  useDecisionGraphListeners,
  useDecisionGraphState,
} from '../context/dg-store.context';
import { NodeKind } from '../nodes/specification-types';
import { GraphComponents } from './graph-components';

const DecisionContentType = 'application/vnd.gorules.decision';

type Menu = 'components';

export type GraphAsideProps = {
  defaultOpenMenu?: Menu | false;
};

export const GraphAside: React.FC<GraphAsideProps> = ({ defaultOpenMenu = 'components' }) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [menu, setMenu] = useState<Menu | false>(defaultOpenMenu);

  const { setDecisionGraph, toggleSimulator } = useDecisionGraphActions();
  const { onSimulationRun } = useDecisionGraphListeners(({ onSimulationRun }) => ({ onSimulationRun }));
  const { decisionGraph, activeNodeId, disabled, hasInputNode } = useDecisionGraphState(
    ({ decisionGraph, activeTab, disabled }) => ({
      decisionGraph,
      activeNodeId: (decisionGraph?.nodes ?? []).find((node) => node.id === activeTab)?.id,
      disabled,
      hasInputNode: (decisionGraph?.nodes || []).some((n) => n.type === NodeKind.Input),
    }),
  );

  const handleUploadInput = async (event: any) => {
    const fileList = event?.target?.files as FileList;
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const parsed: any = JSON.parse(e?.target?.result as string);
        if (parsed?.contentType !== DecisionContentType) throw new Error('Invalid content type');

        const nodes: DecisionNode[] = Array.isArray(parsed?.nodes) ? parsed.nodes : [];
        const nodeIds = nodes.map((node) => node.id);

        const edges: DecisionEdge[] = (parsed.edges as DecisionEdge[]).filter(
          (edge) => nodeIds.includes(edge?.targetId) && nodeIds.includes(edge?.sourceId),
        );
        setDecisionGraph({
          nodes,
          edges,
        });
      } catch (e: any) {
        message.error(e.message);
      }
    };

    reader.readAsText(Array.from(fileList)?.[0], 'UTF-8');
  };

  const downloadJDM = async (name: string = 'graph') => {
    try {
      // create file in browser
      const fileName = `${name.replaceAll('.json', '')}.json`;
      const json = JSON.stringify(
        {
          contentType: DecisionContentType,
          nodes: decisionGraph.nodes,
          edges: decisionGraph.edges,
        },
        null,
        2,
      );
      const blob = new Blob([json], { type: 'application/json' });
      const href = URL.createObjectURL(blob);

      // create "a" HTLM element with href to file
      const link = window.document.createElement('a');
      link.href = href;
      link.download = fileName;
      window.document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      window.document.body.removeChild(link);
      URL.revokeObjectURL(href);
    } catch (e) {
      message.error(e.message);
    }
  };

  return (
    <div className={'grl-dg__aside'}>
      <input
        hidden
        accept='application/json'
        type='file'
        ref={fileInput}
        onChange={handleUploadInput}
        onClick={(event) => {
          (event.target as any).value = null;
        }}
      />
      <div className={'grl-dg__aside__side-bar'}>
        <div className={'grl-dg__aside__side-bar__top'}>
          <Tooltip placement='right' title='Components'>
            <Button
              type={'primary'}
              icon={<PlusCircleOutlined />}
              onClick={() => setMenu((m) => (m !== 'components' ? 'components' : false))}
            />
          </Tooltip>
          <Tooltip placement='right' title='Upload JSON'>
            <Button
              type={'text'}
              disabled={disabled}
              icon={<CloudUploadOutlined />}
              onClick={() => {
                fileInput?.current?.click?.();
              }}
            />
          </Tooltip>
          <Tooltip placement='right' title='Download JSON'>
            <Button
              type={'text'}
              icon={<CloudDownloadOutlined />}
              onClick={() => {
                downloadJDM();
              }}
            />
          </Tooltip>
        </div>

        <div className={'grl-dg__aside__side-bar__bottom'}>
          {onSimulationRun && (
            <Tooltip placement='right' title='Toggle Simulator'>
              <Button
                type={'text'}
                icon={<PlayCircleOutlined className={'color-primary'} />}
                onClick={() => {
                  toggleSimulator();
                }}
              />
            </Tooltip>
          )}
        </div>
      </div>
      {menu && (
        <div className={'grl-dg__aside__menu'}>
          {menu === 'components' && (
            <>
              <div className={'grl-dg__aside__menu__heading'}>
                <div className={'grl-dg__aside__menu__heading__text'}>
                  <Typography.Text strong style={{ marginBottom: 0 }}>
                    Components
                  </Typography.Text>
                </div>
                <Button type={'text'} size='small' icon={<CloseOutlined />} onClick={() => setMenu(false)}></Button>
              </div>
              <div className={'grl-dg__aside__menu__content'}>
                <GraphComponents inputDisabled={hasInputNode} disabled={!!activeNodeId || disabled} />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
