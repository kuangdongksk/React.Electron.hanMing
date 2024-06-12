import { I2DCoordinate } from '@renderer/interface/graph'
import { Collapse, Form, Input } from 'antd'
export interface NoteFormProps {
  position: I2DCoordinate
}

export default function (props: NoteFormProps) {
  const { position } = props

  return (
    <Form>
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
      ></Collapse>
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
