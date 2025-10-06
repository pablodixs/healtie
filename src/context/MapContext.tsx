'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

import { Establishment } from '@/interfaces/Establishment'

interface MapContextType {
    selectedEstablishment: Establishment | null
    setSelectedEstablishment: (establishment: Establishment | null) => void
    isEstablishmentSelected: (establishment: Establishment) => boolean
}

const MapContext = createContext<MapContextType | undefined>(undefined)

export const useMapContext = () => {
    const context = useContext(MapContext)
    if (context === undefined) {
        throw new Error('useMapContext must be used within a MapProvider')
    }
    return context
}

interface MapProviderProps {
    children: ReactNode
}

export const MapContextProvider: React.FC<MapProviderProps> = ({
    children,
}) => {
    const [selectedEstablishment, setSelectedEstablishment] =
        useState<Establishment | null>(null)

    const isEstablishmentSelected = (establishment: Establishment): boolean => {
        return selectedEstablishment?.cnes === establishment.cnes
    }

    const value: MapContextType = {
        selectedEstablishment,
        setSelectedEstablishment,
        isEstablishmentSelected,
    }

    return <MapContext.Provider value={value}>{children}</MapContext.Provider>
}
