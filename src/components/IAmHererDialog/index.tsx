'use client'

import { css } from '../../../styled-system/css'
import { motion } from 'motion/react'
import { Paragraph, Subheading } from '../Typography'
import { Establishment } from '@/interfaces/Establishment'
import { EstablishmentIcon } from '../EstablishmentIcon'
import { Button } from '../Button'
import { ArrowLeftIcon, XIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import { Divider } from '../Divider'

interface IAmHereDialogProps {
    onOpenChange: (open: boolean) => void
    establishment: Establishment
}

export function IAmHereDialog({
    onOpenChange,
    establishment,
}: IAmHereDialogProps) {
    const [currentQuestion, setCurrentQuestion] = useState(1)

    return (
        <motion.div
            className={overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => onOpenChange?.(false)}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                transition={{
                    duration: 0.2,
                }}
                className={modalContainer}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
            >
                <header
                    className={css({
                        display: 'flex',
                        justifyContent: 'flex-end',
                    })}
                >
                    <Button
                        onClick={() => onOpenChange(false)}
                        iconButton
                        variant="subtle"
                    >
                        <XIcon />
                    </Button>
                </header>
                <div
                    className={css({
                        display: 'flex',
                        gap: '.5rem',
                        alignItems: 'center',
                    })}
                >
                    <EstablishmentIcon
                        decoration
                        type={establishment.abb as 'HOSPITAL' | 'UBS' | 'UPA'}
                    />
                    <Paragraph bolder>{establishment.full_name}</Paragraph>
                </div>
                <section className={css({ mt: '1.5rem' })}>
                    {currentQuestion === 1 && (
                        <div>
                            <Subheading centered>
                                Você já passou pela triagem?
                            </Subheading>
                            <div
                                className={css({
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    mt: '1rem',
                                })}
                            >
                                <Button
                                    onClick={() => setCurrentQuestion(2)}
                                    variant="subtle"
                                    size="large"
                                >
                                    Não
                                </Button>
                                <Button
                                    onClick={() => setCurrentQuestion(2)}
                                    size="large"
                                >
                                    Sim
                                </Button>
                            </div>
                        </div>
                    )}
                    {currentQuestion === 2 && (
                        <div>
                            <Subheading centered>
                                Qual classificação você recebeu na triagem?
                            </Subheading>
                            <div
                                className={css({
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem',
                                    mt: '1rem',
                                })}
                            >
                                <Button
                                    fullWidth
                                    variant="bordered"
                                    align="left"
                                    onClick={() =>
                                        setCurrentQuestion(currentQuestion + 1)
                                    }
                                    size="large"
                                >
                                    <div
                                        className={css({
                                            display: 'block',
                                            width: '24px',
                                            aspectRatio: '1/1',
                                            backgroundColor: 'blue.500',
                                            borderRadius: '50%',
                                        })}
                                    ></div>
                                    Não urgente
                                </Button>
                                <Button
                                    fullWidth
                                    variant="bordered"
                                    align="left"
                                    onClick={() =>
                                        setCurrentQuestion(currentQuestion + 1)
                                    }
                                    size="large"
                                >
                                    <div
                                        className={css({
                                            display: 'block',
                                            width: '24px',
                                            aspectRatio: '1/1',
                                            backgroundColor: 'green.500',
                                            borderRadius: '50%',
                                        })}
                                    ></div>
                                    Pouco urgente
                                </Button>
                                <Button
                                    fullWidth
                                    variant="bordered"
                                    align="left"
                                    onClick={() =>
                                        setCurrentQuestion(currentQuestion + 1)
                                    }
                                    size="large"
                                >
                                    <div
                                        className={css({
                                            display: 'block',
                                            width: '24px',
                                            aspectRatio: '1/1',
                                            backgroundColor: 'yellow.500',
                                            borderRadius: '50%',
                                        })}
                                    ></div>
                                    Urgente
                                </Button>
                                <Button
                                    fullWidth
                                    variant="bordered"
                                    align="left"
                                    onClick={() =>
                                        setCurrentQuestion(currentQuestion + 1)
                                    }
                                    size="large"
                                >
                                    <div
                                        className={css({
                                            display: 'block',
                                            width: '24px',
                                            aspectRatio: '1/1',
                                            backgroundColor: 'orange.500',
                                            borderRadius: '50%',
                                        })}
                                    ></div>
                                    Muito urgente
                                </Button>
                                <Button
                                    fullWidth
                                    variant="bordered"
                                    align="left"
                                    onClick={() =>
                                        setCurrentQuestion(currentQuestion + 1)
                                    }
                                    size="large"
                                >
                                    <div
                                        className={css({
                                            display: 'block',
                                            width: '24px',
                                            aspectRatio: '1/1',
                                            backgroundColor: 'red.500',
                                            borderRadius: '50%',
                                        })}
                                    ></div>
                                    Emergência
                                </Button>
                            </div>
                        </div>
                    )}
                </section>
                {currentQuestion > 1 && (
                    <footer>
                        <Divider margin="compact" />
                        <Button
                            variant="subtle"
                            onClick={() =>
                                setCurrentQuestion(currentQuestion - 1)
                            }
                        >
                            <ArrowLeftIcon weight="bold" />
                            Voltar
                        </Button>
                    </footer>
                )}
            </motion.div>
        </motion.div>
    )
}

const modalContainer = css({
    backgroundColor: 'white',
    p: '1.5rem',
    borderRadius: '0.75rem',
    width: '100%',
    minW: '600px',
    maxW: '500px',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
})

const overlay = css({
    height: '100vh',
    width: '100vw',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    position: 'fixed',
    inset: 0,
    zIndex: 5000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    backdropFilter: 'blur(2px)',
})
