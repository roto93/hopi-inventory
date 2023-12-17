'use client'
import { PiToast, errorToast, successToast } from '@/_components/PiToasts'
import useAuth from '@/_hooks/useAuth'
import { logoutQuery } from '@/_lib/queries'
import { logoutUser } from '@/_lib/storageHelper'
import { Button } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const UserPage = () => {
  const router = useRouter()

  const { currentUser } = useAuth(true)

  const logout = async () => {
    try {
      const json = await logoutQuery()
      if (json.status === 'Success') {
        successToast(json.message)
        logoutUser()
        router.replace('/')
      }
    } catch (e) {
      errorToast(e as string)
    }
  }

  return (
    <div>
      UserPage {currentUser}
      <Button onClick={logout}>
        log out
      </Button><br />
      <Link href={'/'}> home </Link><br />
      <Link href={'/login'}> login </Link><br />
      <Link href={'/register'}> register </Link>
      <PiToast />
    </div>
  )
}

export default UserPage