import { useState, useMemo } from 'react'

import { Establishment } from '@/interfaces/Establishment'

interface UseEstablishmentsReturn {
    establishments: Establishment[]
    filteredEstablishments: Establishment[]
    searchTerm: string
    setSearchTerm: (term: string) => void
    selectedType: string
    setSelectedType: (type: string) => void
    availableTypes: string[]
}

export function useEstablishments(establishmentsData: {
    establishments: Establishment[]
}): UseEstablishmentsReturn {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedType, setSelectedType] = useState('')

    const establishments = establishmentsData.establishments

    const availableTypes = useMemo(() => {
        const types = [...new Set(establishments.map((est) => est.type))]
        return types.sort()
    }, [establishments])

    const filteredEstablishments = useMemo(() => {
        return establishments.filter((establishment) => {
            const matchesSearch =
                searchTerm === '' ||
                establishment.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                establishment.full_name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                establishment.address
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                establishment.district
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())

            const matchesType =
                selectedType === '' || establishment.type === selectedType

            return matchesSearch && matchesType
        })
    }, [establishments, searchTerm, selectedType])

    return {
        establishments,
        filteredEstablishments,
        searchTerm,
        setSearchTerm,
        selectedType,
        setSelectedType,
        availableTypes,
    }
}
