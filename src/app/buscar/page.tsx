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

export default function Page() {
    const [establishmentFilter, setEstablishmentFilter] = useState<
        string | null
    >(null)
    const [localQuery, setLocalQuery] = useState('')

    const router = useRouter()
    const searchParams = useSearchParams()
    const query = searchParams.get('q') || ''

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
        <motion.main
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.35 }}
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
                <Heading>Busca </Heading>
                <AnimatePresence mode="wait">
                    {establishmentFilter && (
                        <motion.div
                            initial={{
                                width: '0ch',
                                opacity: 0,
                                filter: 'blur(8px)',
                                scale: 0.75,
                            }}
                            animate={{
                                width: 'auto',
                                opacity: 1,
                                scale: 1,
                                filter: 'blur(0px)',
                            }}
                            exit={{
                                width: '0ch',
                                opacity: 0,
                                scale: 0.75,
                                filter: 'blur(8px)',
                            }}
                        >
                            <Heading style={{ textWrap: 'nowrap' }}>
                                por {establishmentFilter}
                            </Heading>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <HeroSearchBar
                filterValue={establishmentFilter}
                onFilterChange={setEstablishmentFilter}
                autoFocus
                value={localQuery}
                onChange={handleChange}
            />
            <AnimatePresence mode="wait">
                {filteredEstablishments.length > 0 && query.length >= 2 ? (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <span>{filteredEstablishments.length} resultados </span>
                        <div
                            className={css({
                                alignItems: 'flex-start',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                width: '100%',
                                maxWidth: '800px',
                            })}
                        >
                            {filteredEstablishments.map((establishment) => (
                                <Link
                                    className={css({ fontSize: '1.125rem' })}
                                    variant="text"
                                    href={`/unidades/${establishment.cnes}`}
                                    key={establishment.cnes}
                                >
                                    {establishment.name} - {establishment.city}
                                </Link>
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
                    <motion.div
                        key="empty-state"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <SearchEmptyState />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.main>
    )
}
