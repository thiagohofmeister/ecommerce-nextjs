import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons'
import { useState } from 'react'
import styles from './BannerSlider.module.scss'

const BannerSlider: React.FC<IBannerSliderProps> = ({ banner }) => {
  const [currentBanner, setCurrentBanner] = useState(0)

  const totalItems = banner.items.length

  const handleClickLeftArrow = () => {
    let nextBanner = currentBanner

    if (nextBanner <= 0) nextBanner = totalItems

    setCurrentBanner(nextBanner - 1)
  }

  const handleClickRightArrow = () => {
    let nextBanner = currentBanner

    if (nextBanner >= totalItems - 1) nextBanner = -1

    setCurrentBanner(nextBanner + 1)
  }

  return (
    <div className={styles.bannerSlider}>
      <div className={styles.bannerSlider__left} onClick={handleClickLeftArrow}>
        <ArrowBackIos />
      </div>

      <div className={styles.bannerSlider__items}>
        {banner.items.map((item, key) => (
          <div
            key={key}
            className={`${styles.bannerSlider__item} ${
              currentBanner === key ? styles['bannerSlider__item--active'] : ''
            }`}>
            <img src={item.resource} alt="" />
          </div>
        ))}
      </div>

      <div className={styles.bannerSlider__right} onClick={handleClickRightArrow}>
        <ArrowForwardIos />
      </div>

      <div className={styles.bannerSlider__bullets}>
        {banner.items.map((item, key) => (
          <div
            key={key}
            className={`${styles.bannerSlider__bullet} ${
              currentBanner === key ? styles['bannerSlider__bullet--active'] : ''
            }`}
            onClick={() => setCurrentBanner(key)}></div>
        ))}
      </div>
    </div>
  )
}

interface IBannerSliderProps {
  banner: {
    id: string
    name: string
    items: {
      id: string
      resource: string
      link?: {
        target: string
        url: string
      }
    }[]
  }
}

export default BannerSlider
