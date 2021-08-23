import { useState, useEffect } from 'react'
import styles from './Showcase.module.scss'
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons'

const Showcase: React.FC<IShowcaseProps> = ({ showcase, showTitle }) => {
  const [stock, setStock] = useState<IStock>({})
  const [price, setPrice] = useState<IPrice>({})
  const [scrollX, setScrollX] = useState<number>(0)

  const totalItems = showcase.items.length
  const itemWidth = 300
  const totalItemsShow = 4
  const moveX = totalItemsShow * itemWidth
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

  const formatCurrency = (value: number) => {
    return Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      useGrouping: false
    }).format(value)
  }

  const fetchData = async (endpoint: string, body: any) => {
    return await (
      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'x-account': '4d243c04-8cdc-4fd0-abe0-0fbc22a95298',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
    ).json()
  }

  useEffect(() => {
    const fetchAll = async () => {
      const products = showcase.items.map((item: any) => ({
        identifier: item.sku,
        skus: [item.sku]
      }))

      const [resultStocks, resultPrices] = await Promise.all([
        fetchData('https://api.1eg.dev/oms-inventory/stock/available', products),
        fetchData('https://api.1eg.dev/oms-pricing/price/compare', products)
      ])

      const stock = resultStocks.reduce(
        (acc: any, curr: any) => ({
          ...acc,
          [curr.identifier]: {
            available: curr.available
          }
        }),
        {}
      )

      setStock(stock)

      const price = resultPrices.reduce((acc: any, curr: any) => {
        const { price, paymentOptions } = curr.prices.lowest

        return {
          ...acc,
          [curr.identifier]: {
            previous: price.sale ? price.list : 0,
            current: price.sale ? price.sale : price.list,
            discount: price.sale ? price.list - price.sale : 0
          }
        }
      }, {})

      setPrice(price)
    }

    fetchAll()
  }, [])

  return (
    <div className={styles.showcase}>
      {!!showTitle && <div className={styles.showcase__title}>{showcase.name}</div>}

      <div className={styles.showcase__itemsContainer}>
        {totalItems > totalItemsShow && (
          <div className={styles.showcase__left} onClick={handleClickLeftArrow}>
            <ArrowBackIos />
          </div>
        )}

        <div className={styles.showcase__items} style={{ marginLeft: scrollX, width: listW }}>
          {showcase.items.map((item: any, key: number) => (
            <div key={key} className={styles.showcaseItem}>
              <div className={styles.showcaseItem__image}>
                <img src={item.images[0].url} alt="" />
              </div>

              <div className={styles.showcaseItem__infos}>
                <div className={styles.showcaseItem__title}>{item.title}</div>

                {stock[item.sku] && !stock[item.sku].available && (
                  <div className={styles.showcaseItem__withoutStock}>Produto esgotado!</div>
                )}

                {!!price[item.sku] && stock[item.sku] && stock[item.sku].available && (
                  <div className={styles.showcaseItem__prices}>
                    {!!price[item.sku].previous && (
                      <div className={styles.showcaseItem__previousPrice}>
                        {formatCurrency(price[item.sku].previous)}
                      </div>
                    )}

                    <div className={styles.showcaseItem__currentPrice}>
                      {formatCurrency(price[item.sku].current)}
                    </div>

                    {!!price[item.sku].discount && (
                      <div className={styles.showcaseItem__discount}>
                        Economize {formatCurrency(price[item.sku].discount)}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {totalItems > totalItemsShow && (
          <div className={styles.showcase__right} onClick={handleClickRightArrow}>
            <ArrowForwardIos />
          </div>
        )}
      </div>
    </div>
  )
}

interface IStock {
  [key: string]: {
    available: boolean
  }
}

interface IPrice {
  [key: string]: {
    previous: number
    current: number
    discount: number
  }
}

interface IShowcaseProps {
  showcase: any
  showTitle?: boolean
}

export default Showcase
