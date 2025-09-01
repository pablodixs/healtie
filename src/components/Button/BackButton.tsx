'use client'

import { ArrowLeftIcon } from '@phosphor-icons/react'

import { Button } from '.'
import { useRouter } from 'next/navigation'

export function BackButton() {
    const router = useRouter()

    return (
        <Button
            aria-label="Voltar"
            variant="subtle"
            onClick={() => router.back()}
        >
            <ArrowLeftIcon /> Voltar
        </Button>
    )
}
