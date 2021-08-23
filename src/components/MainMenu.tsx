import React from 'react'
import styles from './MainMenu.module.scss'
import Link from 'next/link'

const MainMenu: React.FC<any> = props => {
  return (
    <ul className={styles.mainMenu}>
      {props.menu.items.map((item: IMenuItem, key: number) => (
        <li key={key} className={styles.mainMenu__item}>
          <Link href={item.link.url}>
            <a target={`_${item.link.target.toLowerCase}`}>{item.label}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

interface IMenuTopProps {
  menu: {
    id: string
    name: string
    items: IMenuItem[]
  }
}

interface IMenuItem {
  label: string
  link: {
    target: string
    url: string
  }
  subItems: IMenuItem[]
}

export default MainMenu
