import { PrismaClient, note, relation } from '@prisma/client'
const prisma = new PrismaClient()

//#region note
export function getAllNote(): Promise<note[]> {
  return prisma.note.findMany()
}

//#region relation
export function getAllRelation(): Promise<relation[]> {
  return prisma.relation.findMany()
}
