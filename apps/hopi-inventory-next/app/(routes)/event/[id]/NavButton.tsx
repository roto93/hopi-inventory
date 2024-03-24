'use client'
import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import React, { FC } from 'react'
import styles from '../event.module.scss'

interface Prop {
  title: string
  subRoute: string
}

const NavButton: FC<Prop> = ({ title, subRoute }) => {
  const params = useParams()
  return (
    <li>
      <Link href={`/event/${params.id}/${subRoute}`} className={styles.navLink}>
        {title}
      </Link>
    </li>
  )
}

export default NavButton