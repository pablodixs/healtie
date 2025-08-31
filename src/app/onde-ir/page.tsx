'use client'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'

import animation from '@/assets/lotties/onde_ir_hero_animation.json'
import { Heading } from '@/components/Typography/Heading'
import { Paragraph } from '@/components/Typography/Paragraph'
import { stack } from '../../../styled-system/patterns'
import { Button } from '@/components/Button'
import {
    ArrowRightIcon,
    CaretDownIcon,
    HourglassIcon,
    PauseIcon,
    PlayIcon,
} from '@phosphor-icons/react/dist/ssr'
import { Subheading } from '@/components/Typography/Subheading'
import { useRef, useState } from 'react'
import { FeatureCard } from '../ui/components/FeatureCard'
import { Divider } from '@/components/Divider'

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
                <div style={{ marginBottom: '1rem' }}>
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
                            <Button
                                iconButton
                                variant="ghost"
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
            <Divider />
            <section
                className={stack({
                    margin: '4rem 0',
                    padding: { base: '0 1rem', md: '0' },
                })}
            >
                <Subheading>
                    Uma triagem simples. <br /> Um atendimento mais inteligente.
                </Subheading>
                <Paragraph compact>
                    Com algumas respostas rápidas, você encontra o atendimento
                    mais adequado para o seu caso, sem filas desnecessárias, sem
                    complicações. Uma experiência pensada para ser clara,
                    acessível e humana.
                </Paragraph>
                <div
                    className={stack({
                        direction: { base: 'column', md: 'row' },
                        align: 'stretch',
                        gap: '2rem',
                    })}
                >
                    <FeatureCard icon={HourglassIcon} title="Economia de tempo">
                        Descubra o local certo para o seu atendimento em menos
                        de um minuto.
                    </FeatureCard>
                    <FeatureCard
                        icon={HourglassIcon}
                        title="Menos superlotação"
                    >
                        Descubra o local certo para o seu atendimento em menos
                        de um minuto.
                    </FeatureCard>
                    <FeatureCard
                        icon={HourglassIcon}
                        title="Atendimento mais rápido"
                    >
                        Descubra o local certo para o seu atendimento em menos
                        de um minuto.
                    </FeatureCard>
                    <FeatureCard
                        icon={HourglassIcon}
                        title="Gratuito e acessível"
                    >
                        Descubra o local certo para o seu atendimento em menos
                        de um minuto.
                    </FeatureCard>
                </div>
            </section>
        </main>
    )
}
