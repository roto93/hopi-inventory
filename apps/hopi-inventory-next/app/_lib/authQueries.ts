import axios from 'axios'
import { headers } from 'next/headers'

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
})

export const registerQuery = async (_data: { email: string, password: string }) => {
  const { status, data } = await API.post('auth/register', _data)
  return data as RegisterResponse
}

export const loginQuery = async (_data: { email: string, password: string }) => {
  const { status, data } = await API.post('auth/login', _data)
  return data as LoginResponse
}

export const logoutQuery = async () => {
  const { status, data } = await API.post('auth/logout')
  return data as LogoutResponse
}

export const checkAuthQuery = async () => {
  try {
    const { status, data } = await API.get<UserResponse>('user/me')
    return data.data.user
  } catch (e) {
    console.log(e)
    return null
  }
}

export const checkAuthAction = async (cookie: string | null) => {
  try {
    const { status, data } = await API.get<UserResponse>('user/me', { headers: { "Cookie": cookie } })
    return data
  } catch (e) {
    console.log(e)
    return null
  }
}

export type APIStatus = 'Success' | 'Failed'

export type BasicResponse = {
  status: APIStatus
  message: string
}

export type LoginResponse = {
  status: 'Success'
  message: string
  userID: string
} | {
  status: 'Failed'
  message: string
}
export type LogoutResponse = BasicResponse
export type RegisterResponse = BasicResponse
export type UserResponse = {
  status: 'Success',
  data: {
    user: {
      _id: string
      email: string
      username: string
      eventIDs: string
    }
  }
}
export type DataResponse = {
  status: 'Success'
  message: string
  data: unknown
} | {
  status: 'Failed'
  message: string
  data: undefined
}