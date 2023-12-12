import { useForm } from 'react-hook-form'

export interface loginInputs {
  email: string
  password: string
}


const useLoginForm = () => {
  const {
    register,
    watch,
    ...rest
  } = useForm<loginInputs>()

  const emailRegister = register('email', {
    required: 'Email is required.'
  })

  const passwordRegister = register('password', {
    required: 'Password is required.'
  })

  return {
    registers: {
      email: emailRegister,
      password: passwordRegister
    },
    watch,
    ...rest
  }
}

export default useLoginForm