'use client'
import React, { FC } from 'react'
import styles from './user.module.scss'
import { useRouter } from 'next/navigation'
import { Event } from '@/_lib/eventQueries'

interface Prop {
  event: Event
}

const EventButton: FC<Prop> = ({ event }) => {
  const router = useRouter()

  const onClick = () => {
    router.push(`/event/${event._id}`)
  }


  return (
    <div className={styles.eventButton} onClick={onClick}>
      <h2 className={styles.eventName}>{event.name}</h2>
      <p className={styles.eventDates}>{event.startDate} ~ {event.endDate}</p>
    </div>
  )
}

export default EventButton