import { atom } from 'jotai'

export const currentUserAtom = atom<null | UserID>(null)

type UserID = string