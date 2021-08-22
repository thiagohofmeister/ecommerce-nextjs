import type { GetStaticProps, NextPage } from 'next'
import styles from '../styles/Home.module.scss'
import MainLayout from '../components/MainLayout'
import BannerSlider from '../components/BannerSlider'
import Showcase from '../components/Showcase'

export const getStaticProps: GetStaticProps = async context => {
  const optionsRequest = {
    headers: {
      'x-account': '4d243c04-8cdc-4fd0-abe0-0fbc22a95298'
    }
  }

  const seo = {
    title: 'Home',
    description: 'Home'
  }

  const site = {
    configs: await (
      await fetch(
        'https://api.1eg.dev/eco-store/site/f070f6ad-8ee8-4693-a4bd-3398383f6325/configs',
        optionsRequest
      )
    ).json()
  }

  const theme = {
    configs: await (
      await fetch(
        'https://api.1eg.dev/eco-store/site/f070f6ad-8ee8-4693-a4bd-3398383f6325/DESKTOP/configs',
        optionsRequest
      )
    ).json()
  }

  const bannerIds: string[] = [
    theme.configs.main_banner_home,
    theme.configs.first_banner_home,
    theme.configs.second_banner_home
  ].filter((v, i, self) => !!v && self.indexOf(v) === i)

  const banners: any = []

  await Promise.all(
    bannerIds.map(async bannerId => {
      const banner = {
        ...(await (
          await fetch(`https://api.1eg.dev/eco-content/banner/${bannerId}`, optionsRequest)
        ).json()),
        items: await (
          await fetch(`https://api.1eg.dev/eco-content/banner/${bannerId}/items`, optionsRequest)
        ).json()
      }

      if (!!banner.code) return

      banners.push(banner)
    })
  )

  const showcaseIds: string[] = [
    theme.configs.first_showcase_home,
    theme.configs.second_showcase_home,
    theme.configs.third_showcase_home
  ].filter((v, i, self) => !!v && self.indexOf(v) === i)

  const showcases: any = []

  await Promise.all(
    showcaseIds.map(async showcaseId => {
      const showcase = await (
        await fetch(`https://api.1eg.dev/eco-content/showcase/${showcaseId}/render`, optionsRequest)
      ).json()

      if (!!showcase.code) return

      showcases.push(showcase)
    })
  )

  const menuIds: string[] = [
    theme.configs.full_menu,
    theme.configs.main_menu,
    theme.configs.topbar_menu,
    theme.configs.main_menu_levels
  ].filter((v, i, self) => !!v && self.indexOf(v) === i)

  const menus: any = []

  await Promise.all(
    menuIds.map(async menuId => {
      const menu = {
        ...(await (
          await fetch(`https://api.1eg.dev/eco-content/menu/${menuId}`, optionsRequest)
        ).json()),
        items: await (
          await fetch(`https://api.1eg.dev/eco-content/menu/${menuId}/items/render`, optionsRequest)
        ).json()
      }

      if (!!menu.code) return

      menus.push(menu)
    })
  )

  return {
    props: {
      seo,
      site,
      theme,
      banners,
      showcases,
      menus
    },
    revalidate: 300
  }
}

const Home: NextPage = (props: any) => {
  const mainBanner = props.banners.find(
    (banner: any) => banner.id === props.theme.configs.main_banner_home
  )

  return (
    <MainLayout {...props}>
      <BannerSlider banner={mainBanner} />

      <div className={styles.containerCenter}>
        <Showcase showcase={props.showcases[0]} />
      </div>
    </MainLayout>
  )
}

export default Home
