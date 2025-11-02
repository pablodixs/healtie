'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter, useSearchParams } from 'next/navigation'

import { css } from '../../../styled-system/css'

import { HeroSearchBar } from '../ui/components/HeroSearchBar'

import { Heading } from '@/components/Typography/Heading'

import data from '@/utils/unidades.json'

const allowedFilters = ['HOSPITAL', 'UPA', 'UBS'] as const
type AllowedFilter = (typeof allowedFilters)[number]
function isAllowedFilter(value: string | null): value is AllowedFilter {
    return !!value && allowedFilters.includes(value as AllowedFilter)
}
import { NoResultsEmptyState } from './components/NoResultsEmpytState'
import { Paragraph } from '@/components/Typography/Paragraph'
import {
    NearbyEstablishment,
    NearEstablishmentsBanner,
} from '@/components/NearEstablishmentsBanner'
import { calculateDistance } from '@/utils/functions/calculateDistance'
import { useUserGeolocation } from '@/hooks/geolocation/useUserGeolocation'
import { EstablishmentResultItem } from './components/EstablishmentResultItem'
import { Banner } from '@/components/Banner'
import { QuestionIcon } from '@phosphor-icons/react/dist/ssr'

export default function Page() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [establishmentFilter, setEstablishmentFilter] = useState<
        string | null
    >(null)
    const initialQuery = searchParams.get('q') || ''
    const [localQuery, setLocalQuery] = useState(initialQuery)
    const query = searchParams.get('q') || ''
    const rawFilterParam = searchParams.get('filter')
    const filterParam = isAllowedFilter(rawFilterParam) ? rawFilterParam : null
    const { coords, userDidAllowLocation } = useUserGeolocation({
        immediate: true,
    })

    useEffect(() => {
        setLocalQuery(query)
    }, [query])

    // Sincroniza o filtro vindo da URL (ex: compartilhamento de link)
    useEffect(() => {
        if (filterParam !== establishmentFilter) {
            setEstablishmentFilter(filterParam)
        }
    }, [filterParam, establishmentFilter])

    // Debounce para atualizar a URL com query e filtro
    useEffect(() => {
        const handler = setTimeout(() => {
            const nextQuery = localQuery.trim()
            const nextFilter = establishmentFilter

            const isSameQuery = nextQuery === query
            const isSameFilter = (nextFilter || '') === (filterParam || '')

            if (isSameQuery && isSameFilter) return

            const params = new URLSearchParams()
            if (nextQuery) params.set('q', nextQuery)
            if (isAllowedFilter(nextFilter)) params.set('filter', nextFilter)

            const searchString = params.toString()
            const nextUrl = searchString ? `/buscar?${searchString}` : '/buscar'

            router.push(nextUrl, { scroll: false })
        }, 300)

        return () => clearTimeout(handler)
    }, [localQuery, establishmentFilter, query, filterParam, router])

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

    const activeFilter = establishmentFilter

    const establishments = useMemo(() => {
        // Filtra por filtro ativo e termo de busca
        const filtered = data.establishments.filter((establishment) => {
            if (activeFilter && establishment.abb !== activeFilter) return false
            const searchTerm = localQuery.toLowerCase()
            if (!searchTerm) return true
            return (
                establishment.name.toLowerCase().includes(searchTerm) ||
                establishment.city.toLowerCase().includes(searchTerm) ||
                establishment.district.toLowerCase().includes(searchTerm) ||
                establishment.type.toLowerCase().includes(searchTerm) ||
                establishment.abb.toLowerCase().includes(searchTerm)
            )
        })

        // Se não tem coordenadas, retorna filtrado sem distância
        if (!userDidAllowLocation || !coords) return filtered

        // Adiciona distância e ordena por proximidade
        return filtered
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
            .sort((a, b) => a.distance - b.distance)
    }, [localQuery, activeFilter, coords, userDidAllowLocation])

    console.log({
        userDidAllowLocation,
        coords,
        establishmentsCount: establishments.length,
    })

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
            <AnimatePresence mode="wait">
                {establishments.length > 0 && localQuery.length >= 2 ? (
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
                            {establishments.length} resultados{' '}
                        </Paragraph>
                        <div
                            className={css({
                                alignItems: 'flex-start',
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                            })}
                        >
                            {establishments.map((establishment) => (
                                <EstablishmentResultItem
                                    establishment={establishment}
                                    key={establishment.cnes}
                                />
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
                ) : localQuery.length >= 2 ? (
                    <motion.div
                        key="no-results"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <NoResultsEmptyState query={localQuery} />
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 1 }}
                        className={css({
                            maxWidth: '800px',
                            minWidth: '100%',
                            padding: {
                                md: '0 1rem',
                                base: '1rem',
                            },
                        })}
                    >
                        {/* <div>
                            <SectionTitle
                                title="Histórico"
                                Icon={ClockCounterClockwiseIcon}
                            />
                        </div> */}
                        <NearEstablishmentsBanner />
                        {/* <SearchEmptyState /> */}
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    )
}
