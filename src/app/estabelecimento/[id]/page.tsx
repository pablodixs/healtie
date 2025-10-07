'use client'

import { usePathname, useRouter } from 'next/navigation'

import { Heading, Paragraph } from '@/components/Typography'

import { establishments } from '@/utils/unidades.json'
import { TokenMissingState } from '@/components/Map'
import { css } from '../../../../styled-system/css'
import { Button } from '@/components/Button'
import {
    ArrowLeftIcon,
    ArrowUpRightIcon,
    ClockCountdownIcon,
    MapPinAreaIcon,
    QuestionIcon,
    WarningCircleIcon,
} from '@phosphor-icons/react'
import { MiniMap } from '@/components/Map/MiniMap'
import { MapContextProvider } from '@/context/MapContext'
import { Establishment } from '@/interfaces/Establishment'
import { Link } from '@/components/Link'
import { Divider } from '@/components/Divider'
import Image from 'next/image'

export default function Page() {
    const path = usePathname()
    const id = path.split('/').pop()
    const router = useRouter()

    const establishment = establishments.find((est) => est.cnes === Number(id))

    if (!establishment) {
        return (
            <div
                className={css({
                    minHeight: '100dvh',
                })}
            >
                <TokenMissingState />
            </div>
        )
    }

    return (
        <MapContextProvider>
            <main
                className={css({
                    minHeight: '90dvh',
                    maxW: '1200px',
                    margin: '0 auto',
                })}
            >
                <header>
                    <Button variant="subtle" onClick={() => router.back()}>
                        <ArrowLeftIcon weight="bold" /> Voltar
                    </Button>
                </header>
                <section
                    className={css({
                        display: 'grid',
                        gridTemplateColumns: '1fr 400px',
                    })}
                >
                    <section>
                        <div>
                            <Paragraph>{establishment.type}</Paragraph>
                            <Heading> {establishment.name}</Heading>
                            <span
                                className={css({
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.25rem',
                                    fontWeight: '500',
                                    color: 'green.600',
                                    marginY: '1rem',
                                })}
                            >
                                <ClockCountdownIcon weight="bold" size={18} />
                                Aberto agora
                            </span>
                        </div>
                        <div>
                            <Button size="large">
                                <MapPinAreaIcon weight="bold" /> Estou Aqui
                            </Button>
                        </div>
                    </section>
                    <aside>
                        <Link
                            className={css({
                                position: 'relative',

                                '& button': {
                                    opacity: '0',
                                },

                                _hover: {
                                    '& button': {
                                        opacity: '1',
                                    },
                                },
                            })}
                            variant="asChild"
                            href={`/mapa?establishment=${establishment.cnes}&lat=${establishment.location.latitude}&long=${establishment.location.longitude}&from=search-page`}
                        >
                            <MiniMap data={establishment as Establishment} />
                            <Button
                                variant="secondary"
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    left: '1rem',
                                }}
                            >
                                Ver no Mapa <ArrowUpRightIcon weight="bold" />
                            </Button>
                        </Link>
                        <Link
                            variant="subtle"
                            target="_blank"
                            href={`https://www.google.com/maps/dir/?api=1&destination=${establishment.location.latitude},${establishment.location.longitude}`}
                        >
                            <Image
                                src={'/pictures/google_maps_icon.png'}
                                alt="Ícone do Google Maps "
                                width={14}
                                height={14}
                                style={{ marginRight: 4 }}
                            />
                            Ver rotas no Google Maps{' '}
                            <ArrowUpRightIcon color="rgba(0, 0, 0, 0.25)" />
                        </Link>
                        <Divider margin="compact" />
                        <Paragraph subtle bolder>
                            Informações do Estabelecimento
                        </Paragraph>
                        <Paragraph size="caption">
                            Telefone: <b>{establishment.phone}</b>
                        </Paragraph>
                        <Paragraph size="caption">
                            Endereço: <b>{establishment.address}</b>
                        </Paragraph>
                        <Paragraph size="caption">
                            Cidade:{' '}
                            <b>
                                {establishment.district}, {establishment.city} -{' '}
                                {establishment.state}
                            </b>
                        </Paragraph>
                        <Paragraph size="caption">
                            Tipo: <b>{establishment.type}</b>
                        </Paragraph>
                        <Paragraph size="caption">
                            CNES:
                            <b> {establishment.cnes}</b>
                        </Paragraph>
                        <Divider margin="compact" />
                        <Paragraph size="caption" subtle>
                            Fontes dos dados do estabelecimento:{' '}
                            <Link
                                variant="text"
                                href="https://cnes2.datasus.gov.br/Index.asp?home=1"
                                target="_blank"
                            >
                                DATASUS
                            </Link>
                        </Paragraph>
                        <div
                            className={css({
                                display: 'flex',
                                gap: '1.5rem',
                            })}
                        >
                            <Button variant="textSubtle">
                                <WarningCircleIcon /> Relatar erro
                            </Button>
                            <Button variant="textSubtle">
                                <QuestionIcon /> Ajuda
                            </Button>
                        </div>
                    </aside>
                </section>
            </main>
        </MapContextProvider>
    )
}
