'use client'

import { currentUserAtom } from '@/_atoms/user.atom'
import { errorToast, successToast } from '@/_components/PiToasts'
import { checkAuthQuery, logoutQuery } from '@/_lib/authQueries'
import { getUser, logoutUser } from '@/_lib/storageHelper'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const useAuth = (isInUserPage: boolean = true) => {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom)
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter()

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
        console.log(res)
        if (!isInUserPage && cacheValid) {
          router.replace('/user')
        }
        setCurrentUser(cachedUserID)

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
    isCheckingUser: isLoading,
    logout
  }
}

export default useAuth
