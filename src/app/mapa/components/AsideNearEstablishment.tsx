import { HTMLAttributes, useMemo } from 'react'

import { Establishment } from '@/interfaces/Establishment'

import { establishments } from '@/utils/unidades.json'
import {
    calculateDistance,
    formatDistance,
} from '@/utils/functions/calculateDistance'
import { MapPinAreaIcon } from '@phosphor-icons/react/dist/ssr'
import { css } from '../../../../styled-system/css'
import { EstablishmentIcon } from '@/components/EstablishmentIcon'
import { Tooltip } from '@/components/Tooltip'
import { Link } from '@/components/Link'
import { useMapContext } from '@/context/MapContext'
import { Paragraph } from '@/components/Typography'

interface AsideNearEstablishmentsProps {
    location: string | null
    coords: GeolocationCoordinates
}

type NearbyEstablishment = Establishment & { distance: number }

export function AsideNearEstablishments({
    coords,
}: AsideNearEstablishmentsProps) {
    const establishmentsWithDistance: NearbyEstablishment[] = useMemo(() => {
        if (!coords) return []

        return establishments
            .map<NearbyEstablishment>((establishment) => {
                const distance = calculateDistance(
                    coords.latitude,
                    coords.longitude,
                    establishment.location.latitude,
                    establishment.location.longitude
                )

                return {
                    ...establishment,
                    distance,
                }
            })
            .filter((establishment) => establishment.distance <= 10)
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 5)
    }, [coords])

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
                {establishmentsWithDistance.length > 0 &&
                    establishmentsWithDistance.map((establishment) => (
                        <EstablishmentItem
                            key={establishment.cnes}
                            establishment={establishment}
                        />
                    ))}
            </div>
        </div>
    )
}

export const EstablishmentItem = ({
    establishment,
    onClick,
}: {
    establishment: NearbyEstablishment
} & HTMLAttributes<HTMLDivElement>) => {
    const { setSelectedEstablishment } = useMapContext()

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        setSelectedEstablishment(establishment)
        if (onClick) {
            onClick(e as unknown as React.MouseEvent<HTMLDivElement>)
        }
    }

    return (
        <Link
            onClick={handleClick}
            variant="asChild"
            href={`/mapa?establishment=${establishment.cnes}&lat=${establishment.location.latitude}&long=${establishment.location.longitude}`}
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
                    type={establishment.abb as 'HOSPITAL' | 'UBS' | 'UPA'}
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
                        {formatDistance(establishment.distance)}
                    </span>
                </div>
            </div>
        </Link>
    )
}
