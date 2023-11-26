import Link from 'next/link';
import styles from './page.module.scss';
import { Button, Flex } from 'antd'

export default async function Page() {

  return (
    <div className={styles.page}>
      <h1>Welcome to Hopi Inventory</h1>
      <Flex gap={20}>
        <Link href='/login' >
          <Button>
            Log in
          </Button>
        </Link>
        <Link href='/register' >
          <Button>
            Sign up
          </Button>
        </Link>
      </Flex>
    </div>
  );
}
