'use client'

import Lottie from 'lottie-react'
import { css } from '../../../styled-system/css'

import { Button } from '@/components/Button'
import { Stack } from '@/components/Stacks'
import { Paragraph } from '@/components/Typography/Paragraph'
import { Subheading } from '@/components/Typography/Subheading'
import { ArrowRightIcon, CompassIcon } from '@phosphor-icons/react/dist/ssr'

import ondeIrAnimation from '@/assets/lotties/onde_ir_animation.json'
import { Link } from '@/components/Link'

export function FeatureHighlight() {
    return (
        <section className={featureContainer}>
            <Lottie animationData={ondeIrAnimation} loop={false} />
            <div
                className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '1.5rem',
                })}
            >
                <div>
                    <span
                        className={css({
                            display: 'flex',
                            alignItems: 'center',
                            gap: '.25rem',
                            color: 'tint',
                            fontWeight: '500',
                            mb: '0.25rem',
                        })}
                    >
                        <CompassIcon weight="fill" size={18} />
                        Onde Ir?
                    </span>
                    <Subheading>
                        Saiba em qual unidade de saúde <br /> você deve ir
                    </Subheading>
                    <Paragraph compact>
                        Saber para onde ir na hora certa faz toda a diferença.
                        Responda algumas perguntas e descubra qual unidade de
                        saúde é a mais indicada para o seu caso, garantindo um
                        atendimento mais rápido e adequado.
                    </Paragraph>
                </div>
                <Stack direction="row">
                    <Link href={'/onde-ir'}>
                        Descobrir agora <ArrowRightIcon />
                    </Link>
                    <Link variant="text" href={'/onde-ir/sobre'}>
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
    flexDirection: { base: 'column', md: 'row' },
    gap: '2rem',
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
