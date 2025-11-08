import { css } from '../../../../../styled-system/css'
import { Button } from '@/components/Button'
import { ArrowClockwiseIcon, CaretLeftIcon } from '@phosphor-icons/react'

interface QuizNavigationProps {
    onPrevious: () => void
    onRestart: () => void
    showNavigation: boolean
}

export function QuizNavigation({
    onPrevious,
    onRestart,
    showNavigation,
}: QuizNavigationProps) {
    if (!showNavigation) return null

    return (
        <div
            className={css({
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
            })}
        >
            <Button variant="bordered" onClick={onPrevious}>
                <CaretLeftIcon /> Voltar pergunta
            </Button>
            <Button variant="subtle" onClick={onRestart}>
                <ArrowClockwiseIcon /> Refazer questionário
            </Button>
        </div>
    )
}
