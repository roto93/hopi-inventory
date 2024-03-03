'use client'

import React from 'react'
import useSignupForm, { signupInputs } from './useSignupForm'
import { Controller, SubmitHandler } from 'react-hook-form'
import { Button, Form, Input, Skeleton } from 'antd'
import { setUser } from '@/_lib/storageHelper'
import { useRouter } from 'next/navigation'
import { registerQuery } from '@/_lib/authQueries'
import useAuth from '@/_hooks/useAuth'
import { errorToast } from '@/_components/PiToasts'

const RegisterForm = () => {
  const { isCheckingUser, currentUser } = useAuth(false)
  const canInteract = !isCheckingUser && currentUser === null

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
      const json = await registerQuery(data)
      if (json.status === 'Success') {
        router.replace('/login')
        reset()
      }
    } catch (e: any) {
      errorToast(e.message)
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
        {!canInteract
          ? <Skeleton.Input block active />
          : <Controller
            // React Hook Form integrate with UI library
            // https://react-hook-form.com/get-started#IntegratingwithUIlibraries
            name={'email'}
            control={control}
            render={({ field }) => (
              <Input {...field} />
            )}
          />
        }

      </Form.Item>

      <Form.Item
        label={'User Password'}
        hasFeedback={false}
        help={formState.errors.password?.message}
      >
        {!canInteract
          ? <Skeleton.Input block active />
          : <Controller
            name={'password'}
            control={control}
            render={({ field }) => (
              <Input {...field} />
            )}
          />
        }
      </Form.Item>

      <Form.Item
        label={'Confirm Password'}
        hasFeedback={false}
        help={formState.errors.confirmPassword?.message}
      >
        {!canInteract
          ? <Skeleton.Input block active />
          : <Controller
            name={'confirmPassword'}
            control={control}
            render={({ field }) => (
              <Input {...field} />
            )}
          />
        }
      </Form.Item>

      {!canInteract
        ? <Skeleton.Button active block />
        : <Button htmlType='submit' type='primary' block> Sign up </Button>
      }
    </Form>
  )
}

export default RegisterForm