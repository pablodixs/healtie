'use client'

import { useUserGeolocation } from '@/hooks/geolocation/useUserGeolocation'
import { AskLocationBanner } from '../AskLocationBanner'
import { css } from '../../../styled-system/css'

import { formatDistanceFromMeters } from '@/utils/functions/calculateDistance'
import type { Establishment } from '@/interfaces/Establishment'
import { AnimatePresence, motion } from 'motion/react'
import { Link } from '../Link'
import {
    AmbulanceIcon,
    CaretRightIcon,
    CircleNotchIcon,
    FirstAidIcon,
    HospitalIcon,
    MapPinAreaIcon,
} from '@phosphor-icons/react/dist/ssr'
import { SectionTitle } from './SectionTitle'
import { NearbyEstablishmentsResponse } from '../Map/AsideNearEstablishment'
import useSWR from 'swr'
import { fetcher } from '@/lib/swrFetcher'
import { markerContainer } from '../Map/maker.styles'

export type NearbyEstablishment = Establishment & { distance: number }

export function NearEstablishmentsBanner() {
    const {
        coords,
        userDidAllowLocation,
        requestLocation,
        location,
        isLoadingLocation,
    } = useUserGeolocation()

    const { data, isLoading } = useSWR<NearbyEstablishmentsResponse[]>(
        coords
            ? `https://https://healtie-bh7zc.ondigitalocean.app/v1/establishment/nearby?latitude=${coords?.latitude}&longitude=${coords?.longitude}&radiusInKm=5000`
            : null,
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    )

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
                        maxW: '800px',
                        margin: '0 auto',
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
                        {isLoading && (
                            <div
                                className={css({
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    justifyContent: 'center',
                                })}
                            >
                                <CircleNotchIcon
                                    className={css({
                                        animation: 'spin',
                                        color: 'neutral.500',
                                    })}
                                    weight="bold"
                                    size={20}
                                />{' '}
                                Carregando estabelecimentos...
                            </div>
                        )}
                        {data &&
                            data.length > 0 &&
                            data.map((establishment) => (
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

const EstablishmentItem = (establishment: NearbyEstablishmentsResponse) => {
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
            <motion.div
                className={markerContainer({
                    type: establishment.type as
                        | 'Hospital Geral'
                        | 'Unidade Básica de Saúde'
                        | 'Unidade de Pronto Atendimento',
                })}
            >
                {establishment.type === 'Hospital Geral' && (
                    <HospitalIcon weight="fill" />
                )}
                {establishment.type === 'Unidade Básica de Saúde' && (
                    <FirstAidIcon weight="fill" />
                )}
                {establishment.type === 'Unidade de Pronto Atendimento' && (
                    <AmbulanceIcon weight="fill" />
                )}
            </motion.div>
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
                    {formatDistanceFromMeters(establishment.distance)}
                </span>
            </div>
        </Link>
    )
}
