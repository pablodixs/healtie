import { CaretDownIcon } from '@phosphor-icons/react/dist/ssr'
import { css } from '../../styled-system/css'

import { SearchHero } from './components/SearchHero'
import { LayoutStack, Stack } from '@/components/Stacks'

export default function Home() {
    return (
        <LayoutStack>
            <header className={headerContainer}></header>
            <SearchHero />
            <Stack padding center direction="row">
                <span>
                    Role para ver mais <CaretDownIcon />
                </span>
            </Stack>
        </LayoutStack>
    )
}

const headerContainer = css({
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '2rem',
})
