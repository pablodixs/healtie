export interface EstablishmentResponse {
    id: number
    cnes: number
    name: string
    fullName?: string
    description?: string
    type?: string
    phone?: string
    address?: EstablishmentAddress
    coordinates: Coordinates
    openingHours: EstablishmentOpeningHour[]
    open24Hours: boolean
    active: boolean
    createdAt: string
    updatedAt: string
    promoted?: boolean
    tags?: string[]
}

export interface EstablishmentAddress {
    address?: string
    district?: string
    city?: string
    state?: string
}

export interface EstablishmentIndicators {
    waitTime?: number
    rating?: number
    occupation?: number
    resolutionIndex?: number
    last_updated?: string
}

export interface Coordinates {
    latitude: number
    longitude: number
}

export interface EstablishmentOpeningHour {
    day: DayOfWeek
    closed: boolean
    twentyFourHours: boolean
    openTime?: string
    closeTime?: string
}

export type EstablishmentServicesType =
    | 'CONSULTA'
    | 'EXAME'
    | 'VACINA'
    | 'FARMACIA'
    | 'URGÊNCIA'
    | string // deixa aberto caso você tenha mais no backend

export type DayOfWeek =
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY'
    | 'SUNDAY'
