import { ComboData, EdgeData, NodeData } from '@antv/g6'
import { note, relation } from '@prisma/client'
import { INoteFormValue } from '@renderer/components/ElementForm'
import { ENodeType } from '@renderer/constant/graph/nodeType'

export function stringArrayToObj<T>(strArr: string[]): T {
  return strArr.reduce((obj, item) => {
    const [key, value] = item.split(':')
    obj[key] = value
    return obj
  }, {}) as T
}

//#region note
export function noteToNode(note: note): NodeData {
  const { attributes: attributesStr, comboId, content, id, style } = note

  const attributes = JSON.parse(attributesStr)
  return {
    id,
    combo: comboId === 'undefined' ? undefined : comboId,
    data: {
      content,
      type: attributes.type ?? ENodeType.Plain,
      ...attributes
    },
    style: {
      label: true,
      labelText: (d) => d.data?.label,
      ...JSON.parse(style)
    },
    type: attributes.type ?? ENodeType.Plain
  }
}

export function formToNote(formValue: INoteFormValue): note {
  const { addRelation, comboId, content, id, isCombo, type, x, y } = formValue

  return {
    id,
    noteId: id,
    comboId,
    content,
    isCombo,
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
//#endregion

//#region 组合
export function noteToCombo(note: note): ComboData {
  const { id, comboId } = note
  return {
    id,
    comboId
  }
}
//#endregion
