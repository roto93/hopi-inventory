'use client'

import { errorToast, successToast } from '@/_components/PiToasts'
import { checkAuthQuery, logoutQuery } from '@/_lib/authQueries'
import { logoutUser } from '@/_lib/storageHelper'
import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'

const useAuth = () => {
  const router = useRouter()
  const pathname = usePathname()

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

  const { data: user, isFetching } = useQuery({
    queryKey: ['whoami', pathname],
    queryFn: checkAuthQuery,
    retry: false
  })


  return {
    currentUser: user,
    isCheckingUser: isFetching,
    logout
  }
}

export default useAuth
