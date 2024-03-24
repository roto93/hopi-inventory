import axios from 'axios'
import { headers } from 'next/headers'
import { DataResponse } from './authQueries'

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Cookie": headers().get('cookie')
  }
})

export const eventsQuery = async () => {
  try {
    const { status, data: _response } = await API.get('event')
    const response = _response as DataResponse
    if (response.status === 'Failed') throw Error('Cannot fetch event.')
    const { events } = response.data as { events: Event[] }
    return events
  } catch (e) {
    console.log(e)
    return []
  }
}

type Event = {
  _id: string
  name: string
  userIDs: string[]
  startDate: string
  endDate: string
}