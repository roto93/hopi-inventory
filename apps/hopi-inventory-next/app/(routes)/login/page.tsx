import React from 'react'
import styles from './login.module.scss'
import LoginForm from './LoginForm'

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <div className={styles.formContainer}>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage