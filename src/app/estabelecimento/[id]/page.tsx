'use client'

import { usePathname, useRouter } from 'next/navigation'

import { Heading, Paragraph } from '@/components/Typography'

import { establishments } from '@/utils/unidades.json'
import { TokenMissingState } from '@/components/Map'
import { css } from '../../../../styled-system/css'
import { Button } from '@/components/Button'
import { ArrowLeftIcon } from '@phosphor-icons/react'
import { MiniMap } from '@/components/Map/MiniMap'
import { MapContextProvider } from '@/context/MapContext'
import { Establishment } from '@/interfaces/Establishment'
import { Link } from '@/components/Link'

export default function Page() {
    const path = usePathname()
    const id = path.split('/').pop()
    const router = useRouter()

    const establishment = establishments.find((est) => est.cnes === Number(id))

    if (!establishment) {
        return (
            <div
                className={css({
                    minHeight: '100dvh',
                })}
            >
                <TokenMissingState />
            </div>
        )
    }

    return (
        <MapContextProvider>
            <main
                className={css({
                    minHeight: '90dvh',
                    maxW: '1200px',
                    margin: '0 auto',
                })}
            >
                <header>
                    <Button variant="subtle" onClick={() => router.back()}>
                        <ArrowLeftIcon weight="bold" /> Voltar
                    </Button>
                </header>
                <section
                    className={css({
                        display: 'grid',
                        gridTemplateColumns: '1fr 400px',
                    })}
                >
                    <div>
                        <Paragraph>{establishment.type}</Paragraph>
                        <Heading> {establishment.name}</Heading>
                    </div>
                    <aside>
                        <Paragraph subtle bolder>
                            Mapa
                        </Paragraph>
                        <Link
                            variant="asChild"
                            href={`/mapa?establishment=${establishment.cnes}&lat=${establishment.location.latitude}&long=${establishment.location.longitude}&from=search-page`}
                        >
                            <MiniMap data={establishment as Establishment} />
                        </Link>
                    </aside>
                </section>
            </main>
        </MapContextProvider>
    )
}
