'use client'

import { ReactNode, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { css } from '../../../styled-system/css'
import { ArrowRightIcon, CaretRightIcon } from '@phosphor-icons/react/dist/ssr'

interface CollapsibleItem {
    title: string
    content: ReactNode
}

interface AnimatedCollapsibleGroupProps {
    items: CollapsibleItem[]
    autoPlayInterval?: number
    showIndicators?: boolean
}

export function AnimatedCollapsibleGroup({
    items,
    autoPlayInterval = 5,
    showIndicators = true,
}: AnimatedCollapsibleGroupProps) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                setActiveIndex((prevIndex) => (prevIndex + 1) % items.length)
            }, autoPlayInterval * 1000)
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [isPlaying, autoPlayInterval, items.length])

    const handleItemClick = (index: number) => {
        setActiveIndex(index)
        setIsPlaying(false) // Para a reprodução automática quando o usuário interage

        // Reinicia a reprodução automática após 10 segundos de inatividade
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }

        setTimeout(() => {
            setIsPlaying(true)
        }, 10000)
    }

    return (
        <div className={containerStyles}>
            <div className={itemsContainer}>
                {items.map((item, index) => (
                    <CollapsibleAnimatedItem
                        key={index}
                        title={item.title}
                        isExpanded={activeIndex === index}
                        isActive={activeIndex === index}
                        showIndicator={showIndicators}
                        autoPlayInterval={autoPlayInterval}
                        onClick={() => handleItemClick(index)}
                    >
                        {item.content}
                    </CollapsibleAnimatedItem>
                ))}
            </div>
        </div>
    )
}

interface CollapsibleAnimatedItemProps {
    title: string
    children: ReactNode
    isExpanded: boolean
    isActive: boolean
    showIndicator: boolean
    autoPlayInterval: number
    onClick: () => void
}

function CollapsibleAnimatedItem({
    title,
    children,
    isExpanded,
    isActive,
    showIndicator,
    autoPlayInterval,
    onClick,
}: CollapsibleAnimatedItemProps) {
    return (
        <div className={itemContainer}>
            <motion.button
                className={itemButton}
                onClick={onClick}
                transition={{ duration: 0.3 }}
            >
                <CaretRightIcon size={18} /> <span>{title}</span>
            </motion.button>

            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                            duration: 0.4,
                            ease: 'easeInOut',
                        }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div className={contentContainer}>{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
            {showIndicator && (
                <div className={indicatorBelowButton}>
                    <motion.div
                        className={indicatorProgressBelow}
                        initial={{ width: 0 }}
                        animate={{
                            width: isActive ? '100%' : '0%',
                        }}
                        transition={{
                            duration: isActive ? autoPlayInterval : 0.3,
                            ease: 'linear',
                        }}
                    />
                </div>
            )}
        </div>
    )
}

const containerStyles = css({
    width: '100%',
    // maxWidth: '600px',
    bgColor: 'background',
    padding: '1rem 1.5rem',
    borderRadius: '12px',
    overflow: 'hidden',
})

const itemsContainer = css({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
})

const itemContainer = css({
    overflow: 'hidden',
})

const itemButton = css({
    width: '100%',
    padding: '.75rem 0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontWeight: '500',
    textAlign: 'left',
})

const indicatorBelowButton = css({
    height: '1px',
    backgroundColor: '#e5e7eb',
    overflow: 'hidden',
    position: 'relative',
})

const indicatorProgressBelow = css({
    height: '1px',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
})

const contentContainer = css({})
