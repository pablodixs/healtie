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
            {/* {showLocationBanner && (
                <Banner
                    icon={<GpsFixIcon />}
                    title="Autorize o uso de sua localização para obter melhores resultados"
                    message={message()}
                    actionIcon={<CheckCircleIcon />}
                    actionLabel="Permitir"
                    action={handleAllowLocation}
                    onClose={() => setShowLocationBanner(false)}
                />
            )} */}
            <SearchHero />
        </div>
    )
}

const headerContainer = css({
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '2rem',
})
