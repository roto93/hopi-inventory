import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

type User = {
  username: string
  email: string
}

interface Prop {
  user?: User
}

const PrivateRoute: FC<Prop> = ({ user }) => {
  if (!user) return <Navigate to={'/login'} />
  return <Outlet />
}

export default PrivateRoute