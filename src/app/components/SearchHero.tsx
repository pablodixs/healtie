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
    height: '80dvh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.5rem',
    borderRadius: 'xl',
    background: 'url("/pictures/stills/home_hero_gradient.png")',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    // backgroundColor: 'hsla(196, 94%, 55%, 1.00)',
    // backgroundImage: `
    //     radial-gradient(at 46% 88%, hsla(28,81%,80%,1) 0px, transparent 50%),
    //     radial-gradient(at 85% 1%, hsla(130, 70%, 54%, 1.00) 0px, transparent 50%),
    //     radial-gradient(at 72% 1%, hsla(144, 81%, 65%, 1.00) 0px, transparent 50%),
    //     radial-gradient(at 6% 6%, hsla(187,50%,52%,1) 0px, transparent 50%),
    //     radial-gradient(at 4% 93%, hsla(45,94%,62%,1) 0px, transparent 50%)
    //     `,
    // backgroundSize: '200% 200%',
    // animation: 'gradientMove 8s ease infinite',

    '& h1': {
        maxWidth: '32ch',
        color: 'white',
        textShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
    },
})

const input = css({
    padding: '1rem 1.5rem',
    borderRadius: 'full',
    width: '100%',
    maxWidth: '600px',
    backgroundColor: 'cream',
})
