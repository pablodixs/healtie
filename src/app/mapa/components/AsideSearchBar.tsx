'use client'

import { useEffect, useState } from 'react'

import { MapSearchBar } from '@/components/Map'
import { ProgressiveBlur } from '@/components/ProgressiveBlur'
import { searchBarContainer } from '../styles'
import { css } from '../../../../styled-system/css'
import { EstablishmentPointResponse } from '@/interfaces/Establishment'
import { useMapContext } from '@/context/MapContext'

import { EstablishmentItem } from './AsideNearEstablishment'
import { Paragraph } from '@/components/Typography'
import useSWR from 'swr'
import { fetcher } from '@/lib/swrFetcher'
import { Link } from '@/components/Link'

export function AsideSearchBar() {
    const [isInputFocused, setIsInputFocused] = useState(false)

    const [query, setQuery] = useState('')
    const [debounced, setDebounced] = useState('')

    const [showResults, setShowResults] = useState(false)

    const { data, isLoading } = useSWR<EstablishmentPointResponse[]>(
        debounced
            ? `https://https://healtie-bh7zc.ondigitalocean.app/v1/establishment/search?q=${debounced}&limit=5`
            : null,
        fetcher
    )

    useEffect(() => {
        const timer = setTimeout(() => setDebounced(query), 300)
        return () => clearTimeout(timer)
    }, [query])

    // const handleSelectEstablishment = (establishment: Establishment) => {
    //     setSelectedEstablishment({
    //         ...establishment,
    //         type: establishment.type as 'ubs' | 'hospital' | 'upa',
    //     })
    //     setSearchTerm(establishment.name)
    //     setShowResults(false)
    // }

    return (
        <section>
            <section className={searchBarContainer}>
                <MapSearchBar
                    searchTerm={query}
                    setSearchTerm={setQuery}
                    setShowResults={setShowResults}
                    onFocusChange={setIsInputFocused}
                    isLoading={isLoading}
                />
                <ProgressiveBlur />
            </section>
            {isInputFocused && showResults && (
                <div
                    className={wrapper}
                    style={{ backdropFilter: 'blur(10px)' }}
                >
                    {data && data.length > 0 && (
                        <div className={resultsContainer}>
                            <Paragraph marginCompact subtle>
                                Resultados
                            </Paragraph>
                            {data.slice(0, 8).map((establishment) => (
                                <EstablishmentItem
                                    key={establishment.cnes}
                                    establishment={{
                                        ...establishment,
                                        distance: 0,
                                    }}
                                />
                            ))}
                            <Link
                                href={`/buscar?q=${query}`}
                                fullWidth
                                variant="subtle"
                            >
                                Ver mais resultados
                            </Link>
                        </div>
                    )}

                    {data?.length === 0 && (
                        <div className={resultsContainer}>
                            <div className={noResults}>
                                Nenhuma unidade encontrada
                            </div>
                        </div>
                    )}
                </div>
            )}
        </section>
    )
}

const wrapper = css({
    position: 'absolute',
    top: '100%',
    bottom: 0,
    height: 'fit-content',
    maxHeight: '60dvh',
    minWidth: '100%',
    maxWidth: 100,
    zIndex: 3,
})

const resultsContainer = css({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    paddingX: '1rem',
    paddingBottom: '1rem',
    borderRadius: '32px',
    backgroundColor: 'white',
    boxShadow: 'lg',
    mb: '1rem',
})

const noResults = css({
    padding: '1rem',
    textAlign: 'center',
    color: '#666',
    fontSize: '0.9375rem',
})
