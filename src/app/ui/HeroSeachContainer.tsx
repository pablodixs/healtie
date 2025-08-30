import { Heading } from '@/components/Typography/Heading'
import { css } from '../../../styled-system/css'
import Image from 'next/image'
import { HeroSearchBar } from './components/HeroSearchBar'
import { SearchTags } from './components/SearchTags'

export function HeroSearchContainer() {
    return (
        <div className={heroContainer}>
            <Image
                src={'/pictures/mascots.svg'}
                alt=""
                width={468}
                height={178}
                quality={100}
                draggable={false}
            />
            <Heading centered>
                Seu guia na saúde pública <br /> do Distrito Federal
            </Heading>
            <HeroSearchBar />
            <SearchTags />
        </div>
    )
}

const heroContainer = css({
    height: '70dvh',
    minHeight: '600px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '1.5rem',
    padding: '1rem',

    '& img': {
        md: {
            width: '100%',
            height: 'auto',
        },
    },
})
