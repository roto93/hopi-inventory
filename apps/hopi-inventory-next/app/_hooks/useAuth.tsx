

import { currentUserAtom } from '@/_atoms/user.atom'
import { checkAuthQuery } from '@/_lib/queries'
import { getUser, logoutUser } from '@/_lib/storageHelper'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const useAuth = (isInUserPage: boolean = true) => {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom)
  const router = useRouter()

  useEffect(() => {
    const cachedUserID = getUser()
    
    const checkAuth = async () => {
      try {
        if (cachedUserID) {
          const res = await checkAuthQuery()

          if (res.status === 'Failed') {
            var cacheValid = false
          } else {
            var cacheValid = true
          }

          if (isInUserPage) {
            if (cacheValid) {
              setCurrentUser(cachedUserID)
            }
            else {
              alert('Your session is expired. Please log in again.')
              logoutUser()
              router.replace('/')
            }
          }
          else {
            if (cacheValid) {
              router.replace('/user')
            }
          }
        } else{
          if (isInUserPage) {
            alert('Your session is expired. Please log in again.')
            router.replace('/')
          } else {

          }
        }
      } catch (e) {
        alert(e)
      }
    }

    checkAuth()
  }, [isInUserPage])

  return {
    currentUser
  }
}

export default useAuth
