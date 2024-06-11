import { EdgeConfig, NodeConfig } from '@antv/g6'
import { note, relation } from '@prisma/client'

export function stringArray2Obj<T>(strArr: string[]): T {
  return strArr.reduce((obj, item) => {
    const [key, value] = item.split(':')
    obj[key] = value
    return obj
  }, {}) as T
}

export function noteToNode(note: note): NodeConfig {
  const { attributes: attributesStr } = note

  const attributes = JSON.parse(attributesStr)
  return {
    id: note.id,
    label: note.content,
    x: attributes.x,
    y: attributes.y
  }
}

export function relationToEdge(relation: relation): EdgeConfig {
  return {
    id: 'edge' + relation.id,
    label: relation.name,
    source: relation.source,
    target: relation.target
  }
}
