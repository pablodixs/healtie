'use client'

import { useEffect, useRef, useState, isValidElement, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { cva } from '../../../styled-system/css'

interface TooltipTriggerProps {
    onMouseEnter?: (e: React.MouseEvent) => void
    onMouseLeave?: (e: React.MouseEvent) => void
    onFocus?: (e: React.FocusEvent) => void
    onBlur?: (e: React.FocusEvent) => void
    // permitir outras props sem forçar 'any'
    className?: string
    style?: React.CSSProperties
    id?: string
    tabIndex?: number
    disabled?: boolean
}

interface TooltipProps {
    content: React.ReactNode
    children: React.ReactElement<TooltipTriggerProps> // precisa ser elemento React, não texto puro
    placement?: 'top' | 'bottom' | 'left' | 'right'
    delay?: number
    variant?: 'subtle' | 'default'
    group?: string // agrupar tooltips para compartilhar lógica de delay
    offset?: number // distância entre trigger e tooltip
}

// Estado global por grupo para controlar delay após primeiro abrir
const tooltipGroups: Record<
    string,
    { openCount: number; resetTimer: NodeJS.Timeout | null }
> = {}
const getGroupState = (group: string) => {
    if (!tooltipGroups[group]) {
        tooltipGroups[group] = { openCount: 0, resetTimer: null }
    }
    return tooltipGroups[group]
}

export function Tooltip({
    content,
    children,
    placement = 'top',
    delay = 300,
    variant = 'default',
    group = 'default',
    offset = 8,
}: TooltipProps) {
    const [visible, setVisible] = useState(false)
    const [style, setStyle] = useState<React.CSSProperties>({})
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

    const triggerRef = useRef<HTMLElement>(null)
    const tooltipRef = useRef<HTMLDivElement>(null)

    // Cleanup quando o componente é desmontado
    useEffect(() => {
        return () => {
            if (timer) clearTimeout(timer)
            const groupState = getGroupState(group)
            if (groupState.resetTimer) clearTimeout(groupState.resetTimer)
            if (visible && groupState.openCount > 0) {
                groupState.openCount--
            }
        }
    }, [timer, visible, group])

    const computePosition = useCallback(() => {
        if (!visible || !triggerRef.current || !tooltipRef.current) return
        const triggerRect = triggerRef.current.getBoundingClientRect()
        const tooltipRect = tooltipRef.current.getBoundingClientRect()

        let top = 0
        let left = 0

        switch (placement) {
            case 'top':
                top = triggerRect.top - tooltipRect.height - offset
                left =
                    triggerRect.left +
                    triggerRect.width / 2 -
                    tooltipRect.width / 2
                break
            case 'bottom':
                top = triggerRect.bottom + offset
                left =
                    triggerRect.left +
                    triggerRect.width / 2 -
                    tooltipRect.width / 2
                break
            case 'left':
                top =
                    triggerRect.top +
                    triggerRect.height / 2 -
                    tooltipRect.height / 2
                left = triggerRect.left - tooltipRect.width - offset
                break
            case 'right':
                top =
                    triggerRect.top +
                    triggerRect.height / 2 -
                    tooltipRect.height / 2
                left = triggerRect.right + offset
                break
        }

        // Clamp dentro do viewport para evitar corte de borda
        const margin = 4
        const vw = window.innerWidth
        const vh = window.innerHeight
        top = Math.min(Math.max(top, margin), vh - tooltipRect.height - margin)
        left = Math.min(Math.max(left, margin), vw - tooltipRect.width - margin)

        setStyle({ top: `${top}px`, left: `${left}px` })
    }, [visible, placement, offset])

    useEffect(() => {
        computePosition()
    }, [computePosition])

    useEffect(() => {
        if (!visible) return
        window.addEventListener('scroll', computePosition, true)
        window.addEventListener('resize', computePosition)
        return () => {
            window.removeEventListener('scroll', computePosition, true)
            window.removeEventListener('resize', computePosition)
        }
    }, [visible, computePosition])

    const showTooltip = () => {
        const groupState = getGroupState(group)
        const actualDelay = groupState.openCount > 0 ? 0 : delay
        if (timer) clearTimeout(timer)
        if (groupState.resetTimer) {
            clearTimeout(groupState.resetTimer)
            groupState.resetTimer = null
        }
        const t = setTimeout(() => {
            groupState.openCount++
            setVisible(true)
            computePosition()
        }, actualDelay)
        setTimer(t)
    }

    const hideTooltip = () => {
        if (timer) clearTimeout(timer)
        setVisible(false)
        const groupState = getGroupState(group)
        if (groupState.openCount > 0) {
            groupState.openCount--
            if (groupState.openCount === 0) {
                groupState.resetTimer = setTimeout(() => {
                    groupState.openCount = 0
                }, 500)
            }
        }
    }

    // garante que o filho receba os eventos sem wrapper extra
    const tooltipId = useRef(`tooltip-${Math.random().toString(36).slice(2)}`)

    const childWithProps = (
        <span
            ref={triggerRef as React.RefObject<HTMLSpanElement>}
            style={{ display: 'inline-flex' }}
            onMouseEnter={(e) => {
                if (isValidElement(children)) {
                    const fn = (
                        children as React.ReactElement<TooltipTriggerProps>
                    ).props.onMouseEnter
                    if (typeof fn === 'function') fn(e)
                }
                showTooltip()
            }}
            onMouseLeave={(e) => {
                if (isValidElement(children)) {
                    const fn = (
                        children as React.ReactElement<TooltipTriggerProps>
                    ).props.onMouseLeave
                    if (typeof fn === 'function') fn(e)
                }
                hideTooltip()
            }}
            onFocus={(e) => {
                if (isValidElement(children)) {
                    const fn = (
                        children as React.ReactElement<TooltipTriggerProps>
                    ).props.onFocus
                    if (typeof fn === 'function') fn(e)
                }
                showTooltip()
            }}
            onBlur={(e) => {
                if (isValidElement(children)) {
                    const fn = (
                        children as React.ReactElement<TooltipTriggerProps>
                    ).props.onBlur
                    if (typeof fn === 'function') fn(e)
                }
                hideTooltip()
            }}
            aria-describedby={visible ? tooltipId.current : undefined}
        >
            {children}
        </span>
    )

    const tooltipNode = (
        <AnimatePresence>
            {visible && (
                <motion.div
                    ref={tooltipRef}
                    role="tooltip"
                    id={tooltipId.current}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.12 }}
                    className={tooltipContainer({ variant })}
                    style={style}
                >
                    {content}
                </motion.div>
            )}
        </AnimatePresence>
    )

    return (
        <>
            {childWithProps}
            {typeof window !== 'undefined'
                ? createPortal(tooltipNode, document.body)
                : null}
        </>
    )
}

const tooltipContainer = cva({
    base: {
        position: 'fixed',
        zIndex: 1000,
        willChange: 'transform, opacity',
        padding: '0.5rem 1rem',
        borderRadius: '9999px',
        fontSize: '0.875rem',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        lineHeight: '1',
        boxSizing: 'border-box',
    },

    variants: {
        variant: {
            default: {
                background: 'primary',
                color: 'white',
            },
            subtle: {
                background: 'background',
                color: 'primary',
                boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.05)',
            },
        },
    },
})
