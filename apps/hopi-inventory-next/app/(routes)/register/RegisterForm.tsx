'use client'

import React from 'react'
import useSignupForm, { signupInputs } from './useSignupForm'
import { Controller, SubmitHandler } from 'react-hook-form'
import { Button, Form, Input } from 'antd'
import { setUser } from '@/_lib/storageHelper'
import { useRouter } from 'next/navigation'

const RegisterForm = () => {
  const {
    registers,
    formState,
    handleSubmit,
    reset,
    watch,
    control
  } = useSignupForm()
  const router = useRouter()

  const onSubmit: SubmitHandler<signupInputs> = async (data) => {
    try {
      const res = await fetch('http://localhost:3333/auth/register', {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      const json = await res.json()
      console.log(json)
      if (json.status === 'Success') {
        router.replace('/login')
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

      <Form.Item
        label={'Confirm Password'}
        hasFeedback={false}
        help={formState.errors.confirmPassword?.message}
      >
        <Controller
          name={'confirmPassword'}
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

export default RegisterForm