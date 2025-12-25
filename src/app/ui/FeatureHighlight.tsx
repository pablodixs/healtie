'use client'

import Lottie from 'lottie-react'
import { css } from '../../../styled-system/css'

import { Stack } from '@/components/Stacks'
import { Paragraph } from '@/components/Typography/Paragraph'
import { Subheading } from '@/components/Typography/Subheading'
import { MapTrifoldIcon } from '@phosphor-icons/react/dist/ssr'

import ondeIrAnimation from '@/assets/lotties/onde_ir_animation.json'
import { Link } from '@/components/Link'

import locationAnimation from '@/assets/lotties/near_establishments_animation.json'

export function FeatureHighlight() {
    return (
        <section className={featureContainer}>
            <h1 className={css({ display: 'none' })}>Healtie</h1>
            <Subheading size="xl" centered>
                Encontre a unidade de saúde mais próxima de você e saiba quais
                serviços estão disponíveis
            </Subheading>
            <Paragraph centered size="subheadline" compact>
                Localize a unidade mais próxima e veja, em tempo real, os status
                e serviços disponíveis para garantir um atendimento mais rápido
                e eficiente.
            </Paragraph>
            <Lottie
                animationData={locationAnimation}
                style={{ width: '100%', height: '500px' }}
            />
            <Stack direction="row" center>
                <Link variant="subtle" href={'/mapa'}>
                    <MapTrifoldIcon weight="bold" /> Ir para o mapa
                </Link>
                <Link variant="textSubtle" href={'/sobre'}>
                    Saiba mais
                </Link>
            </Stack>
            <div
                className={css({
                    marginY: '10rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                })}
            >
                <Subheading size="xl" centered>
                    Saiba em qual unidade de saúde você deve ir
                </Subheading>
                <Paragraph centered size="subheadline" compact>
                    Saber para onde ir na hora certa faz toda a diferença.
                    Responda algumas perguntas e descubra qual unidade de saúde
                    é a mais indicada para o seu caso, garantindo um atendimento
                    mais rápido e adequado.
                </Paragraph>
                <Lottie
                    animationData={ondeIrAnimation}
                    className={css({ marginY: '1rem' })}
                />
                <Stack direction="row" center>
                    <Link variant="subtle" href={'/onde-ir/questionario'}>
                        <MapTrifoldIcon weight="bold" /> Descobrir agora
                    </Link>
                    <Link variant="textSubtle" href={'/onde-ir'}>
                        Saiba mais
                    </Link>
                </Stack>
            </div>
        </section>
    )
}

const featureContainer = css({
    width: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: {
        base: '1rem',
        md: 0,
    },

    '& img': {
        maxWidth: '400px',
        width: { base: '100%', md: '40%' },
        borderRadius: 12,
        objectFit: 'cover',
        aspectRatio: '16/9',
        maxHeight: 'auto',
    },
})
