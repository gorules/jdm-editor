import React from 'react';
import { Stack } from './stack';
import { Typography } from 'antd';

export type SpacedTextProps = {
  left: string;
  right: string;
  gap?: number;
};

export const SpacedText: React.VFC<SpacedTextProps> = ({ left, right, gap = 16 }) => {
  return (
    <Stack gap={gap} horizontal horizontalAlign="space-between">
      <Typography.Text style={{ color: 'inherit' }}>{left}</Typography.Text>
      <Typography.Text style={{ color: 'inherit' }}>{right}</Typography.Text>
    </Stack>
  );
};
