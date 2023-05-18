## BETA JDM Editor

> A JDM Editor
Live demo and usage at https://gorules.github.io/jdm-editor/

## Decision Graph
> Coming soon

## Decision Table

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
