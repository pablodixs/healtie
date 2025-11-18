import { HTMLAttributes } from 'react'

import { formatDistanceFromMeters } from '@/utils/functions/calculateDistance'
import { CircleNotchIcon, MapPinAreaIcon } from '@phosphor-icons/react/dist/ssr'
import { css } from '../../../../styled-system/css'
import { EstablishmentIcon } from '@/components/EstablishmentIcon'
import { Tooltip } from '@/components/Tooltip'
import { Link } from '@/components/Link'
import { Paragraph } from '@/components/Typography'
import useSWR from 'swr'
import { fetcher } from '@/lib/swrFetcher'
import { useMapContext } from '@/context/MapContext'

interface AsideNearEstablishmentsProps {
    location: string | null
    coords: GeolocationCoordinates
}

export interface NearbyEstablishmentsResponse {
    cnes: number
    name: string
    type: string
    distance: number
    geolocation: {
        latitude: number
        longitude: number
    }
}

export function AsideNearEstablishments({
    coords,
}: AsideNearEstablishmentsProps) {
    const { data, isLoading } = useSWR<NearbyEstablishmentsResponse[]>(
        `https://https://healtie-bh7zc.ondigitalocean.app//v1/establishment/nearby?latitude=${coords.latitude}&longitude=${coords.longitude}&radiusInKm=5000`,
        fetcher
    )

    return (
        <div>
            <Link
                href={`/buscar/proximos`}
                variant="asChild"
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Paragraph marginCompact subtle>
                    Estabelecimentos próximos
                </Paragraph>
            </Link>
            <div
                className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '.5rem',
                })}
            >
                {data &&
                    data.map((establishment) => {
                        return (
                            <EstablishmentItem
                                key={establishment.cnes}
                                establishment={establishment}
                            />
                        )
                    })}
                {isLoading && (
                    <div
                        className={css({
                            py: '1rem',
                            color: 'neutral.500',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '.75rem',
                        })}
                    >
                        <CircleNotchIcon
                            className={css({
                                animation: 'spin',
                                color: 'neutral.300',
                            })}
                            weight="bold"
                            size={20}
                        />
                        Carregando estabelecimentos...
                    </div>
                )}
                {data?.length === 0 && (
                    <div>Nenhum estabelecimento próximo encontrado.</div>
                )}
            </div>
        </div>
    )
}

export const EstablishmentItem = ({
    establishment,
}: {
    establishment: NearbyEstablishmentsResponse
} & HTMLAttributes<HTMLDivElement>) => {
    const { setSelectedEstablishment } = useMapContext()

    const handleClick = () => {
        setSelectedEstablishment(establishment)
    }

    return (
        <Link
            onClick={handleClick}
            variant="asChild"
            href={`/mapa?establishment=${establishment.cnes}`}
            className={css({
                paddingY: '0.5rem',
                alignItems: 'center',
                borderRadius: '12px',
                display: 'flex',
                gap: '.75rem',
            })}
        >
            <Tooltip content={establishment.type}>
                <EstablishmentIcon
                    animation={false}
                    decoration
                    size="small"
                    type={
                        establishment.type as
                            | 'Hospital Geral'
                            | 'Unidade Básica de Saúde'
                            | 'Unidade de Pronto Atendimento'
                    }
                />
            </Tooltip>
            <div
                className={css({
                    display: 'flex',
                    flexDir: 'column',
                    alignItems: 'flex-start',
                })}
            >
                <strong
                    className={css({
                        fontWeight: 550,
                        color: 'primary',
                        fontSize: '0.9375rem',
                    })}
                >
                    {establishment.name}
                </strong>
                <div
                    className={css({
                        fontSize: '0.875rem',
                        lineHeight: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'neutral.500',
                    })}
                >
                    <span className={css({ color: 'green.600' })}>
                        Aberto 24h
                    </span>
                    <span
                        className={css({
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            width: 'fit-content',
                        })}
                    >
                        <MapPinAreaIcon size={15} />{' '}
                        {formatDistanceFromMeters(establishment.distance)} de
                        distância
                    </span>
                </div>
            </div>
        </Link>
    )
}
