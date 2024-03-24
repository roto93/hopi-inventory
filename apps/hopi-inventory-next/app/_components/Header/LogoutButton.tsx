'use client'
import useAuth from '@/_hooks/useAuth'

const LogoutButton = () => {
  const { currentUser, logout } = useAuth()

  if (!currentUser) return null
  return (
    <button onClick={logout}>
      log out {currentUser.username}
    </button>
  )
}

export default LogoutButton