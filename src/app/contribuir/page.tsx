'use client'

import Link from 'next/link'
import Image from 'next/image'
import Lottie from 'lottie-react'

import { css } from '../../../styled-system/css'
import { stack } from '../../../styled-system/patterns'

import { Heading } from '@/components/Typography/Heading'
import { Paragraph } from '@/components/Typography/Paragraph'
import { Divider } from '@/components/Divider'
import { Subheading } from '@/components/Typography/Subheading'

import animation from '@/assets/lotties/contribuir.json'

export default function Page() {
    return (
        <main>
            <header
                className={stack({
                    align: 'center',
                    marginTop: '4rem',
                    paddingTop: { base: '5rem' },
                    padding: { base: '0 1rem', md: '0 2rem' },
                })}
            >
                <Heading centered>Contribua com o Healtie</Heading>
                <Paragraph centered subtle compact>
                    Ajude a manter o Healtie sempre atualizado. Aqui você pode
                    indicar novos estabelecimentos de saúde, corrigir
                    informações incorretas e contribuir para que mais pessoas
                    tenham acesso a dados confiáveis e acessíveis.
                </Paragraph>
                <Lottie
                    style={{
                        borderRadius: 12,
                        overflow: 'hidden',
                        maxWidth: 1000,
                    }}
                    animationData={animation}
                />
            </header>
            <Divider />
            <Subheading>Como você pode contribuir</Subheading>
            <section
                className={css({
                    mt: '1.5rem',
                    display: 'grid',
                    gap: '1rem',
                    gridTemplateColumns:
                        'repeat(auto-fill, minmax(300px, 1fr))',
                })}
            >
                <Link
                    href="/contribuir/estabelecimentos"
                    className={css({
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '.5rem',
                        borderRadius: '0.75rem',
                        backgroundColor: 'white',
                        border: '1px solid',
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                        color: '#202020',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontWeight: 450,
                        fontSize: '1.125rem',
                        minWidth: '100px',
                        transition: 'all ease 0.1s',

                        _hover: {
                            borderColor: 'rgba(0, 0, 0, 0.25)',
                        },
                    })}
                >
                    <Image
                        src={'/pictures/establishment_ubs.png'}
                        alt={''}
                        width={320}
                        height={200}
                        className={css({
                            width: '100%',
                            height: '160px',
                            objectFit: 'cover',
                            aspectRatio: '1/1',
                            borderRadius: 'calc(1rem - 0.5rem)',
                        })}
                        quality={100}
                    />
                    <span
                        className={css({
                            mt: '.75rem',
                            lineHeight: 'tight',
                        })}
                    >
                        Estabelecimentos
                    </span>
                    <Paragraph size="caption" subtle>
                        Indique um estabelecimento ou corrija informações
                        incorretas
                    </Paragraph>
                </Link>
            </section>
        </main>
    )
}
