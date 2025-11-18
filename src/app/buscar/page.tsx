'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter, useSearchParams } from 'next/navigation'

import { css } from '../../../styled-system/css'

import { HeroSearchBar } from '../ui/components/HeroSearchBar'

import { Heading } from '@/components/Typography/Heading'

const allowedFilters = ['HOSPITAL', 'UPA', 'UBS'] as const
type AllowedFilter = (typeof allowedFilters)[number]
function isAllowedFilter(value: string | null): value is AllowedFilter {
    return !!value && allowedFilters.includes(value as AllowedFilter)
}
import { NoResultsEmptyState } from './components/NoResultsEmpytState'
import { Paragraph } from '@/components/Typography/Paragraph'
import { NearEstablishmentsBanner } from '@/components/NearEstablishmentsBanner'
import { Banner } from '@/components/Banner'
import {
    CaretRightIcon,
    CircleNotchIcon,
    QuestionIcon,
} from '@phosphor-icons/react/dist/ssr'
import { EstablishmentPointResponse } from '@/interfaces/Establishment'
import useSWR from 'swr'
import { fetcher } from '@/lib/swrFetcher'
import Link from 'next/link'
import { MapMarkerDecoration } from '@/components/Map/MapMarkerDecoration'
import {
    calculateDistance,
    formatDistance,
} from '@/utils/functions/calculateDistance'
import { useUserGeolocation } from '@/hooks/geolocation/useUserGeolocation'

export default function Page() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [establishmentFilter, setEstablishmentFilter] = useState<
        string | null
    >(null)
    const initialQuery = searchParams.get('q') || ''
    const [debounced, setDebounced] = useState('')
    const [localQuery, setLocalQuery] = useState(initialQuery)
    const { coords } = useUserGeolocation()

    const query = searchParams.get('q') || ''
    const rawFilterParam = searchParams.get('filter')
    const filterParam = isAllowedFilter(rawFilterParam) ? rawFilterParam : null

    useEffect(() => {
        setLocalQuery(query)
    }, [query])

    useEffect(() => {
        setEstablishmentFilter(filterParam)
    }, [filterParam])

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value
            setLocalQuery(value)
        },
        []
    )

    const handleFilterChange = useCallback(
        (
            newFilter: string | null | ((prev: string | null) => string | null)
        ) => {
            if (typeof newFilter === 'function') {
                setEstablishmentFilter((prev) => newFilter(prev))
            } else {
                setEstablishmentFilter(newFilter)
            }
        },
        []
    )

    const { data, isLoading, error } = useSWR<EstablishmentPointResponse[]>(
        debounced && debounced.length >= 3
            ? `https://healtie-bh7zc.ondigitalocean.app/v1/establishment/search?q=${encodeURIComponent(
                  debounced
              )}${
                  establishmentFilter
                      ? `&t=${encodeURIComponent(establishmentFilter)}`
                      : ''
              }`
            : null,
        fetcher
    )

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounced(localQuery)

            // Atualizar a URL do navegador
            const params = new URLSearchParams()
            if (localQuery) {
                params.set('q', localQuery)
            }

            if (establishmentFilter) {
                params.set('filter', establishmentFilter)
            }

            const newUrl = params.toString()
                ? `/buscar?${params.toString()}`
                : '/buscar'

            router.replace(newUrl, { scroll: false })
        }, 300)
        return () => clearTimeout(timer)
    }, [localQuery, establishmentFilter, router])

    return (
        <main
            className={css({
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                alignItems: 'center',
                gap: '1rem',
                minHeight: '95dvh',
            })}
        >
            <div
                className={css({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1ch',
                })}
            >
                <Heading>Buscar</Heading>
            </div>
            <HeroSearchBar
                showFilterOptions
                filterValue={establishmentFilter}
                onFilterChange={handleFilterChange}
                autoFocus
                value={localQuery}
                onChange={handleChange}
            />
            <AnimatePresence mode="sync">
                {data && data.length > 0 && localQuery.length >= 3 ? (
                    <motion.div
                        className={css({
                            width: '100%',
                            maxWidth: '1000px',
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
                        <Paragraph size="caption" subtle>
                            {data.length} resultados{' '}
                        </Paragraph>
                        <div
                            className={css({
                                alignItems: 'flex-start',
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                                gap: '1rem',
                            })}
                        >
                            {data.map((establishment) => (
                                <Link
                                    href={`/estabelecimento/${establishment.cnes}`}
                                    key={establishment.cnes}
                                    className={css({
                                        padding: '1rem',
                                        width: '100%',
                                        background: 'neutral.100',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        gap: '.75rem',
                                    })}
                                >
                                    <MapMarkerDecoration
                                        establishmentType={
                                            establishment.type as
                                                | 'Unidade Básica de Saúde'
                                                | 'Hospital Geral'
                                                | 'Unidade de Pronto Atendimento'
                                        }
                                    />
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
                                            })}
                                        >
                                            {establishment.name}
                                        </b>
                                        {coords && (
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
                                                            .geolocation
                                                            ?.latitude,
                                                        establishment
                                                            .geolocation
                                                            ?.longitude
                                                    )
                                                )}{' '}
                                                de distância
                                            </span>
                                        )}
                                    </div>
                                    <CaretRightIcon
                                        size={20}
                                        className={css({
                                            color: 'neutral.500',
                                        })}
                                    />
                                </Link>
                            ))}
                            <Banner
                                icon={<QuestionIcon />}
                                title="Não sabe onde ir?"
                                message={
                                    'Com o Onde Ir você sabe qual o melhor estabelecimento pra você a partir dos seus sintomas.'
                                }
                            />
                        </div>
                    </motion.div>
                ) : error ? (
                    <motion.div
                        key="no-results"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <NoResultsEmptyState query={localQuery} />
                    </motion.div>
                ) : isLoading ? (
                    <div
                        className={css({
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        })}
                    >
                        <CircleNotchIcon
                            className={css({
                                animation: 'spin',
                                color: 'neutral.300',
                            })}
                            weight="bold"
                            size={32}
                        />
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 1 }}
                        className={css({
                            // maxWidth: '800px',
                            minWidth: '100%',
                            padding: {
                                md: '0 1rem',
                                base: '1rem',
                            },
                        })}
                    >
                        <NearEstablishmentsBanner />
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    )
}
