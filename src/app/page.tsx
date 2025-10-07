import { HeroSearchContainer } from './ui/HeroSeachContainer'
import { FeatureHighlight } from './ui/FeatureHighlight'
import { NearEstablishmentsHighlight } from './ui/NearEstablishmentsHighlight'
import { HowHelpsHighlight } from './ui/HowHelpsHighlight'
import { ContributeSection } from './ui/ContributeSection'
import { Divider } from '@/components/Divider'

export default function Home() {
    return (
        <>
            <HeroSearchContainer />
            <Divider />
            <FeatureHighlight />
            <NearEstablishmentsHighlight />
            <HowHelpsHighlight />
            <ContributeSection />
        </>
    )
}
