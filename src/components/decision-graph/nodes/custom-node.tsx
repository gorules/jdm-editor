import type React from 'react';

import type { DecisionNode } from '../context/dg-store.context';
import type { MinimalNodeProps, MinimalNodeSpecification } from './specification-types';

export type CustomNodeSpecification<Data extends object, Component extends string> = {
  component: Component;
  color?: string;
  icon: React.ReactNode;
  displayName: string;
  documentationUrl?: string;
  shortDescription: string;
  generateNode: () => Omit<DecisionNode<Data>, 'position' | 'id' | 'type' | 'content'> & { config: Data };
  renderNode: React.FC<MinimalNodeProps & { specification: MinimalNodeSpecification }>;

  onNodeAdd?: (node: DecisionNode<Data>) => Promise<DecisionNode<Data>>;
};
