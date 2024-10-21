import { Typography } from 'antd';
import React from 'react';

import { Stack } from './stack';

export type SpacedTextProps = {
  left: React.ReactNode;
  right?: React.ReactNode;
  gap?: number;
};

export const SpacedText: React.VFC<SpacedTextProps> = ({ left, right, gap = 16 }) => {
  return (
    <Stack gap={gap} horizontal horizontalAlign='space-between'>
      <Typography.Text style={{ color: 'inherit' }}>{left}</Typography.Text>
      {right && <Typography.Text style={{ color: 'inherit' }}>{right}</Typography.Text>}
    </Stack>
  );
};
