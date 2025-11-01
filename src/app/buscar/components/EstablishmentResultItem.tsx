import { NearbyEstablishment } from '@/components/NearEstablishmentsBanner'
import { Establishment } from '@/interfaces/Establishment'
import { css } from '../../../../styled-system/css'
import { Link } from '@/components/Link'
import { EstablishmentIcon } from '@/components/EstablishmentIcon'
import { formatDistance } from '@/utils/functions/calculateDistance'
import { Tooltip } from '@/components/Tooltip'
import { CaretRightIcon, MapTrifoldIcon } from '@phosphor-icons/react/dist/ssr'

interface EstablishmentResultItemProps {
    establishment: NearbyEstablishment | Establishment
}

export function EstablishmentResultItem({
    establishment,
}: EstablishmentResultItemProps) {
    return (
        <div
            key={establishment.cnes}
            className={css({
                width: '100%',
                borderRadius: '12px',
                padding: { md: '1rem', base: '0.5rem' },
                mb: '1rem',

                _hover: {
                    backgroundColor: 'neutral.100',
                },
            })}
        >
            <div
                className={css({
                    fontSize: '1.125rem',
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                })}
            >
                <Link
                    variant="asChild"
                    href={`/estabelecimento/${establishment.cnes}`}
                    className={css({
                        display: 'flex',
                        gap: '.5rem',
                        alignItems: 'center',
                    })}
                >
                    <EstablishmentIcon
                        type={establishment.abb as 'HOSPITAL' | 'UBS' | 'UPA'}
                        decoration
                        animation={false}
                    />
                    <div
                        className={css({
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                        })}
                    >
                        <b
                            className={css({
                                fontWeight: 500,
                                color: 'primary',
                            })}
                        >
                            {establishment.name}
                        </b>
                        <div
                            className={css({
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '.25rem',
                                alignItems: 'center',
                                fontSize: '0.875rem',
                                color: 'gray.500',
                            })}
                        >
                            <b
                                className={css({
                                    color: 'green.600',
                                    fontWeight: 500,
                                })}
                            >
                                Aberto agora
                            </b>
                            <span>&bull;</span>
                            <span>
                                {establishment.district}, {establishment.city}
                            </span>
                            <span>&bull;</span>
                            {'distance' in establishment &&
                                establishment.distance && (
                                    <b
                                        className={css({
                                            fontWeight: 500,
                                        })}
                                    >
                                        {formatDistance(establishment.distance)}{' '}
                                        de distância
                                    </b>
                                )}
                        </div>
                    </div>
                </Link>
                <div
                    className={css({
                        display: 'flex',
                        gap: {
                            md: '1rem',
                            base: '0.5rem',
                        },
                        alignItems: 'center',
                    })}
                >
                    <Tooltip content="Ver no mapa">
                        <Link
                            onlyIcon
                            variant="bordered"
                            href={`/mapa?establishment=${establishment.cnes}&lat=${establishment.location.latitude}&long=${establishment.location.longitude}&from=search-page`}
                        >
                            <MapTrifoldIcon size={18} weight="bold" />
                        </Link>
                    </Tooltip>
                    <Tooltip content="Ver detalhes">
                        <Link
                            onlyIcon
                            variant="textSubtle"
                            href={`/estabelecimento/${establishment.cnes}`}
                        >
                            <CaretRightIcon size={20} weight="bold" />
                        </Link>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}
