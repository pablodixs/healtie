'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { SearchBar } from '@/components/Navbar/SearchBar'
import { establishments } from '@/utils/unidades.json'
import { useMapContext } from '@/context/MapContext'
import { Establishment } from '@/interfaces/Establishment'
import { css } from '../../../styled-system/css'

export function MapSearchBar() {
    const [searchTerm, setSearchTerm] = useState('')
    const [showResults, setShowResults] = useState(false)
    const { setSelectedEstablishment } = useMapContext()
    const containerRef = useRef<HTMLDivElement>(null)

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

    // Fecha os resultados ao clicar fora
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setShowResults(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSelectEstablishment = (establishment: Establishment) => {
        setSelectedEstablishment({
            ...establishment,
            type: establishment.type as 'ubs' | 'hospital' | 'upa',
        })
        setSearchTerm(establishment.name)
        setShowResults(false)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
        setShowResults(true)
    }

    const handleInputFocus = () => {
        if (searchTerm.trim()) {
            setShowResults(true)
        }
    }

    return (
        <div ref={containerRef} className={containerStyle}>
            <SearchBar
                placeholder="Buscar unidades de saúde"
                value={searchTerm}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
            />

            {showResults && filteredEstablishments.length > 0 && (
                <div className={resultsContainer}>
                    {filteredEstablishments.slice(0, 8).map((establishment) => (
                        <button
                            key={establishment.cnes}
                            className={resultItem}
                            onClick={() =>
                                handleSelectEstablishment(establishment)
                            }
                        >
                            <div className={resultMainInfo}>
                                <span className={resultName}>
                                    {establishment.name}
                                </span>
                                <span className={resultType}>
                                    {establishment.abb}
                                </span>
                            </div>
                            <span className={resultAddress}>
                                {establishment.address} -{' '}
                                {establishment.district}
                            </span>
                        </button>
                    ))}
                    {filteredEstablishments.length > 8 && (
                        <div className={resultFooter}>
                            +{filteredEstablishments.length - 8} resultados
                        </div>
                    )}
                </div>
            )}

            {showResults &&
                searchTerm.trim() &&
                filteredEstablishments.length === 0 && (
                    <div className={resultsContainer}>
                        <div className={noResults}>
                            Nenhuma unidade encontrada
                        </div>
                    </div>
                )}
        </div>
    )
}

const containerStyle = css({
    position: 'relative',
    width: '100%',
})

const resultsContainer = css({
    position: 'absolute',
    top: 'calc(100% + 0.5rem)',
    left: 0,
    right: 0,
    backgroundColor: 'rgba(246,247,249, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '1rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    maxHeight: '400px',
    overflowY: 'auto',
    zIndex: 100,
})

const resultItem = css({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    padding: '0.75rem 1rem',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
    textAlign: 'left',
    width: '100%',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',

    _hover: {
        backgroundColor: 'rgba(0,0,0,0.05)',
    },

    _last: {
        borderBottom: 'none',
    },
})

const resultMainInfo = css({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    justifyContent: 'space-between',
})

const resultName = css({
    fontSize: '0.9375rem',
    fontWeight: 600,
    color: '#1a1a1a',
    flex: 1,
})

const resultType = css({
    fontSize: '0.75rem',
    fontWeight: 600,
    color: 'primary',
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    padding: '0.125rem 0.5rem',
    borderRadius: 'full',
})

const resultAddress = css({
    fontSize: '0.8125rem',
    color: '#666',
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
