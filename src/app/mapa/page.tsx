'use client'

import { css } from '../../../styled-system/css'
import { ArrowClockwiseIcon } from '@phosphor-icons/react/dist/ssr'

import { Button } from '@/components/Button'
import { SearchBar } from '@/components/Navbar/SearchBar'
import { Paragraph } from '@/components/Typography/Paragraph'

export default function Page() {
    return (
        <main>
            <SearchBar placeholder="Buscar unidades de saúde" />
            <header className={headerStyles}>
                <h1>Próximos de você</h1>
                <div>
                    <Button iconButton variant="subtle">
                        <ArrowClockwiseIcon />
                    </Button>
                </div>
            </header>
            <div>
                <Paragraph centered>
                    Autorize o uso da localização para encontrar unidades de
                    saúde próximas a você.
                </Paragraph>
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
