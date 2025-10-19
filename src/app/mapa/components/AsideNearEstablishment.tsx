import { useMemo } from 'react'

import { Paragraph } from '@/components/Typography'
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

interface AsideNearEstablishmentsProps {
    location: string | null
    coords: GeolocationCoordinates
}

type NearbyEstablishment = Establishment & { distance: number }

export function AsideNearEstablishments({
    location,
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
            {location && <Paragraph>{location}</Paragraph>}
            {establishmentsWithDistance.length > 0 &&
                establishmentsWithDistance.map((establishment) => (
                    <EstablishmentItem
                        key={establishment.cnes}
                        {...establishment}
                    />
                ))}
        </div>
    )
}

const EstablishmentItem = (establishment: NearbyEstablishment) => {
    const { setSelectedEstablishment } = useMapContext()

    return (
        <Link
            onClick={() => setSelectedEstablishment(establishment)}
            variant="asChild"
            href={`/mapa?establishment=${establishment.cnes}&lat=${establishment.location.latitude}&long=${establishment.location.longitude}`}
            className={css({
                padding: '0.75rem',
                backgroundColor: 'background',
                alignItems: 'center',
                borderRadius: '12px',
                display: 'flex',
                gap: '.75rem',
            })}
        >
            <Tooltip content={establishment.type}>
                <EstablishmentIcon
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
                    })}
                >
                    {establishment.name}
                </strong>
                <span
                    className={css({
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        lineHeight: '100%',
                        display: 'flex',
                        gap: '0.25rem',
                        color: 'green.600',
                        width: 'fit-content',
                    })}
                >
                    <MapPinAreaIcon weight="bold" />{' '}
                    {formatDistance(establishment.distance)}
                </span>
            </div>
        </Link>
    )
}
