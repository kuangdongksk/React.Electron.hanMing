import { I2DCoordinate } from '@renderer/interface/graph'
import { atom } from 'jotai'

export const dbClickPositionAtom = atom<I2DCoordinate>({ x: 0, y: 0 })
