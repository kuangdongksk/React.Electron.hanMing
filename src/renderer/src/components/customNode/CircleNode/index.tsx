import { NodeStyle } from '@antv/g6/lib/spec/element/node'
import { ENodeType } from '@renderer/constant/graph/nodeType'

export interface CircleNodeProps {
  data: {
    data: {
      content: string
    }
    id: string
    style: NodeStyle
    type: ENodeType
  }
}
export default function CircleNode(props: CircleNodeProps) {
  const { data } = props
  return <div>{data.data.content}</div>
}
