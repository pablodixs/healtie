import { MetadataRoute } from 'next'

async function getAllEstablishmentIds() {
    const res = await fetch(
        'https://healtie-bh7zc.ondigitalocean.app/v1/establishment/all',
        {
            next: { revalidate: 86400 },
        }
    )
    return res.json()
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const establishments = await getAllEstablishmentIds()
    const baseUrl = 'https://healtie.app'

    const urls = establishments.map(
        (item: { cnes: string; updatedAt: string }) => ({
            url: `${baseUrl}/estabelecimento/${item.cnes}`,
            lastModified: new Date(item.updatedAt || new Date()),
            changeFrequency: 'weekly',
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
