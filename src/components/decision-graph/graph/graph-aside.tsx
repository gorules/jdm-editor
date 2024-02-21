import {
  CloseOutlined,
  CloudDownloadOutlined,
  CloudUploadOutlined,
  PlayCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Tooltip, Typography, message } from 'antd';
import React, { useRef, useState } from 'react';

import { exportExcelFile, readFromExcel } from '../../../helpers/excel-file-utils';
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
  const excelFileInput = useRef<HTMLInputElement>(null);
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

  const uploadJDMExcel = (event: any) => {
    const file = event?.target?.files[0];
    const fileReader = new FileReader();

    fileReader.readAsArrayBuffer(file);

    fileReader.onload = async () => {
      const buffer = fileReader.result as ArrayBuffer;

      if (!buffer) return;

      const nodesFromExcel = await readFromExcel(buffer);

      const updatedNodes = decisionGraph.nodes.map((node) => {
        let _node = node;
        // updating existing nodes
        nodesFromExcel.forEach((excelNode) => {
          if (excelNode.id === node.id) _node = { ...node, content: excelNode.content };
        });

        return _node;
      });

      // filtering new nodes and setting them proper position
      const newNodes = nodesFromExcel
        .filter((node) => !updatedNodes.some((existingNode) => existingNode.id === node.id))
        .map((newNode, index) => ({ ...newNode, position: { x: index * 250, y: 0 } }));

      setDecisionGraph({
        nodes: [...updatedNodes, ...newNodes],
        edges: decisionGraph.edges,
      });
    };
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

  const downloadJDMExcel = async (name: string = 'decision tables') => {
    const decisionTableNodes = decisionGraph.nodes
      .filter((node) => node.type === NodeKind.DecisionTable)
      .map((decisionTable) => ({
        ...decisionTable.content,
        id: decisionTable.id,
        name: decisionTable.name,
      }));

    await exportExcelFile(name, decisionTableNodes);
  };

  const uploadItems: MenuProps['items'] = [
    {
      key: 'upload-json',
      label: 'Upload JSON',
      onClick: () => fileInput?.current?.click?.(),
    },
    {
      key: 'upload-excel',
      label: 'Upload Excel',
      onClick: () => excelFileInput?.current?.click?.(),
    },
  ];

  const downloadItems: MenuProps['items'] = [
    {
      key: 'download-json',
      label: 'Download JSON',
      onClick: () => downloadJDM(),
    },
    {
      key: 'download-excel',
      label: 'Download Excel',
      onClick: () => downloadJDMExcel(),
    },
  ];

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
      <input
        hidden
        accept='.xlsx'
        type='file'
        ref={excelFileInput}
        onChange={uploadJDMExcel}
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
          <Dropdown menu={{ items: uploadItems }} placement='bottomRight' arrow>
            <Button type={'text'} disabled={disabled} icon={<CloudUploadOutlined />} />
          </Dropdown>
          <Dropdown menu={{ items: downloadItems }} placement='bottomRight' arrow>
            <Button type={'text'} disabled={disabled} icon={<CloudDownloadOutlined />} />
          </Dropdown>
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
