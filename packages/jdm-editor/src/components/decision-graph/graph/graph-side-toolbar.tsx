import { CloudDownloadOutlined, CloudUploadOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Tooltip, message } from 'antd';
import React, { Fragment, useRef, useState } from 'react';

import type { ParsedExcelData } from '../../../helpers/excel';
import { exportDecisionTable, getExcelData } from '../../../helpers/excel';
import { decisionModelSchema } from '../../../helpers/schema';
import { parseDecisionTable } from '../../decision-table/context/dt-store.context';
import { useDecisionGraphActions, useDecisionGraphRaw, useDecisionGraphState } from '../context/dg-store.context';
import { type DecisionEdge, type DecisionNode } from '../dg-types';
import { NodeKind } from '../nodes/specifications/specification-types';
import type { MergedDataItem } from './graph-excel-dialog';
import { GraphExcelDialog } from './graph-excel-dialog';

const DecisionContentType = 'application/vnd.gorules.decision';

export type GraphSideToolbarProps = {
  //
};

export const GraphSideToolbar: React.FC<GraphSideToolbarProps> = () => {
  const decisionGraphRaw = useDecisionGraphRaw();
  const fileInput = useRef<HTMLInputElement>(null);
  const excelFileInput = useRef<HTMLInputElement>(null);
  const [excelGraphData, setExcelGraphData] = useState<ParsedExcelData[] | null>();

  const { setDecisionGraph, setActivePanel } = useDecisionGraphActions();
  const { disabled, panels, activePanel, viewConfig } = useDecisionGraphState(
    ({ disabled, panels, activePanel, viewConfig }) => ({
      disabled,
      panels,
      activePanel,
      viewConfig,
    }),
  );

  const handleUploadInput = async (event: any) => {
    const fileList = event?.target?.files as FileList;
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const parsed: any = JSON.parse(e?.target?.result as string);
        if (parsed?.contentType !== DecisionContentType) {
          throw new Error('Invalid content type');
        }

        const nodes: DecisionNode[] = Array.isArray(parsed?.nodes) ? parsed.nodes : [];
        const nodeIds = nodes.map((node) => node.id);

        const edges: DecisionEdge[] = (parsed.edges as DecisionEdge[]).filter(
          (edge) => nodeIds.includes(edge?.targetId) && nodeIds.includes(edge?.sourceId),
        );

        const modelParsed = decisionModelSchema.safeParse({
          nodes,
          edges,
          settings: parsed?.settings,
        });

        if (!modelParsed.success) {
          console.log(modelParsed.error?.message);
          message.error(modelParsed.error?.message);
          return;
        }

        setDecisionGraph(modelParsed.data);
      } catch (e: any) {
        message.error(e.message);
      }
    };

    reader.readAsText(Array.from(fileList)?.[0], 'UTF-8');
  };

  const uploadJDMExcel = (event: any) => {
    const file = event?.target?.files[0];
    const fileReader = new FileReader();

    try {
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = async () => {
        const buffer = fileReader.result as ArrayBuffer;

        if (!buffer) return;
        const { decisionGraph } = decisionGraphRaw.stateStore.getState();

        const excelData = await getExcelData(buffer, decisionGraph);

        setExcelGraphData(excelData);

        message.success('Excel file has been uploaded successfully!');
      };
    } catch {
      message.error('Failed to upload Excel!');
    }
  };

  const handleDataMapping = (mappedExcelData: MergedDataItem[]) => {
    const nodesFromExcel: DecisionNode[] = mappedExcelData.map((excelData) => {
      const inputs = excelData.items
        .filter((item) => item.type === 'input')
        .map((item) => ({
          id: item.id,
          name: item.label,
          field: item.value
            ?.replace(/[^a-zA-Z0-9\s._]/g, '')
            .trim()
            .replace(/\s+/g, '.')
            .toLowerCase(),
        }));

      const outputs = excelData.items
        .filter((item) => item.type === 'output')
        .map((item) => ({
          id: item.id,
          name: item.label,
          field: item.value
            ?.replace(/[^a-zA-Z0-9\s._]/g, '')
            .trim()
            .split(/\s+/)
            .map((word, index) =>
              index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
            )
            .join(''),
        }));

      const reducedRules = excelData.rules.map((rule) =>
        rule.reduce(
          (acc: Record<string, any> & { _id: string }, item) => {
            acc[item.headerId] = item.value;
            return acc;
          },
          {
            _id: crypto.randomUUID(),
          },
        ),
      );

      return {
        id: excelData.id,
        name: excelData.name,
        type: NodeKind.DecisionTable,
        content: {
          ...parseDecisionTable({
            inputs,
            outputs,
            rules: reducedRules,
            executionMode: excelData.executionMode || 'single',
            hitPolicy: excelData.hitPolicy || 'first',
            passThrough: excelData.passThrough,
          }),
          inputField: excelData.inputField,
          outputPath: excelData.outputPath,
        },
        position: excelData.position,
      };
    });

    const { decisionGraph } = decisionGraphRaw.stateStore.getState();

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
      .map((newNode, index) => ({
        ...newNode,
        type: NodeKind.DecisionTable,
        position: (() => {
          const findAvailablePosition = (x: number, y: number) => {
            const position = { x, y };

            if (decisionGraph.nodes.some((node) => node.position.x === position.x && node.position.y === position.y)) {
              return findAvailablePosition(x + 250, y);
            }

            return position;
          };

          const availablePosition = findAvailablePosition(0, 0);

          return { x: availablePosition.x + index * 250, y: 0 };
        })(),
      }));

    const modelParsed = decisionModelSchema.safeParse({
      nodes: [...updatedNodes, ...newNodes],
      edges: decisionGraph.edges,
    });

    if (!modelParsed.success) {
      console.log(modelParsed.error?.message);
      message.error(modelParsed.error?.message);
      return;
    }

    setDecisionGraph(modelParsed.data);
    setExcelGraphData(null);
  };

  const downloadJDM = async () => {
    try {
      const { name, decisionGraph } = decisionGraphRaw.stateStore.getState();
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
    } catch (e: any) {
      message.error(e.message);
    }
  };

  const downloadJDMExcel = async () => {
    try {
      const { name, decisionGraph, viewConfig } = decisionGraphRaw.stateStore.getState();
      const fileName = name.replaceAll('.json', '');

      const decisionTableNodes = decisionGraph.nodes
        .filter((node) => node.type === NodeKind.DecisionTable)
        .filter((node) => (viewConfig?.enabled ? !!viewConfig?.permissions?.[node.id] : true))
        .map((decisionTable) => ({
          ...decisionTable.content,
          id: decisionTable.id,
          name: decisionTable.name,
        }));

      await exportDecisionTable(fileName, decisionTableNodes);
      message.success('Excel file has been downloaded successfully!');
    } catch {
      message.error('Failed to download Excel file!');
    }
  };

  const uploadItems: MenuProps['items'] = [
    !viewConfig?.enabled && {
      key: 'upload-json',
      label: 'Upload JSON',
      onClick: () => fileInput?.current?.click?.(),
    },
    {
      key: 'upload-excel',
      label: 'Upload Excel',
      onClick: () => excelFileInput?.current?.click?.(),
    },
  ].filter((item) => !!item);

  const downloadItems: MenuProps['items'] = [
    !viewConfig?.enabled && {
      key: 'download-json',
      label: 'Download JSON',
      onClick: () => downloadJDM(),
    },
    {
      key: 'download-excel',
      label: 'Download Excel',
      onClick: () => downloadJDMExcel(),
    },
  ].filter((item) => !!item);

  return (
    <Fragment>
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
            {!disabled && (
              <Dropdown menu={{ items: uploadItems }} placement='bottomRight' trigger={['click']} arrow>
                <Button type={'text'} disabled={disabled} icon={<CloudUploadOutlined />} />
              </Dropdown>
            )}
            <Dropdown menu={{ items: downloadItems }} placement='bottomRight' trigger={['click']} arrow>
              <Button type={'text'} icon={<CloudDownloadOutlined />} />
            </Dropdown>
          </div>
          <div className={'grl-dg__aside__side-bar__bottom'}>
            {(panels || []).map((panel) => {
              const isActive = activePanel === panel.id;
              return (
                <Tooltip
                  key={panel.id}
                  title={`${!isActive ? 'Open' : 'Close'} ${panel.title.toLowerCase()} panel`}
                  placement={'right'}
                >
                  <Button
                    key={panel.id}
                    type='text'
                    icon={panel.icon}
                    style={{ background: isActive ? 'rgba(0, 0, 0, 0.1)' : undefined }}
                    onClick={() => {
                      if (panel?.onClick) return panel.onClick();
                      if (panel?.renderPanel) setActivePanel(isActive ? undefined : panel.id);
                    }}
                  />
                </Tooltip>
              );
            })}
          </div>
        </div>
      </div>

      <GraphExcelDialog
        excelData={excelGraphData}
        handleSuccess={handleDataMapping}
        handleCancel={() => {
          setExcelGraphData(null);
        }}
      />
    </Fragment>
  );
};
