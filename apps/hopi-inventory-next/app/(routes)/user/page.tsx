'use client'
import { currentUserAtom } from '@/_atoms/user.atom'
import { getUser, logoutUser } from '@/_lib/storageHelper'
import { Button } from 'antd'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const UserPage = () => {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom)

  useEffect(() => {
    const cachedUserID = getUser()
    let isLoggedIn = true
    const checkAuth = async () => {
      const res = await fetch('http://localhost:3333/auth/testPrivate', {
        method: 'GET', headers: {
          "Content-Type": "application/json",
        }, credentials: 'include'
      })
      const json = await res.json()
      console.log(json)
      if (json.status === 'Failed') isLoggedIn = false
      console.log(cachedUserID, isLoggedIn)
      if (cachedUserID && isLoggedIn) {
        setCurrentUser(cachedUserID)
      } else {
        alert('Your session is expired. Please log in again.')
        logoutUser()
        router.replace('/')
      }
    }
    checkAuth()
  }, [])

  const logout = async () => {
    try {
      const res = await fetch('http://localhost:3333/auth/logout', { method: 'POST' })
      const json = await res.json()
      console.log(json)
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
      UserPage
      <Button onClick={logout}>
        log out
      </Button>
    </div>
  )
}

export default UserPage