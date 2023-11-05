import React, { useState } from 'react'

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    // have to set up tsconfig for formData.entries to work
    // https://stackoverflow.com/questions/50677868/error-ts2339-property-entries-does-not-exist-on-type-formdata
    const obj = Object.fromEntries(formData.entries())

    try {
      // call log in API
      // if log in 
    } catch (e) {
      // if error
    }
  }


  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            <p>email</p>
            <input
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </label>
        </div>

        <br />

        <div>
          <label>
            <p>password</p>
            <input
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>
        </div>

        <br />

        <div>
          <label>
            <p>confirm password</p>
            <input
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>
        </div>

        <br />
        
        <button type='submit'>submit</button>
      </form>
    </div>
  );
}

export default SignupPage