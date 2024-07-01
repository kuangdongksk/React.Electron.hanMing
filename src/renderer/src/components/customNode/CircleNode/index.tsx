import { NodeStyle } from '@antv/g6/lib/spec/element/node'
import { ENodeType } from '@renderer/constant/graph/nodeType'
import { createStyles } from 'antd-style'
import { create } from 'domain'

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

const useCircleNodeStyles = createStyles({
  root: {
    width: 'fit-content',
    height: 'fit-content',
    backgroundColor: '#ffe7e775'
  }
})

export default function CircleNode(props: Readonly<CircleNodeProps>) {
  const { data } = props
  const { styles } = useCircleNodeStyles()
  return <div className={styles.root}>{data.data.content}</div>
}
