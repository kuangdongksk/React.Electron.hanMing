import { electronAPI } from '@electron-toolkit/preload'
import { note } from '@prisma/client'
import { contextBridge } from 'electron'
import { IApi } from '../renderer/src/interface/api'
import { createNote } from './service/create'
import { getAllNote, getAllRelation, getNoteById } from './service/get'
import { updateNoteById } from './service/update'

// Custom APIs for renderer
const api: IApi = {
  create: {
    createNote: async (data) => {
      const res = await createNote(data)
      return res
    }
  },
  get: {
    getAllNote: async () => {
      const res = await getAllNote()
      return res
    },
    getNoteById: async (id: string) => {
      const res = await getNoteById(id)
      return res
    },

    getAllRelation: async () => {
      const res = await getAllRelation()
      return res
    }
  },
  update: {
    updateNoteById: async (id: string, data: Partial<note>) => {
      const res = await updateNoteById(id, data)
      return res
    }
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
