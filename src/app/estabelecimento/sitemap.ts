import { MetadataRoute } from 'next'

const API_URL = process.env.NEXT_PUBLIC_HEALTIE_API_URL

async function getAllEstablishmentIds() {
    // If API_URL is not defined (e.g., during build), return empty array
    if (!API_URL) {
        return []
    }
    
    try {
        const res = await fetch(`${API_URL}/establishment/all`, {
            next: { revalidate: 86400 },
        })
        
        if (!res.ok) {
            return []
        }
        
        return res.json()
    } catch {
        // Silently handle fetch errors during build
        return []
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    let establishments = await getAllEstablishmentIds()
    const baseUrl = 'https://healtie.app'

    if (!Array.isArray(establishments)) {
        establishments = establishments?.data || establishments?.results || []
    }

    const urls = (Array.isArray(establishments) ? establishments : []).map(
        (item: { cnes: number; updatedAt: string }) => ({
            url: `${baseUrl}/estabelecimento/${item.cnes}`,
            lastModified: new Date(item.updatedAt || new Date()),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        })
    )

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        ...urls,
    ]
}
