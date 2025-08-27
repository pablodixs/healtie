import { CaretDownIcon } from '@phosphor-icons/react/dist/ssr'
import { css } from '../../styled-system/css'

import { SearchHero } from './components/SearchHero'
import { Stack } from '@/components/Stacks'

export default function Home() {
    return (
        <div>
            <header className={headerContainer}></header>
            <SearchHero />
            <Stack padding center direction="row">
                <span>
                    Role para ver mais <CaretDownIcon />
                </span>
            </Stack>
        </div>
    )
}

const headerContainer = css({
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '2rem',
})
