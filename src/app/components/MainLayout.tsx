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
            <section className={navbarContainer}>
                <Navbar />
                <div>
                    <Button variant="text">Entrar</Button>
                    <Button variant="secondary">Criar conta</Button>
                </div>
            </section>
            <div className={contentContainer}>{children}</div>
        </>
    )
}

const navbarContainer = css({
    width: '100%',
    position: 'fixed',
    top: 0,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem',
    zIndex: 1000,
})

const contentContainer = css({
    borderRadius: '8px',
    padding: '1rem',
    paddingTop: '6rem', // Espaço para a navbar fixa
    backgroundColor: 'white',
    width: '100%',
    minHeight: '100vh', // Garante que a página tenha altura suficiente para scroll
})
