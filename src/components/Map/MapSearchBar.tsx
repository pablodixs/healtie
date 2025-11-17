'use client'

import { useRef } from 'react'
import { SearchBar } from '@/components/Navbar/SearchBar'
import { css } from '../../../styled-system/css'

interface MapSearchBarProps {
    onFocusChange?: (value: boolean) => void
    setSearchTerm: (term: string) => void
    searchTerm: string
    setShowResults: (show: boolean) => void
    isLoading?: boolean
}

export function MapSearchBar({
    onFocusChange,
    setSearchTerm,
    searchTerm,
    setShowResults,
    isLoading,
}: MapSearchBarProps) {
    const containerRef = useRef<HTMLDivElement>(null)

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
                isLoading={isLoading}
                onFocus={() => {
                    handleInputFocus()
                    onFocusChange?.(true)
                }}
                onBlur={() => {
                    setTimeout(() => {
                        onFocusChange?.(false)
                    }, 200)
                }}
            />
        </div>
    )
}

const containerStyle = css({
    position: 'relative',
    width: '100%',
})
