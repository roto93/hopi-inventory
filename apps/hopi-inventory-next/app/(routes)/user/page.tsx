'use client'
import useAuth from '@/_hooks/useAuth'
import { logoutQuery } from '@/_lib/queries'
import { logoutUser } from '@/_lib/storageHelper'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'

const UserPage = () => {
  const router = useRouter()

  const { currentUser } = useAuth(true)

  const logout = async () => {
    try {
      const json = await logoutQuery()
      if (json.status === 'Success') {
        alert(json.message)
        logoutUser()
        router.replace('/')
      }
    } catch (e) {
      alert(e)
    }
  }

  return (
    <div>
      UserPage {currentUser}
      <Button onClick={logout}>
        log out
      </Button>
    </div>
  )
}

export default UserPage