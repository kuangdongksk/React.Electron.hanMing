import { note } from '@prisma/client'
import { prisma } from '.'

//#region note
export function updateNoteById(id: string, data: Partial<note>) {
  return prisma.note.update({
    where: {
      id
    },
    data
  })
}
