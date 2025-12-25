import { EstablishmentResponse } from '@/interfaces/EstablishmentAPIResponse'

export async function getEstablishment(
    cnes: string
): Promise<EstablishmentResponse> {
    const res = await fetch(
        `https://healtie-bh7zc.ondigitalocean.app/v1/establishment/${cnes}`,
        {
            next: { revalidate: 3600 },
        }
    )

    if (!res.ok) {
        throw new Error('Failed to fetch establishment data.')
    }

    return res.json()
}
