'use client'

import { motion } from 'motion/react'
import { css } from '../../../../../../styled-system/css'
import { Paragraph, Subheading } from '@/components/Typography'
import { CheckIcon } from '@phosphor-icons/react'
import { ReactNode } from 'react'

export function SuccessView({ children }: { children?: ReactNode }) {
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
                Sua contribuição ajuda a melhorar a experiência de outros
                usuários e a promover a transparência nos serviços de saúde.
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
                    initial={{ y: '200%' }}
                    animate={{ y: '1%' }}
                    transition={{ type: 'spring', bounce: 0, delay: 0.2 }}
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
        </motion.div>
    )
}
