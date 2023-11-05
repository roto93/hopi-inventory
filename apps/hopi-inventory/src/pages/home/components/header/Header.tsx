import { NavLink, useLocation } from 'react-router-dom'
import styles from './header.module.scss'

const Header = () => {
  const { pathname } = useLocation()

  return (
    <header className={styles.container}>
      <nav className={styles.nav}>
        {
          pathname === '/login' || pathname === '/signup'
            ? <>
              <NavLink to={'/login'}>Log in</NavLink>
              <NavLink to={'/signup'}>Sign up</NavLink>
            </>
            : <>
              <NavLink to={'/'}>Home</NavLink>
              <NavLink to={'/user'}>User</NavLink>
            </>
        }
      </nav>
    </header>)
}

export default Header