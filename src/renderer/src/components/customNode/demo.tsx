import { Node, NodeOptions } from '@antv/g6'
import ListNode from './ListNode'
import CircleNode from './CircleNode'
import { NodeStyle } from '@antv/g6/lib/spec/element/node'

export enum ENodeType {
  Circle = 'circle',
  List = 'list',
  Note = 'note'
}

export interface INodeMapProps {
  data: {
    data: any
    id: string
    style: NodeStyle
    type: ENodeType
  }
}

const NodeMap = (props: INodeMapProps) => {
  const { data } = props
  const { type } = data
  const map = {
    [ENodeType.Circle]: <CircleNode data={data} />,
    [ENodeType.List]: <ListNode data={data} />
  }

  return map[type]
}
export default NodeMap
