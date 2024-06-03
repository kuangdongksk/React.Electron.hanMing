import { Form, Input } from 'antd'
export default function () {
  return (
    <Form>
      <Form.Item label="内容" name="content">
        <Input />
      </Form.Item>
      <Form.Item label="标签" name="tag">
        <Input />
      </Form.Item>
      <Form.Item label="属性" name="property">
        <Input />
      </Form.Item>
      <Form.Item label="关系" name="relation">
        <Input />
      </Form.Item>
    </Form>
  )
}
