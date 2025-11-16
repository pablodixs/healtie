'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

import { EstablishmentPointResponse } from '@/interfaces/Establishment'

interface MapContextType {
    selectedEstablishment: EstablishmentPointResponse | null
    setSelectedEstablishment: (
        establishment: EstablishmentPointResponse | null
    ) => void
    isEstablishmentSelected: (
        establishment: EstablishmentPointResponse
    ) => boolean
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
        useState<EstablishmentPointResponse | null>(null)

    const isEstablishmentSelected = (
        establishment: EstablishmentPointResponse
    ): boolean => {
        return selectedEstablishment?.geolocation === establishment.geolocation
    }

    const value: MapContextType = {
        selectedEstablishment,
        setSelectedEstablishment,
        isEstablishmentSelected,
    }

    return <MapContext.Provider value={value}>{children}</MapContext.Provider>
}
