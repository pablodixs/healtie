'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter, useSearchParams } from 'next/navigation'

import { css } from '../../../styled-system/css'

import { HeroSearchBar } from '../ui/components/HeroSearchBar'

import { Heading } from '@/components/Typography/Heading'
import { Link } from '@/components/Link'

import data from '@/utils/unidades.json'
import { SearchEmptyState } from './components/SearchEmptyState'
import { NoResultsEmptyState } from './components/NoResultsEmpytState'
import { ArrowRightIcon, MapTrifoldIcon } from '@phosphor-icons/react'
import { Paragraph } from '@/components/Typography/Paragraph'
import { Divider } from '@/components/Divider'

export default function Page() {
    const [establishmentFilter, setEstablishmentFilter] = useState<
        string | null
    >(null)
    const [localQuery, setLocalQuery] = useState('')

    const router = useRouter()
    const searchParams = useSearchParams()
    const query = searchParams.get('q') || ''
    const filterParam = searchParams.get('filter')

    // Sincroniza o estado local com o query da URL na primeira renderização
    useEffect(() => {
        setLocalQuery(query)
    }, [query])

    // Debounce para atualizar a URL
    useEffect(() => {
        const timer = setTimeout(() => {
            if (localQuery !== query) {
                router.push(`?q=${localQuery}`)
            }
        }, 300) // 300ms de delay

        return () => clearTimeout(timer)
    }, [localQuery, query, router])

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value
            setLocalQuery(value)
        },
        []
    )

    const filteredEstablishments = data.establishments.filter(
        (establishment) => {
            const searchTerm = query.toLowerCase()
            return (
                establishment.name.toLowerCase().includes(searchTerm) ||
                establishment.city.toLowerCase().includes(searchTerm)
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
                {filteredEstablishments.length > 0 && query.length >= 2 ? (
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
                                        })}
                                    >
                                        <div
                                            className={css({
                                                display: 'flex',
                                                flexDirection: 'column',
                                            })}
                                        >
                                            <b
                                                className={css({
                                                    fontWeight: 500,
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
                                        </div>
                                        <div
                                            className={css({
                                                display: 'flex',
                                                gap: '0.5rem',
                                                alignItems: 'center',
                                            })}
                                        >
                                            <Link
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
                ) : query.length >= 2 ? (
                    <motion.div
                        key="no-results"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <NoResultsEmptyState query={query} />
                    </motion.div>
                ) : (
                    <SearchEmptyState />
                )}
            </AnimatePresence>
        </main>
    )
}
