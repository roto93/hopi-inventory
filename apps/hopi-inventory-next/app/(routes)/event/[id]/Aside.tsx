import React from 'react'
import styles from '../event.module.scss'
import NavButton from './NavButton'
const Aside = () => {
  return (
    <aside className={styles.aside}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <NavButton title='Checkout' subRoute='' />
          <NavButton title='Products' subRoute='products' />
          <NavButton title='Costs' subRoute='costs' />
          <NavButton title='Categories' subRoute='categories' />
          <NavButton title='Txs' subRoute='txs' />
        </ul>
      </nav>
    </aside>
  )
}

export default Aside