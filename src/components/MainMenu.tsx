import React from 'react'
import styles from './MainMenu.module.scss'
import Link from 'next/link'

const MainMenu: React.FC<any> = props => {
  return (
    <ul className={styles.mainMenu}>
      <li className={styles.mainMenu__item}>
        <Link href="/">
          <a>Novidades</a>
        </Link>
      </li>
      <li className={styles.mainMenu__item}>
        <Link href="/">
          <a>Roupas</a>
        </Link>
      </li>
      <li className={styles.mainMenu__item}>
        <Link href="/">
          <a>Sapatos</a>
        </Link>
      </li>
      <li className={styles.mainMenu__item}>
        <Link href="/">
          <a>Beleza & Saúde</a>
        </Link>
      </li>
      <li className={styles.mainMenu__item}>
        <Link href="/">
          <a>Lingerie</a>
        </Link>
      </li>
      <li className={styles.mainMenu__item}>
        <Link href="/">
          <a>Fitness</a>
        </Link>
      </li>
      <li className={styles.mainMenu__item}>
        <Link href="/">
          <a>Verão & Praia</a>
        </Link>
      </li>
      <li className={styles.mainMenu__item}>
        <Link href="/">
          <a>Acessórios</a>
        </Link>
      </li>
      <li className={styles.mainMenu__item}>
        <Link href="/">
          <a>% Promoções</a>
        </Link>
      </li>
    </ul>
  )
}

export default MainMenu
