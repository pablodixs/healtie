'use client'

import { usePathname } from 'next/navigation'

import { campanhas } from '@/utils/campanhas.json'
import { Heading, Paragraph, Subheading } from '@/components/Typography'
import { css } from '../../../../styled-system/css'
import { Divider } from '@/components/Divider'
import { Link } from '@/components/Link'
import {
    ArrowUpRightIcon,
    CheckCircleIcon,
    ListBulletsIcon,
} from '@phosphor-icons/react'
import { Button } from '@/components/Button'

export default function Page() {
    const path = usePathname()
    const campaignId = path.split('/')[2]

    const data = campanhas.find((c) => c.campaignId === campaignId)

    if (!data) {
        return <Heading>Campanha não encontrada</Heading>
    }

    return (
        <main
            className={css({
                minHeight: '90dvh',
                maxWidth: '1000px',
                margin: '0 auto',
            })}
        >
            <Heading centered>{data.title}</Heading>
            <div
                className={css({
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2rem',
                    marginY: '2rem',
                })}
            >
                <Paragraph>
                    De{' '}
                    <Link variant="textSubtle" target="_blank" href={data.url}>
                        {data.source}
                    </Link>
                </Paragraph>
                <span
                    className={css({
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                    })}
                >
                    <svg
                        width="1lh"
                        height="1lh"
                        viewBox="0 0 36 36"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="img"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <path
                            fill="#009B3A"
                            d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v18z"
                        ></path>
                        <path
                            fill="#FEDF01"
                            d="M32.728 18L18 29.124L3.272 18L18 6.875z"
                        ></path>
                        <circle
                            fill="#002776"
                            cx="17.976"
                            cy="17.924"
                            r="6.458"
                        ></circle>
                        <path
                            fill="#CBE9D4"
                            d="M12.277 14.887a6.406 6.406 0 0 0-.672 2.023c3.995-.29 9.417 1.891 11.744 4.595c.402-.604.7-1.28.883-2.004c-2.872-2.808-7.917-4.63-11.955-4.614z"
                        ></path>
                        <path
                            fill="#88C9F9"
                            d="M12 18.233h1v1h-1zm1 2h1v1h-1z"
                        ></path>
                        <path
                            fill="#55ACEE"
                            d="M15 18.233h1v1h-1zm2 1h1v1h-1zm4 2h1v1h-1zm-3 1h1v1h-1zm3-6h1v1h-1z"
                        ></path>
                        <path fill="#3B88C3" d="M19 20.233h1v1h-1z"></path>
                    </svg>
                    {data.coverage}
                </span>
                <Link variant="textSubtle" href={data.url}>
                    Fonte <ArrowUpRightIcon weight="bold" />
                </Link>
            </div>
            <div
                className={css({
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem',
                    my: '1rem',
                })}
            >
                <Button size="large">
                    <ListBulletsIcon size={20} /> Ver unidades participantes
                </Button>
                <Button size="large" variant="subtle">
                    <CheckCircleIcon size={20} /> Já participei desta campanha
                </Button>
            </div>
            <Divider />
            <Paragraph>
                O Ministério da Saúde lançou, nesta quarta-feira (1), a Campanha
                Nacional de Multivacinação voltada para o público de até 15 anos
                de idade. Mais de 6,8 milhões de doses foram distribuídas para a
                ação que será realizada entre os dias 6 e 31 de outubro, com Dia
                D de mobilização marcado para o dia 18/10. Nesta data, um
                sábado, os postos de saúde ficarão abertos para proteger todas
                as famílias.
            </Paragraph>
            <section>
                <Subheading>Próximos de Você</Subheading>
            </section>
        </main>
    )
}
