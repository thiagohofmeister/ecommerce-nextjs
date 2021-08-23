import { Search } from '@material-ui/icons'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useRef, useState } from 'react'
import styles from './TopSearchBar.module.scss'

const TopSearchBar: React.FC<ITopSearchBarProps> = ({ onClose }) => {
  const ref = useRef(null)

  const [search, setSearch] = useState<string>('')
  const { push } = useRouter()

  const handleKeyUpInput = (e: any) => {
    if (e.key === 'Enter') handleSearch()
  }

  const handleSearch = () => {
    if (!search.trim().length) return

    push(`/products?search=${search}`)
  }

  useEffect(() => {
    const onClick = (e: any) => {
      if (ref && !ref.current.contains(e.target)) {
        onClose()
      }
    }

    window.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <div className={styles.topSearchBar} ref={ref}>
      <div className={styles.topSearchBar__inputContainer}>
        <input
          type="text"
          placeholder="O que você procura?"
          onChange={e => setSearch(e.target.value)}
          onKeyUp={handleKeyUpInput}
        />

        <button className={styles.topSearchBar__button} onClick={handleSearch}>
          <span>BUSCAR</span>
          <Search />
        </button>
      </div>
    </div>
  )
}

interface ITopSearchBarProps {
  onClose: () => void
}

export default TopSearchBar
