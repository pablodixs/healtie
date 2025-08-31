'use client'

import Lottie from 'lottie-react'
import {
    ArrowRightIcon,
    ArrowUpRightIcon,
} from '@phosphor-icons/react/dist/ssr'

import { stack } from '../../../styled-system/patterns'

import { Button } from '@/components/Button'
import { Stack } from '@/components/Stacks'
import { Paragraph } from '@/components/Typography/Paragraph'
import { Subheading } from '@/components/Typography/Subheading'

import locationAnimation from '@/assets/lotties/near_establishments_animation.json'

export function NearEstablishmentsHighlight() {
    return (
        <section
            className={stack({
                direction: { base: 'column-reverse', md: 'row' },
                justify: 'space-between',
                align: 'center',
            })}
        >
            <div
                className={stack({
                    padding: { base: '4rem 1rem', md: '4rem 0' },
                })}
            >
                <Subheading>
                    Encontre a unidade de saúde mais próxima de você <br /> e
                    saiba quais serviços estão disponíveis
                </Subheading>
                <Paragraph compact>
                    Localize a unidade mais próxima e veja, em tempo real*, os
                    serviços disponíveis para garantir um atendimento mais
                    rápido e eficiente.
                </Paragraph>
                <Stack direction="row">
                    <Button variant="subtle">
                        Ver unidades próximas <ArrowRightIcon />
                    </Button>
                    <Button variant="text">
                        Lista de estabelecimentos <ArrowUpRightIcon />
                    </Button>
                </Stack>
            </div>
            <Lottie
                animationData={locationAnimation}
                style={{ width: '100%', height: 'auto', flex: 1 }}
            />
        </section>
    )
}
