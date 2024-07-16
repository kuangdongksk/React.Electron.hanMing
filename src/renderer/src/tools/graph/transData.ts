import { EdgeData, NodeData } from '@antv/g6'
import { note, relation } from '@prisma/client'
import { INoteFormValue } from '@renderer/components/ElementForm'
import { ENodeType } from '@renderer/constant/graph/nodeType'
import { nanoid } from 'nanoid'

export function stringArrayToObj<T>(strArr: string[]): T {
  return strArr.reduce((obj, item) => {
    const [key, value] = item.split(':')
    obj[key] = value
    return obj
  }, {}) as T
}

//#region note
export function noteToNode(note: note): NodeData {
  const { attributes: attributesStr, style, content } = note

  const attributes = JSON.parse(attributesStr)
  return {
    id: note.id,
    type: attributes.type ?? ENodeType.Plain,
    data: {
      content,
      type: attributes.type ?? ENodeType.Plain,
      ...attributes
    },
    style: {
      label: true,
      labelText: (d) => d.data?.label,
      ...JSON.parse(style)
    }
  }
}

export function formToNote(formValue: INoteFormValue): note {
  const { addRelation, content, id, type, x, y } = formValue

  return {
    id,
    noteId: id,
    content,
    style: JSON.stringify({
      x,
      y
    }),
    attributes: JSON.stringify({
      type
    })
  }
}

//#region relation

export function relationToEdge(relation: relation): EdgeData {
  return {
    id: 'edge' + relation.id,
    data: {
      label: relation.name
    },
    source: relation.source,
    target: relation.target
  }
}
