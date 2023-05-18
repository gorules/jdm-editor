## BETA JDM Editor

> A JDM Editor
Live demo and usage at https://gorules.github.io/jdm-editor/

## Decision Graph
> Coming soon

## Decision Table
<img width="945" alt="Screenshot 2023-05-18 at 22 17 06" src="https://github.com/gorules/jdm-editor/assets/60513195/102975cc-8781-4d4f-9ba4-508c69a1be42">

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
