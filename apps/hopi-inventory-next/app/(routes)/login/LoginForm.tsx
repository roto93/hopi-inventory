'use client'

import useAuth from '@/_hooks/useAuth'
import { loginQuery } from '@/_lib/queries'
import { setUser } from '@/_lib/storageHelper'
import { Button, Form, Input } from 'antd'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler } from 'react-hook-form'
import useLoginForm, { loginInputs } from './useLoginForm'

const LoginForm = () => {
  useAuth(false)

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
      console.log(e.response.data.message)
      alert(e.response.data.message)
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