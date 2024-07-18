import { NodeStyle } from '@antv/g6/lib/spec/element/node'
import { ENodeType } from '@renderer/constant/graph/nodeType'
import { Flex, Typography } from 'antd'
import CustomNodeRoot from '../components/CustomNodeRoot'

const { Text } = Typography

export interface IPlainNodeProps {
  data: {
    content: string
    id: string
    style: NodeStyle
    type: ENodeType
  }
}

function PlainNode(props: Readonly<IPlainNodeProps>) {
  const { data } = props
  return (
    <CustomNodeRoot>
      <Flex
        vertical
        onClick={() => {
          console.log('PlainNode', data)
        }}
      >
        <Flex align="center" justify="space-between">
          <Text>{data.content}</Text>
        </Flex>
      </Flex>
    </CustomNodeRoot>
  )
}
export default PlainNode
