'use client'

import { useEffect, useState, useRef, useCallback } from 'react'

type ScrollDirection = 'up' | 'down' | null

export function useScroll() {
    const [scrollY, setScrollY] = useState(() =>
        typeof window !== 'undefined' ? window.scrollY : 0
    )
    const [direction, setDirection] = useState<ScrollDirection>(null)
    const lastScrollY = useRef(
        typeof window !== 'undefined' ? window.scrollY : 0
    )
    const ticking = useRef(false)

    const updateScrollData = useCallback(() => {
        const currentScrollY = window.scrollY
        setScrollY(currentScrollY)

        // Reduz o threshold para facilitar a detecção
        const diff = currentScrollY - lastScrollY.current
        if (Math.abs(diff) > 3) {
            if (diff > 0) {
                setDirection('down')
            } else {
                setDirection('up')
            }
            lastScrollY.current = currentScrollY
        }

        ticking.current = false
    }, [])

    const handleScroll = useCallback(() => {
        if (!ticking.current) {
            requestAnimationFrame(updateScrollData)
            ticking.current = true
        }
    }, [updateScrollData])

    useEffect(() => {
        if (typeof window === 'undefined') return

        // Força uma atualização inicial
        lastScrollY.current = window.scrollY

        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [handleScroll])

    return { scrollY, direction }
}
