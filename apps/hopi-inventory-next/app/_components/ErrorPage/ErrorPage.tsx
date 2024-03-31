import { Button } from 'antd'
import styles from './ErrorPage.module.scss'

const ErrorPage = ({ error, reset }: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  return (
    <div className={styles.container}>
      <h2>{error.message}</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
}

export default ErrorPage