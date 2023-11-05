import { atom } from "recoil";

export type User = {
  username: string
  email: string
}

export const userState = atom<User>({
  key: 'userState',
  default: undefined
})