'use client'

import { motion, AnimatePresence } from 'motion/react'

import { css } from '../../../styled-system/css'
import { Button } from '../Button'
import {
    ArrowsOutSimpleIcon,
    ArrowUpIcon,
    SparkleIcon,
    XIcon,
} from '@phosphor-icons/react/dist/ssr'
import { useEffect, useState } from 'react'
import { Portal } from '../Portal'
import { Paragraph } from '../Typography'
import { Link } from '../Link'

export function AgentFloatButton() {
    const [currentText, setCurrentText] = useState('')
    const [isAgentOpen, setIsAgentOpen] = useState(false)

    useEffect(() => {
        const texts = [
            'Pergunte ao Healtie',
            'Quais hospitais estão próximos?',
            'Quais são os sintomas da gripe?',
            'Onde encontro vacinação para gripe?',
            'Pergunte ao Healtie',
        ]

        let index = 0
        setCurrentText(texts[index])

        const advance = () => {
            if (index < texts.length - 1) {
                index += 1
                setCurrentText(texts[index])
                timeoutId = window.setTimeout(advance, 5000)
            }
        }

        let timeoutId = window.setTimeout(advance, 5000)

        return () => clearTimeout(timeoutId)
    }, [])

    return (
        <>
            <AnimatePresence>
                {!isAgentOpen && (
                    <motion.div
                        initial={{ y: '200%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '200%' }}
                        className={`${rootStyles}`}
                    >
                        <Button
                            variant="subtle"
                            onClick={() => setIsAgentOpen(!isAgentOpen)}
                        >
                            <SparkleIcon weight="fill" size={18} />
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={currentText}
                                    initial={{
                                        opacity: 0,
                                        y: '20%',
                                        filter: 'blur(4px)',
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        filter: 'blur(0)',
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: '-20%',
                                        filter: 'blur(4px)',
                                    }}
                                    transition={{ duration: 0.25 }}
                                >
                                    {currentText}
                                </motion.span>
                            </AnimatePresence>
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
            <Portal>
                <AnimatePresence>
                    {isAgentOpen && (
                        <motion.div
                            initial={{
                                y: '100%',
                                opacity: 0,
                            }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{
                                y: '100%',
                                opacity: 0,
                            }}
                            className={css({
                                position: 'fixed',
                                bottom: '1rem',
                                right: '1rem',
                                zIndex: 1000,
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                padding: '1rem',
                                borderRadius: '32px',
                                border: '1px solid',
                                borderColor: 'neutral.200',
                                width: '400px',
                            })}
                            style={{ backdropFilter: 'blur(10px)' }}
                        >
                            <header
                                className={css({
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mb: '0.5rem',
                                })}
                            >
                                <Button
                                    onClick={() => setIsAgentOpen(false)}
                                    variant="ghost"
                                    iconButton
                                >
                                    <XIcon />
                                </Button>
                                <Button
                                    onClick={() => setIsAgentOpen(false)}
                                    variant="ghost"
                                    iconButton
                                >
                                    <ArrowsOutSimpleIcon />
                                </Button>
                            </header>
                            <Paragraph centered bolder size="subheadline">
                                Fale com o Healtie
                            </Paragraph>
                            <Paragraph centered subtle>
                                Em breve você poderá conversar com o Healtie
                                diretamente por aqui!{' '}
                                <Link variant="text" href="#">
                                    Saiba mais...
                                </Link>
                            </Paragraph>
                            <footer
                                className={css({
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '.5rem',
                                    mt: '1rem',
                                })}
                            >
                                <input
                                    type="text"
                                    placeholder="Digite aqui sua dúvida"
                                    className={css({
                                        width: '100%',
                                        backgroundColor: 'neutral.100',
                                        padding: '.5rem 1rem',
                                        borderRadius: '9999px',
                                    })}
                                />
                                <Button iconButton variant="secondary">
                                    <ArrowUpIcon weight="bold" />
                                </Button>
                            </footer>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Portal>
        </>
    )
}

const rootStyles = css({
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
    contain: 'paint',
    padding: '1rem',
})
