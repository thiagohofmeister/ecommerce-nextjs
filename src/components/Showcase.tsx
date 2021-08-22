import { useState } from 'react'
import styles from './Showcase.module.scss'
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons'

const Showcase: React.FC<IShowcaseProps> = ({ showcase, showTitle }) => {
  const [stock, setStock] = useState<IStock | null>(null)
  const [price, setPrice] = useState<IPrice | null>(null)
  const [scrollX, setScrollX] = useState<number>(0)

  const totalItems = 9 || showcase.items.length
  const itemWidth = 300
  const moveX = 4 * itemWidth
  const listW = totalItems * itemWidth

  const handleClickLeftArrow = () => {
    let x = scrollX + moveX
    if (x > 0) x = 0

    setScrollX(x)
  }

  const handleClickRightArrow = () => {
    const innerWidth = moveX
    let x = scrollX - innerWidth

    if (innerWidth - listW > x) x = innerWidth - listW

    setScrollX(x)
  }

  return (
    <div className={styles.showcase}>
      {!!showTitle && <div className={styles.showcase__title}>{showcase.name}</div>}

      <div className={styles.showcase__itemsContainer}>
        <div className={styles.showcase__left} onClick={handleClickLeftArrow}>
          <ArrowBackIos />
        </div>

        <div className={styles.showcase__items} style={{ marginLeft: scrollX, width: listW }}>
          {[...showcase.items, ...showcase.items, ...showcase.items].map(
            (item: any, key: number) => (
              <div key={key} className={styles.showcaseItem}>
                <div className={styles.showcaseItem__image}>
                  <img src={item.images[0].url} alt="" />
                </div>

                <div className={styles.showcaseItem__infos}>
                  <div className={styles.showcaseItem__title}>{item.title}</div>

                  {!!price && (
                    <div className={styles.showcaseItem__prices}>
                      <div className={styles.showcaseItem__previousPrice}>R$ {price.previous}</div>
                      <div className={styles.showcaseItem__currentPrice}>R$ {price.current}</div>
                      <div className={styles.showcaseItem__discount}>R$ {price.discount}</div>
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>

        <div className={styles.showcase__right} onClick={handleClickRightArrow}>
          <ArrowForwardIos />
        </div>
      </div>
    </div>
  )
}

interface IStock {}

interface IPrice {
  previous: string
  current: string
  discount: string
}

interface IShowcaseProps {
  showcase: any
  showTitle?: boolean
}

export default Showcase
