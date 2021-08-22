import Link from 'next/link'
import React from 'react'
import styles from './MenuTop.module.scss'

const MenuTop: React.FC<any> = props => {
  return (
    <ul className={styles.menuTop}>
      <li className={styles.menuTop__item}>
        <Link href="#">
          <a>Quem somos</a>
        </Link>
      </li>

      <li className={styles.menuTop__item}>
        <Link href="#">
          <a>Ajuda & Suporte</a>
        </Link>
      </li>

      <li className={styles.menuTop__item}>
        <Link href="#">
          <a>Contato</a>
        </Link>
      </li>
    </ul>
  )
}

export default MenuTop
