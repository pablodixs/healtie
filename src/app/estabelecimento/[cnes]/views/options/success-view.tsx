'use client'

import { motion, useReducedMotion } from 'motion/react'
import { css } from '../../../../../../styled-system/css'
import { Paragraph, Subheading } from '@/components/Typography'
import { CheckIcon } from '@phosphor-icons/react'
import { ReactNode } from 'react'
import { Button } from '@/components/Button'

export function SuccessView({ children, onDone }: { children?: ReactNode; onDone: () => void }) {
    const reduceMotion = useReducedMotion()

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={css({
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            })}
        >
            <div
                className={css({
                    fontSize: '2.5rem',
                    color: 'green.600',
                    padding: '.5rem',
                    borderRadius: '50%',
                    backgroundColor: 'green.100',
                    width: 'fit-content',
                    mb: '1rem',
                })}
            >
                <CheckIcon weight="bold" />
            </div>
            <Subheading centered>
                Obrigado por contribuir com o Healtie!
            </Subheading>
            <Paragraph centered subtle>
                Seu relato foi recebido e ajudará outras pessoas a entender a
                situação recente desta unidade.
            </Paragraph>
            <div
                className={css({
                    width: '100%',
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                })}
            >
                <motion.div
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                        reduceMotion
                            ? { duration: 0.12 }
                            : { type: 'spring', duration: 0.3, bounce: 0, delay: 0.1 }
                    }
                    className={css({
                        bg: 'white',
                        boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.05)',
                        borderRadius: '12px 12px 0 0',
                        mt: '2rem',
                        p: '1rem',
                        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
                        borderRight: '1px solid rgba(0, 0, 0, 0.05)',
                        borderLeft: '1px solid rgba(0, 0, 0, 0.05)',
                        width: '300px',
                    })}
                >
                    {children}
                </motion.div>
            </div>
            <Button onClick={onDone} fullWidth>
                Concluir
            </Button>
        </motion.div>
    )
}
