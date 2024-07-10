import { EdgeData, NodeData } from '@antv/g6'
import { note, relation } from '@prisma/client'
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
      ...attributes
    },
    style: {
      label: true,
      labelText: (d) => d.data?.label,
      ...JSON.parse(style)
    }
  }
}

export function formToNote(formValue: { content: string; x: number; y: number }): note {
  const id = nanoid()
  return {
    id,
    noteId: id,
    content: formValue.content,
    style: JSON.stringify({
      x: formValue.x,
      y: formValue.y
    }),
    attributes: JSON.stringify({})
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
