import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { is } from '@electron-toolkit/utils'
import { ENodeType } from '@renderer/constant/graph/nodeType'
import { I2DCoordinate } from '@renderer/interface/graph'
import { dbClickPositionAtom, newNoteAtom } from '@renderer/stores/canvas'
import { formToNote, noteToNode } from '@renderer/tools/graph/transData'
import { promiseWidthTip } from '@renderer/util/function/requeest'
import { enumToOptions } from '@renderer/util/trans/enum'
import { Button, Col, Form, Input, InputNumber, Radio, Row, Select, Switch } from 'antd'
import { LabeledValue } from 'antd/es/select'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
export interface NoteFormProps {}

const { create, get, update: _update } = window.api

export interface INoteFormValue {
  addRelation: { target: string; type: string }[]
  comboId: string
  content: string
  id: string
  isCombo: string
  type: ENodeType
  x: number
  y: number
}

function ElementForm() {
  const [form] = Form.useForm()

  const [position] = useAtom<I2DCoordinate>(dbClickPositionAtom)
  const [newNote, setNewNote] = useAtom(newNoteAtom)

  const [noteOptions, setNoteOptions] = useState<LabeledValue[]>([])

  useEffect(() => {
    form.setFieldsValue({
      x: position.x,
      y: position.y
    })
  }, [position])

  useEffect(() => {
    if (newNote) {
      const note = noteToNode(newNote)

      form.setFieldsValue({
        id: note.id,
        isCombo: note.isCombo ? 'true' : 'false',
        comboId: note.combo,
        content: note.data?.content,
        type: note.type
      })
    }
  }, [newNote])

  return (
    <Form<INoteFormValue>
      form={form}
      onFinish={(values) => {
        promiseWidthTip(create.createNote(formToNote(values)), {
          onSuccess: (res) => {
            setNewNote(res)
          }
        })
      }}
      onValuesChange={(_changedValues, allValues) => {
        setNewNote(formToNote(allValues))
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

      <Form.Item label="是否组合" name="isCombo">
        <Radio.Group>
          <Radio.Button value={'false'}>否</Radio.Button>
          <Radio.Button value={'true'}>是</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="父组合" name="comboId">
        <Select
          options={[
            {
              label: '无',
              value: 'undefined'
            }
          ]}
        />
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
export default ElementForm
