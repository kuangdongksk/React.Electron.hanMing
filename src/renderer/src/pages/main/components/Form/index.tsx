import { I2DCoordinate } from '@renderer/interface/graph'
import { Button, Collapse, Form, Input } from 'antd'
export interface NoteFormProps {
  position: I2DCoordinate
  onSubmit: (values: any) => void
}

export default function (props: NoteFormProps) {
  const { position, onSubmit } = props

  return (
    <Form
      initialValues={{
        x: position.x,
        y: position.y
      }}
      onFinish={(values) => {
        onSubmit(values)
      }}
    >
      <Collapse
        items={[
          {
            key: '1',
            label: '基本信息',
            children: (
              <>
                position: {position.x}, {position.y}
              </>
            )
          }
        ]}
      />
      <Form.Item label="x" name="x">
        <Input disabled />
      </Form.Item>
      <Form.Item label="y" name="y">
        <Input disabled />
      </Form.Item>

      <Form.Item label="内容" name="content" rules={[{ required: true, message: '请输入内容' }]}>
        <Input />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit">添加</Button>
      </Form.Item>
    </Form>
  )
}
