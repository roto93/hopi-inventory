import styles from './app.module.scss';

export function App() {

  const onSubmit = async () => {
    const res = await fetch('http://localhost:3333/api')
    const json = await res.json()
    console.log(json)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="">
          email
          <input type="email" />
        </label>
        <label htmlFor="">
          password
          <input type="password" />
        </label>
        <button type='button' onClick={onSubmit}>submit</button>
      </form>
    </div>
  );
}

export default App;
