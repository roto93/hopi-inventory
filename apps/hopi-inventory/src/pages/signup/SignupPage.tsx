import { SubmitHandler, useForm } from 'react-hook-form'
import styles from './SignupPage.module.scss'
import useSignupForm from './useSignupForm'

interface Inputs {
  email: string
  password: string
  confirmPassword: string
}

const SignupPage = () => {
  const {
    registers,
    handleSubmit,
    reset,
    formState: { errors }
  } = useSignupForm()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await fetch('http://localhost:3333/signup', { method: "post" })
      const json = await res.json()
      reset()
    } catch (e: any) {
      alert(e.message)
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign up</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label>
          <p>email</p>
          <input {...registers.email} />
        </label>

        <label>
          <p>password</p>
          <input {...registers.password} />
        </label>

        <label>
          <p>confirm password</p>
          <input {...registers.confirmPassword} />
          {errors.confirmPassword && errors.confirmPassword.message}
        </label>

        <button type='submit'>submit</button>
      </form>
    </div>
  );
}

export default SignupPage