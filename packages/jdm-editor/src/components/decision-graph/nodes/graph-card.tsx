import clsx from 'clsx';
import React from 'react';

export type GraphCardProps = React.HTMLAttributes<HTMLDivElement>;

export const GraphCard: React.FC<GraphCardProps> = ({ className, ...props }) => {
  return <div className={clsx('grl-dn__graphCard', className)} {...props} />;
};
