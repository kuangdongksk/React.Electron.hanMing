import { note, relation, relationType } from '@prisma/client'

export interface IApi {
  create: {
    createNote: (data: note) => Promise<note>
  }
  get: {
    getAllNote: () => Promise<note[]>
    getNoteById: (id: string) => Promise<note | null>
    getNotesContentIncludeParam: (content: string) => Promise<note[]>
    getAllRelation: () => Promise<relation[]>
    getAllRelationType: () => Promise<relationType[]>
  }
  update: {
    updateNoteById: (id: string, data: Partial<note>) => Promise<note>
  }
}
