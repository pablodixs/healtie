'use client'

import { HTMLAttributes, useEffect, useState } from 'react'

import { MapSearchBar } from '@/components/Map'
import { ProgressiveBlur } from '@/components/ProgressiveBlur'
import { searchBarContainer } from '../styles'
import { css } from '../../../../styled-system/css'
import {
    EstablishmentSearchResponse,
    PageableEstablishmentResponse,
} from '@/interfaces/Establishment'
import { useMapContext } from '@/context/MapContext'

import { Paragraph } from '@/components/Typography'
import useSWR from 'swr'
import { fetcher } from '@/lib/swrFetcher'
import { Link } from '@/components/Link'
import { Tooltip } from '@/components/Tooltip'
import { EstablishmentIcon } from '@/components/EstablishmentIcon'

const API_URL = process.env.NEXT_PUBLIC_HEALTIE_API_URL

export function AsideSearchBar() {
    const [isInputFocused, setIsInputFocused] = useState(false)

    const [query, setQuery] = useState('')
    const [debounced, setDebounced] = useState('')

    const [showResults, setShowResults] = useState(false)

    const { data, isLoading } = useSWR<PageableEstablishmentResponse>(
        debounced
            ? `${API_URL}/establishment/search?q=${debounced}&limit=5`
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
                    {data && data.content.length > 0 && (
                        <div className={resultsContainer}>
                            <Paragraph marginCompact subtle>
                                Resultados
                            </Paragraph>
                            {data.content.map((establishment) => (
                                <EstablishmentItem
                                    key={establishment.cnes}
                                    establishment={{
                                        ...establishment,
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

                    {data?.empty && (
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

export const EstablishmentItem = ({
    establishment,
}: {
    establishment: EstablishmentSearchResponse
} & HTMLAttributes<HTMLDivElement>) => {
    const { setSelectedEstablishment } = useMapContext()

    const handleClick = () => {
        // setSelectedEstablishment(establishment)
    }

    return (
        <Link
            onClick={handleClick}
            variant="asChild"
            href={`/mapa?establishment=${establishment.cnes}`}
            className={css({
                paddingY: '0.5rem',
                alignItems: 'center',
                borderRadius: '12px',
                display: 'flex',
                gap: '.75rem',
            })}
        >
            <Tooltip content={establishment.type}>
                <EstablishmentIcon
                    animation={false}
                    decoration
                    size="small"
                    type={
                        establishment.type as
                            | 'Hospital Geral'
                            | 'Unidade Básica de Saúde'
                            | 'Unidade de Pronto Atendimento'
                    }
                />
            </Tooltip>
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
                        fontSize: '0.9375rem',
                        lineHeight: '120%',
                    })}
                >
                    {establishment.name}
                </strong>
            </div>
        </Link>
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
