import { css } from '../../../../../styled-system/css'
import { stack } from '../../../../../styled-system/patterns'
import { Subheading } from '@/components/Typography/Subheading'
import { Question } from '@/utils/whereToGoQuestions'
import { QuizOption } from './QuizOption'

interface QuizQuestionProps {
    question: Question
    onAnswer: (value: string) => void
}

export function QuizQuestion({ question, onAnswer }: QuizQuestionProps) {
    return (
        <div className={stack({ gap: '1rem' })}>
            <Subheading>{question.question}</Subheading>
            <div
                className={css({
                    display: 'grid',
                    gap: '1rem',
                    gridTemplateColumns:
                        'repeat(auto-fill, minmax(200px, 1fr))',
                })}
            >
                {question.options.map((option, idx) => (
                    <QuizOption key={idx} option={option} onSelect={onAnswer} />
                ))}
            </div>
        </div>
    )
}
