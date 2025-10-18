'use client'

import { Divider } from '@/components/Divider'
import { Link } from '@/components/Link'
import { Heading, Paragraph, Subheading } from '@/components/Typography'
import { useUserGeolocation } from '@/hooks/geolocation/useUserGeolocation'
import { useCookiesPreferences } from '@/hooks/useCookiesPreferences'
import {
    CheckCircleIcon,
    CookieIcon,
    GpsFixIcon,
    XCircleIcon,
} from '@phosphor-icons/react/dist/ssr'
import { css } from '../../../../styled-system/css'

export default function Page() {
    const { permission } = useUserGeolocation({ immediate: false })
    const { cookiePreference } = useCookiesPreferences()

    return (
        <main className={mainContainerStyles}>
            <Heading centered>Preferências de Privacidade</Heading>
            <Paragraph centered>
                Nesta página, você pode gerenciar as permissões e preferências
                relacionadas ao uso dos seus dados no Healtie.
                <br />
                Nosso objetivo é garantir transparência e oferecer a melhor
                experiência possível, respeitando sempre a sua privacidade.
            </Paragraph>
            <Divider />
            <section className={gridContainerStyles}>
                <div className={cardContainerStyles}>
                    <CookieIcon size={28} weight="fill" />
                    <Paragraph size="subheadline" bolder>
                        Cookies
                    </Paragraph>
                    <Paragraph subtle marginCompact>
                        Utilizados para lembrar suas preferências, melhorar o
                        desempenho da plataforma e personalizar o conteúdo
                        exibido.
                    </Paragraph>
                    <div className={bannerContainer}>
                        {cookiePreference === 'accepted' ? (
                            <>
                                <CheckCircleIcon size={22} weight="fill" />
                                <span>Você aceitou o uso de cookies</span>
                            </>
                        ) : (
                            <>
                                <XCircleIcon size={22} weight="fill" /> Você não
                                <span>permitiu o uso de cookies</span>
                            </>
                        )}
                    </div>
                </div>
                <div className={cardContainerStyles}>
                    <GpsFixIcon size={28} weight="fill" />
                    <Paragraph size="subheadline" bolder>
                        Geolocalização
                    </Paragraph>
                    <Paragraph subtle marginCompact>
                        Permite que o Healtie identifique sua posição aproximada
                        para mostrar resultados e serviços próximos de você.
                    </Paragraph>
                    <div className={bannerContainer}>
                        {permission === 'granted' ? (
                            <>
                                <CheckCircleIcon size={22} weight="fill" />
                                <span>
                                    Você permitiu o uso da sua geolocalização
                                </span>
                            </>
                        ) : (
                            <>
                                <XCircleIcon size={22} weight="fill" />
                                <span>
                                    Você não permitiu o uso da sua
                                    geolocalização
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </section>
            <Divider />
            <div className={footerContainerStyles}>
                <Subheading centered>
                    Sua privacidade é essencial para nós.
                </Subheading>
                <Paragraph centered marginCompact compact>
                    Você tem total controle sobre essas configurações e pode
                    alterá-las a qualquer momento. Todas as informações são
                    tratadas com segurança e conforme nossa{' '}
                    <Link variant="text" href={'/privacidade'}>
                        Política de Privacidade
                    </Link>
                    .
                </Paragraph>
            </div>
        </main>
    )
}

const mainContainerStyles = css({
    maxWidth: '1000px',
    margin: '0 auto',
})

const footerContainerStyles = css({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    py: '2rem',
    padding: '1rem',
    mt: '1rem',
})

const cardContainerStyles = css({
    backgroundColor: 'neutral.50',
    padding: '1rem',
    borderRadius: '12px',
})

const gridContainerStyles = css({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
})

const bannerContainer = css({
    display: 'flex',
    gap: '.5rem',
    fontWeight: 500,
    my: '1rem',
})
