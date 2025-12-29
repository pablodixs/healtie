import { CityIcon, HeartIcon } from '@phosphor-icons/react/dist/ssr'
import { css } from '../../../styled-system/css'
import Link from 'next/link'
import { stack } from '../../../styled-system/patterns'
import { Paragraph } from '../Typography'
import { Divider } from '../Divider'
import { useSelectedCity } from '@/hooks/useSelectedCity'
import { Button } from '../Button'

export function Footer() {
    const { isReady, selectedCity, hasSelectedCity, clearCity } =
        useSelectedCity()

    return (
        <div className={footerContainer}>
            <div
                className={css({
                    paddingX: { base: '1rem', md: '0' },
                })}
            >
                <Divider />
                <Paragraph subtle bolder size="caption">
                    Informações importantes
                </Paragraph>
                <Paragraph subtle size="caption">
                    O Healtie ainda está em desenvolvimento e pode conter
                    informações desatualizadas ou imprecisas. Sempre confirme os
                    dados diretamente com o estabelecimento de saúde antes de
                    tomar qualquer decisão médica.
                </Paragraph>
                <Paragraph subtle size="caption">
                    O Healtie não substitui aconselhamento, diagnóstico ou
                    tratamento médico profissional. Em caso de emergência,
                    procure ajuda médica imediatamente.
                </Paragraph>
                <Paragraph subtle size="caption">
                    No momento, apenas os dados de estabelecimentos do Distrito
                    Federal estão disponíveis na plataforma. Estamos trabalhando
                    para expandir nosso alcance para outras regiões em breve.
                </Paragraph>
                <Divider />
                {isReady && hasSelectedCity && (
                    <span
                        className={css({
                            display: 'flex',
                            gap: '1ch',
                            alignItems: 'center',
                            mb: '1rem',
                            fontSize: '0.875rem',
                            color: 'gray.500',
                        })}
                    >
                        <CityIcon /> {selectedCity}
                        <Button
                            onClick={clearCity}
                            variant="bordered"
                            size="small"
                        >
                            Mudar cidade
                        </Button>
                    </span>
                )}
            </div>
            <section
                className={stack({
                    width: '100%',
                    justify: 'space-between',
                    direction: { base: 'column', md: 'row' },
                    gap: { base: '1.5rem' },
                    paddingRight: { base: '0', md: '1rem' },
                    padding: { base: '1rem', md: '0' },
                })}
            >
                <div className={listLinkContainer}>
                    <span>Recursos</span>
                    <ul>
                        <li>
                            <Link href="/">Mapa</Link>
                        </li>
                        <li>
                            <Link href="/">Onde Ir</Link>
                        </li>
                        <li>
                            <Link href="/">Estabelecimentos</Link>
                        </li>
                        <li>
                            <Link href="/datasus/consulta">
                                Consulta DataSUS
                            </Link>
                        </li>
                        <li>
                            <Link href="/contribuir/estabelecimentos">
                                Adicionar um estabelecimento
                            </Link>
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
                            <Link href="/sobre">Sobre o Healtie</Link>
                        </li>
                        <li>
                            <Link href="/regioes">Disponibilidade</Link>
                        </li>
                        <li>
                            <Link href="/hoodles">Hoodles</Link>
                        </li>
                        <li>
                            <Link href="/noticias">Newsroom</Link>
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
        textUnderlineOffset: '4px',

        _hover: {
            textDecoration: 'underline',
        },
    },

    '& section': {
        width: '100%',
        paddingTop: '1rem',
        display: { base: 'flex', md: 'grid' },
        gridTemplateColumns: { md: 'repeat(4, 1fr)' },
        justifyContent: 'space-between',
    },
})
