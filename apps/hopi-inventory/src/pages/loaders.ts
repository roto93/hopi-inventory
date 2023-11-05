import { User } from "@/atoms/user.atom"
import { redirect } from "react-router-dom"

export const publicLoader = (user: User) => async () => {
  if (user) return redirect('/')
  return null
}
export const privateLoader = (user: User) => async () => {
  if (!user) return redirect('/login')
  return null
}