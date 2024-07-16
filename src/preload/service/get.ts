import { note, relation, relationType } from '@prisma/client'
import { prisma } from '.'

//#region note
export function findManyNoteWhere(where?: any): Promise<note[]> {
  return prisma.note.findMany({ where })
}

export function getAllNote(): Promise<note[]> {
  return prisma.note.findMany()
}

export function getNoteById(id: string): Promise<note | null> {
  return prisma.note.findUnique({
    where: {
      id
    }
  })
}

//#region relation
export function getAllRelation(): Promise<relation[]> {
  return prisma.relation.findMany()
}

//#endregion

//#region 关系类型
export function getAllRelationType(): Promise<relationType[]> {
  return prisma.relationType.findMany()
}
//#endregion
