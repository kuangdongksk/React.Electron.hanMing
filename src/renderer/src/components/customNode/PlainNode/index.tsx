import { NodeStyle } from '@antv/g6/lib/spec/element/node'
import { ENodeType } from '@renderer/constant/graph/nodeType'
import useCircleNodeStyles from './index.style'
import { Flex, Typography } from 'antd'

const { Text } = Typography

export interface IPlainNodeProps {
  data: {
    data: {
      content: string
    }
    id: string
    style: NodeStyle
    type: ENodeType
  }
}

function PlainNode(props: Readonly<IPlainNodeProps>) {
  const { data } = props
  const { styles } = useCircleNodeStyles()
  return (
    <Flex vertical className={styles.root}>
      <Flex align="center" justify="space-between">
        <Text>{data.data.content}</Text>
      </Flex>
    </Flex>
  )
}
export default PlainNode
