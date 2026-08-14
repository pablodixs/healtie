import { MetadataRoute } from 'next'
import { API_URL } from '@/lib/apiConfig'

async function getAllEstablishmentIds() {
    if (!API_URL) return []
    try {
        const load = async (page: number) => fetch(`${API_URL}/establishment/all?page=${page}&limit=100`, {
            next: { revalidate: 86400 },
        }).then((response) => response.json())
        const first = await load(0)
        const remaining = await Promise.all(Array.from({ length: Math.max(0, (first.total_pages ?? 1) - 1) }, (_, index) => load(index + 1)))
        return [first, ...remaining].flatMap((page) => page.content ?? [])
    } catch {
        return []
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const establishments = await getAllEstablishmentIds()
    const baseUrl = 'https://healtie.app'

    const urls = establishments.map(
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
