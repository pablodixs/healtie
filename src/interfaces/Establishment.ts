export interface Establishment {
    cnes: number
    name: string
    full_name: string
    description?: string
    address: string
    district: string
    city: string | number
    state: string | number
    zip_code: string
    abb: string
    type: string
    phone: string
    location: {
        longitude: number
        latitude: number
    }
}

export interface EstablishmentPointResponse {
    cnes: number
    name: string
    coordinates: Geolocation
    type: string
    phone: string | null
    street: string
    district: string
    city: string
}

interface Geolocation {
    latitude: number
    longitude: number
}

export interface PageableEstablishmentResponse {
    content: EstablishmentPointResponse[]
    empty: boolean
    first: boolean
    last: boolean
    number: number
    numberOfElements: number
    pageable: {
        offset: number
        pageNumber: number
        pageSize: number
        paged: boolean
        unpaged: boolean
    }
    size: number
    sort: {
        empty: boolean
        sorted: boolean
        unsorted: boolean
    }
    totalElements: number
    totalPages: number
}
