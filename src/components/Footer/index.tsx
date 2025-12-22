import { HeartIcon } from '@phosphor-icons/react/dist/ssr'
import { css } from '../../../styled-system/css'
import Link from 'next/link'
import { stack } from '../../../styled-system/patterns'

export function Footer() {
    return (
        <div className={footerContainer}>
            <section
                className={stack({
                    justify: 'space-between',
                    direction: { base: 'column', md: 'row' },
                    gap: '1.5rem',
                    paddingRight: { base: '0', md: '1rem' },
                    padding: { base: '2rem', md: '0' },
                })}
            >
                <div className={listLinkContainer}>
                    <span>Healtie</span>
                    <ul>
                        <li>
                            <Link href="/">Mapa</Link>
                        </li>
                        <li>
                            <Link href="/">Onde Ir?</Link>
                        </li>
                        <li>
                            <Link href="/">Estabelecimentos</Link>
                        </li>
                    </ul>
                </div>
                <div className={listLinkContainer}>
                    <span>Suporte</span>
                    <ul>
                        <li>
                            <Link href="/">Central de Ajuda</Link>
                        </li>
                        <li>
                            <Link href="/">Contato</Link>
                        </li>
                        <li>
                            <Link href="/">Documentação</Link>
                        </li>
                    </ul>
                </div>
                <div className={listLinkContainer}>
                    <span>Sobre</span>
                    <ul>
                        <li>
                            <Link href="/sobre">Sobre</Link>
                        </li>
                        <li>
                            <Link href="/">Como obtemos os dados</Link>
                        </li>
                        <li>
                            <Link href="/">Soluções</Link>
                        </li>
                        <li>
                            <Link href="/">Healtie Data</Link>
                        </li>
                        <li>
                            <Link href="/">Healtie e o Governo</Link>
                        </li>
                        <li>
                            <Link href="/">Blog</Link>
                        </li>
                    </ul>
                </div>
                <div className={listLinkContainer}>
                    <span>Legal</span>
                    <ul>
                        <li>
                            <Link href="/">Termos de Uso</Link>
                        </li>
                        <li>
                            <Link href="/">Política de Privacidade</Link>
                        </li>
                        <li>
                            <Link href="/">LGPD</Link>
                        </li>
                        <li>
                            <Link href="/privacidade/preferencias">
                                Preferências de Privacidade
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>
            <section
                className={css({
                    flexDirection: { base: 'column', md: 'row' },
                    padding: { base: '2rem', md: '0' },
                    paddingRight: { base: '0', md: '1rem' },
                })}
            >
                <p>&copy; 2025 Scriptles</p>
                <p>
                    Feito com{' '}
                    <HeartIcon weight="fill" color="#FF3938" size={18} /> em
                    Brasília, Brasil
                </p>
            </section>
        </div>
    )
}

const listLinkContainer = css({
    '& span': {
        fontWeight: '500',
        mb: '.25rem',
        display: 'block',
        color: 'rgba(0, 0, 0, 0.5)',
    },

    '& a': {
        color: '#202020',
        padding: '.5rem 0',
        display: 'block',
    },
})

const footerContainer = css({
    width: '100%',
    padding: '1rem 0',
    fontSize: '0.9375rem',

    '& p': {
        color: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        gap: '.25rem',
        alignItems: 'initial',
    },

    '& a': {
        _hover: {
            textDecoration: 'underline',
        },
    },

    '& section': {
        width: '100%',
        paddingTop: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
    },
})
