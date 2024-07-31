import { Flex } from 'antd'
import CustomNodeRoot from '../components/CustomNodeRoot'

export default function ListNode({ data }) {
  console.log('ListNode', data)
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
