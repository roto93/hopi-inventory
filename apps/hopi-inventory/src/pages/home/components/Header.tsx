import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <NavLink to={'/'}>Home</NavLink>
      <NavLink to={'/login'}>Login</NavLink>
      header
    </header>)
}

export default Header