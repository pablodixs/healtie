import { Subheading } from '@/components/Typography/Subheading'
import { HeroSearchContainer } from './ui/HeroSeachContainer'

import { stack } from '../../styled-system/patterns'
import { FeatureHighlight } from './ui/FeatureHighlight'

export default function Home() {
    return (
        <div>
            <HeroSearchContainer />
            <FeatureHighlight />
            <section className={stack({ padding: '2rem 0' })}>
                <Subheading>
                    Encontre a unidade de saúde mais próxima de você <br /> e
                    saiba quais serviços estão disponíveis.
                </Subheading>
            </section>
        </div>
    )
}
