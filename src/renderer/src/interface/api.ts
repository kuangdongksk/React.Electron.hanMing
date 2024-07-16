import { note, relation, relationType } from '@prisma/client'

export interface IApi {
  create: {
    createNote: (data: note) => Promise<note>
  }
  get: {
    findManyNoteWhere: (where?: any) => Promise<note[]>
    getAllNote: () => Promise<note[]>
    getNoteById: (id: string) => Promise<note | null>
    getAllRelation: () => Promise<relation[]>
    getAllRelationType: () => Promise<relationType[]>
  }
  update: {
    updateNoteById: (id: string, data: Partial<note>) => Promise<note>
  }
}
