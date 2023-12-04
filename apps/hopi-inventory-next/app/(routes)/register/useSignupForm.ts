import { useForm } from 'react-hook-form'

export interface signupInputs {
  email: string
  password: string
  confirmPassword: string
}


const useSignupForm = () => {
  const {
    register,
    watch,
    ...rest
  } = useForm<signupInputs>()

  const emailRegister = register('email', {
    required: 'Email is required.'
  })

  const passwordRegister = register('password', {
    required: 'Password is required.'
  })

  const confirmPasswordRegister = register('confirmPassword', {
    required: 'Confirm password is required.',
    validate: (value => {
      if (value !== watch('password')) return "Passwords do not match."
    })
  })

  return {
    registers: {
      email: emailRegister,
      password: passwordRegister,
      confirmPassword: confirmPasswordRegister
    },
    watch,
    ...rest
  }
}

export default useSignupForm