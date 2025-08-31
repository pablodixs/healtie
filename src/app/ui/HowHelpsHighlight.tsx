import {
    CheckCircleIcon,
    CompassIcon,
    MapTrifoldIcon,
} from '@phosphor-icons/react/dist/ssr'
import { Paragraph } from '@/components/Typography/Paragraph'
import { stack } from '../../../styled-system/patterns'
import { Subheading } from '@/components/Typography/Subheading'
import { FeatureCard } from './components/FeatureCard'

export function HowHelpsHighlight() {
    return (
        <section
            className={stack({
                backgroundColor: 'background',
                padding: { base: '4rem 1rem', md: '4rem' },
                borderRadius: { base: '0', md: 'lg' },
                marginRight: { base: '0', md: '1rem' },
            })}
        >
            <Subheading>Como o Healtie te ajuda?</Subheading>
            <Paragraph compact>
                O Healtie conecta você às unidades de saúde mais próximas,
                facilitando o acesso a informações sobre serviços e atendimentos
                disponíveis.
            </Paragraph>
            <div
                className={stack({
                    direction: { base: 'column', md: 'row' },
                    align: 'stretch',
                    gap: '2rem',
                })}
            >
                <FeatureCard icon={CompassIcon} title="Você sabe onde ir">
                    Com o Onde Ir? você encontra a unidade de saúde mais
                    indicada pro seu caso, otimizando seu tempo e evitando a
                    lotação desnecessária dos estabelecimentos de saúde.
                </FeatureCard>
                <FeatureCard
                    icon={MapTrifoldIcon}
                    title="Você encontra a unidade de saúde mais próxima de você"
                >
                    Utilizando sua localização e preferências, o Healtie
                    encontra a unidade de saúde mais próxima de você, garantindo
                    um atendimento mais rápido e eficiente.
                </FeatureCard>
                <FeatureCard
                    icon={CheckCircleIcon}
                    title="Você sabe a situação da unidade de saúde"
                >
                    O Healtie fornece informações em tempo real sobre a situação
                    das unidades de saúde, incluindo horários de funcionamento,
                    capacidade de atendimento e serviços disponíveis.
                </FeatureCard>
            </div>
        </section>
    )
}
