'use client'

import {
    useEffect,
    useRef,
    useState,
    cloneElement,
    isValidElement,
} from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cva } from '../../../styled-system/css'

interface TooltipProps {
    content: React.ReactNode
    children: React.ReactElement // precisa ser elemento React, não texto puro
    placement?: 'top' | 'bottom' | 'left' | 'right'
    delay?: number
    variant?: 'subtle' | 'default'
}

let openTooltips = 0
let resetTimer: NodeJS.Timeout | null = null

export function Tooltip({
    content,
    children,
    placement = 'top',
    delay = 300,
    variant = 'default',
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
            if (resetTimer) clearTimeout(resetTimer)
            if (visible && openTooltips > 0) {
                openTooltips--
            }
        }
    }, [timer, visible])

    useEffect(() => {
        if (visible && triggerRef.current && tooltipRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect()
            const tooltipRect = tooltipRef.current.getBoundingClientRect()

            let top = 0
            let left = 0

            switch (placement) {
                case 'top':
                    top = triggerRect.top - tooltipRect.height - 8
                    left =
                        triggerRect.left +
                        triggerRect.width / 2 -
                        tooltipRect.width / 2
                    break
                case 'bottom':
                    top = triggerRect.bottom + 8
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
                    left = triggerRect.left - tooltipRect.width - 8
                    break
                case 'right':
                    top =
                        triggerRect.top +
                        triggerRect.height / 2 -
                        tooltipRect.height / 2
                    left = triggerRect.right + 8
                    break
            }

            setStyle({
                top: `${top}px`,
                left: `${left}px`,
            })
        }
    }, [visible, placement])

    const showTooltip = () => {
        const actualDelay = openTooltips > 0 ? 0 : delay
        if (timer) clearTimeout(timer)

        // Cancelar o reset timer se existir
        if (resetTimer) {
            clearTimeout(resetTimer)
            resetTimer = null
        }

        const t = setTimeout(() => {
            openTooltips++
            setVisible(true)
        }, actualDelay)
        setTimer(t)
    }

    const hideTooltip = () => {
        if (timer) clearTimeout(timer)
        setVisible(false)

        if (openTooltips > 0) {
            openTooltips--

            // Se não há mais tooltips abertos, resetar o contador após um delay
            // para manter o comportamento "sem delay" por um tempo
            if (openTooltips === 0) {
                resetTimer = setTimeout(() => {
                    openTooltips = 0
                }, 500) // 500ms de "janela" para manter o comportamento sem delay
            }
        }
    }

    // garante que o filho receba os eventos sem wrapper extra
    const childWithProps = isValidElement(children)
        ? cloneElement(children, {
              // @ts-expect-error - forçar ref para funcionar com cloneElement
              ref: triggerRef,
              onMouseEnter: showTooltip,
              onMouseLeave: hideTooltip,
          })
        : children

    return (
        <>
            {childWithProps}
            <AnimatePresence>
                {visible && (
                    <motion.div
                        ref={tooltipRef}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                        className={tooltipContainer({ variant })}
                        style={style}
                    >
                        {content}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

const tooltipContainer = cva({
    base: {
        position: 'fixed',
        zIndex: 1000,

        padding: '0.375rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.875rem',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        lineHeight: '1',
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
