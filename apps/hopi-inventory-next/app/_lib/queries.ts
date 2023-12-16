import axios from 'axios'

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
  const { status, data } = await API.get('auth/testPrivate')
  return data as LoginResponse
}

type APIStatus = 'Success' | 'Failed'

type BasicResponse = {
  status: APIStatus
  message: string
}

type LoginResponse = {
  status: 'Success'
  message: string
  userID: string
} | {
  status: 'Failed'
  message: string
}
type LogoutResponse = BasicResponse
type RegisterResponse = BasicResponse