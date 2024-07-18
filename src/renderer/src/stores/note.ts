import { note } from '@prisma/client'
import { atom } from 'jotai'

export const newNoteAtom = atom<note | undefined>(undefined)
export const currentNoteAtom = atom<note | undefined>(undefined)
export const selectedNoteAtom = atom<note[]>([])
