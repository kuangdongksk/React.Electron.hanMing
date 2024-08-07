import { I2DCoordinate } from '@renderer/interface/graph'
import { atom } from 'jotai'
import { nanoid } from 'nanoid'

export const currentCenterPositionAtom = atom<I2DCoordinate>({ x: 0, y: 0 })
export const dbClickPositionAtom = atom<I2DCoordinate>({ x: 0, y: 0 })

export const shouldFetchNoteAtom = atom(nanoid())
