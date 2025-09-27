import { HeroSearchContainer } from './ui/HeroSeachContainer'
import { FeatureHighlight } from './ui/FeatureHighlight'
import { NearEstablishmentsHighlight } from './ui/NearEstablishmentsHighlight'
import { HowHelpsHighlight } from './ui/HowHelpsHighlight'
import { ContributeSection } from './ui/ContributeSection'

export default function Home() {
    return (
        <>
            <HeroSearchContainer />
            <FeatureHighlight />
            <NearEstablishmentsHighlight />
            <HowHelpsHighlight />
            <ContributeSection />
        </>
    )
}
