'use client'

import { currentUserAtom } from '@/_atoms/user.atom'
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
            alert('Your session is expired. Please log in again.')
            router.replace('/')
          }
          setCurrentUser(null)
          return setIsLoading(false)
        }

        setIsLoading(true)
        const res = await checkAuthQuery()
        const cacheValid = res.status !== 'Failed'

        if (!isInUserPage) {
          if (cacheValid) {
            router.replace('/user')
          }
          return setIsLoading(false)
        }

        if (!cacheValid) {
          alert('Your session is expired. Please log in again.')
          logoutUser()
          router.replace('/')
          setCurrentUser(null)
          return setIsLoading(false)
        }

        setCurrentUser(cachedUserID)
      } catch (e) {
        alert(e)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  return {
    currentUser,
    isCheckingUser: isLoading
  }
}

export default useAuth
