import { DatabaseFilled } from '@ant-design/icons'
import { Badge, Flex, Input, Tag, Typography } from 'antd'
const { Text } = Typography

const Node = ({ data, onChange }) => {
  console.log(data)
  const { status, type } = data.data

  return (
    <Flex
      style={{
        width: '100%',
        height: '100%',
        background: '#fff',
        padding: 10,
        borderRadius: 5,
        border: '1px solid gray'
      }}
      vertical
    >
      <Flex align="center" justify="space-between">
        <Text>
          <DatabaseFilled />
          Server
          <Tag>{type}</Tag>
        </Text>
        <Badge status={status} />
      </Flex>
      <Text type="secondary">{data.id}</Text>
      <Flex align="center">
        <Text style={{ flexShrink: 0 }}>
          <Text type="danger">*</Text>URL:
        </Text>
        <Input
          style={{ borderRadius: 0, borderBottom: '1px solid #d9d9d9' }}
          variant="borderless"
          value={data.data?.url}
          onChange={(event) => {
            const url = event.target.value
            onChange?.(url)
          }}
        />
      </Flex>
    </Flex>
  )
}
export default Node
