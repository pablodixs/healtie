'use client'

import { css } from '../../../styled-system/css'
import { ArrowClockwiseIcon } from '@phosphor-icons/react/dist/ssr'

import { Button } from '@/components/Button'
import { SearchBar } from '@/components/Navbar/SearchBar'
import { Paragraph } from '@/components/Typography/Paragraph'
import { GpsFixIcon } from '@phosphor-icons/react'
import { contentContainer, searchBarContainer } from './styles'
import { ProgressiveBlur } from '@/components/ProgressiveBlur'

export default function Page() {
    return (
        <main>
            <section className={searchBarContainer}>
                <SearchBar placeholder="Buscar unidades de saúde" />
                <ProgressiveBlur />
            </section>
            <div className={contentContainer}>
                <header className={headerStyles}>
                    <Paragraph bolder>Próximos de você</Paragraph>
                    <div>
                        <Button iconButton variant="subtle">
                            <ArrowClockwiseIcon weight="bold" />
                        </Button>
                    </div>
                </header>
                <Paragraph>
                    Autorize o uso da localização para encontrar unidades de
                    saúde próximas a você.
                </Paragraph>
                <Button>
                    <GpsFixIcon /> Autorizar localização
                </Button>
            </div>
        </main>
    )
}

const headerStyles = css({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
    alignItems: 'center',

    '& h1': {
        fontSize: '1.125rem',
        fontWeight: 600,
        letterSpacing: '-0.01em',
    },
})
