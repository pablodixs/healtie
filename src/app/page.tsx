'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircleIcon, GpsFixIcon } from '@phosphor-icons/react'

import { css } from '../../styled-system/css'
import { SearchHero } from './components/SearchHero'
import { Banner } from '@/components/Banner'

export default function Home() {
    const [showLocationBanner, setShowLocationBanner] = useState(true)

    const handleAllowLocation = () => {
        console.log('allowed')
    }

    const message = () => {
        return (
            <p>
                Isso nos ajudará a mostrar resultados mais relevantes para você.{' '}
                <Link href={'/ajuda/localizacao'}>Saiba mais...</Link>
            </p>
        )
    }
    return (
        <div>
            <header className={headerContainer}></header>
            {showLocationBanner && (
                <Banner
                    icon={<GpsFixIcon />}
                    title="Autorize o uso de sua localização para obter melhores resultados"
                    message={message()}
                    actionIcon={<CheckCircleIcon />}
                    actionLabel="Permitir"
                    action={handleAllowLocation}
                    onClose={() => setShowLocationBanner(false)}
                />
            )}
            <SearchHero />

            {/* Conteúdo temporário para testar scroll */}
            <div
                style={{
                    height: '150vh',
                    padding: '2rem',
                    background: 'linear-gradient(to bottom, #f0f0f0, #e0e0e0)',
                }}
            >
                <h2>Conteúdo para testar scroll</h2>
                <p>Role para baixo para testar o colapso da navbar...</p>
                {Array.from({ length: 50 }, (_, i) => (
                    <p key={i}>
                        Linha {i + 1} - Este é um conteúdo de teste para
                        garantir que há scroll na página.
                    </p>
                ))}
            </div>
        </div>
    )
}

const headerContainer = css({
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '2rem',
})
