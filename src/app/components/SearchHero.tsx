import { Heading } from '@/components/Typography/Heading'
import { css } from '../../../styled-system/css'

export function SearchHero() {
    return (
        <section className={heroContainer}>
            <Heading centered>
                Seu guia na saúde pública do Distrito Federal
            </Heading>
            <input
                className={input}
                type="search"
                placeholder="Busque por estabelecimentos ou serviços"
            />
        </section>
    )
}

const heroContainer = css({
    height: '70svh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.5rem',

    '& h1': {
        maxWidth: '32ch',
    },
})

const input = css({
    padding: '1rem 1.5rem',
    borderRadius: 'full',
    width: '100%',
    maxWidth: '600px',
    backgroundColor: 'cream',
})
