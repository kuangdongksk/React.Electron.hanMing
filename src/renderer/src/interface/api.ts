import { note, relation } from '@prisma/client'

export interface IApi {
  get: {
    getAllNote: () => Promise<note[]>
    getAllRelation: () => Promise<relation[]>
  }
}
