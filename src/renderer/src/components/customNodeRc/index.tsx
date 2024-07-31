import { NodeStyle } from '@antv/g6/lib/spec/element/node'
import { ENodeType } from '@renderer/constant/graph/nodeType'
import PlainNode from './PlainNode'
import ListNode from './ListNode'

export interface INodeMapProps {
  data: {
    id: string
    style: NodeStyle
    type: ENodeType
    content: string
  }
}

const NodeMap = (props: INodeMapProps) => {
  const { data } = props
  const { type } = data
  const map = {
    [ENodeType.Plain]: <PlainNode data={data} />,
    [ENodeType.List]: <ListNode data={data} />
  }

  return map[type]
}
export default NodeMap
