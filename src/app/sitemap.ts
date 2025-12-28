import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/mdx'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://healtie.app'

    const posts = getAllPosts()

    const postUrls = posts.map((post) => ({
        url: `${baseUrl}/noticias/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    const staticRoutes = [
        '',
        '/buscar',
        '/campanhas',
        '/contribuir',
        '/mapa',
        '/noticias',
        '/onde-ir',
        '/privacidade',
        '/sobre',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    return [...staticRoutes, ...postUrls]
}
