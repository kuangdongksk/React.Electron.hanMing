import { note, relation } from '@prisma/client'

export interface IApi {
  get: {
    getAllNote: () => Promise<note[]>
    getNoteById: (id: string) => Promise<note | null>
    getAllRelation: () => Promise<relation[]>
  }
  update: {
    updateNoteById: (id: string, data: Partial<note>) => Promise<note>
  }
}
