import { useState } from 'react'
import { whereToGoQuestions as questions } from '@/utils/whereToGoQuestions'

export function useQuiz() {
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

    const handlePrevious = () => {
        setCurrent(current - 1)
    }

    const handleRestart = () => {
        setCurrent(0)
        setResult(null)
    }

    return {
        current,
        result,
        currentQuestion: questions[current],
        canGoBack: current > 0,
        handleAnswer,
        handlePrevious,
        handleRestart,
    }
}
