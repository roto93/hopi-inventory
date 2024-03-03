'use client'
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import { FC, ReactNode } from 'react'

interface Prop {
  children: ReactNode
}

const client = new QueryClient()

const QueryProvider: FC<Prop> = ({ children }) => {
  return <>
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  </>
}

export default QueryProvider