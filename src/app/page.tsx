import { HeroSearchContainer } from './ui/HeroSeachContainer'
import { FeatureHighlight } from './ui/FeatureHighlight'
import { HowHelpsHighlight } from './ui/HowHelpsHighlight'
import { ContributeSection } from './ui/ContributeSection'
// import { AgentFloatButton } from '@/components/Agent'

export default function Home() {
    return (
        <>
            <HeroSearchContainer />
            <FeatureHighlight />
            <HowHelpsHighlight />
            <ContributeSection />
            {/* <AgentFloatButton /> */}
        </>
    )
}
