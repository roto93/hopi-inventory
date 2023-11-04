import { Outlet } from 'react-router-dom'
import Footer from '../home/components/footer/Footer'
import Header from '../home/components/header/Header'
import styles from './RootLayout.module.scss'

const RootLayout = () => {
  return (
    <div className={styles.root}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout