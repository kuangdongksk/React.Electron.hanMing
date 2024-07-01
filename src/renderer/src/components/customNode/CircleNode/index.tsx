import { NodeStyle } from '@antv/g6/lib/spec/element/node'
import { ENodeType } from '../demo'

export interface CircleNodeProps {
  data: {
    data: any
    id: string
    style: NodeStyle
    type: ENodeType
  }
}
export default function CircleNode(props: CircleNodeProps) {
  const { data } = props
  return <div>{data.type}</div>
}
