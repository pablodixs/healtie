'use client'

import { usePathname, useRouter } from 'next/navigation'

import { Heading, Paragraph, Subheading } from '@/components/Typography'

import { establishments } from '@/utils/unidades.json'
import { TokenMissingState } from '@/components/Map'
import { css } from '../../../../styled-system/css'
import { Button } from '@/components/Button'
import {
    ArrowLeftIcon,
    ArrowUpRightIcon,
    BookmarkSimpleIcon,
    ChatCircleIcon,
    ClockCountdownIcon,
    GlobeIcon,
    MapPinAreaIcon,
    MapPinSimpleAreaIcon,
    PencilSimpleIcon,
    PhoneIcon,
    QuestionIcon,
    ShareIcon,
    SpeedometerIcon,
    WarningCircleIcon,
} from '@phosphor-icons/react'
import { MiniMap } from '@/components/Map/MiniMap'
import { MapContextProvider } from '@/context/MapContext'
import { Establishment } from '@/interfaces/Establishment'
import { Link } from '@/components/Link'
import { Divider } from '@/components/Divider'
import Image from 'next/image'
import { Tooltip } from '@/components/Tooltip'
import { Portal } from '@/components/Portal'
import { ReportModal } from '../components/ReportModal'
import { useState } from 'react'

export default function Page() {
    const path = usePathname()
    const router = useRouter()
    const id = path.split('/').pop()
    const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false)

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
                    maxW: '1280px',
                    margin: '0 auto',
                })}
            >
                <header
                    className={css({
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: '1rem',
                    })}
                >
                    <Tooltip content="Voltar" placement="right">
                        <Button
                            iconButton
                            variant="subtle"
                            onClick={() => router.back()}
                        >
                            <ArrowLeftIcon weight="bold" />
                        </Button>
                    </Tooltip>
                    <div
                        className={css({
                            display: 'flex',
                            gap: '2rem',
                            alignItems: 'center',
                        })}
                    >
                        <Button variant="textSubtle">
                            <ShareIcon size={18} /> Compartilhar
                        </Button>
                        <Button variant="textSubtle">
                            <BookmarkSimpleIcon size={18} /> Salvar
                        </Button>
                    </div>
                </header>
                <section
                    className={css({
                        display: 'grid',
                        gridTemplateColumns: '1fr 400px',
                        gap: '3rem',
                    })}
                >
                    <section>
                        <div>
                            <p
                                className={css({
                                    color: 'gray.500',
                                    fontWeight: 450,
                                })}
                            >
                                {establishment.type}
                            </p>
                            <Heading> {establishment.name}</Heading>
                            {establishment.description && (
                                <Paragraph subtle size="subheadline">
                                    {establishment.description}
                                </Paragraph>
                            )}
                            <section
                                className={css({
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '.5rem',
                                    color: 'gray.400',
                                    mb: '.25rem',
                                })}
                            >
                                <span
                                    className={css({
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.25rem',
                                        fontWeight: '500',
                                        marginY: '1rem',
                                        color: 'green.600',
                                    })}
                                >
                                    <ClockCountdownIcon
                                        weight="bold"
                                        size={18}
                                    />
                                    Aberto agora
                                </span>
                                <span>&bull;</span>
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
                                    <MapPinSimpleAreaIcon
                                        weight="bold"
                                        size={18}
                                    />
                                    Próximo de você
                                </span>
                            </section>
                        </div>
                        <div className={css({ display: 'flex', gap: '.5rem' })}>
                            <Button fullWidth>
                                <MapPinAreaIcon weight="bold" size={20} /> Estou
                                Aqui
                            </Button>
                            <Button
                                variant="subtle"
                                onClick={() => setIsReportModalOpen(true)}
                            >
                                <SpeedometerIcon size={20} /> Reportar
                            </Button>
                            <Button variant="subtle">
                                <ChatCircleIcon size={20} /> Comentar
                            </Button>
                            <Tooltip
                                content={`Ligar para ${establishment.phone}`}
                            >
                                <Button variant="subtle">
                                    <PhoneIcon size={20} />
                                </Button>
                            </Tooltip>
                            <Tooltip content={'Visitar o site'}>
                                <Button variant="subtle">
                                    <GlobeIcon size={20} />
                                </Button>
                            </Tooltip>
                        </div>
                        <Divider />
                        <Subheading>Indicadores</Subheading>
                        <Tooltip content="Indicadores atualizados em tempo real, baseados nas últimas informações disponíveis">
                            <Paragraph
                                marginCompact
                                subtle
                                size="caption"
                                style={{ userSelect: 'none' }}
                            >
                                Atualizado há 2 minutos
                            </Paragraph>
                        </Tooltip>
                        <section
                            className={css({
                                mt: '1rem',
                            })}
                        >
                            <div>
                                <Paragraph
                                    bolder
                                    size="subheadline"
                                    marginCompact
                                >
                                    Classificação do Healtie
                                </Paragraph>
                                <div
                                    className={css({
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    })}
                                >
                                    <div
                                        className={css({
                                            display: 'flex',
                                            gap: '.75rem',
                                            alignItems: 'baseline',
                                            lineHeight: 1,
                                            marginY: '.5rem',
                                        })}
                                    >
                                        <span
                                            className={css({
                                                fontSize: '3.5rem',
                                                fontWeight: 600,
                                                letterSpacing: '-0.025em',
                                                color: '#151515',
                                            })}
                                        >
                                            7.2
                                        </span>
                                        <span
                                            className={css({
                                                fontSize: '1.75rem',
                                                letterSpacing: '-0.025em',
                                                fontWeight: 600,
                                                color: 'green.600',
                                            })}
                                        >
                                            Bom
                                        </span>
                                    </div>
                                    <div></div>
                                </div>
                            </div>
                            <Divider margin="compact" />
                            <div
                                className={css({
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                })}
                            >
                                <Paragraph bolder>
                                    Tempo de espera para atendimento
                                </Paragraph>
                                <div>
                                    <span
                                        className={css({
                                            fontSize: '1.75rem',
                                            fontWeight: 600,
                                            letterSpacing: '-0.025em',
                                            color: '#151515',
                                        })}
                                    >
                                        120 min
                                    </span>
                                </div>
                            </div>
                            <Divider margin="compact" />
                        </section>
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
                            size="sm"
                            variant="subtle"
                            target="_blank"
                            href={`https://www.google.com/maps/dir/?api=1&destination=${establishment.location.latitude},${establishment.location.longitude}`}
                        >
                            <Image
                                src={'/pictures/google_maps_icon.png'}
                                alt="Ícone do Google Maps "
                                width={12}
                                height={12}
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
                                size="sm"
                                variant="textSubtle"
                                href="https://cnes2.datasus.gov.br/Index.asp?home=1"
                                target="_blank"
                            >
                                DATASUS
                            </Link>
                        </Paragraph>
                        <Divider margin="compact" />
                        <div
                            className={css({
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                            })}
                        >
                            <Button variant="textSubtle">
                                <PencilSimpleIcon /> Sugerir edição
                            </Button>
                            <Button variant="textSubtle">
                                <WarningCircleIcon /> Relatar erro
                            </Button>
                            <Button variant="textSubtle">
                                <QuestionIcon /> Ajuda
                            </Button>
                            <Button variant="textSubtle">
                                <SpeedometerIcon /> Métricas{' '}
                                <ArrowUpRightIcon size={12} />
                            </Button>
                        </div>
                    </aside>
                </section>
            </main>
            <Portal>
                {isReportModalOpen && (
                    <ReportModal
                        isOpen={isReportModalOpen}
                        onOpenChange={setIsReportModalOpen}
                        establishment={establishment as Establishment}
                    />
                )}
            </Portal>
        </MapContextProvider>
    )
}
