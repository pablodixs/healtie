'use client'
import Image from 'next/image'
import { useRef, useState } from 'react'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
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
import { Divider } from '@/components/Divider'
import { AnimatedCollapsibleGroup } from '@/components/Collapsible/AnimatedCollapsibleGroup'

import animation from '@/assets/lotties/onde_ir_hero_animation.json'

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
                    <Button variant="secondary">
                        Iniciar <ArrowRightIcon />
                    </Button>
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
                            <Button iconButton onClick={handlePauseAnimation}>
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
            <Divider />
            <section
                className={stack({
                    direction: { base: 'column-reverse', md: 'row' },
                    justify: 'space-between',
                    margin: '4rem 0',
                    padding: { base: '0 1rem', md: '0' },
                    paddingRight: { md: '1rem' },
                    gap: { base: '1rem' },
                })}
            >
                <div>
                    <Subheading>
                        Uma triagem simples. <br /> Um atendimento mais
                        inteligente.
                    </Subheading>
                    <Paragraph compact>
                        Com algumas respostas rápidas, você encontra o
                        atendimento mais adequado para o seu caso, sem filas
                        desnecessárias, sem complicações. Uma experiência
                        pensada para ser clara, acessível e humana.
                    </Paragraph>
                    <div>
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
                                            organização e menos espera para
                                            todos.
                                        </Paragraph>
                                    ),
                                },
                                {
                                    title: 'Atendimento mais rápido',
                                    content: (
                                        <Paragraph>
                                            Chegue ao local indicado já
                                            preparado para receber o cuidado que
                                            você precisa.
                                        </Paragraph>
                                    ),
                                },
                            ]}
                            autoPlayInterval={7}
                            showIndicators={true}
                        />
                    </div>
                </div>
                <div>
                    <Image
                        style={{
                            borderRadius: '12px',
                            width: '100%',
                            height: 'auto',
                            flex: 1,
                        }}
                        src={'/pictures/onde_ir_illustration.png'}
                        alt="Ilustração de onde ir"
                        width={300}
                        height={300}
                        quality={100}
                    />
                </div>
            </section>
        </main>
    )
}
