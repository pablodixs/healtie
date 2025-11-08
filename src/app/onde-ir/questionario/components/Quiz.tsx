'use client'

import { AnimatePresence, motion } from 'motion/react'
import { stack } from '../../../../../styled-system/patterns'
import { QuizQuestion } from './QuizQuestion'
import { QuizNavigation } from './QuizNavigation'
import { QuizResult } from './QuizResult'
import { useQuiz } from '../hooks/useQuiz'

export function Quiz() {
    const {
        current,
        result,
        currentQuestion,
        canGoBack,
        handleAnswer,
        handlePrevious,
        handleRestart,
    } = useQuiz()

    if (result) {
        return (
            <motion.div
                initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <QuizResult result={result} onRestart={handleRestart} />
            </motion.div>
        )
    }

    return (
        <div className={stack({ gap: '1rem' })}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, filter: 'blur(10px)', x: 30 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
                    exit={{ opacity: 0, filter: 'blur(10px)', x: -30 }}
                    transition={{ duration: 0.3 }}
                >
                    <QuizQuestion
                        question={currentQuestion}
                        onAnswer={handleAnswer}
                    />
                </motion.div>
            </AnimatePresence>
            <QuizNavigation
                onPrevious={handlePrevious}
                onRestart={handleRestart}
                showNavigation={canGoBack}
            />
        </div>
    )
}
