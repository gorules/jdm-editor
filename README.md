## BETA JDM Editor

JDM Editor is an open-source React component for crafting and designing JDM (JSON Decision model) files.
Whether you’re a developer, data analyst, or decision model expert, JDM Editor can help you harness the full potential of decision modeling, making it more accessible and manageable than ever before

> A JDM Editor
> Live demo and usage at https://gorules.github.io/jdm-editor/

## Installation
```bash
npm i @gorules/jdm-editor
```


## Usage
```typescript
...
import '@gorules/jdm-editor/dist/style.css';
import { DecisionGraph, JdmConfigProvider } from '@gorules/jdm-editor';
...

<JdmConfigProvider>
  <DecisionGraph
    value={graph}
    onChange={(val) => setGraph(val as any)}
  />
</JdmConfigProvider>
```

## Decision Graph

<img width="945" alt="Rules Engine Editor" src="https://user-images.githubusercontent.com/60513195/224425568-4a717e34-3d4b-4cc6-b031-8cd35f8ff459.png">

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

<img width="945" alt="Decision Table Editor" src="https://github.com/gorules/jdm-editor/assets/60513195/8db213d7-0b59-4969-a7d8-afaffd1c5a85">

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
