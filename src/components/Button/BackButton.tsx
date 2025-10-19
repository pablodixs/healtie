'use client'

import { Button } from '.'
import { useRouter } from 'next/navigation'
import { CaretLeftIcon } from '@phosphor-icons/react/dist/ssr'
import { Tooltip } from '../Tooltip'

export function BackButton() {
    const router = useRouter()

    return (
        <Tooltip content="Voltar">
            <Button
                aria-label="Voltar"
                variant="subtle"
                onClick={() => router.back()}
                iconButton
            >
                <CaretLeftIcon weight="bold" />
            </Button>
        </Tooltip>
    )
}
