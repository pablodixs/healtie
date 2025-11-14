'use client'

import { useState, useMemo } from 'react'
import { estouAquiFlow } from './iAmHereFlow'
import { Subheading } from '../Typography'
import { Button } from '../Button'
import { ArrowLeftIcon } from '@phosphor-icons/react'
import { css } from '../../../styled-system/css'

export function IAmHereForm() {
    const [answers, setAnswers] = useState<Record<string, string | number>>({})
    const [step, setStep] = useState(0)

    const visibleSteps = useMemo(() => {
        return estouAquiFlow.filter((field) => {
            if (!field.showIf) return true

            const [key, value] = Object.entries(field.showIf)[0]
            return answers[key] === value
        })
    }, [answers])

    const currentField = visibleSteps[step]

    function handleSelect(value: string) {
        setAnswers((prev) => ({ ...prev, [currentField.id]: value }))
        nextStep()
    }

    function handleText(value: string) {
        setAnswers((prev) => ({ ...prev, [currentField.id]: value }))
    }

    function nextStep() {
        if (step < visibleSteps.length - 1) {
            setStep(step + 1)
        }
    }

    function prevStep() {
        if (step > 0) {
            setStep(step - 1)
        }
    }

    async function submit() {
        console.log('payload', answers)

        // Exemplo de POST
        // await fetch("/api/estou-aqui", {
        //   method: "POST",
        //   body: JSON.stringify(answers)
        // });

        alert('Enviado!')
    }

    // UI para opções
    const renderOptions = () => (
        <div
            className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                mt: '1rem',
            })}
        >
            {currentField.options?.map((opt: string) => (
                <Button
                    align="left"
                    fullWidth
                    variant="bordered"
                    key={opt}
                    onClick={() => handleSelect(opt)}
                >
                    {opt}
                </Button>
            ))}
        </div>
    )

    // UI para rating
    const renderRating = () => (
        <div className="flex gap-3 mt-4">
            {Array.from(
                { length: currentField.scale || 5 },
                (_, i) => i + 1
            ).map((n) => (
                <Button
                    key={n}
                    onClick={() => handleSelect(n.toString())}
                    className="text-3xl hover:scale-110 transition"
                >
                    ⭐
                </Button>
            ))}
        </div>
    )

    // UI para texto
    const renderText = () => (
        <div className="flex flex-col gap-4 mt-4">
            <textarea
                onChange={(e) => handleText(e.target.value)}
                className={css({
                    background: 'neutral.100',
                    width: '100%',
                    borderRadius: '12px',
                })}
                rows={4}
            />
            <Button variant="secondary" onClick={nextStep}>
                Salvar comentário
            </Button>
        </div>
    )

    const isLast = step === visibleSteps.length - 1

    return (
        <div className="max-w-lg mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg">
            <Subheading style={{ margin: '1rem 0' }}>
                {currentField.question}
            </Subheading>

            {/* Dynamic field rendering */}
            {currentField.type === 'single-select' && renderOptions()}
            {currentField.type === 'rating' && renderRating()}
            {currentField.type === 'text' && renderText()}

            <div
                className={css({
                    mt: '2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                })}
            >
                {step > 0 ? (
                    <Button variant="subtle" onClick={prevStep}>
                        <ArrowLeftIcon /> Voltar
                    </Button>
                ) : (
                    <div></div>
                )}

                {isLast && (
                    <Button variant="primary" onClick={submit}>
                        Enviar
                    </Button>
                )}
            </div>
        </div>
    )
}
