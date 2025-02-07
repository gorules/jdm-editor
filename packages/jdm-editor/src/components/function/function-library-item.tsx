import { ExportOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Tooltip, Typography } from 'antd';
import React, { useMemo } from 'react';

import typeScriptIcon from '../../assets/typescript.svg?inline';
import type { FunctionLibrary } from './helpers/libs';

type FunctionLibraryItemProps = {
  lib: FunctionLibrary;
  onImport?: () => void;
  editorValue?: string;
};

export const FunctionLibraryItem: React.FC<FunctionLibraryItemProps> = ({ lib, onImport, editorValue }) => {
  const canImport = useMemo(() => {
    if (!editorValue) {
      return true;
    }

    return !editorValue.includes(`from "${lib.name}"`) && !editorValue.includes(`from '${lib.name}'`);
  }, [lib.name, editorValue]);

  return (
    <div key={lib.name} className='grl-function__libraries__item'>
      <img alt='TypeScript Library' src={typeScriptIcon} height={18} />
      <Typography.Text strong>{lib.name}</Typography.Text>
      <Typography.Text type='secondary' style={{ fontSize: 12, marginTop: 1.5 }}>
        {lib.tagline}
      </Typography.Text>
      <div className='grl-function__libraries__item__actions'>
        <Tooltip title='Import library' placement='bottomLeft'>
          <Button type='text' size='small' icon={<PlusOutlined />} disabled={!canImport} onClick={onImport} />
        </Tooltip>
        <Tooltip title='Go to documentation' placement='bottomLeft'>
          <Button
            type='text'
            size='small'
            icon={<ExportOutlined />}
            href={lib.documentationUrl}
            target='_blank'
            disabled={!lib.documentationUrl}
          />
        </Tooltip>
      </div>
    </div>
  );
};
