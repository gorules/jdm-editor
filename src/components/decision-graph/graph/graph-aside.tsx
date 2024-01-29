import {
  CloseOutlined,
  CloudDownloadOutlined,
  CloudUploadOutlined,
  PlayCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Divider, Tooltip, Typography, message } from 'antd';
import React, { useRef, useState } from 'react';

import {
  type DecisionEdge,
  type DecisionNode,
  useDecisionGraphActions,
  useDecisionGraphState,
} from '../context/dg-store.context';
import { GraphComponents } from './graph-components';

const DecisionContentType = 'application/vnd.gorules.decision';

export const GraphAside = () => {
  const { decisionGraph, activeTab, disabled } = useDecisionGraphState(({ decisionGraph, activeTab, disabled }) => ({
    decisionGraph,
    activeTab,
    disabled,
  }));
  const { setDecisionGraph } = useDecisionGraphActions();
  const fileInput = useRef<HTMLInputElement>(null);
  const inputNodes = (decisionGraph?.nodes || []).filter((node) => node.type === 'inputNode');
  const [menu, setMenu] = useState<string | undefined>('components');
  //
  // const onPaste = useCallback(async () => {
  //   try {
  //     await graphClipboard.pasteNodes();
  //   } catch (e) {
  //     message.error(e?.message);
  //   }
  // }, [graphClipboard]);

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
    <>
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

      <div className={'grl-dg__aside'}>
        <div className={'grl-dg__aside__side-bar'}>
          <Tooltip placement='right' title='Components'>
            <Button type={'primary'} icon={<PlusCircleOutlined />} onClick={() => setMenu('components')} />
          </Tooltip>
          {/*<Tooltip placement={'right'} title={'Simulator'}>*/}
          {/*  <Button type={'text'} icon={<PlayCircleOutlined />} onClick={() => {}} />*/}
          {/*</Tooltip>*/}
          <Divider
            style={{
              margin: 0,
            }}
          />
          <Tooltip placement='right' title='Upload JSON'>
            <Button
              type={'text'}
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
                  <Button
                    type={'text'}
                    size='small'
                    icon={<CloseOutlined />}
                    onClick={() => setMenu(undefined)}
                  ></Button>
                </div>
                <div className={'grl-dg__aside__menu__content'}>
                  <div className={'grl-dg__aside__menu__content__inner'}>
                    <GraphComponents
                      inputDisabled={inputNodes.length > 0}
                      onClose={() => setMenu(undefined)}
                      disabled={activeTab !== 'graph' || disabled}
                      onPaste={() => {
                        // TODO
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};
