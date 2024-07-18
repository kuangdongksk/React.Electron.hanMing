import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { NodeData } from '@antv/g6'
import { ENodeType } from '@renderer/constant/graph/nodeType'
import { 根据内容获取, 获取所有Combo } from '@renderer/constant/request/note'
import { currentNodeAtom, newNodeAtom } from '@renderer/stores/graph/node'
import { formToNote } from '@renderer/tools/graph/transData'
import { promiseWidthTip } from '@renderer/util/function/requeest'
import { enumToOptions } from '@renderer/util/trans/enum'
import { Button, Col, Form, Input, InputNumber, Row, Select } from 'antd'
import { LabeledValue } from 'antd/es/select'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
export interface NoteFormProps {}

const { create, get, update: _update } = window.api

export interface INoteFormValue extends NodeData {
  addRelation: { target: string; type: string }[]
  comboId: string
  content: string
  id: string
  type: ENodeType
  x: number
  y: number
}

const DefaultComboOptions = [
  {
    label: '无',
    value: 'undefined'
  }
]

function NodeForm() {
  const [form] = Form.useForm()

  const [currentNode, setCurrentNode] = useAtom(currentNodeAtom)
  const [newNode, setNewNode] = useAtom(newNodeAtom)

  const [noteOptions, setNoteOptions] = useState<LabeledValue[]>([])
  const [comboOptions, setComboOptions] = useState<LabeledValue[]>(DefaultComboOptions)

  useEffect(() => {
    promiseWidthTip(get.findManyNoteWhere(获取所有Combo), {
      onSuccess: (res) => {
        setComboOptions(
          res
            .map((item) => ({
              label: item.content,
              value: item.id
            }))
            .concat(DefaultComboOptions)
        )
      }
    })
  }, [])

  useEffect(() => {
    if (newNode) {
      form.setFieldsValue(newNode)
    }
  }, [newNode])

  useEffect(() => {
    if (currentNode) {
      form.setFieldsValue(currentNode)
    }
  }, [currentNode])

  return (
    <Form<INoteFormValue>
      form={form}
      onFinish={(values) => {
        promiseWidthTip(create.createNote(formToNote(values)))
      }}
      onValuesChange={(_changedValues, allValues) => {
        setNewNode(allValues)
        setCurrentNode(allValues)
      }}
    >
      <Form.Item label="id" name="id">
        <Input disabled />
      </Form.Item>

      <Form.Item label="x" name="x">
        <InputNumber disabled />
      </Form.Item>
      <Form.Item label="y" name="y">
        <InputNumber disabled />
      </Form.Item>

      <Form.Item label="父组合" name="comboId">
        <Select options={comboOptions} />
      </Form.Item>

      <Form.Item label="内容" name="content" rules={[{ required: true, message: '请输入内容' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="类型" name="type" rules={[{ required: true, message: '请选择类型' }]}>
        <Select options={enumToOptions(ENodeType)} />
      </Form.Item>

      <Form.List name="addRelation">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name }) => (
              <Row key={key}>
                <Form.Item name={name} label="目标笔记">
                  <Select
                    showSearch
                    options={noteOptions}
                    onSearch={(value) => {
                      promiseWidthTip(get.findManyNoteWhere(根据内容获取(value)), {
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
                <Form.Item name={name} label="关系类型">
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
  )
}
export default NodeForm
