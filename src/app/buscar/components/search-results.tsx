'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import {
    AmbulanceIcon,
    CaretRightIcon,
    FirstAidIcon,
    HospitalIcon,
    MapPinIcon,
    PhoneIcon,
} from '@phosphor-icons/react'

import { css } from '../../../../styled-system/css'

import {
    calculateDistance,
    formatDistance,
} from '@/utils/functions/calculateDistance'

import { Button } from '@/components/Button'
import { Divider } from '@/components/Divider'
import { Paragraph } from '@/components/Typography'
import { markerContainer } from '@/components/Map/maker.styles'
import { PageableEstablishmentResponse } from '@/interfaces/Establishment'

interface SearchResultsProps {
    data: PageableEstablishmentResponse
    coords: GeolocationCoordinates | null
}

export function SearchResults({ data, coords }: SearchResultsProps) {
    return (
        <motion.div
            className={css({
                width: '100%',
                maxWidth: '1280px',
                padding: {
                    md: '0 1rem',
                    base: '1rem',
                },
            })}
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
        >
            <div
                className={css({
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                })}
            >
                <Paragraph size="caption" subtle>
                    {data.content.length} resultados
                </Paragraph>
            </div>
            <Divider margin="ultracompact" />
            <div
                className={css({
                    alignItems: 'flex-start',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: '1rem',
                })}
            >
                {data.content.map((establishment, index) => (
                    <Link
                        href={`/estabelecimento/${establishment.cnes}`}
                        key={establishment.cnes}
                        className={css({
                            paddingY: '1rem',
                            width: '100%',
                            gap: '.25rem',
                            borderBottom: '1px solid',
                            borderColor: 'neutral.50',

                            _hover: {
                                '& b': {
                                    color: 'oklch(0.543 0.196 252.7)',
                                    textDecoration: 'underline',
                                    textDecorationColor:
                                        'oklch(0.950 0.024 252.7)',
                                    textDecorationThickness: '2px',
                                    textUnderlineOffset: '3px',
                                },
                            },
                        })}
                    >
                        <div
                            className={css({
                                display: 'flex',
                                gap: '0.75rem',
                                alignItems: 'center',
                            })}
                        >
                            <span
                                className={css({
                                    display: 'flex',
                                    gap: '0.5rem',
                                    alignItems: 'center',
                                    marginBottom: '0.25rem',
                                })}
                            >
                                <div
                                    className={markerContainer({
                                        type: establishment.type as
                                            | 'Hospital Geral'
                                            | 'Unidade Básica de Saúde'
                                            | 'Unidade de Pronto Atendimento',
                                        size: 'xs',
                                        square: true,
                                    })}
                                >
                                    {establishment.type ===
                                        'Hospital Geral' && (
                                        <HospitalIcon weight="fill" />
                                    )}
                                    {establishment.type ===
                                        'Unidade Básica de Saúde' && (
                                        <FirstAidIcon weight="fill" />
                                    )}
                                    {establishment.type ===
                                        'Unidade de Pronto Atendimento' && (
                                        <AmbulanceIcon weight="fill" />
                                    )}
                                </div>
                                <Paragraph size="caption" marginCompact bolder>
                                    {establishment.type}
                                </Paragraph>
                            </span>
                        </div>
                        <div
                            className={css({
                                display: 'flex',
                                justifyContent: 'space-between',
                            })}
                        >
                            <div
                                className={css({
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                })}
                            >
                                <b
                                    className={css({
                                        fontWeight: 500,
                                        fontSize: '1.125rem',
                                        color: 'oklch(0.643 0.196 252.7)',
                                    })}
                                >
                                    {establishment.name}
                                </b>
                                <div>
                                    <div
                                        className={css({
                                            display: 'flex',
                                            gap: '1ch',
                                            alignItems: 'center',
                                            marginTop: '0.25rem',
                                            fontSize: '0.875rem',
                                            color: 'neutral.600',
                                        })}
                                    >
                                        <span>
                                            {establishment.street} &bull;{' '}
                                            {establishment.district},{' '}
                                            {establishment.city}
                                        </span>
                                        {establishment.phone && (
                                            <span
                                                className={css({
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.25rem',
                                                })}
                                            >
                                                <PhoneIcon size={16} />{' '}
                                                {establishment.phone}
                                            </span>
                                        )}
                                    </div>
                                    {coords && (
                                        <div
                                            className={css({
                                                display: 'flex',
                                                gap: '1ch',
                                                alignItems: 'center',
                                                marginTop: '0.25rem',
                                            })}
                                        >
                                            <span
                                                className={css({
                                                    fontSize: '0.875rem',
                                                    color: 'green.600',
                                                })}
                                            >
                                                A{' '}
                                                {formatDistance(
                                                    calculateDistance(
                                                        coords?.latitude,
                                                        coords?.longitude,
                                                        establishment
                                                            .coordinates
                                                            ?.latitude,
                                                        establishment
                                                            .coordinates
                                                            ?.longitude
                                                    )
                                                )}{' '}
                                                de distância
                                            </span>
                                            {index === 0 && (
                                                <div
                                                    className={css({
                                                        padding: '4px 8px',
                                                        backgroundColor:
                                                            'green.50',
                                                        fontSize: '0.875rem',
                                                        lineHeight: '1',
                                                        marginY: '0.25rem',
                                                        borderRadius: '9999px',
                                                        color: 'green.700',
                                                        fontWeight: 500,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.25rem',
                                                    })}
                                                >
                                                    <MapPinIcon weight="bold" />
                                                    <p>Mais próximo de você</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div
                                className={css({
                                    display: 'flex',
                                    gap: '1rem',
                                    alignItems: 'center',
                                })}
                            >
                                <Button variant="bordered" iconButton>
                                    <CaretRightIcon />
                                </Button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </motion.div>
    )
}
