import { eventsQuery } from '@/_lib/eventQueries'
import styles from './Header.module.scss'
import LogoutButton from './LogoutButton'
import { Suspense } from 'react'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'


const Header = async () => {
  return (
    <header className={styles.container}>
      Header
      <LogoutButton />
    </header>
  )
}

export default Header