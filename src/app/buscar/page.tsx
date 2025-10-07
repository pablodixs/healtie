'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter, useSearchParams } from 'next/navigation'

import { css } from '../../../styled-system/css'

import { HeroSearchBar } from '../ui/components/HeroSearchBar'

import { Heading } from '@/components/Typography/Heading'
import { Link } from '@/components/Link'

import data from '@/utils/unidades.json'

const allowedFilters = ['HOSPITAL', 'UPA', 'UBS'] as const
type AllowedFilter = (typeof allowedFilters)[number]
function isAllowedFilter(value: string | null): value is AllowedFilter {
    return !!value && allowedFilters.includes(value as AllowedFilter)
}
import { SearchEmptyState } from './components/SearchEmptyState'
import { NoResultsEmptyState } from './components/NoResultsEmpytState'
import { ArrowRightIcon, MapTrifoldIcon } from '@phosphor-icons/react'
import { Paragraph } from '@/components/Typography/Paragraph'
import { Divider } from '@/components/Divider'

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
    // Ref para evitar sobrescrever a digitação enquanto sincroniza com a URL

    // Sincroniza o estado local somente quando o parâmetro de URL realmente muda
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

    const activeFilter = filterParam || establishmentFilter
    const filteredEstablishments = data.establishments.filter(
        (establishment) => {
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
        }
    )

    return (
        <main
            className={css({
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                alignItems: 'center',
                gap: '1rem',
                height: '95dvh',
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
                filterValue={filterParam || establishmentFilter}
                onFilterChange={setEstablishmentFilter}
                autoFocus
                value={localQuery}
                onChange={handleChange}
            />
            <AnimatePresence mode="wait">
                {filteredEstablishments.length > 0 && localQuery.length >= 2 ? (
                    <motion.div
                        className={css({
                            width: '100%',
                            maxWidth: '800px',
                            padding: '0 1rem',
                        })}
                        key="results"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Paragraph size="caption" subtle>
                            {filteredEstablishments.length} resultados{' '}
                        </Paragraph>
                        <div
                            className={css({
                                alignItems: 'flex-start',
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                                maxWidth: '800px',
                            })}
                        >
                            {filteredEstablishments.map((establishment) => (
                                <div
                                    key={establishment.cnes}
                                    className={css({
                                        width: '100%',
                                    })}
                                >
                                    <div
                                        className={css({
                                            fontSize: '1.125rem',
                                            display: 'flex',
                                            width: '100%',
                                            justifyContent: 'space-between',
                                            borderBottom:
                                                '1px solid rgba(0, 0, 0,',
                                        })}
                                    >
                                        <Link
                                            href={`/estabelecimento/${establishment.cnes}`}
                                            className={css({
                                                display: 'flex',
                                                flexDirection: 'column',
                                            })}
                                        >
                                            <b
                                                className={css({
                                                    fontWeight: 500,
                                                    color: 'tint',

                                                    _hover: {
                                                        textDecoration:
                                                            'underline',
                                                        textUnderlineOffset: 5,
                                                    },
                                                })}
                                            >
                                                {establishment.name}
                                            </b>
                                            <span
                                                className={css({
                                                    color: 'gray.500',
                                                    fontSize: '0.875rem',
                                                })}
                                            >
                                                {establishment.district},{' '}
                                                {establishment.city}
                                            </span>
                                        </Link>
                                        <div
                                            className={css({
                                                display: 'flex',
                                                gap: '0.5rem',
                                                alignItems: 'center',
                                            })}
                                        >
                                            <Link
                                                variant="primary"
                                                href={`/estabelecimento/${establishment.cnes}`}
                                            >
                                                Ver Detalhes <ArrowRightIcon />
                                            </Link>
                                            <Link
                                                variant="text"
                                                href={`/mapa?establishment=${establishment.cnes}&lat=${establishment.location.latitude}&long=${establishment.location.longitude}&from=search-page`}
                                            >
                                                <MapTrifoldIcon /> Ver no Mapa
                                            </Link>
                                        </div>
                                    </div>
                                    <Divider />
                                </div>
                            ))}
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
                    <SearchEmptyState />
                )}
            </AnimatePresence>
        </main>
    )
}
