import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers'
import { DataResponse } from './authQueries'


export const productsQuery = async (header: ReadonlyHeaders, eventID: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/product/all/${eventID}`, {
    headers: { Cookie: header.get('cookie') as string },
    next: { tags: ['products'] }
  })
  const response = await res.json() as DataResponse
  const data = response.data as { products: Product[] }
  return data.products
}


export const addProductQuery = async (newProduct: Partial<Product>) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/product`, {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct),
    method: 'POST',
    credentials: 'include'
  })
  const response = await res.json() as DataResponse
  return response
}


export const deleteProductQuery = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/product/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  })
  const response = await res.json() as DataResponse
  const { product } = response.data as { product: Product }
  return product
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