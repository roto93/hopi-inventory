import axios from 'axios'
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers'
import { DataResponse } from './authQueries'

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
})

export const productsQuery = async (header: ReadonlyHeaders, eventID: string) => {
  try {
    const { status, data: _response } = await API.get(`product/all/${eventID}`, { headers: { Cookie: header.get('cookie') } })
    const response = _response as DataResponse
    if (response.status === 'Failed') throw Error('Cannot fetch event.')
    const { products } = response.data as { products: Product[] }
    return products
  } catch (e) {
    console.log(e)
    return []
  }
}

export type Product = {
  _id: string
  name: string
  inventory: number
  soldQuantity: number
  price: number
  image?: string
  categoryID?: string
  hostEventID: string
}