import { EdgeConfig, NodeConfig } from '@antv/g6'
import { note, relation } from '@prisma/client'
import { nanoid } from 'nanoid'

export function stringArrayToObj<T>(strArr: string[]): T {
  return strArr.reduce((obj, item) => {
    const [key, value] = item.split(':')
    obj[key] = value
    return obj
  }, {}) as T
}

//#region note
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

export function formToNote(formValue:{
  content:string,
  x:number,
  y:number
}):note{
  const id = nanoid()
  return {
    id,
    noteId:id,
    content:formValue.content,
    attributes:JSON.stringify({
      x:formValue.x,
      y:formValue.y
    }),
    tag:'',
    relations:''
  }
}

//#region relation

export function relationToEdge(relation: relation): EdgeConfig {
  return {
    id: 'edge' + relation.id,
    label: relation.name,
    source: relation.source,
    target: relation.target
  }
}
