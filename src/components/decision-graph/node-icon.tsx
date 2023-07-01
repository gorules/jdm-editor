import React from 'react';
import {
  ApartmentOutlined,
  ArrowRightOutlined,
  CodeOutlined,
  FunctionOutlined,
  TableOutlined,
} from '@ant-design/icons';

export const NodeIcon: React.FC<{ type?: string }> = (props) => {
  const { type } = props;
  if (type === 'decisionTableNode') return <TableOutlined />;
  if (type === 'decisionNode') return <ApartmentOutlined />;
  if (type === 'functionNode') return <FunctionOutlined />;
  if (type === 'inputNode') return <ArrowRightOutlined />;
  if (type === 'expressionNode') return <CodeOutlined />;
  if (type === 'outputNode') return <ArrowRightOutlined />;
  return null;
};
