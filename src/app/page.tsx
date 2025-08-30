import { Subheading } from '@/components/Typography/Subheading'
import { HeroSearchContainer } from './ui/HeroSeachContainer'

import { stack } from '../../styled-system/patterns'
import { FeatureHighlight } from './ui/FeatureHighlight'
import { Paragraph } from '@/components/Typography/Paragraph'
import { Stack } from '@/components/Stacks'
import { Button } from '@/components/Button'
import {
    ArrowRightIcon,
    ArrowUpRightIcon,
} from '@phosphor-icons/react/dist/ssr'

export default function Home() {
    return (
        <div>
            <HeroSearchContainer />
            <FeatureHighlight />
            <section
                className={stack({
                    padding: { base: '4rem 1rem', md: '4rem 0' },
                })}
            >
                <Subheading>
                    Encontre a unidade de saúde mais próxima de você <br /> e
                    saiba quais serviços estão disponíveis
                </Subheading>
                <Paragraph compact>
                    Localize a unidade mais próxima e veja, em tempo real*, os
                    serviços disponíveis para garantir um atendimento mais
                    rápido e eficiente.
                </Paragraph>
                <Stack direction="row">
                    <Button variant="subtle">
                        Ver unidades próximas <ArrowRightIcon />
                    </Button>
                    <Button variant="text">
                        Lista de estabelecimentos <ArrowUpRightIcon />
                    </Button>
                </Stack>
            </section>
            <section
                className={stack({
                    padding: { base: '4rem 1rem', md: '4rem 0' },
                })}
            >
                <Subheading>Como o Healtie te ajuda?</Subheading>
                <Paragraph compact>
                    O Healtie conecta você às unidades de saúde mais próximas,
                    facilitando o acesso a informações sobre serviços e
                    atendimentos disponíveis.
                </Paragraph>
            </section>
        </div>
    )
}
