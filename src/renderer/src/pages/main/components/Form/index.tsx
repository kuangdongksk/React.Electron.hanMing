import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { I2DCoordinate } from '@renderer/interface/graph'
import { Button, Card, Collapse, Form, Input, Select, Space } from 'antd'
import { useResponsive } from 'antd-style'
import { LabeledValue } from 'antd/es/select'
import { useState } from 'react'
import useStyle from './index.style'
export interface NoteFormProps {
  position: I2DCoordinate
  onSubmit: (values: any) => void
}

const { get } = window.api

export default function (props: NoteFormProps) {
  const { position, onSubmit } = props

  const { desktop, laptop } = useResponsive()
  const { styles } = useStyle({ desktop, laptop })

  const [noteOptions, setNoteOptions] = useState<LabeledValue[]>([])

  return (
    <Card className={styles.card}>
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
        <Space>
          <Form.Item label="x" name="x">
            <Input disabled />
          </Form.Item>
          <Form.Item label="y" name="y">
            <Input disabled />
          </Form.Item>
        </Space>

        <Form.Item label="内容" name="content" rules={[{ required: true, message: '请输入内容' }]}>
          <Input />
        </Form.Item>

        <Form.List name="addRelation">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space>
                  <Form.Item key={key} name={name}>
                    <Select
                      showSearch
                      options={noteOptions}
                      onSearch={(value) => {
                        get.getNotesContentIncludeParam(value).then((res) => {
                          setNoteOptions(
                            res.map((item) => ({
                              label: item.content,
                              value: item.id
                            }))
                          )
                        })
                      }}
                    />
                    <Form.Item key={key} name={name} label="关系类型">
                      <Select showSearch />
                    </Form.Item>
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: '60%' }}
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button htmlType="submit">添加</Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
