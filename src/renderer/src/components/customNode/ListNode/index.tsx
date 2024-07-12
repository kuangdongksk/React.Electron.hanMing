import { Flex } from 'antd'

export default function ListNode({ data }) {
  console.log(data)
  return (
    <Flex>
      <span>${data.content}</span>
      <span>${data.id}</span>
    </Flex>
  )
}
