'use client'

import { currentUserAtom } from '@/_atoms/user.atom'
import { errorToast, successToast } from '@/_components/PiToasts'
import { checkAuthQuery } from '@/_lib/queries'
import { getUser, logoutUser } from '@/_lib/storageHelper'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const useAuth = (isInUserPage: boolean = true) => {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom)
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter()

  useEffect(() => {
    const cachedUserID = getUser()

    const checkAuth = async () => {
      try {
        if (!cachedUserID) {
          if (isInUserPage) {
            router.replace('/')
          }
          setCurrentUser(null)
          return setIsLoading(false)
        }

        setIsLoading(true)

        const res = await checkAuthQuery()
        const cacheValid = res.status !== 'Failed'

        if (!isInUserPage && cacheValid) {
          router.replace('/user')
          setCurrentUser(cachedUserID)
        }

      } catch (e: any) {
        console.log(e.message)
        setCurrentUser(null)
        if (isInUserPage) {
          errorToast('Your session is expired. Please log in again.')
          logoutUser()
          router.replace('/')
        }
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  return {
    currentUser: currentUser,
    isCheckingUser: isLoading
  }
}

export default useAuth
