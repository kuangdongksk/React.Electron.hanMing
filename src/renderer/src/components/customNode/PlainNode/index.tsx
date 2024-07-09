import { NodeStyle } from '@antv/g6/lib/spec/element/node'
import { ENodeType } from '@renderer/constant/graph/nodeType'
import useCircleNodeStyles from './index.style'
import { Flex, Typography } from 'antd'

const { Text } = Typography

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

export default function CircleNode(props: Readonly<CircleNodeProps>) {
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
