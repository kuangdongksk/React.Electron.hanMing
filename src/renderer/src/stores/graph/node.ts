import { NodeData } from '@antv/g6'
import { atom } from 'jotai'

export const currentNodeAtom = atom<NodeData | undefined>(undefined)
export const newNodeAtom = atom<NodeData | undefined>(undefined)
export const selectedNodeAtom = atom<NodeData[]>([])
