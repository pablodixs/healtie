'use client'

import { ReactNode } from 'react'
import { css } from '../../../styled-system/css'

import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/Button'

interface MainLayoutProps {
    children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <>
            <Navbar />
            <div className={contentContainer}>{children}</div>
        </>
    )
}

const contentContainer = css({
    borderRadius: '8px',
    padding: '1rem',
    paddingTop: '6rem', // Espaço para a navbar fixa
    backgroundColor: 'white',
    width: '100%',
    minHeight: '100vh', // Garante que a página tenha altura suficiente para scroll
})
