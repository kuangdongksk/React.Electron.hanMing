import { Flex } from 'antd'
import CustomNodeRoot from '../components/CustomNodeRoot'
import { INodeData } from '@renderer/interface/components/node'

export interface IListNodeProps {
  data: INodeData
}

export default function ListNode(props: IListNodeProps) {
  const { data } = props
  return (
    <CustomNodeRoot>
      <Flex>
        <span>{data.content}</span>
        <br />
        <span>{data.id}</span>
      </Flex>
    </CustomNodeRoot>
  )
}
