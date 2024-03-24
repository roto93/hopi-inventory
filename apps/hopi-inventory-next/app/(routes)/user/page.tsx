import { eventsQuery } from '@/_lib/eventQueries'
import styles from './user.module.scss'
import EventButton from './EventButton'
import { headers } from 'next/headers'


const UserPage = async () => {
  const events = await eventsQuery(headers())
  return (
    <div className={styles.container}>
      {events?.map(event => (
        <EventButton
          event={event}
        />
      ))}
    </div>
  )
}

export default UserPage