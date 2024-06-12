import { note } from '@prisma/client'
import { prisma } from '.'

//#region 笔记
export function createNote(note: note) {
  return prisma.note.create({ data: note })
}
