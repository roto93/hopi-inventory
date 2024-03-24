import { FC } from 'react'
import styles from '../event.module.scss'

interface Prop {
  params: { id: string }
}

const EventPage: FC<Prop> = async ({ params }) => {

  return (
    <div className={styles.contentContainer}>
      結帳頁面
    </div>
  )
}

export default EventPage