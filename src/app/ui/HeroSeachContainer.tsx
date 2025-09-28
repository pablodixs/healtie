import Image from 'next/image'
import { css } from '../../../styled-system/css'

import { Heading } from '@/components/Typography/Heading'
import { HeroSearchBar } from './components/HeroSearchBar'
import { SearchTags } from './components/SearchTags'

export function HeroSearchContainer() {
    return (
        <div className={heroContainer}>
            <div
                className={css({
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    flex: 1,
                    gap: '1.5rem',
                    textAlign: 'center',
                })}
            >
                <Image
                    src={'/pictures/doodle.png'}
                    alt=""
                    width={800}
                    height={320}
                    quality={100}
                    draggable={false}
                />
                <Heading centered>
                    Seu guia na saúde pública <br /> do Distrito Federal
                </Heading>
                <HeroSearchBar />
            </div>
            <SearchTags />
        </div>
    )
}

const heroContainer = css({
    height: 'calc(100dvh - 6.25rem)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '1.5rem',
    padding: '1rem',

    '& img': {
        base: {
            width: 'auto',
        },
        md: {
            width: '800px',
            height: 'auto',
        },
    },
})
