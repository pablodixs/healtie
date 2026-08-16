'use client'

import { FormEvent, useRef, useState } from 'react'
import { WarningCircleIcon } from '@phosphor-icons/react'
import { css } from '../../../../../../styled-system/css'

import { Banner } from '@/components/Banner'
import { Button } from '@/components/Button'
import { Label } from '@/components/Form/Label'
import { Paragraph, Subheading } from '@/components/Typography'
import type { EstablishmentResponse } from '@/interfaces/EstablishmentAPIResponse'
import {
    createEstablishmentReport,
    getReportErrorMessage,
} from '../../reports/report-api'
import type { ReportOption } from '../../reports/report-types'
import { SuccessView } from './success-view'

type Props = {
    establishment: EstablishmentResponse
    option: ReportOption
    onDone: () => void
}

const occupancyChoices = [
    { value: 25, label: 'Tranquila', description: 'Poucas pessoas' },
    { value: 50, label: 'Moderada', description: 'Movimento normal' },
    { value: 75, label: 'Cheia', description: 'Muitas pessoas' },
    { value: 100, label: 'Lotada', description: 'Capacidade no limite' },
]

export function ReportOptionView({ establishment, option, onDone }: Props) {
    const [value, setValue] = useState<number | null>(null)
    const [occurrence, setOccurrence] = useState<boolean | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const fieldRef = useRef<HTMLInputElement>(null)
    const Icon = option.icon

    const isValid =
        option.kind === 'occurrence'
            ? occurrence !== null
            : value !== null &&
              value >= (option.kind === 'duration' ? 1 : 0) &&
              value <= (option.kind === 'duration' ? 1440 : 100)

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        setError(null)

        if (!isValid) {
            setError(
                option.kind === 'duration'
                    ? 'Informe um tempo entre 1 e 1.440 minutos.'
                    : 'Selecione uma opção antes de enviar.'
            )
            fieldRef.current?.focus()
            return
        }

        setIsLoading(true)
        try {
            await createEstablishmentReport(establishment.cnes, {
                type: option.type,
                observedAt: new Date().toISOString(),
                ...(option.kind === 'occurrence'
                    ? { occurrence: occurrence as boolean }
                    : { value: value as number }),
            })
            setSuccess(true)
        } catch (requestError) {
            setError(getReportErrorMessage(requestError))
        } finally {
            setIsLoading(false)
        }
    }

    if (success) {
        return (
            <SuccessView onDone={onDone}>
                <div className={summaryHeader}>
                    <Icon size={22} weight="bold" />
                    <Paragraph bolder marginCompact>
                        {option.label}
                    </Paragraph>
                </div>
                <Paragraph marginCompact subtle size="caption">
                    {establishment.name}
                </Paragraph>
                <Paragraph marginCompact bolder>
                    {option.kind === 'duration' && `${value} minutos`}
                    {option.kind === 'percentage' &&
                        occupancyChoices.find((item) => item.value === value)
                            ?.label}
                    {option.kind === 'occurrence' &&
                        (occurrence ? 'Indisponibilidade relatada' : 'Situação normalizada')}
                </Paragraph>
            </SuccessView>
        )
    }

    return (
        <form className={formStyles} onSubmit={handleSubmit} noValidate>
            <div className={introStyles}>
                <div className={iconStyles} aria-hidden="true">
                    <Icon size={34} />
                </div>
                <Subheading centered size="sm">
                    {option.label}
                </Subheading>
                <Paragraph centered subtle>
                    {option.description}
                </Paragraph>
                <span className={expiryStyles}>{option.expiryLabel}</span>
            </div>

            {option.kind === 'duration' && (
                <div>
                    <Label htmlFor="report-value">Tempo de espera em minutos</Label>
                    <input
                        ref={fieldRef}
                        id="report-value"
                        name="waitTime"
                        type="number"
                        inputMode="numeric"
                        min={1}
                        max={1440}
                        step={5}
                        value={value ?? ''}
                        aria-invalid={Boolean(error)}
                        aria-describedby={error ? 'report-error' : 'report-hint'}
                        onChange={(event) => setValue(event.target.valueAsNumber)}
                        className={numberInputStyles}
                    />
                    <Paragraph id="report-hint" marginCompact subtle size="caption">
                        Use o tempo que você observou hoje.
                    </Paragraph>
                </div>
            )}

            {option.kind === 'percentage' && (
                <fieldset className={fieldsetStyles}>
                    <legend>Como estava a ocupação?</legend>
                    <div className={choiceGridStyles}>
                        {occupancyChoices.map((choice, index) => (
                            <label key={choice.value} className={choiceStyles}>
                                <input
                                    ref={index === 0 ? fieldRef : undefined}
                                    type="radio"
                                    name="occupancy"
                                    value={choice.value}
                                    checked={value === choice.value}
                                    onChange={() => setValue(choice.value)}
                                />
                                <span>
                                    <strong>{choice.label}</strong>
                                    <small>{choice.description}</small>
                                </span>
                            </label>
                        ))}
                    </div>
                </fieldset>
            )}

            {option.kind === 'occurrence' && (
                <fieldset className={fieldsetStyles}>
                    <legend>O que você observou?</legend>
                    <div className={choiceGridStyles}>
                        <label className={choiceStyles}>
                            <input
                                ref={fieldRef}
                                type="radio"
                                name="occurrence"
                                checked={occurrence === true}
                                onChange={() => setOccurrence(true)}
                            />
                            <span>
                                <strong>Estava indisponível</strong>
                                <small>Confirmar esta ocorrência</small>
                            </span>
                        </label>
                        <label className={choiceStyles}>
                            <input
                                type="radio"
                                name="occurrence"
                                checked={occurrence === false}
                                onChange={() => setOccurrence(false)}
                            />
                            <span>
                                <strong>Estava disponível</strong>
                                <small>Informar que a situação está normal</small>
                            </span>
                        </label>
                    </div>
                </fieldset>
            )}

            <div className={footerStyles}>
                <div id="report-error" role="alert" aria-live="assertive">
                    {error && (
                        <Banner
                            icon={<WarningCircleIcon aria-hidden="true" />}
                            variant="error"
                            title={error}
                        />
                    )}
                </div>
                <Button type="submit" fullWidth disabled={isLoading}>
                    {isLoading ? 'Enviando…' : 'Enviar relato'}
                </Button>
                <Paragraph centered marginCompact subtle size="caption">
                    O relato é anônimo e será combinado com outras contribuições.
                </Paragraph>
            </div>
        </form>
    )
}

const formStyles = css({ display: 'flex', flexDirection: 'column', gap: '2rem', minHeight: '100%' })
const introStyles = css({ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.5rem', textAlign: 'center', maxWidth: '34rem', mx: 'auto' })
const iconStyles = css({ display: 'grid', placeItems: 'center', width: '3.5rem', height: '3.5rem', color: 'primary', bg: 'neutral.100', borderRadius: 'full' })
const expiryStyles = css({ display: 'inline-flex', px: '.75rem', py: '.25rem', borderRadius: 'full', bg: 'neutral.100', color: 'neutral.600', fontSize: '.8125rem', fontWeight: 500 })
const numberInputStyles = css({ width: '100%', mt: '.5rem', p: '1rem', borderRadius: '1rem', bg: 'neutral.100', color: 'primary', fontSize: '2rem', textAlign: 'center', fontWeight: 600, fontVariantNumeric: 'tabular-nums', outline: '2px solid transparent', outlineOffset: '2px', _focusVisible: { outlineColor: 'tint' } })
const fieldsetStyles = css({ border: 0, p: 0, m: 0, '& legend': { fontWeight: 600, mb: '.75rem' } })
const choiceGridStyles = css({ display: 'grid', gridTemplateColumns: { base: '1fr', sm: '1fr 1fr' }, gap: '.75rem' })
const choiceStyles = css({ position: 'relative', display: 'flex', alignItems: 'center', gap: '.75rem', minHeight: '4.5rem', p: '1rem', borderRadius: '1rem', bg: 'neutral.50', boxShadow: 'inset 0 0 0 1px token(colors.neutral.200)', cursor: 'pointer', '&:has(input:checked)': { bg: 'blue.50', boxShadow: 'inset 0 0 0 2px token(colors.tint)' }, '&:has(input:focus-visible)': { outline: '2px solid token(colors.tint)', outlineOffset: '2px' }, '& input': { width: '1.125rem', height: '1.125rem', accentColor: 'token(colors.tint)', flexShrink: 0 }, '& span': { display: 'flex', flexDirection: 'column', gap: '.125rem' }, '& strong': { fontSize: '.9375rem' }, '& small': { color: 'neutral.600', fontSize: '.8125rem', lineHeight: 1.4 } })
const footerStyles = css({ display: 'flex', flexDirection: 'column', gap: '.75rem', mt: 'auto', pb: 'env(safe-area-inset-bottom)' })
const summaryHeader = css({ display: 'flex', alignItems: 'center', gap: '.5rem', mb: '.5rem', color: 'primary' })
