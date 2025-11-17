'use client'

import { useMemo, useState } from 'react'

import { MapSearchBar } from '@/components/Map'
import { ProgressiveBlur } from '@/components/ProgressiveBlur'
import { searchBarContainer } from '../styles'
import { css } from '../../../../styled-system/css'
import { Establishment } from '@/interfaces/Establishment'
import { useMapContext } from '@/context/MapContext'

import { establishments } from '@/utils/unidades.json'
import { EstablishmentItem } from './AsideNearEstablishment'
import { Paragraph } from '@/components/Typography'

export function AsideSearchBar() {
    const [searchTerm, setSearchTerm] = useState('')
    const [isInputFocused, setIsInputFocused] = useState(false)
    const { setSelectedEstablishment } = useMapContext()
    const [showResults, setShowResults] = useState(false)

    // Filtra estabelecimentos baseado no termo de busca
    const filteredEstablishments = useMemo(() => {
        if (!searchTerm.trim()) return []

        const term = searchTerm.toLowerCase()
        return establishments.filter((establishment) => {
            const nameMatch = establishment.name.toLowerCase().includes(term)
            const fullNameMatch = establishment.full_name
                .toLowerCase()
                .includes(term)
            const districtMatch = establishment.district
                .toLowerCase()
                .includes(term)
            const addressMatch = establishment.address
                .toLowerCase()
                .includes(term)
            const typeMatch = establishment.type.toLowerCase().includes(term)

            return (
                nameMatch ||
                fullNameMatch ||
                districtMatch ||
                addressMatch ||
                typeMatch
            )
        })
    }, [searchTerm])

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
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    setShowResults={setShowResults}
                    onFocusChange={setIsInputFocused}
                />
                <ProgressiveBlur />
            </section>
            {isInputFocused && showResults && (
                <div
                    className={wrapper}
                    style={{ backdropFilter: 'blur(10px)' }}
                >
                    {filteredEstablishments.length > 0 && (
                        <div className={resultsContainer}>
                            <Paragraph marginCompact subtle>
                                Resultados
                            </Paragraph>
                            {filteredEstablishments
                                .slice(0, 8)
                                .map((establishment) => (
                                    <EstablishmentItem
                                        key={establishment.cnes}
                                        establishment={{
                                            ...establishment,
                                            distance: 0,
                                        }}
                                        // onClick={() =>
                                        //     handleSelectEstablishment(
                                        //         establishment
                                        //     )
                                        // }
                                    />
                                ))}
                            {filteredEstablishments.length > 8 && (
                                <div className={resultFooter}>
                                    +{filteredEstablishments.length - 8}{' '}
                                    resultados
                                </div>
                            )}
                        </div>
                    )}

                    {searchTerm.trim() &&
                        filteredEstablishments.length === 0 && (
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

const resultFooter = css({
    padding: '0.5rem 1rem',
    textAlign: 'center',
    fontSize: '0.8125rem',
    color: '#666',
    borderTop: '1px solid rgba(0,0,0,0.05)',
    fontWeight: 500,
})
