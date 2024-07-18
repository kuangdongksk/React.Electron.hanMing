import { TElementType } from '@renderer/types/graph/element'
import { atom } from 'jotai'

export const showLeftSidebarAtom = atom<boolean>(false)
export const showRightSidebarAtom = atom<boolean>(false)

export const formTypeAtom = atom<TElementType>('node')
