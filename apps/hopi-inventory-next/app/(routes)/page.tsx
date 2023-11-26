import Link from 'next/link';
import styles from './page.module.scss';

export default async function Page() {

  return (
    <div className={styles.page}>
      next
      <Link href='/login' >
        Log in
      </Link>
      <Link href='/register' >
        Sign up
      </Link>
    </div>
  );
}
