import { EstablishmentResponse } from '@/interfaces/EstablishmentAPIResponse'

const API_URL = process.env.NEXT_PUBLIC_HEALTIE_API_URL

export async function getEstablishment(
    cnes: string
): Promise<EstablishmentResponse> {
    const res = await fetch(`${API_URL}/establishment/${cnes}`, {
        next: { revalidate: 3600 },
    })

    if (!res.ok) {
        throw new Error('Failed to fetch establishment data.')
    }

    return res.json()
}
