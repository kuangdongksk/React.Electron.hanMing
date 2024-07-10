export interface IOptions<TValue> {
  label: string
  value: TValue
  children?: IOptions<TValue>[]
}
