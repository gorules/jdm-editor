## BETA JDM Editor

> A JDM Editor
> Live demo and usage at https://gorules.github.io/jdm-editor/

## Decision Graph

```typescript
export type DecisionGraphProps = {
  id?: string;
  defaultValue?: DecisionGraphType;
  value?: DecisionGraphType;
  disabled?: boolean;
  configurable?: boolean;
  components?: CustomNodeType[];
  onChange?: (val: DecisionGraphType) => void;
  onAddNode?: (type: string, position?: XYPosition) => void;
  onOpenNode?: (node: DecisionNode) => void;
  onTabChange?: (tab?: string) => void;
  onEditGraph?: (edit: boolean) => void;
  manager?: DragDropManager;
  reactFlowProOptions?: ProOptions;
};
```

## Decision Table

<img width="945" alt="Rules Engine Editor" src="https://github.com/gorules/jdm-editor/assets/60513195/8db213d7-0b59-4969-a7d8-afaffd1c5a85">

### API

```typescript
export type DecisionTableProps = {
  id?: string;
  defaultValue?: DecisionTableType;
  value?: DecisionTableType;
  onChange?: (decisionTable: DecisionTableType) => void;
  activeRules?: string[];
  configurable?: boolean;
  disabled?: boolean;
  disableHitPolicy?: boolean;
  minColWidth?: number;
  colWidth?: number;
  inputsSchema?: SchemaSelectProps[];
  outputsSchema?: SchemaSelectProps[];
  cellRenderer?: (props: CellProps) => JSX.Element | null | undefined;
};
```

## License

MIT © [GoRules](https://github.com/gorules/jdm-editor/LICENSE)
