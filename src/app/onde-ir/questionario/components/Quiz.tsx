'use client'

import { stack } from '../../../../../styled-system/patterns'
import { Divider } from '@/components/Divider'
import { QuizQuestion } from './QuizQuestion'
import { QuizNavigation } from './QuizNavigation'
import { QuizResult } from './QuizResult'
import { useQuiz } from '../hooks/useQuiz'

export function Quiz() {
    const {
        result,
        currentQuestion,
        canGoBack,
        handleAnswer,
        handlePrevious,
        handleRestart,
    } = useQuiz()

    if (result) {
        return <QuizResult result={result} onRestart={handleRestart} />
    }

    return (
        <div className={stack({ gap: '1rem' })}>
            <QuizQuestion question={currentQuestion} onAnswer={handleAnswer} />
            <Divider />
            <QuizNavigation
                onPrevious={handlePrevious}
                onRestart={handleRestart}
                showNavigation={canGoBack}
            />
        </div>
    )
}
