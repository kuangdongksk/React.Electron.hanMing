import { PrismaClient, note } from '@prisma/client'
const prisma = new PrismaClient()

//#region note
export function updateNoteById(id: string, data: Partial<note>) {
  return prisma.note.update({
    where: {
      id
    },
    data
  })
}
