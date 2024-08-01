import { Text } from '@antv/g6-extension-react'
import { INodeData } from '@renderer/interface/components/node'
import CustomNodeRoot from '../components/customNodeRoot'

export interface IPlainNodeProps {
  data: INodeData
}

function PlainNode(props: IPlainNodeProps) {
  const { data } = props

  return (
    <CustomNodeRoot width={100} height={100}>
      <Text text={data.id} />
      <Text text={data.content} />
    </CustomNodeRoot>
  )
}

export default PlainNode
