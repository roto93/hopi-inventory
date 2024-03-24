import { NextPage } from 'next'
import React, { ReactNode } from 'react'
import styles from '../event.module.scss'
import { headers } from 'next/headers'
import { eventQuery } from '@/_lib/eventQueries'
import Aside from './Aside'

interface Prop {
  children: ReactNode
  params: { id: string }
}

const layout: NextPage<Prop> = async ({ children, params }) => {
  const header = headers()
  const event = await eventQuery(header, params.id)

  return (
    <div className={styles.eventLayout}>
      {/* aside */}
      <Aside />
      {/* content */}
      {children}
    </div>
  )
}

export default layout