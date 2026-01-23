import { notFound } from 'next/navigation'
import EstablishmentView from './views/establishment-view'
import { Metadata } from 'next'
import { getEstablishment } from './utils/get-establishment'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ cnes: string }>
}): Promise<Metadata> {
    const { cnes } = await params
    const data = await getEstablishment(cnes)

    const baseUrl = 'https://healtie.app'

    return {
        title: `${data.name} em ${data.address?.city}`,
        description: `Informações e status de ${data.name} no Healtie.`,
        keywords: [
            'healtie',
            data.name,
            String(data.cnes),
            data.name,
            data.address?.city ? String(data.address.city) : '',
            data.type || 'unidade de saúde',
        ],
        alternates: {
            canonical: `${baseUrl}/estabelecimento/${cnes}`,
        },
        openGraph: {
            title: `${data.name}`,
            description: `Informações e status de ${data.name} no Healtie.`,
            images: [
                {
                    url: '/images/og-image.png',
                    width: 1900,
                    height: 600,
                    alt: 'Healtie',
                },
            ],
        },
    }
}

export default async function Page({
    params,
}: {
    params: Promise<{ cnes: string }>
}) {
    const { cnes } = await params

    try {
        const data = await getEstablishment(cnes)

        if (!data) return notFound()

        const jsonLd = {
            '@context': 'https://schema.org',
            '@type': data.type || 'MedicalOrganization',
            name: data.name,
            address: {
                '@type': 'PostalAddress',
                streetAddress: data.address?.address,
                addressLocality: data.address?.city,
                addressRegion: data.address?.state,
                addressCountry: 'BR',
            },
            identifier: data.cnes,
        }

        return (
            <>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(jsonLd),
                    }}
                />

                <EstablishmentView data={data} />
            </>
        )
    } catch {
        // Error occurred, show not found page
        return notFound()
    }
}
