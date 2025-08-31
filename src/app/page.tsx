'use client'

import { Subheading } from '@/components/Typography/Subheading'
import { HeroSearchContainer } from './ui/HeroSeachContainer'

import { stack } from '../../styled-system/patterns'
import { FeatureHighlight } from './ui/FeatureHighlight'
import { Paragraph } from '@/components/Typography/Paragraph'
import { Stack } from '@/components/Stacks'
import { Button } from '@/components/Button'
import {
    ArrowRightIcon,
    ArrowUpRightIcon,
    CheckCircleIcon,
    CompassIcon,
    MapTrifoldIcon,
} from '@phosphor-icons/react/dist/ssr'
import Lottie from 'lottie-react'

import locationAnimation from '@/assets/lotties/near_establishments_animation.json'
import { css } from '../../styled-system/css'

export default function Home() {
    return (
        <div>
            <HeroSearchContainer />
            <FeatureHighlight />
            <section
                className={stack({
                    direction: { base: 'column', md: 'row' },
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
                        Encontre a unidade de saúde mais próxima de você <br />{' '}
                        e saiba quais serviços estão disponíveis
                    </Subheading>
                    <Paragraph compact>
                        Localize a unidade mais próxima e veja, em tempo real*,
                        os serviços disponíveis para garantir um atendimento
                        mais rápido e eficiente.
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
            <section
                className={stack({
                    backgroundColor: 'background',
                    padding: { base: '4rem 1rem', md: '4rem' },
                    borderRadius: { base: '0', md: 'lg' },
                    marginRight: { base: '0', md: '1rem' },
                })}
            >
                <Subheading>Como o Healtie te ajuda?</Subheading>
                <Paragraph compact>
                    O Healtie conecta você às unidades de saúde mais próximas,
                    facilitando o acesso a informações sobre serviços e
                    atendimentos disponíveis.
                </Paragraph>
                <div
                    className={stack({
                        direction: { base: 'column', md: 'row' },
                        align: 'stretch',
                        gap: '2rem',
                    })}
                >
                    <Card icon={CompassIcon} title="Você sabe onde ir">
                        Com o Onde Ir? você encontra a unidade de saúde mais
                        indicada no seu caso, otimizando seu tempo e evitando a
                        lotação desnecessárias dos estabelecimentos de saúde.
                    </Card>
                    <Card
                        icon={MapTrifoldIcon}
                        title="Você encontra a unidade de saúde mais próxima de você"
                    >
                        Utilizando sua localização e preferências, o Healtie
                        encontra a unidade de saúde mais próxima de você,
                        garantindo um atendimento mais rápido e eficiente.
                    </Card>
                    <Card
                        icon={CheckCircleIcon}
                        title="Você sabe a situação da unidade de saúde"
                    >
                        O Healtie fornece informações em tempo real sobre a
                        situação das unidades de saúde, incluindo horários de
                        funcionamento, capacidade de atendimento e serviços
                        disponíveis.
                    </Card>
                </div>
            </section>
        </div>
    )
}

const Card = ({
    icon: Icon,
    title,
    children,
}: {
    icon: React.ElementType
    title: string
    children: React.ReactNode
}) => {
    return (
        <div
            className={css({
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '1rem',
                flex: 1,
                padding: '1.25rem',
                borderRadius: 'lg',
                backgroundColor: 'white',
            })}
        >
            <Icon size={28} />
            <h3
                className={css({
                    fontSize: '1.375rem',
                    fontWeight: 500,
                    lineHeight: 'tight',
                    maxWidth: '30ch',
                })}
            >
                {title}
            </h3>
            <Paragraph>{children}</Paragraph>
        </div>
    )
}
