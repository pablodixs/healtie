import Image from 'next/image'
import { css } from '../../../styled-system/css'

import { Heading } from '@/components/Typography/Heading'
import { HeroSearchBar } from './components/HeroSearchBar'
import { SearchTags } from './components/SearchTags'

export function HeroSearchContainer() {
    return (
        <div className={heroContainer}>
            <Image
                src={'/pictures/doodle.png'}
                alt=""
                width={500}
                height={200}
                quality={100}
                draggable={false}
            />
            <Heading centered>
                Seu guia na saúde pública do Distrito Federal
            </Heading>
            <HeroSearchBar />
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
    paddingBottom: '15%',

    '& img': {
        base: {
            width: '80%',
            height: 'auto',
        },
        md: {
            width: 'auto',
            height: 'auto',
        },
    },
})
