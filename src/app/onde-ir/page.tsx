'use client'
import Image from 'next/image'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import { useRef, useState } from 'react'
import {
    ArrowRightIcon,
    CaretDownIcon,
    PauseIcon,
    PlayIcon,
} from '@phosphor-icons/react/dist/ssr'

import { stack } from '../../../styled-system/patterns'

import { Heading } from '@/components/Typography/Heading'
import { Paragraph } from '@/components/Typography/Paragraph'
import { Button } from '@/components/Button'
import { Subheading } from '@/components/Typography/Subheading'
import { AnimatedCollapsibleGroup } from '@/components/Collapsible/AnimatedCollapsibleGroup'

import animation from '@/assets/lotties/onde_ir_hero_animation.json'
import { Divider } from '@/components/Divider'
import { Link } from '@/components/Link'

export default function Page() {
    const animationRef = useRef<LottieRefCurrentProps | null>(null)
    const [isAnimationPlaying, setIsAnimationPlaying] = useState(true)

    const handlePlayAnimation = () => {
        animationRef.current?.play()
        setIsAnimationPlaying(true)
    }

    const handlePauseAnimation = () => {
        animationRef.current?.pause()
        setIsAnimationPlaying(false)
    }

    return (
        <main>
            <section
                className={stack({
                    align: 'center',
                    marginTop: '4rem',
                    paddingTop: { base: '5rem' },
                    padding: { base: '0 1rem', md: '0 2rem' },
                })}
            >
                <Heading centered>
                    Encontre o atendimento certo, sem sair de casa
                </Heading>
                <Paragraph centered compact>
                    Antes de ir a uma unidade de saúde, responda a algumas
                    perguntas rápidas. Em menos de 1 minuto, você vai saber qual
                    é o local mais indicado para o seu caso: Hospital, UPA ou
                    UBS.
                </Paragraph>
                <div
                    className={stack({
                        marginBottom: '1rem',
                        direction: { base: 'column', md: 'row' },
                    })}
                >
                    <Link href={'/onde-ir/questionario'}>
                        Iniciar <ArrowRightIcon />
                    </Link>
                    <Button variant="text">
                        Saiba mais <CaretDownIcon />
                    </Button>
                </div>
                <div style={{ position: 'relative' }}>
                    <Lottie
                        style={{
                            borderRadius: 12,
                            overflow: 'hidden',
                            maxWidth: 1000,
                        }}
                        animationData={animation}
                        lottieRef={animationRef}
                        onPause={() => setIsAnimationPlaying(false)}
                        onPlay={() => setIsAnimationPlaying(true)}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                        }}
                    >
                        {isAnimationPlaying ? (
                            <Button
                                variant="ghost"
                                iconButton
                                onClick={handlePauseAnimation}
                            >
                                <PauseIcon weight="fill" color={'white'} />
                            </Button>
                        ) : (
                            <Button
                                iconButton
                                variant="ghost"
                                onClick={handlePlayAnimation}
                            >
                                <PlayIcon weight="fill" color={'white'} />
                            </Button>
                        )}
                    </div>
                </div>
            </section>
            <section
                className={stack({
                    maxWidth: '1000px',
                    direction: 'row',
                    margin: '4rem auto',
                    padding: { base: '0 1rem', md: '0' },
                    gap: { base: '1rem' },
                })}
            >
                <div>
                    <Divider />
                    <Subheading>
                        Uma triagem simples. <br /> Um atendimento mais
                        inteligente.
                    </Subheading>
                    <Paragraph>
                        Com algumas respostas rápidas, você encontra o
                        atendimento mais adequado para o seu caso, sem filas
                        desnecessárias, sem complicações. Uma experiência
                        pensada para ser clara, acessível e humana.
                    </Paragraph>
                    <AnimatedCollapsibleGroup
                        items={[
                            {
                                title: 'Economia de tempo',
                                content: (
                                    <Paragraph>
                                        Descubra o local certo para o seu
                                        atendimento em menos de um minuto.
                                    </Paragraph>
                                ),
                            },
                            {
                                title: 'Menos superlotação',
                                content: (
                                    <Paragraph>
                                        Cada pessoa no lugar certo. Mais
                                        organização e menos espera para todos.
                                    </Paragraph>
                                ),
                            },
                            {
                                title: 'Atendimento mais rápido',
                                content: (
                                    <Paragraph>
                                        Chegue ao local indicado já preparado
                                        para receber o cuidado que você precisa.
                                    </Paragraph>
                                ),
                            },
                        ]}
                        autoPlayInterval={7}
                        showIndicators={true}
                    />
                </div>
            </section>
            <section
                className={stack({
                    maxWidth: '1000px',
                    direction: { base: 'column', md: 'row' },
                    margin: '4rem auto',
                    padding: { base: '0 1rem', md: '0' },
                    gap: { base: '1rem' },
                })}
            >
                <div>
                    <Subheading>Atendimento mais rápido</Subheading>
                    <Paragraph>
                        Chegue ao local indicado já sabendo o que esperar.
                        Assim, você explica melhor seus sintomas, recebe a
                        orientação certa e é atendido com mais agilidade.
                    </Paragraph>
                </div>
                <Image
                    style={{
                        flex: 1,
                        borderRadius: 12,
                    }}
                    src={'/pictures/signs_illustration.svg'}
                    alt=""
                    width={300}
                    height={200}
                    quality={100}
                />
            </section>
            <section
                className={stack({
                    maxWidth: '1000px',
                    direction: 'column',
                    align: 'center',
                    margin: '4rem auto',
                    padding: { base: '0 1rem', md: '0' },
                    gap: { base: '1rem' },
                })}
            >
                <Subheading centered>Vamos começar?</Subheading>
                <Button variant="secondary">Abrir questionário</Button>
            </section>
        </main>
    )
}
