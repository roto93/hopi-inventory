import axios from 'axios'
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers'
import { DataResponse } from './authQueries'

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    // "Cookie": headers().get('cookie')
  }
})

export const eventsQuery = async (header: ReadonlyHeaders,) => {
  try {
    const { status, data: _response } = await API.get('event', { headers: { Cookie: header.get('cookie') } })
    const response = _response as DataResponse
    if (response.status === 'Failed') throw Error('Cannot fetch event.')
    const { events } = response.data as { events: Event[] }
    return events
  } catch (e) {
    console.log(e)
    return []
  }
}

export const eventQuery = async (header: ReadonlyHeaders, eventId: string) => {
  try {
    const { status, data: _response } = await API.get(`event/${eventId}`, { headers: { Cookie: header.get('cookie') } })
    const response = _response as DataResponse
    if (response.status === 'Failed') throw Error('Cannot fetch event.')
    const { event } = response.data as { event: Event }
    return event
  } catch (e) {
    console.log(e)
    return undefined
  }
}

export type Event = {
  _id: string
  name: string
  userIDs: string[]
  startDate: string
  endDate: string
}