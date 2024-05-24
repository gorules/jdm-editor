import type { DragDropManager  } from "dnd-core";
import { TabDecisionTable } from "./tab-decision-table";
import { TabExpression } from "./tab-expression";
import { TabFunction } from "./tab-function";
import { type ReactNode } from "react";

export type Tab = {type: string; tab: (p: CommonTabProps) => ReactNode }

export type CommonTabProps = {
  id: string;
  manager?: DragDropManager;
}

export const BASE_TABS: Tab[] = [{type: "decisionTableNode", tab: (p) =>  <TabDecisionTable {...p} />}, 
{type: "expressionNode", tab: (p) => <TabExpression {...p} />},
{type: "functionNode", tab: (p) => <TabFunction {...p} />}] as const;