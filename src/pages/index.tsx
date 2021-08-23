import type { GetStaticProps, NextPage } from 'next'
import { getHomePageData } from '../api/pageData'
import BannerSlider from '../components/BannerSlider'
import MainLayout from '../components/MainLayout'
import Showcase from '../components/Showcase'
import styles from '../styles/Home.module.scss'

export const getStaticProps: GetStaticProps = async context => {
  return {
    props: await getHomePageData(
      'f070f6ad-8ee8-4693-a4bd-3398383f6325',
      '4d243c04-8cdc-4fd0-abe0-0fbc22a95298'
    ),
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
