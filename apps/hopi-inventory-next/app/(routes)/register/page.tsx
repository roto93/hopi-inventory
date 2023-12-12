import RegisterForm from './RegisterForm'
import styles from './register.module.scss'

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage