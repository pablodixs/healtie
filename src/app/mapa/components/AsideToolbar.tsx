'use client'

import { css } from '../../../../styled-system/css'
import { useSearchParams, useRouter } from 'next/navigation'
import { ArrowLeftIcon, DotsThreeIcon, XIcon } from '@phosphor-icons/react'

import { Button } from '@/components/Button'
import { Tooltip } from '@/components/Tooltip'

import { useMapContext } from '@/context/MapContext'
import { EstablishmentResponse } from '@/interfaces/EstablishmentAPIResponse'

interface AsideToolbarProps {
    data: EstablishmentResponse
}

export function AsideToolbar({ data }: AsideToolbarProps) {
    const router = useRouter()
    const { setSelectedEstablishment } = useMapContext()

    const param = useSearchParams()
    const fromSearchPage = param.get('from') === 'search-page'

    return (
        <header className={headerContainerStyles}>
            {fromSearchPage ? (
                <>
                    <Tooltip placement="bottom" content="Voltar">
                        <Button
                            iconButton
                            variant="subtle"
                            onClick={() => {
                                router.back()
                                setSelectedEstablishment(null)
                            }}
                        >
                            <ArrowLeftIcon weight="bold" />
                        </Button>
                    </Tooltip>
                    <p>{data.type}</p>
                    <Tooltip placement="bottom" content="Fechar">
                        <Button
                            iconButton
                            variant="subtle"
                            onClick={() => {
                                router.push('/mapa')
                                setSelectedEstablishment(null)
                            }}
                        >
                            <XIcon weight="bold" />
                        </Button>
                    </Tooltip>
                </>
            ) : (
                <>
                    <Tooltip placement="bottom" content="Menu">
                        <Button
                            variant="subtle"
                            onClick={() => {
                                router.push('/mapa')
                                setSelectedEstablishment(null)
                            }}
                            iconButton
                        >
                            <DotsThreeIcon weight="bold" />
                        </Button>
                    </Tooltip>
                    <p>{data.type}</p>
                    <Tooltip placement="bottom" content="Fechar">
                        <Button
                            variant="subtle"
                            onClick={() => {
                                router.push('/mapa')
                                setSelectedEstablishment(null)
                            }}
                            iconButton
                        >
                            <XIcon weight="bold" />
                        </Button>
                    </Tooltip>
                </>
            )}
        </header>
    )
}

const headerContainerStyles = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'neutral.500',
    fontWeight: 500,

    '& svg': {
        color: 'primary',
    },
})
