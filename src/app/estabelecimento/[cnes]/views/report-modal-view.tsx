'use client'

import { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { CaretLeftIcon, XIcon } from '@phosphor-icons/react'
import Image from 'next/image'
import { css } from '../../../../../styled-system/css'
import { Button } from '@/components/Button'
import { EstablishmentIcon } from '@/components/EstablishmentIcon'
import { Paragraph, Subheading } from '@/components/Typography'
import type { EstablishmentResponse } from '@/interfaces/EstablishmentAPIResponse'
import { REPORT_OPTIONS, type ReportType } from '../reports/report-types'
import { ReportOptionView } from './options/report-option-view'

interface ReportModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    establishment: EstablishmentResponse
}

const focusableSelector = 'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'

export function ReportModalView({ isOpen, onOpenChange, establishment }: ReportModalProps) {
    const [selectedType, setSelectedType] = useState<ReportType | null>(null)
    const dialogRef = useRef<HTMLDivElement>(null)
    const closeButtonRef = useRef<HTMLButtonElement>(null)
    const previousFocusRef = useRef<HTMLElement | null>(null)
    const reduceMotion = useReducedMotion()
    const selectedOption = REPORT_OPTIONS.find((option) => option.type === selectedType)

    useEffect(() => {
        if (!isOpen) return
        previousFocusRef.current = document.activeElement as HTMLElement
        const previousOverflow = document.body.style.overflow
        const backgroundElements = Array.from(document.body.children).filter(
            (element) => element.id !== 'portal'
        ) as HTMLElement[]
        document.body.style.overflow = 'hidden'
        backgroundElements.forEach((element) => {
            element.inert = true
        })
        window.requestAnimationFrame(() => closeButtonRef.current?.focus())
        return () => {
            document.body.style.overflow = previousOverflow
            backgroundElements.forEach((element) => {
                element.inert = false
            })
            previousFocusRef.current?.focus()
            setSelectedType(null)
        }
    }, [isOpen])

    const close = () => onOpenChange(false)

    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
        if (event.key === 'Escape') {
            event.preventDefault()
            close()
            return
        }
        if (event.key !== 'Tab' || !dialogRef.current) return
        const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector))
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault()
            last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault()
            first.focus()
        }
    }

    if (!isOpen) return null

    return (
        <motion.div className={overlayStyles} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0.12 : 0.2 }} onMouseDown={(event) => event.target === event.currentTarget && close()}>
            <motion.div ref={dialogRef} initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }} transition={{ duration: reduceMotion ? 0.12 : 0.28, ease: [0.23, 1, 0.32, 1] }} className={modalStyles} role="dialog" aria-modal="true" aria-label={selectedOption?.label ?? 'Enviar relato sobre a unidade'} aria-describedby={!selectedOption ? 'report-dialog-description' : undefined} onKeyDown={handleKeyDown}>
                <header className={headerStyles}>
                    <div className={headerGridStyles}>
                        <div>
                            {selectedType && <Button iconButton variant="subtle" aria-label="Voltar para tipos de relato" onClick={() => setSelectedType(null)}><CaretLeftIcon weight="bold" aria-hidden="true" /></Button>}
                        </div>
                        <div className={establishmentStyles}>
                            <EstablishmentIcon type={establishment.type as 'Hospital Geral' | 'Unidade Básica de Saúde' | 'Unidade de Pronto Atendimento'} size="small" decoration animation={false} />
                            <Paragraph marginCompact bolder>{establishment.name}</Paragraph>
                        </div>
                        <Button ref={closeButtonRef} iconButton onClick={close} variant="subtle" aria-label="Fechar relatos"><XIcon weight="bold" aria-hidden="true" /></Button>
                    </div>
                </header>
                <div className={bodyStyles}>
                    <AnimatePresence initial={false} mode="wait">
                        {!selectedOption ? (
                            <motion.section key="options" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} aria-labelledby="report-dialog-title">
                                <div className={titleStyles}>
                                    <Subheading centered><span id="report-dialog-title">O que você observou?</span></Subheading>
                                    <Paragraph id="report-dialog-description" centered subtle>Envie uma informação recente sobre esta unidade. Seu relato será anônimo.</Paragraph>
                                </div>
                                <div className={optionsGridStyles}>
                                    {REPORT_OPTIONS.map((option) => {
                                        const Icon = option.icon
                                        return (
                                            <button type="button" onClick={() => setSelectedType(option.type)} key={option.type} className={optionStyles} aria-label={`${option.label}. ${option.description}`}>
                                                <Image className={optionImageStyles} src={option.imageUrl} alt="" width={240} height={132} quality={80} />
                                                <span className={optionTitleStyles}><Icon size={20} weight="bold" aria-hidden="true" />{option.label}</span>
                                                <span className={optionDescriptionStyles}>{option.description}</span>
                                                <span className={optionExpiryStyles}>{option.expiryLabel}</span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </motion.section>
                        ) : (
                            <motion.div key={selectedOption.type} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                                <ReportOptionView establishment={establishment} option={selectedOption} onDone={close} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    )
}

const overlayStyles = css({ position: 'fixed', inset: 0, zIndex: 5000, display: 'grid', placeItems: 'center', p: { base: 0, md: '1.5rem' }, bg: 'rgba(0, 0, 0, 0.4)' })
const modalStyles = css({ width: '100%', maxWidth: '42rem', height: { base: '100dvh', md: 'min(46rem, 92dvh)' }, display: 'flex', flexDirection: 'column', bg: 'white', borderRadius: { base: 0, md: '1.75rem' }, boxShadow: '2xl', overflow: 'hidden', overscrollBehavior: 'contain' })
const headerStyles = css({ flexShrink: 0, p: '1rem', borderBottom: '1px solid', borderColor: 'neutral.100', bg: 'white' })
const headerGridStyles = css({ display: 'grid', gridTemplateColumns: '2.75rem minmax(0, 1fr) 2.75rem', gap: '.75rem', alignItems: 'center' })
const establishmentStyles = css({ minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem', '& p': { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } })
const bodyStyles = css({ flex: 1, overflowY: 'auto', p: { base: '1rem', md: '1.5rem' }, pb: 'calc(1rem + env(safe-area-inset-bottom))' })
const titleStyles = css({ maxWidth: '34rem', mx: 'auto', mb: '1.5rem', display: 'flex', flexDirection: 'column', gap: '.5rem', textWrap: 'pretty' })
const optionsGridStyles = css({ display: 'grid', gridTemplateColumns: { base: '1fr', sm: '1fr 1fr' }, gap: '1rem' })
const optionStyles = css({ minWidth: 0, p: '.625rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'start', color: 'primary', bg: 'white', borderRadius: '1.25rem', boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.1)', cursor: 'pointer', outline: '2px solid transparent', outlineOffset: '2px', transitionProperty: 'box-shadow, background-color', transitionDuration: '150ms', _hover: { bg: 'neutral.50', boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.22)' }, _focusVisible: { outlineColor: 'tint' } })
const optionImageStyles = css({ width: '100%', height: '7.5rem', objectFit: 'cover', borderRadius: '.875rem', mb: '.75rem', outline: '1px solid rgba(0, 0, 0, 0.08)', outlineOffset: '-1px' })
const optionTitleStyles = css({ display: 'flex', alignItems: 'center', gap: '.5rem', fontWeight: 600, fontSize: '.9375rem' })
const optionDescriptionStyles = css({ mt: '.25rem', color: 'neutral.600', fontSize: '.8125rem', lineHeight: 1.45, textWrap: 'pretty' })
const optionExpiryStyles = css({ mt: '.75rem', color: 'neutral.500', fontSize: '.75rem', fontWeight: 500 })
