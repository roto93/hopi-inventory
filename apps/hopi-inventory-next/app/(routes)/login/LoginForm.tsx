'use client'

import React from 'react'
import useLoginForm, { loginInputs } from './useLoginForm'
import { Controller, SubmitHandler } from 'react-hook-form'
import { Button, Form, Input } from 'antd'
import { useRouter } from 'next/navigation'
import { setUser } from '@/_lib/storageHelper'

const LoginForm = () => {
  const {
    registers,
    formState,
    handleSubmit,
    reset,
    watch,
    control
  } = useLoginForm()
  const router = useRouter()

  const onSubmit: SubmitHandler<loginInputs> = async (data) => {
    try {
      const res = await fetch('http://localhost:3333/auth/login', {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(data)
      })
      const json = await res.json()
      if (json.status === 'Success') {
        setUser(json.userID)
        router.replace('/user')
        alert(json.message)
        reset()
      }
    } catch (e: any) {
      alert(e.message)
    }
  }

  return (
    <Form
      layout='vertical'
      onFinish={handleSubmit(onSubmit)}
    >
      <Form.Item
        label={'User Email'}
        hasFeedback={false}
        help={formState.errors.email?.message}
      >
        <Controller
          // React Hook Form integrate with UI library
          // https://react-hook-form.com/get-started#IntegratingwithUIlibraries
          name={'email'}
          control={control}
          render={({ field }) => (
            <Input {...field} />
          )}
        />

      </Form.Item>

      <Form.Item
        label={'User Password'}
        hasFeedback={false}
        help={formState.errors.password?.message}
      >
        <Controller
          name={'password'}
          control={control}
          render={({ field }) => (
            <Input {...field} />
          )}
        />
      </Form.Item>


      <Button htmlType='submit'> send </Button>
    </Form>
  )
}

export default LoginForm