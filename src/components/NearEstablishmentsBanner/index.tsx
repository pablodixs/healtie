'use client'

import { useUserGeolocation } from '@/hooks/geolocation/useUserGeolocation'
import { AskLocationBanner } from '../AskLocationBanner'
import { useMemo } from 'react'
import { css } from '../../../styled-system/css'

import { establishments } from '@/utils/unidades.json'
import {
    calculateDistance,
    formatDistance,
} from '@/utils/functions/calculateDistance'
import type { Establishment } from '@/interfaces/Establishment'
import { AnimatePresence, motion } from 'motion/react'
import { Link } from '../Link'
import { EstablishmentIcon } from '../EstablishmentIcon'
import { CaretRightIcon, MapPinAreaIcon } from '@phosphor-icons/react/dist/ssr'
import { Tooltip } from '../Tooltip'
import { SectionTitle } from './SectionTitle'

export type NearbyEstablishment = Establishment & { distance: number }

export function NearEstablishmentsBanner() {
    const {
        coords,
        userDidAllowLocation,
        requestLocation,
        location,
        isLoadingLocation,
    } = useUserGeolocation()

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
            {!userDidAllowLocation && (
                <AskLocationBanner requestLocation={requestLocation} />
            )}
            {coords && (
                <div
                    className={css({
                        padding: '1rem',
                        backgroundColor: 'background',
                        borderRadius: '22px',
                    })}
                >
                    <header
                        className={css({
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        })}
                    >
                        <SectionTitle
                            Icon={MapPinAreaIcon}
                            title="Próximos de você"
                        />
                        <Link
                            href={`/buscar/proximos?lat=${coords.latitude}&lng=${coords.longitude}`}
                            size="sm"
                            variant="text"
                        >
                            Ver mais <CaretRightIcon />
                        </Link>
                    </header>
                    <AnimatePresence>
                        {isLoadingLocation ? (
                            <motion.p
                                initial={{
                                    opacity: 0,
                                    y: 10,
                                    filter: 'blur(4px)',
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    filter: 'blur(0px)',
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -10,
                                    filter: 'blur(4px)',
                                }}
                                className={css({
                                    color: 'neutral.600',
                                })}
                            >
                                Carregando...
                            </motion.p>
                        ) : (
                            <motion.p
                                initial={{
                                    opacity: 0,
                                    y: 10,
                                    filter: 'blur(4px)',
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    filter: 'blur(0px)',
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -10,
                                    filter: 'blur(4px)',
                                }}
                                className={css({
                                    color: 'neutral.500',
                                    fontSize: '0.875rem',
                                })}
                            >
                                Você está em {location}
                            </motion.p>
                        )}
                    </AnimatePresence>
                    <div
                        className={css({
                            display: 'flex',
                            flexDir: 'column',
                            gap: '1rem',
                            mt: '.5rem',
                        })}
                    >
                        {establishmentsWithDistance.length > 0 &&
                            establishmentsWithDistance.map((establishment) => (
                                <EstablishmentItem
                                    key={establishment.cnes}
                                    {...establishment}
                                />
                            ))}
                    </div>
                </div>
            )}
        </div>
    )
}

const EstablishmentItem = (establishment: NearbyEstablishment) => {
    return (
        <Link
            variant="asChild"
            href={`/estabelecimento/${establishment.cnes}`}
            className={css({
                padding: '0.75rem',
                backgroundColor: 'white',
                alignItems: 'center',
                borderRadius: '12px',
                display: 'flex',
                gap: '.75rem',
            })}
        >
            {/* <Tooltip content={establishment.type}>
                <EstablishmentIcon
                    decoration
                    size="small"
                    type={establishment.abb as 'HOSPITAL' | 'UBS' | 'UPA'}
                />
            </Tooltip> */}
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
