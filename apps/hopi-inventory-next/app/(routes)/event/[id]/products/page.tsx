import { productsQuery } from '@/_lib/productQueries'
import { NextPage } from 'next'
import { headers } from 'next/headers'
import Products from './Products'

interface Prop {
  params: { id: string }
}

const page: NextPage<Prop> = async ({ params }) => {
  const eventID = params.id
  const products = await productsQuery(headers(), eventID)
  return (
    <Products products={products} />
  )
}

export default page