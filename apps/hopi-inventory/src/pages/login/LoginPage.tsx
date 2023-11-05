import { SubmitHandler } from 'react-hook-form';
import styles from './LoginPage.module.scss';
import useLoginForm, { loginInputs } from './useLoginForm';

const LoginPage = () => {
  const {
    registers,
    handleSubmit,
    reset,
    formState: { errors }
  } = useLoginForm()

  const onSubmit: SubmitHandler<loginInputs> = (data) => {
    alert(JSON.stringify(data))
    reset()
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Log in</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label>
          <p>email</p>
          <input {...registers.email} />
        </label>

        <label>
          <p>password</p>
          <input {...registers.password} />
        </label>

        <button type='submit'>submit</button>
      </form>
    </div>
  );
}

export default LoginPage;
