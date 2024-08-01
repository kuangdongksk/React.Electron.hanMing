import { NodeStyle } from '@antv/g6/lib/spec/element/node'
import { ENodeType } from '@renderer/constant/graph/nodeType'

export interface INodeData {
  content: string
  id: string
  style: NodeStyle
  type: ENodeType
}
