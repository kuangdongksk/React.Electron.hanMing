import { note, relation } from '@prisma/client'
import { prisma } from '.'

//#region note
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

export function getNotesContentIncludeParam(content: string): Promise<note[]> {
  return prisma.note.findMany({
    where: {
      content: {
        contains: content
      }
    }
  })
}

//#region relation
export function getAllRelation(): Promise<relation[]> {
  return prisma.relation.findMany()
}
