'use client'

import { useState } from 'react'

import { Heading } from '@/components/Typography/Heading'

import { whereToGoQuestions as questions } from '@/utils/whereToGoQuestions'
import { stack } from '../../../../../styled-system/patterns'
import { Subheading } from '@/components/Typography/Subheading'
import { css } from '../../../../../styled-system/css'
import { Paragraph } from '@/components/Typography/Paragraph'
import { Button } from '@/components/Button'

export function Quiz() {
    const [current, setCurrent] = useState(0)
    const [result, setResult] = useState<string | null>(null)

    const handleAnswer = (value: string) => {
        if (value !== 'next') {
            setResult(value)
            return
        }
        if (current < questions.length - 1) {
            setCurrent(current + 1)
        } else {
            setResult('auto')
        }
    }

    return (
        <div>
            {!result ? (
                <div className={stack({ gap: '1rem' })}>
                    <Subheading>{questions[current].question}</Subheading>
                    <div
                        className={stack({
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                        })}
                    >
                        {questions[current].options.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(opt.value)}
                                className={css({
                                    padding: '1rem',
                                    borderRadius: '0.75rem',
                                    backgroundColor: 'background',
                                    color: '#202020',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    fontWeight: 450,
                                    fontSize: '1.125rem',
                                })}
                            >
                                {opt.label}
                                <Paragraph size="caption" subtle>
                                    {opt.description}
                                </Paragraph>
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    {result === 'hospital' && (
                        <Heading>Vá para o Hospital imediatamente!</Heading>
                    )}
                    {result === 'upa' && (
                        <Heading>
                            Procure a UPA mais próxima para atendimento rápido.
                        </Heading>
                    )}
                    {result === 'ubs' && (
                        <Heading>
                            Esse caso pode ser resolvido na UBS mais próxima.
                        </Heading>
                    )}
                    {result === 'auto' && (
                        <Heading>
                            No momento, não há sinais de urgência. Continue se
                            observando.
                        </Heading>
                    )}
                    <Button
                        onClick={() => {
                            setCurrent(0)
                            setResult(null)
                        }}
                    >
                        Refazer Triagem
                    </Button>
                </div>
            )}
        </div>
    )
}
