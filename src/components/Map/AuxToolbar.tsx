'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { css } from '../../../styled-system/css'
import { Paragraph } from '../Typography/Paragraph'
import { Button } from '../Button'
import { GearIcon, XIcon } from '@phosphor-icons/react'
import { Toggle } from '../Toggle'

interface AuxToolbarProps {
    showLabels: boolean
    onToggleLabels: (value: boolean) => void
}

export function AuxToolbar({ showLabels, onToggleLabels }: AuxToolbarProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <motion.div
            layout
            transition={{
                layout: {
                    type: 'spring',
                    stiffness: 170,
                    damping: 19,
                },
            }}
            style={{
                backdropFilter: 'blur(10px)',
            }}
            className={css({
                zIndex: 1,
                position: 'absolute',
                top: 'header',
                right: '1.5rem',
                padding: isExpanded ? '.5rem 1rem' : '0.25rem',
                backgroundColor: isExpanded
                    ? 'rgba(255, 255, 255, 0.8)'
                    : 'rgba(255, 255, 255, 0.5)',
                borderRadius: isExpanded ? '24px' : '9999px',
                boxShadow: '0 0 0 1px rgba(0,0,0,0.05)',
                display: 'flex',
                overflow: 'hidden',
                alignItems: 'center',
                transition: 'backgroundColor 0.2s ease',
            })}
        >
            <AnimatePresence mode="popLayout">
                {isExpanded ? (
                    <motion.div
                        key="expanded-content"
                        layout
                        initial={{
                            opacity: 0,
                            scale: 0.95,
                            filter: 'blur(6px)',
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            filter: 'blur(0px)',
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.9,
                            filter: 'blur(6px)',
                        }}
                        className={css({
                            display: 'flex',
                            flexDir: 'column',
                            alignItems: 'flex-start',
                            minWidth: '300px',
                        })}
                    >
                        {isExpanded && (
                            <>
                                <header
                                    className={css({
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    })}
                                >
                                    <Paragraph bolder>
                                        Preferências do Mapa
                                    </Paragraph>
                                    <Button
                                        onClick={() => setIsExpanded(false)}
                                        iconButton
                                        variant="ghost"
                                    >
                                        <XIcon />
                                    </Button>
                                </header>
                                <Toggle
                                    label="Mostrar nome das unidades"
                                    checked={showLabels}
                                    onChange={onToggleLabels}
                                />
                            </>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="collapsed-buttons"
                        layout
                        initial={{
                            opacity: 0,
                            filter: 'blur(6px)',
                            transition: { delay: 0.2 },
                        }}
                        animate={{
                            opacity: 1,
                            filter: 'blur(0px)',
                        }}
                        exit={{
                            opacity: 0,
                            filter: 'blur(6px)',
                        }}
                        className={css({
                            display: 'flex',
                            flexDir: 'column',
                        })}
                    >
                        <Button
                            iconButton
                            variant="text"
                            onClick={() => setIsExpanded(true)}
                        >
                            <GearIcon size={18} />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
