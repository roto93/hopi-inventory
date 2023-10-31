import { NavLink, Outlet } from 'react-router-dom'
import Header from '../home/components/Header'
import Footer from '../home/components/footer/Footer'

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default RootLayout