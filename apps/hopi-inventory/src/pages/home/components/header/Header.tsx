import { NavLink } from 'react-router-dom'
import styles from './header.module.scss'

const Header = () => {
  return (
    <header className={styles.container}>
      <nav className={styles.nav}>
        <NavLink to={'/'}>Home</NavLink>
        <NavLink to={'/login'}>Login</NavLink>
      </nav>
    </header>)
}

export default Header