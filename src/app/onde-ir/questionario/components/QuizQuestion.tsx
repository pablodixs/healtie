import { motion } from 'motion/react'
import { css } from '../../../../../styled-system/css'
import { stack } from '../../../../../styled-system/patterns'
import { Question } from '@/utils/whereToGoQuestions'
import { QuizOption } from './QuizOption'
import { Heading } from '@/components/Typography/Heading'

interface QuizQuestionProps {
    question: Question
    onAnswer: (value: string) => void
}

export function QuizQuestion({ question, onAnswer }: QuizQuestionProps) {
    return (
        <div className={stack({ gap: '1rem' })}>
            <motion.div
                initial={{ opacity: 0, filter: 'blur(10px)', y: -10 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Heading>{question.question}</Heading>
            </motion.div>
            <div
                className={css({
                    display: 'grid',
                    gap: '1rem',
                    gridTemplateColumns:
                        'repeat(auto-fill, minmax(200px, 1fr))',
                })}
            >
                {question.options.map((option, idx) => (
                    <QuizOption
                        key={idx}
                        option={option}
                        onSelect={onAnswer}
                        index={idx}
                    />
                ))}
            </div>
        </div>
    )
}
