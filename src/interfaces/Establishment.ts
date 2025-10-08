export interface Establishment {
    cnes: number
    name: string
    full_name: string
    address: string
    district: string
    city: string
    state: string
    zip_code: string
    abb: string
    type: string
    phone: string
    location: {
        longitude: number
        latitude: number
    }
}
