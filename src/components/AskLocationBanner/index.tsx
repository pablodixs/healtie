'use client'

import { GpsFixIcon } from '@phosphor-icons/react/dist/ssr'
import { Paragraph } from '../Typography'
import { Link } from '../Link'
import { css } from '../../../styled-system/css'
import { Button } from '../Button'

interface AskLocationBannerProps {
    requestLocation: () => void
}

export function AskLocationBanner({ requestLocation }: AskLocationBannerProps) {
    return (
        <div className={bannerContainer}>
            <div>
                <header>
                    <GpsFixIcon size={22} />
                    <Paragraph marginCompact bolder>
                        Permitir acesso à sua localização?
                    </Paragraph>
                </header>
                <Paragraph marginCompact subtle size="caption">
                    Para oferecer recomendações personalizadas e mostrar
                    resultados próximos a você, precisamos acessar sua
                    localização.{' '}
                </Paragraph>
                <Link
                    variant="text"
                    size="sm"
                    href={'/privacidade/localizacao'}
                >
                    Saiba mais...
                </Link>
            </div>
            <footer>
                <Button onClick={requestLocation}>Permitir</Button>
            </footer>
        </div>
    )
}

const bannerContainer = css({
    backgroundColor: 'background',
    padding: '1rem',
    borderRadius: '12px',
    display: 'flex',
    gap: '1rem',
    maxWidth: '800px',

    '& header': {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },

    '& footer': {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '.5rem',
        textWrap: 'nowrap',
    },
})
