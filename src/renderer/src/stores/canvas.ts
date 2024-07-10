import { note } from '@prisma/client'
import { I2DCoordinate } from '@renderer/interface/graph'
import { atom } from 'jotai'
import { nanoid } from 'nanoid'

export const dbClickPositionAtom = atom<I2DCoordinate>({ x: 0, y: 0 })

export const newNoteAtom = atom<note | undefined>(undefined)
export const selectedNoteAtom = atom<note[]>([])

export const shouldFetchNoteAtom = atom(nanoid())
