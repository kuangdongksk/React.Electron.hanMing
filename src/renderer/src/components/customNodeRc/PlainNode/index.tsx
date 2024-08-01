import { INodeData } from '@renderer/interface/components/node'
import { Flex, Typography } from 'antd'
import CustomNodeRoot from '../components/CustomNodeRoot'

const { Text } = Typography

export interface IPlainNodeProps {
  data: INodeData
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
