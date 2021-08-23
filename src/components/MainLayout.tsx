import { AccountCircleOutlined, Phone, Search, ShoppingCartOutlined } from '@material-ui/icons'
import Head from 'next/head'
import Link from 'next/link'
import React, { ReactNode, useState } from 'react'
import styles from './MainLayout.module.scss'
import MainMenu from './MainMenu'
import MenuTop from './MenuTop'
import TopSearchBar from './TopSearchBar'

const MainLayout: React.FC<IMainLayoutProps> = props => {
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false)

  const mainMenu = props.menus.find((menu: any) => menu.id === props.theme.configs.main_menu)
  const topMenu = props.menus.find((menu: any) => menu.id === props.theme.configs.topbar_menu)

  return (
    <>
      <Head>
        <title>{props.seo.title}</title>
        <meta name="description" content={props.seo.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.header__top}>
          {props.site.configs.store.phone && (
            <div className={styles.header__phone}>
              <Phone fontSize="small" /> {props.site.configs.store.phone}
            </div>
          )}

          <nav>
            <MenuTop menu={topMenu} />
          </nav>
        </div>

        <div className={styles.header__bottom}>
          <div className={styles.header__logo}>
            {props.site.configs.store.topLogo ? (
              <img src={props.site.configs.store.topLogo} alt="" />
            ) : (
              <span>{props.site.configs.store.name}</span>
            )}
          </div>

          {showSearchBar ? (
            <TopSearchBar onClose={() => setShowSearchBar(false)} />
          ) : (
            <nav>
              <MainMenu menu={mainMenu} />
            </nav>
          )}

          <div className={styles.header__actions}>
            {!showSearchBar && (
              <div className={styles.header__searchBtn}>
                <Search onClick={() => setShowSearchBar(!showSearchBar)} />
              </div>
            )}

            <div className={styles.header__userArea}>
              <Link href="#">
                <AccountCircleOutlined />
              </Link>
            </div>

            <div className={styles.header__cartTop}>
              <Link href="#">
                <ShoppingCartOutlined />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>{props.children}</main>
    </>
  )
}

export default MainLayout

interface IMainLayoutProps {
  seo: {
    title: string
    description: string
  }
  site: {
    configs: any
  }
  theme: {
    configs: any
  }
  menus: any
  children?: ReactNode | undefined
}
