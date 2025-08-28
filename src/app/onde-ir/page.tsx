'use client'

import { LandingIntro } from '@/components/LandingIntro'
import { LayoutStack, Stack } from '@/components/Stacks'
import { ActionBar } from './components/ActionBar'
import { LandingInfo } from './components/ui/LandingInfo'
import { useScroll } from '@/hooks/useScroll'
import { Button } from '@/components/Button'
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr'

export default function Page() {
    const { scrollY } = useScroll()

    return (
        <LayoutStack>
            <div
                style={{
                    maxWidth: '1280px',
                    margin: '0 auto',
                    position: 'fixed',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'top 0.4s ease',
                    top: scrollY > 300 ? 76 : '-50%',
                    left: 0,
                    right: 0,
                    height: 50,
                    backgroundColor: 'white',
                    display: 'flex',
                    borderBottom: '1px solid #eee',
                    zIndex: 999,
                }}
            >
                <span style={{ fontWeight: 500 }}>Healtie Onde Ir?</span>
                <Button variant="secondary">
                    Descobrir onde devo ir <ArrowUpRightIcon />
                </Button>
            </div>
            <LandingIntro
                preTitle="Onde Ir?"
                title="Encontre o atendimento certo, sem sair de casa"
                description="Antes de ir a uma unidade de saúde, responda a algumas perguntas rápidas. Em menos de 1 minuto, você vai saber qual é o local mais indicado para o seu caso: Hospital, UPA ou UBS."
            >
                <ActionBar />
            </LandingIntro>
            <LandingInfo />
            <LandingInfo />
        </LayoutStack>
    )
}
