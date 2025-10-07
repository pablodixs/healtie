'use client'

import { usePathname } from 'next/navigation'

import { Heading } from '@/components/Typography'

import { establishments } from '@/utils/unidades.json'
import { TokenMissingState } from '@/components/Map'
import { css } from '../../../../styled-system/css'

export default function Page() {
    const path = usePathname()
    const id = path.split('/').pop()

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

    return <Heading> {establishment.name}</Heading>
}
