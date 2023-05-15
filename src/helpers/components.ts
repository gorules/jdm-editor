export type SchemaSelectProps = {
  field: string
  name?: string
  items?: SchemaSelectProps[]
}
export const recursiveSelect = (
  selector: string[],
  fields: SchemaSelectProps[]
): SchemaSelectProps | undefined => {
  const key = selector?.[0]
  if (!key) return
  const field = fields.find((field) => field.field === key)
  if (field?.items) {
    return recursiveSelect(selector.slice(1), field.items)
  }
  return field
}
