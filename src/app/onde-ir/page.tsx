import { LandingIntro } from '@/components/LandingIntro'
import { LayoutStack } from '@/components/Stacks'
import { ActionBar } from './components/ActionBar'
import { LandingInfo } from './components/ui/LandingInfo'

export default function Page() {
    return (
        <LayoutStack compact>
            <LandingIntro
                preTitle="Onde Ir?"
                title="Encontre o atendimento certo, sem sair de casa"
                description="Antes de ir a uma unidade de saúde, responda a algumas perguntas rápidas. Em menos de 1 minuto, você vai saber qual é o local mais indicado para o seu caso: Hospital, UPA ou UBS."
            >
                <ActionBar />
            </LandingIntro>
            <LayoutStack compact>
                <LandingInfo />
                <LandingInfo />
            </LayoutStack>
        </LayoutStack>
    )
}
