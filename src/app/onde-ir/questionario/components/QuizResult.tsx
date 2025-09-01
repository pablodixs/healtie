import { Button } from '@/components/Button'
import { Heading } from '@/components/Typography/Heading'

interface QuizResultProps {
    result: string
    onRestart: () => void
}

const getResultMessage = (result: string): string => {
    switch (result) {
        case 'hospital':
            return 'Vá para o Hospital imediatamente!'
        case 'upa':
            return 'Procure a UPA mais próxima para atendimento rápido.'
        case 'ubs':
            return 'Esse caso pode ser resolvido na UBS mais próxima.'
        case 'auto':
            return 'No momento, não há sinais de urgência. Continue se observando.'
        default:
            return 'Resultado não encontrado.'
    }
}

export function QuizResult({ result, onRestart }: QuizResultProps) {
    return (
        <div className="text-center">
            <Heading>{getResultMessage(result)}</Heading>
            <Button onClick={onRestart}>Refazer Triagem</Button>
        </div>
    )
}
