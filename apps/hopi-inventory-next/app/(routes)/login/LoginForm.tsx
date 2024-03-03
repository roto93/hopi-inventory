'use client'

import useAuth from '@/_hooks/useAuth'
import { loginQuery } from '@/_lib/authQueries'
import { setUser } from '@/_lib/storageHelper'
import { Button, Form, Input, Skeleton } from 'antd'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler } from 'react-hook-form'
import useLoginForm, { loginInputs } from './useLoginForm'
import { errorToast } from '@/_components/PiToasts'

const LoginForm = () => {
  const { isCheckingUser, currentUser } = useAuth(false)
  const canInteract = !isCheckingUser && currentUser === null

  const {
    registers,
    formState,
    handleSubmit,
    reset,
    watch,
    control
  } = useLoginForm()

  const router = useRouter()

  const onSubmit: SubmitHandler<loginInputs> = async (_data) => {
    try {
      const data = await loginQuery(_data)
      if (data.status === 'Success') {
        setUser(data.userID)
        router.replace('/user')
        reset()
      }
    } catch (e: any) {
      errorToast(e.response.data.message)
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


      {!canInteract
        ? <Skeleton.Button active block />
        : <Button htmlType='submit' type='primary' block> Sign in </Button>
      }
    </Form>
  )
}

export default LoginForm