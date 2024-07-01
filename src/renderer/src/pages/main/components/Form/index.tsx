import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { ENodeType } from '@renderer/constant/graph/nodeType'
import { I2DCoordinate } from '@renderer/interface/graph'
import { enumToArray } from '@renderer/util/trans/enum'
import { Button, Card, Col, Form, Input, Row, Select, Space } from 'antd'
import { useResponsive } from 'antd-style'
import { LabeledValue } from 'antd/es/select'
import { useState } from 'react'
import useStyle from './index.style'
import { promiseWidthTip } from '@renderer/util/function/requeest'
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

        <Form.Item label="类型" name="type" rules={[{ required: true, message: '请选择类型' }]}>
          <Select
            options={enumToArray(ENodeType).map((item) => ({
              label: item,
              value: item
            }))}
          />
        </Form.Item>

        <Form.List name="addRelation">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }) => (
                <Row>
                  <Form.Item key={key} name={name} label="目标笔记">
                    <Select
                      showSearch
                      options={noteOptions}
                      onSearch={(value) => {
                        promiseWidthTip(get.getNotesContentIncludeParam(value), {
                          onSuccess: (res) => {
                            setNoteOptions(
                              res.map((item) => ({
                                label: item.content,
                                value: item.id
                              }))
                            )
                          }
                        })
                      }}
                    />
                  </Form.Item>
                  <Form.Item key={key} name={name} label="关系类型">
                    <Select showSearch />
                  </Form.Item>
                  <Col span={1}>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button onClick={() => add()} style={{ width: '60%' }} icon={<PlusOutlined />}>
                  添加关系
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
