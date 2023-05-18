## BETA JDM Editor

> A JDM Editor
Live demo and usage at https://gorules.github.io/jdm-editor/

## Decision Graph
> Coming soon

## Decision Table
<img width="945" alt="Rules Engine Editor" src="https://github.com/gorules/jdm-editor/assets/60513195/8db213d7-0b59-4969-a7d8-afaffd1c5a85">

### API

```typescript
export type DecisionTableContextProps = {
    id?: string
    name?: string
    defaultValue?: DecisionTableProps
    value?: DecisionTableProps
    onChange?: (decisionTable: DecisionTableProps) => void
    namespace?: string
    activeRules?: string[]
    configurable?: boolean
    disabled?: boolean
    disableHitPolicy?: boolean
    inputsSchema?: SchemaSelectProps[]
    outputsSchema?: SchemaSelectProps[]
    cellRenderer?: (props: CellProps) => JSX.Element | null | undefined
}
```

## License

MIT © [GoRules](https://github.com/gorules/jdm-editor/LICENSE)
