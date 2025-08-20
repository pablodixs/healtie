import { css } from '../../styled-system/css'
import { SearchHero } from './components/SearchHero'

export default function Home() {
    return (
        <div>
            <header className={headerContainer}>
                <button>Entrar</button>
                <button>Criar conta</button>
            </header>
            <SearchHero />
        </div>
    )
}

const headerContainer = css({
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '2rem',
})
