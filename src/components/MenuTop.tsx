import Link from 'next/link'
import React from 'react'
import styles from './MenuTop.module.scss'

const MenuTop: React.FC<any> = props => {
  return (
    <ul className={styles.menuTop}>
      {props.menu.items.map((item: IMenuItem, key: number) => (
        <li key={key} className={styles.menuTop__item}>
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

export default MenuTop
