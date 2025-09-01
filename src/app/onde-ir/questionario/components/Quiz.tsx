'use client'

import Image from 'next/image'
import { useState } from 'react'

import { css } from '../../../../../styled-system/css'
import { stack } from '../../../../../styled-system/patterns'

import { Button } from '@/components/Button'
import { Heading } from '@/components/Typography/Heading'
import { Paragraph } from '@/components/Typography/Paragraph'
import { Subheading } from '@/components/Typography/Subheading'

import {
    OptionQuestion,
    whereToGoQuestions as questions,
} from '@/utils/whereToGoQuestions'

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
                        className={css({
                            display: 'flex',
                            gap: '1rem',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                        })}
                    >
                        {questions[current].options.map(
                            (opt: OptionQuestion, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(opt.value)}
                                    className={css({
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        padding: '1rem',
                                        borderRadius: '0.75rem',
                                        backgroundColor: 'background',
                                        color: '#202020',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        fontWeight: 450,
                                        fontSize: '1.125rem',
                                        minWidth: '200px',
                                    })}
                                >
                                    {opt.imageUrl && (
                                        <Image
                                            src={opt.imageUrl}
                                            alt={opt.label}
                                            width={100}
                                            height={100}
                                            className={css({
                                                width: '100%',
                                                aspectRatio: '1/1',
                                                borderRadius:
                                                    'calc(1rem - 0.75rem)',
                                            })}
                                            quality={100}
                                        />
                                    )}
                                    <span>{opt.label}</span>
                                    <Paragraph size="caption" subtle>
                                        {opt.description}
                                    </Paragraph>
                                </button>
                            )
                        )}
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
