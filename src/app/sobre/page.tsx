'use client'

import { motion } from 'motion/react'
import { Paragraph, Subheading } from '@/components/Typography'
import { css } from '../../../styled-system/css'
import { Divider } from '@/components/Divider'
import { Link } from '@/components/Link'
import {
    ArrowRightIcon,
    ChartLineIcon,
    CompassIcon,
    MagnifyingGlassIcon,
    MapTrifoldIcon,
    UsersThreeIcon,
} from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

import animation from '@/assets/lotties/icons_animation.json'
import { ReliabilityAnimation } from './components/reliability-animation'
import Lottie from 'lottie-react'
import { FAQ } from './components/faq'

export default function Page() {
    return (
        <div
            className={css({
                maxW: '1000px',
                marginX: 'auto',
                paddingX: { md: 0, base: '1rem' },
            })}
        >
            <section>
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.75 }}
                    className={css({
                        fontWeight: 500,
                        textAlign: 'center',
                        color: 'neutral.500',
                        fontSize: '1.125rem',
                    })}
                >
                    Sobre o Healtie
                </motion.h1>
                <section className={css({ overflow: 'hidden' })}>
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        transition={{
                            delay: 0.25,
                            duration: 0.6,
                            type: 'spring',
                            bounce: 0,
                        }}
                    >
                        <Subheading size="xl" centered>
                            Decisões mais seguras para cuidar da sua saúde
                        </Subheading>
                    </motion.div>
                </section>
                <section className={css({ overflow: 'hidden' })}>
                    <motion.div
                        initial={{ y: '150%' }}
                        animate={{ y: 0 }}
                        transition={{
                            delay: 0.5,
                            duration: 0.6,
                            type: 'spring',
                            bounce: 0,
                        }}
                    >
                        <Paragraph centered size="subheadline">
                            O Healtie é a plataforma que conecta você a
                            informações atualizadas sobre unidades de saúde,
                            unindo dados oficiais à experiência real de quem usa
                            o sistema.
                        </Paragraph>
                    </motion.div>
                </section>
            </section>
            <Lottie
                style={{
                    borderRadius: 12,
                    overflow: 'hidden',
                    maxWidth: 1000,
                    boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.05)',
                    margin: '2rem 0',
                    marginBottom: '10rem',
                }}
                loop={false}
                animationData={animation}
            />
            <div className={css({ overflow: 'hidden' })}>
                <motion.div
                    initial={{ y: '100%' }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        delay: 0.2,
                        duration: 0.6,
                        type: 'spring',
                        bounce: 0,
                    }}
                >
                    <Subheading size="lg">
                        Menos incerteza, <br /> mais cuidado
                    </Subheading>
                </motion.div>
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
            >
                <Paragraph size="subheadline">
                    Em momentos de busca por atendimento, a última coisa que
                    você precisa é lidar com informações desencontradas ou dar
                    de cara com portas fechadas.
                </Paragraph>
                <Paragraph size="subheadline">
                    O Healtie nasceu para preencher essa lacuna. Nós
                    transformamos dados complexos sobre estabelecimentos de
                    saúde em informações simples e acionáveis. Nosso objetivo é
                    dar a você o poder de escolher onde e quando buscar ajuda,
                    com base na localização, no status de funcionamento e na
                    avaliação de outros pacientes.
                </Paragraph>
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: 0.5 }}
                className={css({
                    fontSize: '1.75rem',
                    textAlign: 'center',
                    fontWeight: '500',
                    letterSpacing: 'tight',
                    lineHeight: '130%',
                    p: '5rem 2rem',
                    backgroundColor: 'neutral.50',
                    mt: '5rem',
                    borderRadius: '24px',
                })}
            >
                Nossa missão é reunir dados de saúde e torná-los acessíveis para
                ajudar você a encontrar estabelecimentos de saúde de forma
                rápida e eficiente.
            </motion.h2>
            <section
                className={css({
                    marginY: '10rem',
                })}
            >
                <div className={css({ overflow: 'hidden' })}>
                    <motion.div
                        initial={{ y: '100%' }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            delay: 0.2,
                            duration: 0.6,
                            type: 'spring',
                            bounce: 0,
                        }}
                    >
                        <Subheading size="lg">
                            Como o Healtie <br /> funciona
                        </Subheading>
                    </motion.div>
                </div>
                <section
                    className={css({
                        display: {
                            md: 'grid',
                            base: 'block',
                        },
                        gridTemplateColumns: '1fr 1fr 1fr',
                        gap: '2rem',
                        my: '2rem',
                    })}
                >
                    <div>
                        <MagnifyingGlassIcon
                            size={32}
                            className={css({ color: 'tint' })}
                        />
                        <Paragraph bolder size="subheadline">
                            Busca simplificada
                        </Paragraph>
                        <Paragraph>
                            Chega de navegar por listas confusas. Encontre
                            hospitais, UPAs e postos de saúde de forma rápida,
                            filtrando pelo que você precisa no momento.
                        </Paragraph>
                    </div>
                    <div>
                        <ChartLineIcon
                            size={32}
                            className={css({ color: 'tint' })}
                        />
                        <Paragraph bolder size="subheadline">
                            Status em tempo real
                        </Paragraph>
                        <Paragraph>
                            Acompanhe a situação operacional das unidades.
                            Verifique se o local está aberto e pronto para
                            atender antes mesmo de sair de casa.
                        </Paragraph>
                    </div>
                    <div>
                        <UsersThreeIcon
                            size={32}
                            className={css({ color: 'tint' })}
                        />
                        <Paragraph bolder size="subheadline">
                            Comunidade ativa
                        </Paragraph>
                        <Paragraph>
                            A transparência é nossa prioridade. Através dos
                            feedbacks dos usuários, criamos um ambiente de
                            confiança onde a experiência de um ajuda a decisão
                            de todos.
                        </Paragraph>
                    </div>
                </section>
                <Link variant="text" href={'/'}>
                    Saiba mais sobre como o Healtie funciona{' '}
                    <ArrowRightIcon weight="bold" />
                </Link>
            </section>
            <section
                className={css({
                    marginY: '10rem',
                    display: {
                        md: 'grid',
                        base: 'flex',
                    },
                    flexDirection: 'column',
                    gridTemplateColumns: '1fr auto',
                    gap: '4rem',
                })}
            >
                <div>
                    <div className={css({ overflow: 'hidden' })}>
                        <motion.div
                            initial={{ y: '100%' }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: 0.2,
                                duration: 0.6,
                                type: 'spring',
                                bounce: 0,
                            }}
                        >
                            <Subheading size="lg">
                                Dados que geram <br /> confiança
                            </Subheading>
                        </motion.div>
                    </div>
                    <Paragraph size="subheadline">
                        Acreditamos que o acesso à informação de saúde é um
                        direito. Por isso, agregamos dados de bases públicas e
                        os mantemos vivos através da colaboração da nossa
                        comunidade. O Healtie não é apenas um mapa; é uma
                        ferramenta de cidadania que promove a transparência em
                        todo o ecossistema de saúde.
                    </Paragraph>
                    <Link variant="text" href={'/'}>
                        Saiba mais sobre como obtemos os dados{' '}
                        <ArrowRightIcon weight="bold" />
                    </Link>
                </div>
                <ReliabilityAnimation />
            </section>
            <FAQ />
            <Image
                src={'/pictures/mascots.svg'}
                alt="Mascotes"
                width={200}
                height={100}
            />
        </div>
    )
}
