import { useState } from 'react';
import styles from './styles/app.module.scss';

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    // have to set up tsconfig for formData.entries to work
    // https://stackoverflow.com/questions/50677868/error-ts2339-property-entries-does-not-exist-on-type-formdata
    const obj = Object.fromEntries(formData.entries())

  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            email
            <input type="email" name='email' />
          </label>
        </div>

        <div>
          <label>
            password
            <input type="password" name='password' />
          </label>

          <button type='submit'>submit</button>

        </div>
      </form>
    </div>
  );
}

export default LoginPage;
