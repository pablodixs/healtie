import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const withMDX = createMDX({
    extension: /\.(md|mdx)$/,
})

const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_HEALTIE_API_URL

const nextConfig: NextConfig = {
    ...(apiUrl
        ? {
              env: {
                  // Keep the legacy name available to existing components
                  // while the canonical configuration uses NEXT_PUBLIC_API_URL.
                  NEXT_PUBLIC_HEALTIE_API_URL: apiUrl,
              },
          }
        : {}),
    images: {
        // Serve the original asset instead of routing images through /_next/image.
        // This keeps next/image independent from the image transformation service.
        unoptimized: true,
        qualities: [25, 50, 75, 100],
    },
    pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
}

export default withMDX(nextConfig)
